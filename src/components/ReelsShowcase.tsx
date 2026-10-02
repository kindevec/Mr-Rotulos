import React from 'react';
import ZoomSlider, { DEFAULT_9_16_VIDEOS_DATA } from './ui/zoom-slider';
import { ArrowRight } from 'lucide-react';
import { trackConversionEvent, buildWhatsAppUrl } from '../utils/analytics';

export const ReelsShowcase: React.FC = () => {
  const handleQuoteClick = () => {
    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: 'Clic WhatsApp desde Reels Videos 9:16',
      source: 'video_reels_cta',
    });
    window.open(buildWhatsAppUrl('¡Hola Mr. Rótulos! Vi los videos de sus proyectos en acción y me gustaría cotizar un rótulo para mi negocio.'), '_blank');
  };

  return (
    <section id="videos" className="relative py-12 md:py-20 bg-white text-[#191919] overflow-hidden">
      {/* Sutil halo difuminado claro de fondo */}
      <div 
        className="absolute -right-40 top-1/4 w-[500px] h-[500px] bg-[#8C0000]/[0.03] blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -left-40 bottom-10 w-[450px] h-[450px] bg-[#8C0000]/[0.02] blur-[120px] rounded-full pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado de la Sección */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-[#191919] max-w-3xl leading-[1.15]">
            Descubre Cómo Transformamos Negocios con Rótulos 3D de Alto Impacto
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Mira en acción nuestros procesos de diseño, fabricación e instalación profesional, junto con recomendaciones clave para potenciar la visibilidad y atraer más clientes a tu marca.
          </p>
        </div>

        {/* Componente ZoomSlider con Videos de TikTok */}
        <div className="w-full">
          <ZoomSlider
            sliderData={DEFAULT_9_16_VIDEOS_DATA}
            size={1}
          />
        </div>

        {/* Botón Centrado Cotizar Aquí */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleQuoteClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#8C0000] to-[#B30000] hover:from-[#A00000] hover:to-[#C40000] text-white font-extrabold text-base shadow-xl shadow-[#8C0000]/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Cotizar aquí</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ReelsShowcase;
