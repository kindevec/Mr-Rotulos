import React, { useEffect } from 'react';
import { X, MapPin, Sparkles, Layers, CheckCircle2, Tag, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { GalleryProject } from '../types';
import { buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';

interface ImageModalProps {
  project: GalleryProject | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const handleWhatsAppInquiry = () => {
    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: `Consulta por proyecto: ${project.title}`,
      source: 'catalog_modal',
      metadata: { project: project.title, price: project.price || 'N/A' },
    });
  };

  const whatsappMessage = project.price
    ? `Hola Mister Rótulos, me interesa cotizar el producto "${project.title}" (${project.price}). ¿Podrían darme más información sobre la fabricación e instalación en mi local?`
    : `Hola Mister Rótulos, me interesa cotizar un trabajo similar a "${project.title}" (${project.client || 'Catálogo'}). ¿Podrían asesorarme?`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E8E5DF] text-[#191919] max-h-[92vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-[#191919] hover:text-white text-[#191919] flex items-center justify-center shadow-md transition-all cursor-pointer"
          aria-label="Cerrar vista detallada"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Box */}
        <div className="md:w-1/2 bg-[#191919] relative min-h-[300px] md:min-h-[500px] flex items-center justify-center">
          <img
            src={project.image}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-[#191919]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#8C0000]" />
            <span>{project.categoryLabel}</span>
          </div>

          {project.badge && (
            <div className={`absolute top-4 left-4 text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-xl shadow-md ${
              project.badge.includes('Oferta') || project.badge.includes('Promoción')
                ? 'bg-[#8C0000] text-white animate-pulse'
                : 'bg-white text-[#191919]'
            }`}>
              {project.badge}
            </div>
          )}
        </div>

        {/* Details Box */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#8C0000] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Especificación Técnica Mr. Rótulos</span>
            </div>

            {/* Price display */}
            {project.price && (
              <div className="flex items-baseline gap-3 mb-3 bg-[#F0EDE8] p-3 rounded-2xl border border-[#E8E5DF]">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#8C0000] font-display">
                    {project.price}
                  </span>
                  {project.originalPrice && (
                    <span className="text-base font-bold text-slate-400 line-through">
                      {project.originalPrice}
                    </span>
                  )}
                </div>
                <span className="ml-auto text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-emerald-700" /> Oferta
                </span>
              </div>
            )}

            <h3 className="text-xl sm:text-2xl font-black text-[#191919] leading-tight mb-2">
              {project.title}
            </h3>

            {project.description && (
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed font-medium">
                {project.description}
              </p>
            )}

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-4">
              <MapPin className="w-4 h-4 text-[#8C0000] shrink-0" />
              <span>{project.location || 'Quito y Valles, Ecuador'} • Ref: {project.client}</span>
            </div>

            {/* Materials List */}
            {project.materials && project.materials.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-700 block mb-2">Materiales y Componentes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {project.materials.map((mat, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#F0EDE8] text-slate-800 px-3 py-1.5 rounded-xl border border-[#E8E5DF]"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#8C0000]" />
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="mb-4 space-y-1.5">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8C0000] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Inclusions */}
            {project.includes && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 flex items-center gap-2 text-xs font-bold text-emerald-900 mb-4">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{project.includes}</span>
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-600 pb-4 border-b border-[#E8E5DF]">
              {project.lightingType && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Iluminación:</span>
                  <span className="font-bold text-[#191919]">{project.lightingType}</span>
                </div>
              )}
              {project.dimension && (
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Medida / Formato:</span>
                  <span className="font-bold text-[#191919]">{project.dimension}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppInquiry}
              className="w-full py-3.5 px-4 rounded-xl bg-[#8C0000] hover:bg-[#730000] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all text-center"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span>Cotizar Este Proyecto por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

