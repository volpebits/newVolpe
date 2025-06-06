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
        { href: '/about', label: 'Sobre' },
        { href: '/login', label: 'Login'}
    ]

    return (
        <header className="bg-white shadow-md border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo com imagem */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/icons/logo2.png"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="rounded"
                            />
                            <span className="text-2xl font-bold text-blue-600">
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
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Botão Menu Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:text-blue-600 hover:bg-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}