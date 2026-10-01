import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';
import FlexCarousel, { FlexCarouselItem } from './FlexCarousel';

import { detectSearchIntent } from '../utils/analytics';

interface SolutionItem {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  whatsappMessage: string;
  docTitle: string;
}

const INTENT_SOLUTIONS: SolutionItem[] = [
  {
    id: 'letreros-3d',
    name: '⭐ Letreros 3D (Más Vendido)',
    title: 'Letreros 3D y Letras Corpóreas',
    subtitle: 'Fabricación directa de Letras en Acero Inoxidable, Acrílico con Alucobond, Halo y Volumétricas. Instalamos en Quito, Sierra y Oriente (próximamente Costa). Cotización en 15 min.',
    whatsappMessage: 'Hola Mister Rótulos, vi su anuncio y deseo cotizar Letreros 3D para mi negocio.',
    docTitle: 'Letreros 3D y Letras Corpóreas | Fabricación Directa - Mr. Rótulos',
  },
  {
    id: 'rotulos-fachadas',
    name: 'Rótulos & Fachadas Comerciales',
    title: 'Rótulos Comerciales y Fachadas en Alucobond',
    subtitle: 'Rótulos para Restaurantes, Asaderos, Peluquerías, Panaderías y Fachadas en Alucobond con electrocorte CNC. Cobertura directa en Quito, Sierra y Oriente (próximamente Costa).',
    whatsappMessage: 'Hola Mister Rótulos, vi su anuncio y deseo cotizar un Rótulo Comercial o Fachada en Alucobond.',
    docTitle: 'Rótulos Comerciales y Fachadas | Mr. Rótulos',
  },
  {
    id: 'cajas-luz-menuderos',
    name: 'Cajas de Luz, Menuderos & Neón',
    title: 'Cajas de Luz LED, Menuderos y Neón Flex',
    subtitle: 'Cajas de luz silueteadas forma de nube, menuderos backlight para restaurantes, neón flex y rompetráficos. Instalación en Quito, Sierra y Oriente (próximamente Costa).',
    whatsappMessage: 'Hola Mister Rótulos, vi su anuncio y deseo cotizar una Caja de Luz, Menudero o Neón Flex.',
    docTitle: 'Cajas de Luz LED y Menuderos | Mr. Rótulos',
  },
  {
    id: 'stands-vallas-senaletica',
    name: 'Stands, Vallas & Señalética',
    title: 'Stands para Ferias, Vallas y Señalética',
    subtitle: 'Diseño y montaje de stands e islas para ferias, vallas publicitarias en azotea con grúa, placas y señalética. Trabajos en Quito, Sierra y Oriente (próximamente Costa).',
    whatsappMessage: 'Hola Mister Rótulos, vi su anuncio y deseo cotizar Stands, Vallas o Señalética.',
    docTitle: 'Stands para Ferias, Vallas y Señalética | Mr. Rótulos',
  },
];

const SIGNAGE_ITEMS: FlexCarouselItem[] = [
  {
    src: '/hero/hero-panaderiaalemar.png',
    alt: 'Rótulo Panadería Pastelería Antojitos Alemar letras 3D'
  },
  {
    src: '/hero/hero-saboreslojanos.png',
    alt: 'Rótulo comercial Sabores Lojanos con letras 3D y mascota de choclo'
  },
  {
    src: '/hero/hero-puntoazul.png',
    alt: 'Rótulo Punto Azul Calzado letras 3D y zapatilla iluminada'
  },
  {
    src: '/hero/hero-abogadosproley.png',
    alt: 'Rótulo corporativo Abogados Proley letras 3D luminosas'
  },
  {
    src: '/hero/hero-arepazopaisa.png',
    alt: 'Rótulo luminoso El Arepazo Paisa con letras acrílicas'
  },
  {
    src: '/hero/hero-fritadassarita.png',
    alt: 'Rótulo corpóreo 3D Fritadas Sarita en base de alucobond'
  },
  {
    src: '/hero/hero-perlei-crop.png',
    alt: 'Rótulo comercial retroiluminado PER LEI Sunglasses'
  }
];

