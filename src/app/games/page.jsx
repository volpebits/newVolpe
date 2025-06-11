"use client";
import { useState, useRef } from 'react';

export default function Games() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleVideoError = (e) => {
    console.error("Erro ao carregar vídeo:", e);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div>
      <main className="min-h-screen bg-gradient-to-r from-white to-purple-300 text-purple-800 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-60">
        <div className="w-full max-w-[350px] h-[auto] lg:h-[700px] rounded-[20px] overflow-hidden shadow-xl border-4 border-black bg-black relative group">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            onError={handleVideoError}
          >
            <source src="/video/roguesnail_54358480.mp4" type="video/mp4" />
          </video>
          
          {/* Controles do vídeo */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              onClick={togglePlay}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-lg transition-all duration-200"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <button
              onClick={toggleMute}
              className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-lg transition-all duration-200"
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="max-w-lg text-left mt-[-360px]">
          <h1 className="text-5xl font-bold mb-6 text-purple-800 leading-tight">
            HellClock: Reescreva a História na Guerra de Canudos
          </h1>
          <p className="text-2xl mb-6 text-purple-800 leading-relaxed font-sans">
            Mergulhe em um ARPG roguelite desafiador que combina ação intensa e narrativa envolvente.
          </p>
        </div>
      </main>

      <div className="text-lg lg:text-2xl min-h-screen bg-gradient-to-r from-white to-purple-300 text-black font-bold flex p-40 mt-[-130px]">
        <h2 className="w-full">
          Em Hell Clock, você assume o papel de Pajeú, um ex-escravo e guerreiro destemido, determinado a resgatar seu mentor, Antônio Conselheiro, das forças sobrenaturais que assolam a região. Este jogo oferece uma experiência única ao combinar elementos de ARPG com mecânicas de roguelite, proporcionando combates intensos e desafiadores. Com uma narrativa profunda ambientada em uma versão sombria da Guerra de Canudos, os jogadores enfrentarão demônios e criaturas místicas enquanto exploram masmorras traiçoeiras. A dublagem em português e a riqueza de detalhes culturais tornam Hell Clock uma jornada imperdível para os fãs de ação e história.
        </h2>
        <img src="/images/frame-games.webp" alt="" className="w-full h-auto rounded self-end" />
      </div>

      <div className="flex flex-col items-center text-lg lg:text-5xl min-h-screen bg-white text-purple-700 font-bold p-40 mt-[-130px]">
        <h1 className="text-center mt-[-120px]">
          Explore também outros trabalhos incríveis!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg">
          <img src="/images/Horizon Chase Turbo.webp" alt="" className="w-[600px] h-auto p-10" />
          <img src="/images/download (12).webp" alt="" className="w-[525px] h-auto" />
          <img src="/images/momodora.webp" alt="" className="w-[605px] h-auto p-10" />
          <img src="/images/a-lenda-do-héroi.webp" alt="" className="w-[525px] h-auto" />
          <img src="/images/minoria.webp" alt="" className="w-[608px] h-auto p-10" />
          <img src="/images/hazel.webp" alt="" className="w-[530px] h-auto" />
        </div>
      </div>
    </div>
  );
}