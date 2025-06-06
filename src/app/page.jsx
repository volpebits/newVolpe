export default function Home() {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Bem-vindo ao Meu Site
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Um site incrível feito com Next.js e Tailwind CSS
                </p>
            </section>

            {/* Cards de destaque */}
            <section className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3 text-blue-600">🎮 Jogos</h2>
                    <p className="text-gray-600">
                        Descubra os melhores jogos e reviews completos
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3 text-green-600">📰 Notícias</h2>
                    <p className="text-gray-600">
                        Fique por dentro das últimas novidades
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-3 text-purple-600">ℹ️ Sobre</h2>
                    <p className="text-gray-600">
                        Conheça mais sobre nosso projeto
                    </p>
                </div>
            </section>
        </div>
    )
}