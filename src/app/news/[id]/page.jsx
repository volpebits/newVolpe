import Link from 'next/link';
import noticias from '@/data/news';



export function generateStaticParams() {
    return noticias.map((_, index) => ({ id: index.toString() }));
}

export default function NewsDetail({ params }) {
    const id = parseInt(params.id);
    const noticia = noticias[id];

    if (!noticia) {
        return (
            <main className="bg-black text-white min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-xl">Notícia não encontrada.</p>
            </main>
        );
    }

    return (
        <main className="  min-h-screen p-4 bg-gradient-to-br from-slate-200 via-purple-400 to-purple-950 dark:bg-gradient-to-br dark:from-black dark:via-purple-500 dark:to-purple-950 ">
            <div className="max-w-3xl mx-auto">
                <img src={noticia.imagem} alt={noticia.titulo} className="w-full rounded mb-6" />
                <h1 className="text-2xl font-bold mb-4 text-purple-800 dark:text-green-500">{noticia.titulo}</h1>
                <div className=" text-black dark:text-white p-6 rounded shadow mb-6">
                    {noticia.texto.split('\n').map((par, i) => (
                        <p key={i} className="mb-4 text-justify">{par}</p>
                    ))}
                </div>

                {/* Botão Voltar */}
                <Link href="/news">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Voltar
                    </button>
                </Link>
            </div>
        </main>
    );
}
