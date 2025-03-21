import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpingHand as PrayingHands } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-[#E5D5B7] py-6 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl p-8 max-w-lg mx-auto text-center shadow-lg">
          <PrayingHands className="mx-auto mb-6 text-[#503d2e]" size={64} />
          <h1 className="text-4xl font-bold text-[#3C342D] mb-4">Página não encontrada</h1>
          <p className="text-gray-600 mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#E9C46A] text-[#3C342D] px-6 py-3 rounded-lg hover:bg-[#E9B84A] transition-colors inline-flex items-center gap-2"
          >
            Voltar para Início
          </button>
        </div>
      </div>
    </div>
  );
}