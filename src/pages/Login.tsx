import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    } else {
      toast.success('Login realizado com sucesso!');
      navigate('/painel-de-controle');
    }
  }

  return (
    <div className="flex-1 bg-[#E5D5B7] py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center text-[#3C342D] mb-6">
            Login Administrativo
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#E9C46A] text-[#3C342D] p-2 rounded font-medium"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}