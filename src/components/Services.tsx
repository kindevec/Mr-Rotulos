import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers, 
  Zap, 
  Sparkles, 
  Flame, 
  Store, 
  Signpost, 
  ShieldCheck, 
  Ruler, 
  Eye, 
  Cpu 
} from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { ServiceId } from '../types';
import { trackConversionEvent, buildWhatsAppUrl } from '../utils/analytics';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from './ui/carousel';

interface ServicesProps {
  onSelectService: (serviceId: ServiceId) => void;
}

interface ServiceCardItem {
  id: ServiceId;
  title: string;
  icon: React.ReactNode;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());

    carouselApi.on('select', () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    });
    carouselApi.on('reInit', () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    });
  }, [carouselApi]);

  const serviceCards: ServiceCardItem[] = [
    {
      id: 'rotulos-luminosos',
      title: 'Rótulos & Fachadas Alucobond',
      icon: <Layers className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'letras-3d',
      title: 'Letras 3D & Efecto Halo',
      icon: <Sparkles className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'cajas-de-luz',
      title: 'Cajas de Luz & Menuderos Backlight',
      icon: <Zap className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'rotulos-luminosos',
      title: 'Neón Flex & Logos Circulares',
      icon: <Flame className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'gigantografias',
      title: 'Stands Feriales & Comerciales',
      icon: <Store className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'gigantografias',
      title: 'Vallas & Señalética en Vidrio',
      icon: <Signpost className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    }
  ];

  const featuredRotulos = [
    {
      id: 'rotulos-luminosos' as ServiceId,
      title: 'Fachada Alucobond con Electrocorte',
      image: '/catalog/catalog-alucobond-concesol.webp',
    },
    {
      id: 'letras-3d' as ServiceId,
      title: 'Letras 3D Retroiluminadas Halo',
      image: '/catalog/catalog-retro-myjoker.webp',
    },
    {
      id: 'gigantografias' as ServiceId,
      title: 'Stand Comercial & Ferial Dior',
      image: '/catalog/catalog-stands-dior.webp',
    },
    {
      id: 'cajas-de-luz' as ServiceId,
      title: 'Neón Flex Personalizado Oh My Dog',
      image: '/catalog/catalog-neon-ohmydog.webp',
    },
    {
      id: 'rotulos-luminosos' as ServiceId,
      title: 'Rótulo 3D Fritadas Sarita',
      image: '/catalog/catalog-restaurante-fritadassarita.webp',
    },
    {
      id: 'cajas-de-luz' as ServiceId,
      title: 'Caja de Luz LED Farmacias Santa Martha',
      image: '/catalog/catalog-luminoso-santamartha.webp',
    },
    {
      id: 'letras-3d' as ServiceId,
      title: 'Logotipo en Alto Relieve Cobro Fast',
      image: '/catalog/catalog-altorelieve-cobrofast.webp',
    },
    {
      id: 'gigantografias' as ServiceId,
      title: 'Señalética Vidrio Acrílico Lafquén',
      image: '/catalog/catalog-senaletica-lafquen.webp',
    }
  ];

  const handleServiceQuote = (serviceId: ServiceId, title: string) => {
    trackConversionEvent('service_quote_intent', {
      category: 'Lead',
      label: `Cotizar servicio: ${title}`,
      source: 'service_quote',
      metadata: { serviceId }
    });

    onSelectService(serviceId);

    const contactSection = document.getElementById('contactos') || document.getElementById('cotizar');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const workSteps = [
    {
      icon: <Ruler className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />,
      desc: 'Visita técnica sin costo en tu local.'
    },
    {
      icon: <Eye className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />,
      desc: 'Visualiza tu rótulo antes de fabricar.'
    },
    {
      icon: <Cpu className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />,
      desc: 'Corte de precisión y módulos Samsung IP67.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />,
      desc: 'Montaje profesional con hasta 3 años de garantía.'
    }
  ];

  return (
    <section id="servicios" className="pt-14 md:pt-20 pb-4 md:pb-6 bg-white relative overflow-hidden">
      
      {/* =========================================================================
          PARTE 1: Encabezado y 6 Servicios Especializados en Grilla Limpia
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado Principal */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#191919] tracking-tight font-display">
            Servicios Especializados de Rotulación
          </h2>
          <div className="w-16 h-1 bg-[#8C0000] rounded-full mx-auto mt-4 mb-2"></div>
        </div>

        {/* Grilla de 6 Servicios (Solo Íconos y Títulos Informativos) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-14 md:mb-18 max-w-5xl mx-auto">
          {serviceCards.map((item) => (
            <div 
              key={item.title}
              className="flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 p-2 sm:p-3 select-none"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3 group-hover:bg-[#8C0000] group-hover:border-[#8C0000] transition-all duration-300 shadow-xs">
                {item.icon}
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-black text-[#191919] group-hover:text-[#8C0000] transition-colors font-display max-w-[220px] leading-snug">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* =========================================================================
            PARTE 2: SECCIÓN NUESTROS RÓTULOS (ENCABEZADO ARRIBA & CARRUSEL DE ANCHO COMPLETO)
           ========================================================================= */}
        <div className="my-16 md:my-24">
          
          {/* Encabezado Superior: Título, Línea Decorativa, Texto y Botón de Catálogo */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 md:mb-12">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#191919] tracking-tight font-display leading-[1.15]">
                Nuestros Rótulos Más Solicitados
              </h3>
              <div className="w-16 h-1 bg-[#8C0000] rounded-full mt-3 mb-2"></div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mt-2">
                Los modelos favoritos y de mayor impacto comercial, diseñados a medida para hacer destacar tu negocio las 24 horas.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-200 active:scale-95 group"
              >
                <span>Ver Todo el Catálogo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Carrusel de Ancho Completo con 4 Tarjetas Visibles en Desktop */}
          <div className="w-full min-w-0 relative group/carousel">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-3 sm:-ml-4">
                {featuredRotulos.map((item, index) => (
                  <CarouselItem
                    key={`${item.title}-${index}`}
                    className="pl-3 sm:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div 
                      className="relative w-full aspect-[16/11] sm:aspect-[16/10] min-h-[210px] sm:min-h-[240px] rounded-tl-[32px] rounded-br-[32px] rounded-tr-xl rounded-bl-xl overflow-hidden bg-[#151515] shadow-md hover:shadow-2xl transition-all duration-500 group border border-slate-200"
                    >
                      {/* Imagen que llena el 100% de la tarjeta */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:opacity-35 group-hover:brightness-50"
                      />

                      {/* Gradiente sutil base */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

                      {/* Título que aparece centrado al pasar el cursor */}
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
                        <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-display mb-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md max-w-[200px]">
                          {item.title}
                        </h4>
                        <span className="px-3 py-1 rounded-full bg-[#8C0000] text-white font-bold text-[10px] uppercase tracking-wider transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          Calidad Garantizada
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Flecha Izquierda Flotante */}
            <button
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Anterior rótulo"
              className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#191919] hover:bg-[#8C0000] hover:border-[#8C0000] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer active:scale-95 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Flecha Derecha Flotante */}
            <button
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Siguiente rótulo"
              className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#191919] hover:bg-[#8C0000] hover:border-[#8C0000] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 disabled:opacity-0 disabled:pointer-events-none cursor-pointer active:scale-95 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

          </div>
        </div>

      </div>

      {/* =========================================================================
          PARTE 3: SECCIÓN ¿CÓMO TRABAJAMOS? (PASOS)
         ========================================================================= */}
      <div className="relative w-full pt-2 pb-0 sm:pt-4 sm:pb-0 flex items-center justify-center">
        
        {/* Banda horizontal lateral continua con fondo del banner */}
        <div 
          className="absolute left-0 right-0 h-40 sm:h-52 md:h-64 lg:h-72 bg-[#0a0000] top-1/2 -translate-y-1/2 z-0"
          aria-hidden="true"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_95%_75%_at_50%_50%,#2e0404_0%,#1c0202_45%,#0e0000_80%,#050000_100%)] opacity-90" />
        </div>

        {/* Tarjeta Central Redondeada con el degradado del banner principal */}
        <div className="relative z-10 w-full max-w-6xl mx-4 sm:mx-6 lg:mx-8 bg-[#0a0000] text-white rounded-3xl md:rounded-[44px] shadow-2xl overflow-hidden border border-[#8C0000]/40">
          
          {/* Fondo base con degradado radial difuminado en rojo #8C0000 igual al Hero Banner */}
          <div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_15%,#2e0404_0%,#1c0202_45%,#0e0000_80%,#050000_100%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Halo de resplandor difuminado */}
          <div 
            className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#8C0000]/25 blur-[120px] rounded-full pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[380px] lg:min-h-[420px] relative z-10">
            
            {/* Lado Izquierdo: Información con ÍCONOS BLANCOS */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4 p-6 sm:p-8 lg:p-10 xl:p-12">
              
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-display leading-tight mb-2">
                  ¿Cómo trabajamos en MR Rótulos?
                </h3>
              </div>

              {/* 4 Pasos con ÍCONOS GRANDES Y EFECTO DE CAMBIO DE COLOR */}
              <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-sm md:text-base text-white/90">
                {workSteps.map((ws, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 transition-all duration-300 icon-color-shift">
                      {ws.icon}
                    </div>
                    <p className="leading-snug font-semibold text-white/95 text-xs sm:text-sm md:text-base">
                      {ws.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Botones Redondeados tipo Cápsula */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    trackConversionEvent('service_quote_intent', {
                      category: 'Lead',
                      label: 'Cotizar desde sección de proceso',
                      source: 'service_quote'
                    });
                    const contactSection = document.getElementById('contactos') || document.getElementById('cotizar');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="px-6 sm:px-7 py-3 rounded-full bg-white text-[#191919] font-black text-xs sm:text-sm tracking-wide shadow-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <span>Solicitar Cotización</span>
                  <ArrowUpRight className="w-4 h-4 text-[#191919]" />
                </button>

                <a
                  href={buildWhatsAppUrl('Hola MR Rótulos, deseo información sobre el proceso de fabricación e instalación de rótulos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackConversionEvent('whatsapp_click', {
                      category: 'Contact',
                      label: 'WhatsApp desde sección de proceso',
                      source: 'hero_whatsapp'
                    });
                  }}
                  className="px-5 sm:px-6 py-3 rounded-full bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center gap-2 active:scale-95 shadow-md shadow-red-950/40 border border-[#8C0000]/60"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white fill-current" />
                  <span>Hablar por WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Lado Derecho: Imagen de Nestlé que llena 100% sin espacios vacíos */}
            <div className="lg:col-span-6 relative w-full min-h-[300px] sm:min-h-[360px] lg:min-h-full">
              <img 
                src="/nestle-rotulo.jpg" 
                alt="Rótulo corpóreo 3D Nestlé fabricado e instalado sobre jardín vertical" 
                className="w-full h-full object-cover object-center absolute inset-0"
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Services;