export const Hero: React.FC = () => {
  const [activeSolutionIndex, setActiveSolutionIndex] = useState(0);
  const [isUrlLocked, setIsUrlLocked] = useState(false);
  const [fade, setFade] = useState(true);

  // Detect Google Ads Search Intent from URL query parameters and paths
  useEffect(() => {
    const intent = detectSearchIntent();
    if (intent === 'letras-3d') {
      setActiveSolutionIndex(0);
      setIsUrlLocked(true);
      document.title = INTENT_SOLUTIONS[0].docTitle;
    } else if (intent === 'rotulos') {
      setActiveSolutionIndex(1);
      setIsUrlLocked(true);
      document.title = INTENT_SOLUTIONS[1].docTitle;
    } else if (intent === 'cajas-de-luz') {
      setActiveSolutionIndex(2);
      setIsUrlLocked(true);
      document.title = INTENT_SOLUTIONS[2].docTitle;
    } else if (intent === 'stands') {
      setActiveSolutionIndex(3);
      setIsUrlLocked(true);
      document.title = INTENT_SOLUTIONS[3].docTitle;
    }
  }, []);

  // Smooth rotation between solutions if not locked to a specific Google Ads URL parameter
  useEffect(() => {
    if (isUrlLocked) return;

    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveSolutionIndex((prev) => (prev + 1) % INTENT_SOLUTIONS.length);
        setFade(true);
      }, 250);
    }, 4000);

    return () => clearInterval(timer);
  }, [isUrlLocked]);

  const currentSolution = INTENT_SOLUTIONS[activeSolutionIndex];

  return (
    <section id="inicio" className="relative overflow-hidden bg-[#0a0000] text-white pt-12 sm:pt-16 pb-12 sm:pb-16 border-b border-[#8C0000]/40">
      {/* Fondo base con degradado radial difuminado en rojo #8C0000 */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_15%,#2e0404_0%,#1c0202_45%,#0e0000_80%,#050000_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Halo de resplandor difuminado principal en rojo #8C0000 */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] sm:h-[650px] bg-[#8C0000]/30 blur-[130px] sm:blur-[170px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Resplandor superior difuminado en rojo #8C0000 */}
      <div 
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#8C0000]/25 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Sutil textura arquitectónica */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#8C0000_1.2px,transparent_1.2px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* CONTENIDO SUPERIOR: Título que vende directamente la solución buscada */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mb-8 sm:mb-12">

        {/* Título Dinámico Enfocado 100% en la Solución Buscada */}
        <h1 
          className={`text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.25] font-playwrite max-w-4xl tracking-normal drop-shadow-md min-h-[80px] sm:min-h-[120px] lg:min-h-[145px] flex items-center justify-center transition-opacity duration-300 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {currentSolution.title}
        </h1>

        {/* Subtítulo enfocado en solución directa y beneficios técnicos */}
        <p 
          className={`text-base sm:text-lg lg:text-xl text-[#E8E5DF]/90 font-normal leading-relaxed mt-3 max-w-2xl text-balance min-h-[56px] sm:min-h-[60px] flex items-center justify-center transition-opacity duration-300 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {currentSolution.subtitle}
        </p>

        {/* Botones de Acción: Cotizar por WhatsApp (Principal) y Ver catálogo (Secundario más pequeño) */}
        <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:mt-8 w-full">
          {/* Botón Principal: COTIZAR AQUÍ (Rojo con Icono Blanco) */}
          <a
            href={buildWhatsAppUrl(currentSolution.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackConversionEvent('click_whatsapp', {
                category: 'Lead',
                label: `Cotizar por WhatsApp - Hero CTA (${currentSolution.name})`,
                source: 'hero_whatsapp',
              });
            }}
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-[#8C0000] hover:bg-[#730000] text-white font-black text-sm sm:text-base tracking-wider uppercase border border-red-500/50 shadow-2xl shadow-[#8C0000]/50 hover:border-red-400 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer group"
            aria-label="Cotizar Aquí"
          >
            <WhatsAppIcon className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform duration-200" />
            <span>COTIZAR AQUÍ</span>
          </a>

          {/* Botón Secundario en Negro: Ver trabajos realizados */}
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#141414] hover:bg-black text-white font-bold text-xs sm:text-sm border border-white/20 hover:border-white/40 shadow-lg shadow-black/50 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer group mt-0.5"
          >
            <span>Ver trabajos realizados</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>

      {/* CARRUSEL DE ANCHO COMPLETO CON AVANCE CONTINUO FLUIDO */}
      <div className="w-full h-[260px] sm:h-[360px] md:h-[460px] lg:h-[540px] relative z-10 px-0">
        <FlexCarousel
          items={SIGNAGE_ITEMS}
          preset="ribbon"
          intro="rise"
          cardHeight={0.85}
          fit="natural"
          bend={0.06}
          reach={0.35}
          tilt={0}
          dispersion={0}
          gap={24}
          radius={22}
          squeeze={0.04}
          focusOnClick
          autoplay
          continuous
          speed={310}
          captions={false}
          captureWheel={false}
        />
      </div>

    </section>
  );
};

export default Hero;
