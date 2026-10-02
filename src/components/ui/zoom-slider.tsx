import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';

export interface ZoomSliderItem {
  id: string;
  tiktokId: string;
  tiktokUrl: string;
  videoSrc: string;
  poster: string;
  title?: string;
}

const MOMENTUM_FRICTION = 0.92;
const MIN_MOMENTUM = 0.1;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;

const lerp = (a: number, b: number, n: number): number => a + (b - a) * n;

// 6 videos de TikTok oficiales en HD con el video de Rótulos 3D (Pastelería) como primer video central por defecto
export const DEFAULT_9_16_VIDEOS_DATA: ZoomSliderItem[] = [
  {
    id: "video-1",
    tiktokId: "7461710876492434693",
    tiktokUrl: "https://www.tiktok.com/@misterrotulosquito/video/7461710876492434693",
    videoSrc: "/videos/video-1.mp4",
    poster: "/videos/video-1-cover.jpg",
    title: "Rótulos 3D - ¡No cometas estos errores y atrae a más clientes!"
  },
  {
    id: "video-5",
    tiktokId: "7509653199452720390",
    tiktokUrl: "https://www.tiktok.com/@misterrotulosquito/video/7509653199452720390",
    videoSrc: "/videos/video-5.mp4",
    poster: "/videos/video-5-cover.jpg",
    title: "¿Aún usas rótulos planos? Tu competencia ya está atrayendo más clientes con rótulos 3D con luz"
  },
  {
    id: "video-6",
    tiktokId: "7415661016119299333",
    tiktokUrl: "https://www.tiktok.com/@misterrotulosquito/video/7415661016119299333",
    videoSrc: "/videos/video-6.mp4",
    poster: "/videos/video-6-cover.jpg",
    title: "Letreros 3D para tu negocio con descuento"
  },
  {
    id: "video-2",
    tiktokId: "7587576347048824065",
    tiktokUrl: "https://www.tiktok.com/@misterrotulosquito/video/7587576347048824065",
    videoSrc: "/videos/video-2.mp4",
    poster: "/videos/video-2-cover.jpg"
  },
  {
    id: "video-3",
    tiktokId: "7584974602221194497",
    tiktokUrl: "https://www.tiktok.com/@misterrotulosquito/video/7584974602221194497",
    videoSrc: "/videos/video-3.mp4",
    poster: "/videos/video-3-cover.jpg"
  },
  {
    id: "video-4",
    tiktokId: "7525261653915602177",
    tiktokUrl: "https://www.tiktok.com/@misterrotulosquito/video/7525261653915602177",
    videoSrc: "/videos/video-4.mp4",
    poster: "/videos/video-4-cover.jpg"
  }
];

interface ZoomSliderCompProps {
  sliderData?: ZoomSliderItem[];
  title?: string;
  subheading?: string;
  size?: number;
}

