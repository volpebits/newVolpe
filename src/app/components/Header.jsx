'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/games', label: 'Jogos' },
        { href: '/news', label: 'Notícias' },
        { href: '/about', label: 'Sobre' }
    ]

    return (
        <header className="bg-white shadow-md border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-3xl font-bold text-purple-800">
                            Volpe
                        </Link>
                    </div>

                    {/* Links de navegação */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === link.href
                                            ? 'bg-purple-100 text-purpçe-700'
                                            : 'text-purple-600 hover:text-purple-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Menu mobile (botão hamburger) */}
                    <div className="md:hidden">
                        <button className="text-gray-600 hover:text-blue-600">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}