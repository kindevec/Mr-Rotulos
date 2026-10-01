import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import FlexCarousel, { FlexCarouselItem } from './FlexCarousel';

interface SolutionItem {
  id: string;
  name: string;
  title: string;
  subtitle: string;
}

const INTENT_SOLUTIONS: SolutionItem[] = [
  {
    id: 'rotulos-fachadas',
    name: 'Rótulos & Fachadas Alucobond',
    title: 'Rótulos Luminosos 3D y Fachadas en Alucobond en Quito',
    subtitle: 'Fabricación con electrocorte CNC en Alucobond, acrílico virgen, acero inoxidable y módulos LED de alto brillo. Visita técnica sin costo en Quito y cotización en 15 minutos.',
  },
  {
    id: 'letras-corporeas',
    name: 'Letras 3D & Efecto Halo',
    title: 'Letras 3D en Acero Inoxidable, Tool, Acrílico y MDF en Quito',
    subtitle: 'Letras volumétricas con luz directa, retroiluminación halo o sin luz para exteriores, oficinas y eventos. Acabados automotrices y garantía escrita.',
  },
  {
    id: 'cajas-luz-menuderos',
    name: 'Cajas de Luz & Menuderos',
    title: 'Cajas de Luz LED, Menuderos Backlight y Neón Flex en Quito',
    subtitle: 'Cajas publicitarias de alta durabilidad, menuderos modulares backlight e iluminación Neón Flex de bajo consumo para locales comerciales y restaurantes.',
  },
  {
    id: 'stands-vallas-senaletica',
    name: 'Stands, Vallas & Señalética',
    title: 'Stands para Ferias, Vallas Publicitarias y Señalética en Vidrio',
    subtitle: 'Diseño y montaje de stands e islas comerciales, vallas de gran formato con izaje en grúa y placas elegantes en vidrio acrílico con pernos decorativos.',
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

  // Detect Google Ads Search Intent from URL query parameters (e.g. ?servicio=cajas-de-luz or ?kw=cajas+de+luz or ?utm_term=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const query = (
        params.get('servicio') || 
        params.get('kw') || 
        params.get('utm_term') || 
        params.get('q') || 
        params.get('buscar') || 
        ''
      ).toLowerCase();

      if (query) {
        if (query.includes('caja') || query.includes('luz')) {
          setActiveSolutionIndex(0);
          setIsUrlLocked(true);
          return;
        }
        if (query.includes('letra') || query.includes('corporea') || query.includes('corpórea') || query.includes('3d')) {
          setActiveSolutionIndex(1);
          setIsUrlLocked(true);
          return;
        }
        if (query.includes('rotulo') || query.includes('rótulo') || query.includes('letrero') || query.includes('fachada')) {
          setActiveSolutionIndex(2);
          setIsUrlLocked(true);
          return;
        }
        if (query.includes('giganto') || query.includes('vinil') || query.includes('impresion') || query.includes('impresión')) {
          setActiveSolutionIndex(3);
          setIsUrlLocked(true);
          return;
        }
      }
    } catch {
      // fallback to cycling
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

        {/* Botón Único Centrado: Ver Catálogo */}
        <div className="flex justify-center items-center mt-6 w-full">
          <a
            href="#catalogo"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#191919] hover:bg-black text-white font-extrabold text-sm sm:text-base border border-white/20 shadow-xl shadow-black/40 hover:-translate-y-0.5 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Ver Catálogo de Trabajos</span>
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
        />
      </div>

    </section>
  );
};

export default Hero;