export function ZoomSliderComp({
  sliderData = DEFAULT_9_16_VIDEOS_DATA,
  size = 1,
}: ZoomSliderCompProps) {
  const items = sliderData;
  const count = items.length;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const hasEnteredViewRef = useRef(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const isMobile = containerWidth < MOBILE_BREAKPOINT;
  const isTablet = containerWidth >= MOBILE_BREAKPOINT && containerWidth < TABLET_BREAKPOINT;

  const resolvedSize = Math.max(0.6, Number(size) || 1);

  let centerCardWidth = 349;
  let centerCardHeight = 620;
  let cardSpacing = 401;
  let sideScale = 0.85;

  if (isMobile) {
    // En móviles ajustamos el ancho y el espaciado para que las tarjetas laterales queden 100% dentro de la pantalla sin cortes
    centerCardWidth = Math.round(Math.min(215, Math.max(170, containerWidth * 0.52)) * resolvedSize);
    centerCardHeight = Math.round(centerCardWidth * (16 / 9));
    sideScale = 0.78;
    cardSpacing = Math.round(containerWidth * 0.27);
  } else if (isTablet) {
    centerCardHeight = Math.round(540 * resolvedSize);
    centerCardWidth = Math.round(centerCardHeight * (9 / 16));
    sideScale = 0.85;
    cardSpacing = Math.round(centerCardWidth * 1.08);
  } else {
    centerCardHeight = Math.round(620 * resolvedSize);
    centerCardWidth = Math.round(centerCardHeight * (9 / 16));
    sideScale = 0.85;
    cardSpacing = Math.round(centerCardWidth * 1.15);
  }

  const calculatedContainerHeight = centerCardHeight + (isMobile ? 80 : 100);

  const stateRef = useRef({
    current: 0,
    target: 0,
    raf: null as number | null,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Observador de visibilidad: detecta exactamente cuando el usuario llega a la sección de videos al hacer scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: [0, 0.05, 0.1, 0.25, 0.5],
        rootMargin: "80px 0px 80px 0px"
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Control de reproducción: el video arranca automáticamente y activa audio al estar visible
  useEffect(() => {
    videoRefs.current.forEach(async (video, i) => {
      if (!video) return;
      if (i === activeIndex && isInView) {
        if (!hasEnteredViewRef.current) {
          hasEnteredViewRef.current = true;
          try {
            video.currentTime = 0;
          } catch {
            // ignore
          }
        }
        try {
          video.muted = false;
          video.volume = 1;
          await video.play();
        } catch {
          // Si el navegador requiere interacción inicial antes de habilitar audio, reproduce inmediatamente
          video.muted = true;
          video.play().catch(() => {});
        }
      } else {
        video.muted = true;
        video.pause();
        if (!isInView) {
          hasEnteredViewRef.current = false;
        }
      }
    });
  }, [activeIndex, isInView]);

  // Activación automática de audio con el scroll del usuario al llegar a la sección
  useEffect(() => {
    const triggerAudioOnScroll = () => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight * 0.85 && rect.bottom > window.innerHeight * 0.15;
        if (inViewport && !isInView) {
          setIsInView(true);
        }
      }

      if (!isInView) return;
      const activeVideo = videoRefs.current[activeIndex];
      if (activeVideo) {
        if (activeVideo.paused) {
          activeVideo.currentTime = activeVideo.currentTime || 0;
          activeVideo.muted = false;
          activeVideo.volume = 1;
          const playPromise = activeVideo.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              activeVideo.muted = true;
              activeVideo.play().catch(() => {});
            });
          }
        } else if (activeVideo.muted) {
          activeVideo.muted = false;
          activeVideo.volume = 1;
        }
      }
    };

    window.addEventListener('scroll', triggerAudioOnScroll, { passive: true });
    window.addEventListener('wheel', triggerAudioOnScroll, { passive: true });
    window.addEventListener('touchmove', triggerAudioOnScroll, { passive: true });
    window.addEventListener('touchstart', triggerAudioOnScroll, { passive: true });
    window.addEventListener('mousemove', triggerAudioOnScroll, { passive: true });
    window.addEventListener('pointerdown', triggerAudioOnScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', triggerAudioOnScroll);
      window.removeEventListener('wheel', triggerAudioOnScroll);
      window.removeEventListener('touchmove', triggerAudioOnScroll);
      window.removeEventListener('touchstart', triggerAudioOnScroll);
      window.removeEventListener('mousemove', triggerAudioOnScroll);
      window.removeEventListener('pointerdown', triggerAudioOnScroll);
    };
  }, [activeIndex, isInView]);

  // Al cambiar activamente de índice, reiniciar el video seleccionado desde el principio
  useEffect(() => {
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      try {
        activeVideo.currentTime = 0;
      } catch {
        // ignore
      }
    }
  }, [activeIndex]);

  // Posicionamiento de tarjetas al centro y a los lados - ratio 9:16 exacto idéntico en PC y móvil
  const renderCards = useCallback((currentOffset: number) => {
    if (!containerRef.current || count === 0) return;

    const centerX = containerWidth / 2;
    const posY = (calculatedContainerHeight - centerCardHeight) / 2;

    for (let i = 0; i < count; i++) {
      const card = cardRefs.current[i];
      if (!card) continue;

      let diff = (i - currentOffset) % count;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;

      const dist = Math.abs(diff);

      const maxVisibleDist = isMobile ? 1.2 : 2.8;
      if (dist > maxVisibleDist) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform = `translate3d(-9999px, -9999px, 0)`;
        continue;
      }

      const scale = dist === 0 ? 1 : Math.max(sideScale, 1 - dist * (1 - sideScale));
      const opacity = dist === 0 ? 1 : Math.max(0.85, 1 - dist * 0.1);
      const zIndex = Math.round(50 - dist * 10);

      const posX = centerX + diff * cardSpacing - centerCardWidth / 2;

      card.style.width = `${centerCardWidth}px`;
      card.style.height = `${centerCardHeight}px`;
      card.style.zIndex = `${zIndex}`;
      card.style.opacity = `${opacity}`;
      card.style.pointerEvents = 'auto';
      card.style.transformOrigin = 'center center';
      card.style.transform = `translate3d(${posX}px, ${posY}px, 0) scale(${scale})`;
    }
  }, [calculatedContainerHeight, containerWidth, count, centerCardHeight, centerCardWidth, cardSpacing, sideScale, isMobile]);

  useEffect(() => {
    const state = stateRef.current;

    const tick = () => {
      // Interpolación suave y estática hacia el slide objetivo
      if (Math.abs(state.target - state.current) < 0.0005) {
        state.current = state.target;
      } else {
        state.current = lerp(state.current, state.target, 0.08);
      }

      const normalizedCurrent = ((state.current % count) + count) % count;
      const roundedIndex = Math.round(normalizedCurrent) % count;
      
      setActiveIndex((prev) => (prev !== roundedIndex ? roundedIndex : prev));
      renderCards(normalizedCurrent);

      state.raf = requestAnimationFrame(tick);
    };

    state.raf = requestAnimationFrame(tick);
    return () => {
      if (state.raf) cancelAnimationFrame(state.raf);
    };
  }, [count, renderCards]);

  const goToSlide = (index: number) => {
    const state = stateRef.current;
    const currentNormalized = ((state.current % count) + count) % count;
    let diff = index - currentNormalized;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;
    state.target = Math.round(state.current + diff);

    setActiveIndex(index);

    // Reproducir inmediatamente el video de la tarjeta seleccionada con sonido y desde 0:00
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        try {
          video.currentTime = 0;
        } catch {
          // ignore
        }
        video.muted = false;
        video.volume = 1;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      } else {
        video.muted = true;
        video.pause();
      }
    });
  };

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % count;
    goToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (activeIndex - 1 + count) % count;
    goToSlide(prevIndex);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/reels relative w-full select-none"
      style={{ height: `${calculatedContainerHeight}px` }}
    >
      {/* Flechas de Navegación Rojas con Blanco - Visibles limpiamente más afuera en los extremos */}
      <button
        onClick={prevSlide}
        aria-label="Video anterior"
        className="absolute -left-2 sm:-left-3 md:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-[#8C0000] hover:bg-white text-white hover:text-[#8C0000] border-2 border-white hover:border-[#8C0000] flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(140,0,0,0.45)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] active:scale-95 hover:scale-105 cursor-pointer opacity-100 sm:opacity-0 sm:group-hover/reels:opacity-100"
      >
        <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Siguiente video"
        className="absolute -right-2 sm:-right-3 md:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-50 w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-[#8C0000] hover:bg-white text-white hover:text-[#8C0000] border-2 border-white hover:border-[#8C0000] flex items-center justify-center transition-all duration-300 shadow-[0_8px_25px_rgba(140,0,0,0.45)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] active:scale-95 hover:scale-105 cursor-pointer opacity-100 sm:opacity-0 sm:group-hover/reels:opacity-100"
      >
        <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
      </button>

      {/* Escenario de Tarjetas Centradas con los Videos HD 9:16 */}
      <div className="absolute inset-0 overflow-hidden">
        {items.map((item, index) => {
          const isCenter = index === activeIndex;

          return (
            <div
              key={item.id || index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => {
                if (!isCenter) goToSlide(index);
              }}
              className={`absolute top-0 left-0 rounded-2xl overflow-hidden bg-black transition-shadow duration-300 ${
                isCenter
                  ? 'ring-2 ring-[#8C0000] shadow-[0_22px_60px_rgba(140,0,0,0.35)] cursor-default'
                  : 'ring-1 ring-slate-200 hover:ring-[#8C0000]/40 cursor-pointer shadow-lg hover:shadow-xl'
              }`}
              style={{
                willChange: 'transform, opacity',
              }}
            >
              {/* Contenedor del Video HD 9:16 */}
              <div className="relative w-full h-full bg-black overflow-hidden flex flex-col items-center justify-center">
                
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={item.videoSrc}
                  poster={item.poster}
                  loop
                  playsInline
                  autoPlay={isCenter}
                  preload="auto"
                  muted={!isCenter}
                  className="w-full h-full object-cover rounded-2xl pointer-events-none"
                />

                {/* Ícono de Reproducir central para identificar claramente que es un video */}
                {!isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/35 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 transform group-hover:scale-110">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Único botón flotante 'Ver en TikTok' */}
                {item.tiktokUrl && isCenter && (
                  <a
                    href={item.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/85 hover:bg-[#8C0000] border border-white/20 hover:border-[#8C0000] text-white text-[11px] sm:text-xs font-extrabold tracking-wide backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap pointer-events-auto"
                  >
                    <span>Ver en TikTok</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de Puntos Inferiores */}
      <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2 pointer-events-auto">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Ir al video ${i + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              i === activeIndex
                ? 'w-7 h-2 bg-[#8C0000] ring-2 ring-[#8C0000]/40'
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const ZoomSlider = ({
  sliderData = DEFAULT_9_16_VIDEOS_DATA,
  size = 1,
}: {
  sliderData?: ZoomSliderItem[];
  title?: string;
  subheading?: string;
  size?: number;
} = {}) => (
  <ZoomSliderComp
    sliderData={sliderData}
    size={size}
  />
);

export default ZoomSlider;
