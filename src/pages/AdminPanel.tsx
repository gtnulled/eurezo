import React, { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { Editor } from "@tinymce/tinymce-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Upload } from "lucide-react"

export function AdminPanel() {
  const [prayers, setPrayers] = useState([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [settings, setSettings] = useState({
    site_name: "",
    site_description: "",
    logo_url: "",
    og_image_url: "",
    meta_title: "",
    meta_description: "",
    pwa_settings: {
      theme_color: '#E5D5B7',
      background_color: '#E5D5B7',
      app_name: 'EuRezo - Orações Católicas',
      app_short_name: 'EuRezo',
      app_description: 'Orações Católicas para seu dia a dia'
    }
  })
  const [activeTab, setActiveTab] = useState("prayers")
  const navigate = useNavigate()

  useEffect(() => {
    checkAuth()
    loadPrayers()
    loadSettings()
  }, [])

  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      navigate("/login")
    }
  }

  async function loadSettings() {
    const { data, error } = await supabase.from("site_settings").select("*").single()

    if (data) {
      setSettings(data)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "og") {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 2MB.")
      return
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Apenas imagens são permitidas.")
      return
    }

    const fileName = `${type}-${Date.now()}-${file.name}`

    try {
      const { data, error } = await supabase.storage.from("imgs").upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      })

      if (error) {
        console.error("Upload error:", error)
        toast.error(`Erro ao fazer upload: ${error.message}`)
        return
      }

      const { data: publicUrlData } = supabase.storage.from("imgs").getPublicUrl(fileName)

      if (!publicUrlData || !publicUrlData.publicUrl) {
        toast.error("Erro ao gerar URL pública")
        return
      }

      const updatedSettings = {
        ...settings,
        [type === "logo" ? "logo_url" : "og_image_url"]: publicUrlData.publicUrl,
      }
      
      setSettings(updatedSettings)
      
      const { error: updateError } = await supabase
        .from("site_settings")
        .update(updatedSettings)
        .eq("id", settings.id)

      if (updateError) {
        toast.error("Erro ao salvar URL da imagem")
        return
      }

      toast.success("Imagem enviada com sucesso!")
    } catch (err) {
      console.error("Unexpected error during upload:", err)
      toast.error("Erro inesperado ao fazer upload")
    }
  }

  async function handleSettingsSubmit(e: React.FormEvent) {
    e.preventDefault()

    const { error } = await supabase
      .from("site_settings")
      .update(settings)
      .eq("id", settings.id)

    if (error) {
      toast.error("Erro ao salvar configurações")
    } else {
      toast.success("Configurações salvas com sucesso!")
      updateMetaTags(settings)
    }
  }

  function updateMetaTags(settings: any) {
    document.title = settings.meta_title || `${settings.site_name} - ${settings.site_description}`
    
    const metaTags = {
      'description': settings.meta_description || settings.site_description,
      'theme-color': settings.pwa_settings?.theme_color || '#E5D5B7',
    }

    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content as string)
    })

    const ogTags = {
      'og:title': settings.meta_title || `${settings.site_name} - ${settings.site_description}`,
      'og:description': settings.meta_description || settings.site_description,
      'og:image': settings.og_image_url,
      'og:url': window.location.href,
      'twitter:card': 'summary_large_image',
      'twitter:image': settings.og_image_url
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      if (!content) return
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content as string)
    })
  }

  async function loadPrayers() {
    const { data } = await supabase.from("prayers").select("*").order("position")
    setPrayers(data || [])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (editingId) {
      const { error } = await supabase.from("prayers").update({ title, content }).eq("id", editingId)

      if (error) {
        toast.error("Erro ao atualizar oração")
      } else {
        toast.success("Oração atualizada com sucesso!")
      }
    } else {
      const { error } = await supabase.from("prayers").insert([
        {
          title,
          content,
          position: prayers.length,
        },
      ])

      if (error) {
        toast.error("Erro ao adicionar oração")
      } else {
        toast.success("Oração adicionada com sucesso!")
      }
    }

    setTitle("")
    setContent("")
    setEditingId(null)
    loadPrayers()
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("prayers").delete().eq("id", id)

    if (error) {
      toast.error("Erro ao excluir oração")
    } else {
      toast.success("Oração excluída com sucesso!")
      loadPrayers()
    }
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return

    try {
      const currentPrayer = prayers[index]
      const previousPrayer = prayers[index - 1]

      const { error } = await supabase.rpc('move_prayer_up', {
        prayer_id: currentPrayer.id
      })

      if (error) {
        console.error('Error moving prayer:', error)
        toast.error('Erro ao mover oração')
        return
      }

      await loadPrayers()
      toast.success('Oração movida com sucesso!')
    } catch (err) {
      console.error('Unexpected error:', err)
      toast.error('Erro inesperado ao mover oração')
    }
  }

  async function handlePWASettingsSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const updatedSettings = {
      ...settings,
      pwa_settings: {
        ...settings.pwa_settings,
        theme_color: settings.pwa_settings?.theme_color || '#E5D5B7',
        background_color: settings.pwa_settings?.background_color || '#E5D5B7'
      }
    }

    try {
      const { error } = await supabase
        .from("site_settings")
        .update(updatedSettings)
        .eq("id", settings.id)

      if (error) {
        toast.error("Erro ao salvar configurações PWA")
        console.error("Erro ao salvar configurações PWA:", error)
      } else {
        setSettings(updatedSettings)
        toast.success("Configurações PWA salvas com sucesso!")
        
        // Update meta tags
        const themeColorMeta = document.querySelector('meta[name="theme-color"]')
        if (themeColorMeta) {
          themeColorMeta.setAttribute('content', updatedSettings.pwa_settings.theme_color)
        }
      }
    } catch (err) {
      console.error("Erro inesperado ao salvar configurações PWA:", err)
      toast.error("Erro inesperado ao salvar configurações")
    }
  }

  return (
    <div className="flex-1 bg-[#E5D5B7] py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl p-4 sm:p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-[#3C342D]">Painel de Controle</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("prayers")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "prayers" ? "bg-[#E9C46A] text-[#3C342D]" : "bg-gray-200 text-gray-600"
                }`}
              >
                Orações ({prayers.length})
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "settings" ? "bg-[#E9C46A] text-[#3C342D]" : "bg-gray-200 text-gray-600"
                }`}
              >
                Configurações
              </button>
              <button
                onClick={() => setActiveTab("pwa")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "pwa" ? "bg-[#E9C46A] text-[#3C342D]" : "bg-gray-200 text-gray-600"
                }`}
              >
                PWA
              </button>
            </div>
          </div>

          {activeTab === "prayers" ? (
            <>
              <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Título da Oração</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Conteúdo</label>
                  <Editor
                    apiKey="mfispgfnvj9xi37jk9mxyv46mjmnh78pwgar1xsjnx3nd9sk"
                    value={content}
                    onEditorChange={(newContent) => setContent(newContent)}
                    init={{
                      height: 400,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px }',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#E9C46A] text-[#3C342D] px-4 py-2 rounded-lg hover:bg-[#E9B84A] transition-colors"
                >
                  {editingId ? "Atualizar" : "Adicionar"} Oração
                </button>
              </form>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-[#3C342D] mb-4">Lista de Orações</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Título</th>
                        <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prayers.map((prayer: any, index: number) => (
                        <tr key={prayer.id} className="border-t">
                          <td className="px-4 py-3">{prayer.title}</td>
                          <td className="px-4 py-3">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingId(prayer.id)
                                  setTitle(prayer.title)
                                  setContent(prayer.content)
                                }}
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDelete(prayer.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm"
                              >
                                Excluir
                              </button>
                              {index > 0 && (
                                <button
                                  onClick={() => handleMoveUp(index)}
                                  className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                                >
                                  Mover
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : activeTab === "settings" ? (
            <form onSubmit={handleSettingsSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nome do Site</label>
                  <input
                    type="text"
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Descrição do Site</label>
                  <input
                    type="text"
                    value={settings.site_description}
                    onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Logo do Site</label>
                  <div className="flex items-center gap-4">
                    {settings.logo_url && (
                      <img
                        src={settings.logo_url}
                        alt="Logo"
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    )}
                    <label className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                      <Upload size={20} />
                      Upload Logo
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "logo")}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Tamanho recomendado: 512x512px (max 2MB)</p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Imagem para Redes Sociais</label>
                  <div className="flex items-center gap-4">
                    {settings.og_image_url && (
                      <img
                        src={settings.og_image_url}
                        alt="OG Image"
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                    )}
                    <label className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                      <Upload size={20} />
                      Upload Imagem
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(e, "og")}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Tamanho recomendado: 1200x630px (max 2MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Título Meta (SEO)</label>
                  <input
                    type="text"
                    value={settings.meta_title}
                    onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    placeholder="EuRezo - Orações Católicas"
                  />
                  <p className="text-sm text-gray-500 mt-1">Recomendado: 50-60 caracteres</p>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Descrição Meta (SEO)</label>
                  <textarea
                    value={settings.meta_description}
                    onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                    className="w-full p-2 border rounded-lg h-24"
                    placeholder="EuRezo é um site dedicado a disponibilizar orações católicas de forma acessível e organizada."
                  />
                  <p className="text-sm text-gray-500 mt-1">Recomendado: 150-160 caracteres</p>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#E9C46A] text-[#3C342D] px-6 py-2 rounded-lg hover:bg-[#E9B84A] transition-colors"
              >
                Salvar Configurações
              </button>
            </form>
          ) : (
            <form onSubmit={handlePWASettingsSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Cor do Tema</label>
                  <input
                    type="color"
                    value={settings.pwa_settings?.theme_color || '#E5D5B7'}
                    onChange={(e) => setSettings({
                      ...settings,
                      pwa_settings: {
                        ...settings.pwa_settings,
                        theme_color: e.target.value
                      }
                    })}
                    className="w-full p-2 border rounded-lg h-10"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Cor de Fundo</label>
                  <input
                    type="color"
                    value={settings.pwa_settings?.background_color || '#E5D5B7'}
                    onChange={(e) => setSettings({
                      ...settings,
                      pwa_settings: {
                        ...settings.pwa_settings,
                        background_color: e.target.value
                      }
                    })}
                    className="w-full p-2 border rounded-lg h-10"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#E9C46A] text-[#3C342D] px-6 py-2 rounded-lg hover:bg-[#E9B84A] transition-colors"
              >
                Salvar Configurações PWA
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}