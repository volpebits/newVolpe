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
       Registrar-se
      </button>

      {/* Overlay com blur e click para fechar */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* Painel deslizante */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-1/2 max-w-md bg-[#111111] text-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-9 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-green-500">Crie uma conta</h2>
            <p className="text-sm text-gray-400 mt-1">
              Já possui uma conta?{' '}
              <a href="#" className="text-green-500 hover:underline">
                Faça o Log-in!
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
        <div className="px-5">
          <form className="space-y-12">
            <div>
              <label className="block text-sm text-gray-300 mb-4">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full bg-zinc-800 text-white border border-zinc-700 px-4 py-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-4">Endereço de e-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-zinc-800 text-white border border-zinc-700 px-4 py-2 rounded placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Campo de senha */}
      <div>
        <label className="block text-sm text-gray-300 mb-4">Senha</label>
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
        <p className="text-xs text-gray-500 mt-1">
          Use 8 ou mais caracteres com pelo menos uma letra maiúscula, minúscula, número e símbolo.
        </p>
      </div>

            {/* Termos */}
            <p className="text-xs text-gray-400">
              Ao criar uma conta, você concorda com os nossos{' '}
              <a href="#" className="text-green-500 underline">Termos de uso</a> e{' '}
              <a href="#" className="text-green-500 underline">Política de Privacidade</a>.
            </p>

           {/* Simulando reCAPTCHA com checkbox */}
<div
  onClick={() => setIsChecked(!isChecked)}
  className="bg-white p-3 rounded shadow flex items-center justify-between cursor-pointer"
>
  <label className="flex items-center space-x-2 text-black text-sm">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
      className="form-checkbox w-4 h-4 text-green-500 border-gray-400 rounded"
    />
    <span>Eu não sou um robô</span>
  </label>
  
</div>


            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-500 text-white py-2 rounded-full mt-2 transition"
            >
              Crie sua conta!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
