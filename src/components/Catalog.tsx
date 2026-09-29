import React, { useState } from 'react';
import { Star, Sparkles, RotateCcw, CheckCircle } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { GALLERY_PROJECTS } from '../data/content';
import { GalleryProject } from '../types';
import { ImageModal } from './ImageModal';
import { ImageGallery } from './ui/carousel-circular-image-gallery';
import { buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';

// Reviews count mapped by project id to match the mockup (e.g. 124, 98, 76)
const PROJECT_REVIEWS: Record<string, { rating: number; count: number }> = {
  'proj-1': { rating: 5, count: 124 },
  'proj-2': { rating: 5, count: 98 },
  'proj-3': { rating: 5, count: 85 },
  'proj-4': { rating: 5, count: 112 },
  'proj-5': { rating: 5, count: 76 },
  'proj-6': { rating: 5, count: 108 },
};

export const Catalog: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuoteClick = (project: GalleryProject, e: React.MouseEvent) => {
    e.stopPropagation();
    trackConversionEvent('click_whatsapp', {
      category: 'Catalog',
      label: `Cotizar Producto: ${project.title}`,
      source: 'catalog_card_cta',
    });
    const message = `Hola Mr Rótulos, estoy interesado en cotizar el modelo de su catálogo: *${project.title}* (${project.price || 'A convenir'}). ¿Podrían brindarme más información?`;
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="catalogo" className="relative w-full bg-[#0a0000] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Fondo base con degradado radial difuminado en rojo #8C0000 para toda la sección */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_15%,#2e0404_0%,#1c0202_45%,#0e0000_80%,#050000_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Halo de resplandor difuminado principal en rojo #8C0000 */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[450px] sm:h-[650px] bg-[#8C0000]/30 blur-[130px] sm:blur-[170px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Halo de resplandor inferior difuminado */}
      <div 
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[500px] bg-[#8C0000]/20 blur-[160px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Sutil textura arquitectónica */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#8C0000_1.2px,transparent_1.2px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ========================================================
            1. ENCABEZADO DEL CATÁLOGO
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight mb-4 drop-shadow-md">
            Catálogo de Trabajos Realizados
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Explora nuestros modelos predilectos fabricados con acabados de alta durabilidad, iluminación LED de bajo consumo y corte de precisión.
          </p>
        </div>

        {/* ========================================================
            2. GRILLA CONTINUA DE PRODUCTOS / CARDS FLIP 3D
           ======================================================== */}

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center">
            {GALLERY_PROJECTS.map((project, index) => {
              const reviews = PROJECT_REVIEWS[project.id] || { rating: 5, count: 85 };
              const isFlipped = !!flippedIds[project.id];
              const projectImages = project.images && project.images.length > 0 
                ? project.images 
                : [project.image];

              return (
                <div 
                  key={project.id}
                  className="w-full max-w-[370px] h-[480px] [perspective:1200px] group cursor-pointer"
                  onClick={() => toggleFlip(project.id)}
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-[28px] shadow-lg hover:shadow-2xl ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    
                    {/* ----------------------------------------------------
                        CARA FRONTAL: CARRUSEL CIRCULAR DE IMÁGENES QUE SE ADAPTA AL CONTENEDOR
                       ---------------------------------------------------- */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[28px] overflow-hidden bg-[#141414] color-changing-border">
                      <ImageGallery
                        images={projectImages.map((url) => ({ title: project.title, url }))}
                        className="w-full h-full"
                        aspectRatio="w-full h-full"
                        showControls={true}
                        autoPlayInterval={3800 + (index * 500)}
                      />
                    </div>

                    {/* ----------------------------------------------------
                        CARA TRASERA: DESCRIPCIÓN, PRECIOS, ESPECIFICACIONES & BOTÓN COTIZAR
                       ---------------------------------------------------- */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0d0d0d] text-white rounded-[28px] p-6 color-changing-border flex flex-col justify-between overflow-y-auto">
                      
                      {/* Contenido Superior */}
                      <div className="space-y-3">
                        {/* Badge de Categoría & Calificación */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#8C0000]/30 border border-[#8C0000]/50 text-white text-[10px] font-bold uppercase tracking-wider">
                            {project.categoryLabel || 'Mr. Rótulos'}
                          </span>
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(reviews.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                            <span className="text-[11px] text-slate-400 ml-1 font-medium">
                              ({reviews.count})
                            </span>
                          </div>
                        </div>

                        {/* Título */}
                        <h3 className="text-lg sm:text-xl font-extrabold text-white font-display leading-tight">
                          {project.title}
                        </h3>

                        {/* Precios */}
                        <div className="flex items-baseline gap-2 py-1.5 border-y border-white/10">
                          <span className="text-2xl sm:text-3xl font-black text-[#8C0000] font-display">
                            {project.price || 'A convenir'}
                          </span>
                          {project.originalPrice && (
                            <span className="text-xs sm:text-sm font-semibold text-slate-400 line-through">
                              {project.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Descripción del producto */}
                        {project.description && (
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                            {project.description}
                          </p>
                        )}

                        {/* Especificaciones y Características */}
                        <div className="space-y-1.5 pt-1 text-xs text-slate-300">
                          {project.lightingType && (
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-[#8C0000] shrink-0 mt-0.5" />
                              <span><strong className="text-white font-semibold">Iluminación:</strong> {project.lightingType}</span>
                            </div>
                          )}
                          {project.dimension && (
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-[#8C0000] shrink-0 mt-0.5" />
                              <span><strong className="text-white font-semibold">Formato:</strong> {project.dimension}</span>
                            </div>
                          )}
                          {project.includes && (
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-[#8C0000] shrink-0 mt-0.5" />
                              <span><strong className="text-white font-semibold">Incluye:</strong> {project.includes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botón de Cotizar */}
                      <div className="pt-4 mt-2 border-t border-white/10">
                        <button
                          type="button"
                          onClick={(e) => handleQuoteClick(project, e)}
                          className="w-full py-3.5 px-4 rounded-xl bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#8C0000]/40 transition-all cursor-pointer active:scale-95 hover:scale-[1.02]"
                        >
                          <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
                          <span>Cotizar este Modelo</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      {/* Zoom / Full detail Modal */}
      <ImageModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Catalog;
