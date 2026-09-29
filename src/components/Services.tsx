import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Layers, 
  Zap, 
  Sparkles, 
  Printer, 
  RotateCw, 
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
  description: string;
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
      title: 'Rótulos Luminosos & Fachadas',
      description: 'Estructuras de acero electrogalvanizado con paneles de aluminio compuesto (ACM) y módulos LED para máxima visibilidad día y noche.',
      icon: <Layers className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'cajas-de-luz',
      title: 'Cajas de Luz LED Ultra-Bright',
      description: 'Estructuras de aluminio extruido con difusores acrílicos de alta transmitancia y fuentes MeanWell con supresión de picos.',
      icon: <Zap className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'letras-3d',
      title: 'Letras 3D & Corpóreos',
      description: 'Letras volumétricas cortadas en Router CNC y láser de fibra con iluminación frontal difusa o efecto halo sobre pared.',
      icon: <Sparkles className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'gigantografias',
      title: 'Gigantografías & Gran Formato',
      description: 'Impresión digital ecológica con tintas UV de alta resistencia al sol andino de Quito en lonas pesadas y viniles.',
      icon: <Printer className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'rotulos-luminosos',
      title: 'Rótulos Circulares & Giratorios',
      description: 'Banderolas circulares de 60cm con motor de giro continuo o estáticas de doble cara para captar tráfico peatonal.',
      icon: <RotateCw className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    },
    {
      id: 'gigantografias',
      title: 'Viniles & Rotulación Comercial',
      description: 'Vinil microperforado para vitrinas comerciales, películas esmeriladas de privacidad y rotulación vehicular corporativa.',
      icon: <ShieldCheck className="w-5 h-5 text-[#8C0000] group-hover:text-white transition-colors duration-300" />
    }
  ];

  const featuredRotulos = [
    {
      id: 'rotulos-luminosos' as ServiceId,
      title: 'Rótulo 3D + Giratorio',
      image: '/catalog/catalog-1.jpg',
    },
    {
      id: 'cajas-de-luz' as ServiceId,
      title: 'Cajas de Luz Ultra-Bright',
      image: '/catalog/catalog-2.jpg',
    },
    {
      id: 'letras-3d' as ServiceId,
      title: 'Letras Corpóreas AUTOTEC 3D',
      image: '/autotec-rotulo.jpg',
    },
    {
      id: 'rotulos-luminosos' as ServiceId,
      title: 'Rótulo Publicitario Rey Pollo',
      image: '/reypollo-rotulo.jpg',
    },
    {
      id: 'letras-3d' as ServiceId,
      title: 'Letras 3D Corpóreas Nestlé',
      image: '/nestle-rotulo.jpg',
    },
    {
      id: 'gigantografias' as ServiceId,
      title: 'Fachada Comercial Gran Formato',
      image: '/catalog/catalog-3.jpg',
    },
    {
      id: 'cajas-de-luz' as ServiceId,
      title: 'Caja de Luz LED Comercial',
      image: '/catalog/catalog-4.jpg',
    },
    {
      id: 'rotulos-luminosos' as ServiceId,
      title: 'Banderola Circular Doble Cara',
      image: '/catalog/catalog-5.jpg',
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
      icon: <Ruler className="w-4 h-4 text-white" />,
      title: 'Asesoría y Medidas',
      desc: 'Visita técnica sin costo en tu local.'
    },
    {
      icon: <Eye className="w-4 h-4 text-white" />,
      title: 'Render 3D Previo',
      desc: 'Visualiza tu rótulo antes de fabricar.'
    },
    {
      icon: <Cpu className="w-4 h-4 text-white" />,
      title: 'Fabricación CNC & LED',
      desc: 'Corte de precisión y módulos Samsung IP67.'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-white" />,
      title: 'Instalación y Garantía',
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

        {/* Grilla de 6 Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16 md:mb-20">
          {serviceCards.map((item) => (
            <div 
              key={item.title}
              onClick={() => handleServiceQuote(item.id, item.title)}
              className="flex flex-col items-center text-center group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-3 group-hover:bg-[#8C0000] group-hover:border-[#8C0000] transition-all duration-300 shadow-xs">
                {item.icon}
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#191919] group-hover:text-[#8C0000] transition-colors mb-2 font-display">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* =========================================================================
            PARTE 2: SECCIÓN NUESTROS RÓTULOS (TÍTULO A LA IZQUIERDA & CARRUSEL A LA DERECHA)
           ========================================================================= */}
        <div className="my-16 md:my-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Columna Izquierda: Título, Línea Decorativa, Texto y Botón de Ver Catálogo */}
            <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-center space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-[#191919] tracking-tight font-display leading-[1.15]">
                Nuestros Rótulos Más Solicitados
              </h3>
              <div className="w-16 h-1 bg-[#8C0000] rounded-full"></div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Los modelos favoritos y de mayor impacto comercial, diseñados a medida para hacer destacar tu negocio las 24 horas.
              </p>
              <div className="pt-2">
                <a
                  href="#catalogo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-200 active:scale-95 group"
                >
                  <span>Ver Todo el Catálogo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Columna Derecha: Carrusel con 4 tarjetas visibles y overlay en hover */}
            <div className="lg:col-span-9 xl:col-span-9 w-full min-w-0 relative group/carousel">
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
                      className="pl-3 sm:pl-4 basis-[90%] sm:basis-[68%] md:basis-[52%] lg:basis-[42%] xl:basis-[36%]"
                    >
                      <div 
                        onClick={() => handleServiceQuote(item.id, item.title)}
                        className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[200px] sm:min-h-[230px] md:min-h-[260px] rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl overflow-hidden bg-[#151515] shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-slate-200"
                      >
                        {/* Imagen que se adapta y llena el 100% de la tarjeta sin espacios vacíos */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:opacity-35 group-hover:brightness-50"
                        />

                        {/* Gradiente sutil base */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

                        {/* Título y Botón de Cotizar que aparecen centrado al pasar el cursor */}
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/35 backdrop-blur-[2px]">
                          <h4 className="text-xs sm:text-sm md:text-base font-black text-white uppercase tracking-wider font-display mb-3 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-md">
                            {item.title}
                          </h4>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleServiceQuote(item.id, item.title);
                            }}
                            className="px-5 py-2.5 rounded-full bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-xs tracking-wider shadow-xl transition-all duration-200 active:scale-95 cursor-pointer flex items-center gap-1.5 transform translate-y-3 group-hover:translate-y-0 duration-300 hover:scale-105"
                          >
                            <span>Cotizar</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
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
                <p className="text-xs sm:text-sm text-white/90 font-normal leading-relaxed">
                  Proceso integral garantizado desde la medición hasta la instalación:
                </p>
              </div>

              {/* 4 Pasos con ÍCONOS BLANCOS */}
              <div className="space-y-2.5 text-xs sm:text-sm text-white/85">
                {workSteps.map((ws, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 border border-white/20">
                      {ws.icon}
                    </div>
                    <p className="leading-snug pt-0.5">
                      <strong className="text-white font-bold">{ws.title}:</strong> {ws.desc}
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
