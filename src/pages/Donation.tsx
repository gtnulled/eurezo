import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

export function Donation() {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const pixKey = "00020126450014BR.GOV.BCB.PIX0123guthierresc@hotmail.com5204000053039865802BR5901N6001C62160512doacaoeurezo6304505E";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey).then(() => {
      setCopied(true);
      toast.success('Chave PIX copiada!');
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
            Faça uma Oferta
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-gray-600 mb-4">
              Sua contribuição ajuda a manter e melhorar o EuRezo.
              Agradecemos sua generosidade! Copie e cole o link no App do seu banco, digite o valor da oferta e confirme.
            </p>
          </div>

          <div className="bg-[#F5ECD7] p-6 rounded-xl border-2 border-[#E9C46A] mb-8">
            <h2 className="text-xl font-semibold text-[#3C342D] mb-4">
              Link para pagamento direto com PIX
            </h2>
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
              <code className="flex-1 font-mono text-sm break-all">
                {pixKey}
              </code>
              <button
                onClick={handleCopy}
                className={`p-2 rounded-lg transition-colors ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-[#E9C46A] text-[#3C342D] hover:bg-[#E9B84A]'
                }`}
                aria-label="Copiar chave PIX"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Caso queira nos enviar sugestões envie um e-mail para:</p>
            <a
              href="mailto:guthierresc@hotmail.com"
              className="text-[#b38f2d] hover:text-[#8f722d] transition-colors"
            >
              guthierresc@hotmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}