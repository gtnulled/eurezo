import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

interface Prayer {
  id: string;
  title: string;
  content: string;
}

export function Home() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [selectedPrayer, setSelectedPrayer] = useState('');
  const [greeting, setGreeting] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritePrayers, setFavoritePrayers] = useState<Prayer[]>([]);

  useEffect(() => {
    loadPrayers();
    updateGreeting();
    loadFavorites();
    
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const favoritesList = prayers.filter(prayer => favorites.includes(prayer.id));
    setFavoritePrayers(favoritesList);
  }, [favorites, prayers]);

  function updateGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Bom dia, tenha um dia abençoado');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde, tenha uma tarde abençoada');
    } else {
      setGreeting('Boa noite, tenha uma noite abençoada');
    }
  }

  async function loadPrayers() {
    const { data } = await supabase
      .from('prayers')
      .select('*')
      .order('position');
    setPrayers(data || []);
  }

  function loadFavorites() {
    const savedFavorites = localStorage.getItem('favoritePrayers');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }

  function toggleFavorite(prayerId: string) {
    setFavorites(prev => {
      const newFavorites = prev.includes(prayerId)
        ? prev.filter(id => id !== prayerId)
        : [...prev, prayerId];
      
      localStorage.setItem('favoritePrayers', JSON.stringify(newFavorites));
      
      toast.success(
        prev.includes(prayerId)
          ? 'Oração removida dos favoritos'
          : 'Oração adicionada aos favoritos'
      );
      
      return newFavorites;
    });
  }

  function handlePrayerClick(prayerId: string) {
    setSelectedPrayer(prev => prev === prayerId ? '' : prayerId);
  }

  const selectedPrayerContent = prayers.find((p) => p.id === selectedPrayer);

  return (
    <div className="flex-1 bg-[#E5D5B7] py-6 sm:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-xl p-4 sm:p-8 max-w-2xl mx-auto shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#3C342D] mb-4">
            {greeting}!
          </h1>
          <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
            Selecione a oração que deseja rezar.
          </p>
          <select
            value={selectedPrayer}
            onChange={(e) => setSelectedPrayer(e.target.value)}
            className="w-full p-2 sm:p-3 bg-[#E9C46A] rounded-lg text-[#3C342D] cursor-pointer text-sm sm:text-base"
          >
            <option value="">Selecione uma oração</option>
            {prayers.map((prayer) => (
              <option key={prayer.id} value={prayer.id}>
                {prayer.title}
              </option>
            ))}
          </select>

          {favoritePrayers.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#3C342D] mb-3">Orações Favoritas</h2>
              <div className="space-y-2">
                {favoritePrayers.map(prayer => (
                  <button
                    key={prayer.id}
                    onClick={() => handlePrayerClick(prayer.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedPrayer === prayer.id
                        ? 'bg-[#E9C46A] text-[#3C342D]'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {prayer.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedPrayerContent && (
            <div className="mt-6 p-4 sm:p-6 bg-[#F5ECD7] rounded-xl border-2 border-[#E9C46A] shadow-lg">
              <div className="flex justify-between items-center mb-4 border-b-2 border-[#E9C46A] pb-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#3C342D] text-center flex-grow">
                  {selectedPrayerContent.title}
                </h2>
                <button
                  onClick={() => toggleFavorite(selectedPrayerContent.id)}
                  className="ml-4 p-2 rounded-full hover:bg-[#E9C46A] transition-colors"
                  aria-label={
                    favorites.includes(selectedPrayerContent.id)
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"
                  }
                >
                  <Heart
                    size={24}
                    className={favorites.includes(selectedPrayerContent.id) ? "fill-current" : ""}
                  />
                </button>
              </div>
              <div
                className="prayer-content"
                dangerouslySetInnerHTML={{ __html: selectedPrayerContent.content }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}