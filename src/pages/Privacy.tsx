import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[#E5D5B7] py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 text-[#3C342D] hover:text-[#503d2e] transition-colors"
          >
            ← Voltar
          </button>
          
          <h1 className="text-3xl font-bold text-[#3C342D] mb-6">Política de Privacidade</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">1. Introdução</h2>
              <p>Esta Política de Privacidade descreve como o EuRezo trata as informações dos usuários, em conformidade com as diretrizes da Google Play e da Lei Geral de Proteção de Dados (LGPD) - Lei nº 13.709/2018.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">2. Dados Coletados</h2>
              <p>O EuRezo não coleta dados pessoais dos usuários. O aplicativo utiliza apenas arquivos armazenados no cache do dispositivo para garantir o funcionamento adequado do sistema de favoritos.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">3. Finalidade do Tratamento</h2>
              <p>Os dados armazenados no cache do dispositivo são utilizados exclusivamente para:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Manter o sistema de favoritos funcionando corretamente</li>
                <li>Garantir uma experiência de usuário satisfatória</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">4. Segurança dos Dados</h2>
              <p>O EuRezo não coleta, armazena ou compartilha dados pessoais. As informações mantidas no cache são controladas exclusivamente pelo dispositivo do usuário e não são transmitidas para terceiros.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">5. Contato</h2>
              <p>Para esclarecer dúvidas sobre esta política, entre em contato através da página de Contato.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}