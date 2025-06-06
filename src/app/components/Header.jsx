'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/games', label: 'Jogos' },
        { href: '/news', label: 'Notícias' },
        { href: '/about', label: 'Sobre' }
    ]

    return (
        <header className="bg-purple-950 shadow-md border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo com imagem */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/icons/logo2.png"
                                alt="Logo"
                                width={48}
                                height={48}
                                className="rounded"
                            />
                            <span className="text-3xl font-bold text-green-500">
                                Volpe
                            </span>
                        </Link>
                    </div>

                    {/* Links de navegação - Desktop */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href
                                        ? ' text-green-500 border-2'
                                        : 'text-white hover:text-green-60'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Botão de Login */}
                    <div class="login hidden md:block">
                        <button onClick={""} class="cursor-pointer text-dark font-bold bg-green-500 hover:bg-green-200 px-5 py-1 rounded-3xl" >Login</button>
                    </div>


                    {/* Botão Menu Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-green-500 focus:outline-none"
                        >
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Menu Mobile */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-md mt-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === link.href
                                        ? 'bg-green-200 text-black'
                                        : 'text-black hover:bg-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <button onClick={""} class="cursor-pointer text-dark font-bold bg-green-500 hover:bg-green-200 px-5 py-1 rounded-3xl" >Login</button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}