'use client';
import Link from 'next/link';
import noticias from '@/data/news';
import NewsCarousel from '../components/NewsCarousel';


export default function NewsPage() {
    const principal = noticias[0];
    const outras = noticias.slice(1);

    return (
        <main className="bg-gradient-to-br from-slate-200 via-purple-400 to-purple-950 dark:bg-gradient-to-br dark:from-black dark:via-purple-500 dark:to-purple-950 text-white min-h-screen p-4">
            <NewsCarousel />
            <div className="max-w-6xl mx-auto ">

                {/* Notícia principal */}
                {/* <Link href={`/news/0`}>
                    <div className="mb-8 cursor-pointer">
                        <img src={principal.imagem} alt={principal.titulo} className="w-full rounded mb-4" />
                        <h1 className="text-2xl font-bold  text-purple-800 dark:text-green-500 leading-tight">{principal.titulo}</h1>
                        <p className=" text-black dark:text-white">{principal.texto.slice(0, 100)}...</p>
                        <span className="text-green-400 hover:underline">Ler mais</span>
                    </div>
                </Link> */}

                {/* Outras notícias */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {outras.map((noticia, i) => (
                        <div key={i + 1} className="bg-white text-black rounded p-2 hover:scale-105 transition">
                            <img src={noticia.imagem} className="h-28 w-full object-cover rounded" />
                            <p className="text-sm mt-2 font-semibold  text-black">{noticia.titulo}</p>
                            <Link href={`/news/${i + 1}`}>
                                <button className="mt-2 bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700">
                                    Ler mais
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-4">
                    <button className="text-green-400 hover:underline">Mostrar +</button>
                </div>
            </div>
        </main>
    );
}
