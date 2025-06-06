'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Ícones de olho

export default function SlidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Botão para abrir o painel */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-500 transition"
      >
       Login
      </button>

      {/* Overlay com blur e click para fechar */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* Painel deslizante */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-1/2 max-w-md bg-[#0f0f0f] text-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-green-500">Log in</h2>
            <p className="text-sm text-gray-400 mt-1">
              Novo por aqui?{' '}
              <a href="#" className="text-green-500 hover:underline">
               Faça seu cadastro gratuitamente!
              </a>
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-red-500 text-4xl"
          >
            &times;
          </button>
        </div>

        {/* Formulário */}
        <div className="px-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-00 mb-1">Endereço de e-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-zinc-800 text-white border border-zinc-700 px-4 py-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Campo de senha */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">Senha</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            className="w-full bg-zinc-800 text-white border border-zinc-700 px-4 py-2 pr-10 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
  
      </div>
            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-500 text-white py-2 rounded-full mt-2 transition"
            >
             Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
