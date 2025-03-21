import React from 'react';
import { useNavigate } from 'react-router-dom';

export function TermsOfUse() {
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
          
          <h1 className="text-3xl font-bold text-[#3C342D] mb-6">Termos de Uso</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">1. Aceitação dos Termos</h2>
              <p>Ao acessar e usar o EuRezo, você concorda com estes termos de uso. Se você não concordar com qualquer parte destes termos, por favor, não use nosso site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">2. Uso do Serviço</h2>
              <p>O EuRezo é um site de orações destinado ao uso pessoal e não comercial. Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">3. Propriedade Intelectual</h2>
              <p>Todo o conteúdo disponível no EuRezo, incluindo textos, imagens, orações e elementos gráficos, é protegido por direitos autorais e outras leis de propriedade intelectual.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">4. Limitação de Responsabilidade</h2>
              <p>O EuRezo não se responsabiliza por quaisquer danos diretos, indiretos, incidentais ou consequenciais resultantes do uso ou incapacidade de usar nossos serviços.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">5. Modificações dos Termos</h2>
              <p>Reservamos o direito de modificar estes termos a qualquer momento. As modificações entram em vigor imediatamente após sua publicação no site.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#3C342D] mb-3">6. Legislação Aplicável</h2>
              <p>Estes termos são regidos pelas leis da República Federativa do Brasil.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}