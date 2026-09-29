import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import FlexCarousel, { FlexCarouselItem } from './FlexCarousel';
import { buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';

const SIGNAGE_ITEMS: FlexCarouselItem[] = [
  {
    src: '/hero/hero-1.webp',
    alt: 'Rótulo circular retroiluminado LED Moonlight Mocktails'
  },
  {
    src: '/hero/hero-2.webp',
    alt: 'Letrero Neón Flex Oh My Dog! Masco Terra'
  },
  {
    src: '/hero/hero-3.webp',
    alt: 'Letrero luminoso Neón Rosa BE Clinique'
  },
  {
    src: '/hero/hero-4.webp',
    alt: 'Letrero Neón Flex decorativo diseño Burger'
  },
  {
    src: '/hero/hero-5.webp',
    alt: 'Figura decorativa Neón LED Campanas'
  },
  {
    src: '/hero/hero-6.webp',
    alt: 'Letras 3D corpóreas con iluminación LED Odontología Parker'
  },
  {
    src: '/hero/hero-7.webp',
    alt: 'Rótulo circular retroiluminado con detalles dorados Rich Baby Store'
  },
  {
    src: '/hero/hero-8.webp',
    alt: 'Rótulo corpóreo 3D en base de alucobónd Sabores Lojanos'
  }
];

export const Hero: React.FC = () => {
  const handleWhatsAppClick = () => {
    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: 'Clic WhatsApp desde Hero principal',
      source: 'hero_primary_cta',
    });
  };

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

      {/* CONTENIDO SUPERIOR: Títulos y Llamado a la acción */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mb-8 sm:mb-12">

        {/* Título Principal con tipografía Playwrite AU VIC */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.25] font-playwrite max-w-4xl tracking-normal drop-shadow-md">
          Rótulos Luminosos y Letras 3D que Hacen Crecer tu Negocio
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg lg:text-xl text-[#E8E5DF]/90 font-normal leading-relaxed mt-4 max-w-2xl text-balance">
          Fabricación personalizada con <strong className="text-white font-semibold">tecnología LED de bajo consumo</strong>, corte láser de alta precisión y materiales resistentes al clima de Quito.
        </p>

        {/* Botones de Acción / CTAs (Negros) */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mt-6 w-full sm:w-auto">
          <a
            href={buildWhatsAppUrl('Hola Mr Rótulos, quisiera cotizar un rótulo luminoso para mi negocio.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#191919] hover:bg-black text-white font-extrabold text-sm sm:text-base border border-white/20 shadow-xl shadow-black/40 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 fill-current text-white" />
            <span>Cotizar por WhatsApp</span>
          </a>

          <a
            href="#catalogo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#191919] hover:bg-black text-white font-bold text-sm sm:text-base border border-white/20 shadow-xl shadow-black/40 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Ver Catálogo con Precios</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </a>
        </div>

      </div>

      {/* CARRUSEL DE ANCHO COMPLETO CON AVANCE CONTINUO FLUIDO */}
      <div className="w-full h-[460px] sm:h-[520px] md:h-[580px] lg:h-[620px] relative z-10 px-0">
        <FlexCarousel
          items={SIGNAGE_ITEMS}
          preset="ribbon"
          intro="rise"
          cardHeight={0.85}
          fit="natural"
          bend={0.12}
          reach={0.40}
          tilt={4}
          gap={24}
          radius={22}
          squeeze={0.10}
          focusOnClick
          autoplay
          continuous
          speed={220}
          captions={false}
        />
      </div>

    </section>
  );
};

export default Hero;
