import '../styles/globals.css'
import Header from './components/Header'
import { ThemeProvider } from './components/ThemeContext'
import Rybena from './components/libras'

export const metadata = {
    title: 'Meu Site',
    description: 'Site criado com Next.js e Tailwind CSS',
}

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR" suppressHydrationWarning={true}>
            <body suppressHydrationWarning={true}>
                <ThemeProvider>
                    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                        <Header />
                        <main className="mx-auto">
                            {children}
                        </main>
                    </div>
                    <Rybena />
                </ThemeProvider>
            </body>
        </html>
    )
}