import Image from 'next/image'

export default function About() {
    return (
        <div className="container p-36 bg-gradient-to-br from-slate-200 via-purple-400 to-purple-950 dark:bg-gradient-to-br dark:from-black dark:via-purple-500 dark:to-purple-950 ">
            <div className='space-y-16'>
                <h1 className='text-6xl text-purple-950 dark:text-green-500 font-bold text-center'>Um projeto independente e nacional</h1>
                <p className='text-xl'>Somos mais do que uma plataforma de jogos — somos um movimento.
                    Nosso projeto nasceu da paixão pelos games e do desejo de fortalecer a cena gamer nacional, oferecendo um palco exclusivo para jogos desenvolvidos por talentos brasileiros. Acreditamos que o Brasil é um berço de criatividade, onde cada jogo carrega não apenas códigos e gráficos, mas também histórias, culturas e sonhos.
                    Aqui, criadores independentes ganham voz, e jogadores têm a oportunidade de explorar mundos inéditos, repletos de identidade e inovação. Queremos conectar quem cria com quem joga, construindo uma ponte sólida para um mercado nacional cada vez mais forte e reconhecido.
                    A cada clique, a cada novo lançamento, estamos impulsionando o futuro dos games no Brasil — e você faz parte disso.
                    Jogue nacional. Apoie local. Cresça global.</p>
            </div>
            <Image
                src="/images/avatares.webp"
                alt="Logo"
                width="350"
                height="350"
                className="pt-10">
            </Image>
        </div>
    )
}