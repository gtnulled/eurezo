import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white py-4 sm:py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 mb-3 sm:mb-4 text-[9px]">
          Criado por:{' '}
          <a 
            href="https://instagram.com/guthierresc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-[#b38f2d] transition-colors"
          >
            Sem.Guthierres
          </a>{' '}
          - Diocese de São Miguel Paulista SP - 2025
        </p>
        <div className="flex flex-row justify-center items-center gap-2 sm:gap-4 text-gray-600 text-[9px]">
          <Link to="/termos-de-uso" className="hover:text-gray-800 transition-colors">
            Termos de Uso
          </Link>
          <span className="inline">•</span>
          <Link to="/privacidade" className="hover:text-gray-800 transition-colors">
            Política de Privacidade
          </Link>
          <span className="inline">•</span>
          <Link to="/contato" className="hover:text-gray-800 transition-colors">
            Contato
          </Link>
          <span className="inline">•</span>
          <Link to="/oferta" className="hover:text-gray-800 transition-colors">
            Oferta
          </Link>
        </div>
      </div>
    </footer>
  );
}