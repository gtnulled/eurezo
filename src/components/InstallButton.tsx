import React, { useEffect, useState } from 'react';

export function InstallButton() {
  const [showIOSInstall, setShowIOSInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Handle iOS detection
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS && !window.navigator.standalone) {
      setShowIOSInstall(true);
    }

    // Check if app is installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
    });
  }, []);

  if (isInstalled) return null;

  if (showIOSInstall) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white p-4 rounded-lg shadow-lg max-w-sm text-center">
        <p className="text-[#3C342D] mb-2">
          Para instalar o EuRezo no seu iPhone:
        </p>
        <ol className="text-sm text-gray-600 text-left space-y-1 mb-3">
          <li>1. Toque no botão compartilhar <span className="inline-block w-6 h-6 align-middle bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYUlEQVR4nO2ZQU7DMBBFv1HVA7QcgEUlWHMGGm7QI3TJMeAMSGxhAYeAA1B6gEoc4K9wEkVuUhI7M3YS9CRLkRzN/L/jGXscQBAEQRAEQegPA8AEwA7AHkDFrL3/ZgJgqNVkBuCduSjr9QYwUzEeKxRf+q5CC+YA3gCcABx9nQA8A5gZ5voB4OJxjOUFwNAgbwjgKSOmzTm0rIQV8gXfWuRe+fEhI/8ewE9G/I9//hQj/xnAOSP/7J8/xsgXCoVCoVAoFAqFQqHQNK5QKBQKhUKhUCgUCoVCodBPh/EhRv5DQc6HmPxvAF8Z8V/++TFG/hzAISP/4J8/xsiXLIB1QfzaIveNWQDrxLNbizwb5AXwlBh7IuRf+7GU/AjqBsC3H0vJj6EWwMqPpeQPANwxFGC9AO58bMz8WKjb6AnUNyL2m9EVgGvtJm1voEdQN+ZU8WKh3+QvmtchCIIgCIIg/Hf+ALiXc4tBGQWJAAAAAElFTkSuQmCC')] bg-cover"></span></li>
          <li>2. Selecione "Adicionar à Tela de Início"</li>
          <li>3. Toque em "Adicionar"</li>
        </ol>
        <button 
          onClick={() => setShowIOSInstall(false)}
          className="text-sm text-[#b38f2d] hover:text-[#8f722d]"
        >
          Entendi
        </button>
      </div>
    );
  }

  return null;
}