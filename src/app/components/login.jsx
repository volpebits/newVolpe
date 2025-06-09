/*
 * Para usar a integração com Google, adicione no seu _document.js ou layout:
 * 
 * <Script src="https://accounts.google.com/gsi/client" />
 * 
 * E configure seu Google Client ID no Google Cloud Console:
 * 1. Vá para https://console.cloud.google.com/
 * 2. Crie um projeto ou selecione um existente
 * 3. Ative a Google Identity API
 * 4. Configure as credenciais OAuth 2.0
 * 5. Substitua "SEU_GOOGLE_CLIENT_ID" pelo seu Client ID real
 */

'use client';
import { useState } from 'react';
import { Eye, EyeOff, X, ArrowLeft } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function SlidePanel({ isOpen, setIsOpen }) {
    const [authMode, setAuthMode] = useState('login'); // 'login', 'register', 'forgot-password'
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const isLogin = authMode === 'login';
    const isRegister = authMode === 'register';
    const isForgotPassword = authMode === 'forgot-password';

    const handleForgotPassword = () => {
        setAuthMode('forgot-password');
    };

    const handleBackToLogin = () => {
        setAuthMode('login');
    };

    const getTitle = () => {
        if (isLogin) return 'Log in';
        if (isRegister) return 'Crie uma conta';
        if (isForgotPassword) return 'Recuperar senha';
    };

    const getButtonText = () => {
        if (isLogin) return 'Entrar';
        if (isRegister) return 'Crie sua conta!';
        if (isForgotPassword) return 'Enviar link de recuperação';
    };

    // Função para login com Google
    const handleGoogleLogin = async () => {
        try {
            // Aqui você implementaria a lógica do Google OAuth
            // Por exemplo, usando Google Identity Services
            if (window.google) {
                window.google.accounts.id.prompt();
            }
            console.log('Login com Google iniciado');
        } catch (error) {
            console.error('Erro no login com Google:', error);
        }
    };

    // Função para inicializar o Google Identity Services
    const initializeGoogleAuth = () => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: "SEU_GOOGLE_CLIENT_ID", // Substitua pelo seu Client ID
                callback: handleGoogleCallback,
            });
        }
    };

    // Callback do Google OAuth
    const handleGoogleCallback = (response) => {
        console.log('Google response:', response);
        // Aqui você processaria o token JWT retornado pelo Google
        // e faria a autenticação no seu backend
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                />
            )}

            {/* Painel deslizante */}
            <div
                className={`fixed inset-0 z-50 flex font-poppins transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Parte esquerda clicável */}
                <div
                    className="w-0 md:w-1/2 bg-black/30 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />

                {/* Conteúdo do painel */}
                <div className="relative w-full md:w-1/2 bg-white h-screen flex flex-col px-6 py-16 shadow-xl overflow-y-auto">
                    {/* Botão fechar */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                    >
                        <X size={20} />
                    </button>

                    {/* Cabeçalho */}
                    <div className="w-full max-w-md mx-auto mt-10 space-y-10 animate-fade-in">
                        <div className="flex items-center space-x-4">
                            {isForgotPassword && (
                                <button
                                    onClick={handleBackToLogin}
                                    className="text-gray-500 hover:text-gray-700 transition"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            <h2 className="text-3xl font-bold text-green-500">
                                {getTitle()}
                            </h2>
                        </div>
                        {isForgotPassword && (
                            <p className="text-gray-600 text-sm">
                                Digite seu e-mail e enviaremos um link para redefinir sua senha.
                            </p>
                        )}
                    </div>

                    {/* Formulário */}
                    <div className="w-full max-w-md mx-auto mt-10 space-y-10 animate-fade-in">
                        <form className="space-y-6">
                            {/* Campo Nome - apenas no registro */}
                            {isRegister && (
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Nome</label>
                                    <input
                                        type="text"
                                        placeholder="Seu nome"
                                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                    />
                                </div>
                            )}

                            {/* Campo E-mail - presente em todos os modos */}
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

                            {/* Campo Senha - não aparece na recuperação de senha */}
                            {!isForgotPassword && (
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
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {isRegister && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Use 8 ou mais caracteres com pelo menos uma letra maiúscula, minúscula,
                                            número e símbolo.
                                        </p>
                                    )}
                                    {isLogin && (
                                        <div className="w-full flex justify-end mt-2">
                                            <button
                                                type="button"
                                                onClick={handleForgotPassword}
                                                className="text-green-500 hover:underline transition-all duration-200 text-sm"
                                            >
                                                Esqueceu sua senha?
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* reCAPTCHA - apenas no registro */}
                            {isRegister && (
                                <>
                                    <ReCAPTCHA
                                        sitekey="6LeD-lkrAAAAAAH-MIkw8XQjvInNV5CEjwOKUd7c"
                                        onChange={(value) => setIsChecked(!!value)}
                                        className="mt-2"
                                    />
                                    <p className="text-xs text-gray-500">
                                        Ao criar uma conta, você concorda com os nossos{' '}
                                        <a href="#" className="text-green-500 underline">
                                            Termos de uso
                                        </a>{' '}
                                        e{' '}
                                        <a href="#" className="text-green-500 underline">
                                            Política de Privacidade
                                        </a>.
                                    </p>
                                </>
                            )}

                            {/* Botão principal */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-400 to-green-700 text-white py-4 rounded-full mt-4 transition-all duration-300 hover:scale-105 hover:shadow-md"
                            >
                                {getButtonText()}
                            </button>

                            {/* Divisor "OU" - apenas para login e registro */}
                            {!isForgotPassword && (
                                <div className="relative flex items-center justify-center">
                                    <div className="border-t border-gray-300 w-full"></div>
                                    <span className="bg-white px-4 text-gray-500 text-sm">OU</span>
                                    <div className="border-t border-gray-300 w-full"></div>
                                </div>
                            )}

                            {/* Botão Google - apenas para login e registro */}
                            {!isForgotPassword && (
                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-green-500 text-gray-700 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    {isLogin ? 'Entrar com Google' : 'Cadastrar com Google'}
                                </button>
                            )}

                            {/* Links de navegação - não aparecem na recuperação de senha */}
                            {!isForgotPassword && (
                                <div className="register">
                                    <p className="text-sm text-gray-600 text-center">
                                        {isLogin ? 'Novo por aqui?' : 'Já possui uma conta?'}{' '}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAuthMode((prev) =>
                                                    prev === 'login' ? 'register' : 'login'
                                                )
                                            }
                                            className="text-green-500 hover:underline transition-all duration-200"
                                        >
                                            {isLogin ? 'Faça seu cadastro gratuitamente!' : 'Faça o log-in!'}
                                        </button>
                                    </p>
                                </div>
                            )}

                            {/* Voltar ao login na tela de recuperação */}
                            {isForgotPassword && (
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        Lembrou da sua senha?{' '}
                                        <button
                                            type="button"
                                            onClick={handleBackToLogin}
                                            className="text-green-500 hover:underline transition-all duration-200"
                                        >
                                            Voltar ao login
                                        </button>
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}