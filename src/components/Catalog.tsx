import React, { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { GALLERY_PROJECTS } from '../data/content';
import { GalleryProject } from '../types';
import { ImageModal } from './ImageModal';
import { ImageGallery } from './ui/carousel-circular-image-gallery';
import { buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';

const ITEMS_PER_PAGE = 9;

export const Catalog: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(GALLERY_PROJECTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = GALLERY_PROJECTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const scrollToCatalogTitle = () => {
    const el = document.getElementById('catalogo-titulo') || document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setFlippedId(null);
    scrollToCatalogTitle();
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuoteClick = (project: GalleryProject, e: React.MouseEvent) => {
    e.stopPropagation();
    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: `Cotizar Producto: ${project.title}`,
      source: 'catalog_card_cta',
    });
    const message = `Hola Mr Rótulos, estoy interesado en cotizar el modelo de su catálogo: *${project.title}*. ¿Podrían brindarme más información?`;
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
            1. ENCABEZADO DEL CATÁLOGO (Scroll Anchor)
           ======================================================== */}
        <div id="catalogo-titulo" className="scroll-mt-24 text-center max-w-3xl mx-auto mb-16 sm:mb-20">
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

          {/* Product Cards Grid (Horizontal Pill Video Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center">
            {currentProjects.map((project, index) => {
              const isFlipped = flippedId === project.id;
              const projectImages = project.images && project.images.length > 0 
                ? project.images 
                : [project.image];

              return (
                <div 
                  key={project.id}
                  className="w-full max-w-[390px] h-[295px] sm:h-[325px] md:h-[345px] [perspective:1200px] select-none touch-manipulation cursor-pointer group"
                  onMouseEnter={() => setFlippedId(project.id)}
                  onMouseLeave={() => setFlippedId((prev) => (prev === project.id ? null : prev))}
                  onTouchStart={() => setFlippedId(project.id)}
                  onTouchEnd={() => setFlippedId(null)}
                  onTouchCancel={() => setFlippedId(null)}
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] rounded-[22px] shadow-xl hover:shadow-2xl ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    
                    {/* ----------------------------------------------------
                        CARA FRONTAL: ESTILO PILL/VIDEO CARD CON CARRUSEL CIRCULAR DE FONDO
                       ---------------------------------------------------- */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[22px] overflow-hidden bg-[#141414] border border-white/10 shadow-lg">
                      {/* Galería Circular de fondo que mantiene su animación */}
                      <ImageGallery
                        images={projectImages.map((url) => ({ title: project.title, url }))}
                        className="w-full h-full"
                        aspectRatio="w-full h-full"
                        showControls={true}
                        autoPlayInterval={3800 + (index * 450)}
                      />

                      {/* Overlay Inferior con Título */}
                      <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-4.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
                        <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight font-display drop-shadow-md truncate text-left">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* ----------------------------------------------------
                        CARA TRASERA: INFORMACIÓN TÉCNICA & BOTÓN WHATSAPP
                       ---------------------------------------------------- */}
                    <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0d0d0d] text-white rounded-[22px] p-5 border border-[#8C0000]/50 flex flex-col justify-between overflow-y-auto">
                      
                      {/* Contenido Superior */}
                      <div className="space-y-2.5">
                        {/* Título */}
                        <h3 className="text-base sm:text-lg font-extrabold text-white font-display leading-tight">
                          {project.title}
                        </h3>

                        {/* Descripción */}
                        {project.description && (
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        )}

                        {/* Características compactas */}
                        <div className="space-y-1.5 text-xs text-slate-300 leading-snug">
                          {project.lightingType && (
                            <div className="flex items-start gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#8C0000] shrink-0 mt-0.5" />
                              <span className="line-clamp-1"><strong className="text-white font-semibold">Luz:</strong> {project.lightingType}</span>
                            </div>
                          )}
                          {project.materials && project.materials.length > 0 && (
                            <div className="flex items-start gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#8C0000] shrink-0 mt-0.5" />
                              <span className="line-clamp-2"><strong className="text-white font-semibold">Material:</strong> {Array.isArray(project.materials) ? project.materials.join(', ') : project.materials}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botón de Cotizar */}
                      <div className="pt-2 border-t border-white/10">
                        <button
                          type="button"
                          onClick={(e) => handleQuoteClick(project, e)}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#8C0000]/40 transition-all cursor-pointer active:scale-95 hover:scale-[1.02]"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-white" />
                          <span>Cotizar este Modelo</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================
              3. PAGINACIÓN Y CONTROL DE VISTAS (FLECHAS)
             ======================================================== */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 sm:mt-16">
              {/* Botón Anterior */}
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border ${
                  currentPage === 1
                    ? 'opacity-30 cursor-not-allowed border-white/10 bg-white/5 text-gray-400'
                    : 'cursor-pointer border-white/20 bg-[#1c0202]/90 hover:bg-[#8C0000] text-white hover:border-[#8C0000] shadow-lg shadow-[#8C0000]/25 hover:scale-105 active:scale-95'
                }`}
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>

              {/* Indicadores de Página */}
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-inner">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-full font-extrabold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-[#8C0000] text-white shadow-lg shadow-[#8C0000]/50 scale-105 border border-red-500/40'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    aria-label={`Ir a página ${page}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Botón Siguiente */}
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 border ${
                  currentPage === totalPages
                    ? 'opacity-30 cursor-not-allowed border-white/10 bg-white/5 text-gray-400'
                    : 'cursor-pointer border-white/20 bg-[#1c0202]/90 hover:bg-[#8C0000] text-white hover:border-[#8C0000] shadow-lg shadow-[#8C0000]/25 hover:scale-105 active:scale-95'
                }`}
                aria-label="Página siguiente"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
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
