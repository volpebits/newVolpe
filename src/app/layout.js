import '../styles/globals.css'
import Header from './components/Header'

export const metadata = {
    title: 'Meu Site',
    description: 'Site criado com Next.js e Tailwind CSS',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body className="min-h-screen bg-gray-50">
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </body>
        </html>
    )
}