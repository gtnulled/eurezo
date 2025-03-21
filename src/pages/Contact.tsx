import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

export function Contact() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const email = "guthierresc@hotmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      toast.success('Email copiado!');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex-1 bg-[#E5D5B7] py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl p-4 sm:p-8 max-w-2xl mx-auto shadow-lg">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-[#3C342D] hover:text-[#503d2e] transition-colors"
          >
            ← Voltar
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#3C342D] mb-6">
            Entre em Contato
          </h1>
          
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-gray-600 mb-4">
                Tem sugestões de orações, dúvidas ou elogios? Ficaremos felizes em ouvir você!
                Entre em contato através do email abaixo.
              </p>
            </div>

            <div className="bg-[#F5ECD7] p-6 rounded-xl border-2 border-[#E9C46A]">
              <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Mail size={20} className="text-[#3C342D]" />
                  <span className="font-mono text-sm sm:text-base break-all">
                    {email}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`p-2 rounded-lg transition-colors ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-[#E9C46A] text-[#3C342D] hover:bg-[#E9B84A]'
                  }`}
                  aria-label="Copiar email"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Responderemos sua mensagem o mais breve possível.</p>
              <p>Agradecemos seu contato!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}