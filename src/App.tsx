import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminPanel } from './pages/AdminPanel';
import { TermsOfUse } from './pages/TermsOfUse';
import { Privacy } from './pages/Privacy';
import { Donation } from './pages/Donation';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { InstallButton } from './components/InstallButton';
import { supabase } from './lib/supabase';

const FontSizeContext = createContext({
  fontSize: 16,
  setFontSize: (size: number) => {}
});

export const useFontSize = () => useContext(FontSizeContext);

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [siteSettings, setSiteSettings] = useState({
    site_name: 'EuRezo',
    site_description: 'Orações Católicas',
    logo_url: null,
    og_image_url: null,
    meta_title: null,
    meta_description: null,
    pwa_settings: {
      theme_color: '#E5D5B7',
      background_color: '#E5D5B7'
    }
  });

  useEffect(() => {
    loadSiteSettings();
  }, []);

  async function loadSiteSettings() {
    const { data } = await supabase
      .from('site_settings')
      .select('*')
      .single();
    
    if (data) {
      setSiteSettings(data);
      updateMetaTags(data);
    }
  }

  function updateMetaTags(settings: any) {
    document.title = settings.meta_title || `${settings.site_name} - ${settings.site_description}`;
    
    const metaTags = {
      'description': settings.meta_description || settings.site_description,
      'theme-color': settings.pwa_settings?.theme_color || '#E5D5B7',
      'apple-mobile-web-app-title': settings.site_name,
      'application-name': settings.site_name
    };

    Object.entries(metaTags).forEach(([name, content]) => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });

    const ogTags = {
      'og:type': 'website',
      'og:site_name': settings.site_name,
      'og:title': settings.meta_title || `${settings.site_name} - ${settings.site_description}`,
      'og:description': settings.meta_description || settings.site_description,
      'og:image': settings.og_image_url,
      'og:url': window.location.href,
      'twitter:card': 'summary_large_image',
      'twitter:title': settings.meta_title || `${settings.site_name} - ${settings.site_description}`,
      'twitter:description': settings.meta_description || settings.site_description,
      'twitter:image': settings.og_image_url
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      if (!content) return;
      
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
  }

  const handleFontSizeChange = (increment: boolean) => {
    setFontSize(prev => {
      const newSize = increment ? prev + 2 : prev - 2;
      return Math.min(Math.max(newSize, 12), 24);
    });
    
    document.documentElement.style.setProperty('--prayer-font-size', `${fontSize}px`);
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#E5D5B7]">
          <Header 
            onFontSizeChange={handleFontSizeChange}
            siteName={siteSettings.site_name}
            logoUrl={siteSettings.logo_url}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/painel-de-controle" element={<AdminPanel />} />
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/oferta" element={<Donation />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <InstallButton />
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </FontSizeContext.Provider>
  );
}

export default App;