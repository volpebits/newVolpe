"use client";
import { useState, useRef, useEffect } from 'react';

export default function Games() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef(null);
  const seekBarRef = useRef(null);

  const handleVideoError = (e) => {
    console.error("Erro ao carregar vídeo:", e);
    if (e.target.error) {
      console.error("Código do erro:", e.target.error.code);
      console.error("Mensagem do erro:", e.target.error.message);
      
      // Códigos de erro do vídeo:
      // 1 = MEDIA_ERR_ABORTED - download foi abortado
      // 2 = MEDIA_ERR_NETWORK - erro de rede
      // 3 = MEDIA_ERR_DECODE - erro de decodificação
      // 4 = MEDIA_ERR_SRC_NOT_SUPPORTED - formato não suportado
      
      switch(e.target.error.code) {
        case 1:
          console.error("Download do vídeo foi abortado");
          break;
        case 2:
          console.error("Erro de rede - vídeo não encontrado");
          break;
        case 3:
          console.error("Erro de decodificação do vídeo");
          break;
        case 4:
          console.error("Formato do vídeo não suportado ou arquivo não encontrado");
          break;
        default:
          console.error("Erro desconhecido");
      }
    }
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

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      console.log("Vídeo carregado! Duração:", videoRef.current.duration);
      console.log("Ready state:", videoRef.current.readyState);
      console.log("Network state:", videoRef.current.networkState);
      setDuration(videoRef.current.duration);
      videoRef.current.loop = false;
    }
  };

  // Função para verificar duração periodicamente
  const checkDuration = () => {
    if (videoRef.current && videoRef.current.duration && duration === 0) {
      console.log("Duração encontrada:", videoRef.current.duration);
      setDuration(videoRef.current.duration);
    }
  };

  // Verifica duração a cada segundo se ainda não foi carregada
  useEffect(() => {
    const interval = setInterval(() => {
      checkDuration();
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const handleSeek = (e) => {
    e.preventDefault();
    if (!videoRef.current || duration === 0) return;

    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;

    try {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } catch (error) {
      console.error("Erro ao navegar no vídeo:", error);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const updateVideoTime = (clientX) => {
    if (!seekBarRef.current || duration === 0) return;

    const rect = seekBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newTime = pos * duration;

    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    // Atualiza imediatamente quando começar a arrastar
    updateVideoTime(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      updateVideoTime(e.clientX);
    }
  };

  const handleMouseUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      // Garantir que a posição final seja definida
      updateVideoTime(e.clientX);
    }
  };

  // Efeito para adicionar/remover listeners de mouse globais
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => {
        e.preventDefault();
        updateVideoTime(e.clientX);
      };

      const handleGlobalMouseUp = (e) => {
        setIsDragging(false);
        updateVideoTime(e.clientX);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, duration]);

  return (
    <div>
      <main className="min-h-screen bg-gradient-to-r  from-white to-purple-300 text-purple-800 dark:bg-gradient-to-br dark:from-black dark:via-purple-700 dark:to-purple-950 flex flex-col items-center justify-center gap-10 p-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6 text-purple-800 dark:text-green-500 leading-tight">
            HellClock: Reescreva a História na Guerra de Canudos
          </h1>
          <p className="text-2xl mb-10 text-purple-800 dark:text-white leading-relaxed font-sans">
            Mergulhe em um ARPG roguelite desafiador que combina ação intensa e narrativa envolvente.
          </p>
        </div>

        <div className="w-full max-w-4xl h-[500px] rounded-[20px] overflow-hidden shadow-xl border-4 border-black bg-black relative group">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            onError={handleVideoError}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={() => {
              console.log("Dados do vídeo carregados");
              checkDuration();
            }}
            onCanPlay={() => {
              console.log("Vídeo pode ser reproduzido");
              checkDuration();
            }}
            onDurationChange={() => {
              console.log("Duração mudou:", videoRef.current?.duration);
              checkDuration();
            }}
          >
            {/* Teste com vídeo público primeiro */}
            <source src="roguesnail_54358480" type="video/mp4" />
            {/* Seus caminhos originais */}
            <source src="/video/roguesnail_54358480.mp4" type="video/mp4" />
            <source src="./video/roguesnail_54358480.mp4" type="video/mp4" />
            <source src="video/roguesnail_54358480.mp4" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>

          {/* Controles do vídeo */}
          <div className="absolute bottom-4 left-4 right-4">
            {/* Botões de controle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={togglePlay}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-lg transition-all duration-200"
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleMute}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-lg transition-all duration-200"
              >
                {isMuted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Barra de progresso */}
            <div>
              <div
                ref={seekBarRef}
                className="w-full h-3 bg-gray-600 bg-opacity-50 rounded-full cursor-pointer hover:bg-opacity-70 transition-all duration-200 relative select-none"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 pointer-events-none"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
                {/* Indicador circular arrastável */}
                <div
                  className={`absolute top-1/2 w-4 h-4 bg-white rounded-full transform -translate-y-1/2 -translate-x-1/2 shadow-lg cursor-grab ${isDragging ? 'cursor-grabbing scale-110' : 'hover:scale-105'} transition-transform duration-150 z-10`}
                  style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  onMouseDown={handleMouseDown}
                ></div>
              </div>
              <div className="flex justify-between text-white text-sm mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* História do Hell Clock */}
      <div className="min-h-screen bg-gradient-to-r from-purple-400 to-purple-600 dark:bg-gradient-to-br dark:from-black flex items-center px-8 py-16">
        <div className="max-w-6xl mx-auto flex items-center gap-12">
          {/* Texto à esquerda */}
          <div className="text-3xl md:text-lg lg:text-2xl flex-1 font-bold text-black dark:text-white">
            <p className="leading-relaxed mb-6">
              Em Hell Clock, você assume o papel de Pajeú, um ex-escravo e guerreiro destemido, determinado a resgatar seu mentor, Antônio Conselheiro, das forças sobrenaturais que assolam a região. Este jogo oferece uma experiência única ao combinar elementos de ARPG com mecânicas de roguelite, proporcionando combates intensos e desafiadores.
            </p>
            <p className="leading-relaxed">
              Com uma narrativa profunda ambientada em uma versão sombria da Guerra de Canudos, os jogadores enfrentarão demônios e criaturas místicas enquanto exploram masmorras traiçoeiras. A dublagem em português e a riqueza de detalhes culturais tornam Hell Clock uma jornada imperdível para os fãs de ação e história.
            </p>
          </div>

          {/* Imagem à direita */}
          <div className="flex-shrink-0">
            <img
              src="/images/frame-games.webp"
              alt="Personagem Hell Clock"
              className="w-80 h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-lg lg:text-5xl min-h-screen bg-white text-purple-700 dark:bg-gradient-to-br dark:from-black dark:via-purple-700 dark:to-purple-950 font-bold p-20 mt-[-130px] dark:text-green-500">
        <h1 className="text-center mt-[-30px]">
          Explore também outros trabalhos incríveis!
        </h1>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 rounded-lg">
          <a href="https://www.horizonchaseturbo.com/pt-br">
          <img src="/images/Horizon Chase Turbo.webp" alt="" className="w-full max-w-[700px] h-auto p-10 mx-auto " />
          </a>
          <a href="https://blog.studiominiboss.com/games/outtheresomewhere.html">
          <img src="/images/download (12).webp" alt="" className="w-full max-w-[700px] h-auto p-10 mx-auto" />
          </a>
          <a href="https://www.bombservice.com">
          <img src="/images/momodora.webp" alt="" className="w-full max-w-[700px] h-auto p-10 mx-auto" />
          </a>
          <a href="https://alendadoheroi.com.br">
          <img src="/images/a-lenda-do-héroi.webp" alt="" className="w-full max-w-[700px] h-auto p-10 mx-auto" />
          </a>
          <a href="https://www.bombservice.com">
          <img src="/images/minoria.webp" alt="" className="w-full max-w-[700px] h-auto p-10 mx-auto" />
          </a>
          <a href="https://www.coffeeaddictstudio.com">
          <img src="/images/hazel.webp" alt="" className="w-full max-w-[700px] h-auto p-10 mx-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}