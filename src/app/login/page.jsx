'use client';
import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

export default function SlidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all duration-300 ease-in-out font-poppins"
      >
        Login
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      <div
        className={`fixed inset-0 z-50 flex transform transition-transform duration-500 ease-in-out font-poppins ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className="w-1/2 hidden md:block bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Painel de login */}
      <div className="relative w-full md:w-1/2 bg-white h-screen flex flex-col px-6 py-16 shadow-xl overflow-y-auto">
  {/* Botão "X" no topo direito */}
  <button
    onClick={() => setIsOpen(false)}
    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
  >
    <X size={20} />
  </button>

  <div className="w-full max-w-md mx-auto mt-10 space-y-10 animate-fade-in">
    {/* Cabeçalho */}
    <div>
      <h2 className="text-3xl font-bold text-green-500">Log in</h2>
      <p className="text-sm text-gray-600 mt-2">
        Novo por aqui?{' '}
        <a
          href="#"
          className="text-green-500 hover:underline transition-all duration-200"
        >
          Faça seu cadastro gratuitamente!
        </a>
      </p>
    </div>

    {/* Formulário */}
    <form className="space-y-6">
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Endereço de e-mail
        </label>
        <input
          type="email"
          placeholder="seu@email.com"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Senha</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            className="w-full border border-gray-300 px-4 py-3 pr-10 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-400 to-green-700 text-white py-4 rounded-full mt-6 transition-all duration-300 hover:scale-105 hover:shadow-md"
      >
        Entrar
      </button>
    </form>
  </div>
</div>
      </div>
    </>
  );
}
