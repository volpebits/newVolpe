import Image from 'next/image'

export default function About() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-purple-400 to-purple-950 dark:from-black dark:via-purple-500 dark:to-purple-950 px-4">
            <div className="max-w-screen-xl w-full mx-auto flex flex-col items-center space-y-10 text-center py-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-purple-950 dark:text-green-500">
                    Um projeto independente e nacional
                </h1>

                <p className="text-base sm:text-lg md:text-xl max-w-4xl text-white dark:text-white text-justify">
                    Somos mais do que uma plataforma de jogos — somos um movimento. Nosso projeto nasceu da paixão pelos games e do desejo de fortalecer a cena gamer nacional, oferecendo um palco exclusivo para jogos desenvolvidos por talentos brasileiros. Acreditamos que o Brasil é um berço de criatividade, onde cada jogo carrega não apenas códigos e gráficos, mas também histórias, culturas e sonhos. Aqui, criadores independentes ganham voz, e jogadores têm a oportunidade de explorar mundos inéditos, repletos de identidade e inovação. Queremos conectar quem cria com quem joga, construindo uma ponte sólida para um mercado nacional cada vez mais forte e reconhecido. A cada clique, a cada novo lançamento, estamos impulsionando o futuro dos games no Brasil — e você faz parte disso.
                    <br /><br />
                    <strong>Jogue nacional. Apoie local. Cresça global.</strong>
                </p>

                <Image
                    src="/images/avatares.webp"
                    alt="Avatares"
                    width={350}
                    height={350}
                    className="w-full max-w-[350px] h-auto"
                />
            </div>
        </div>
    )
}
