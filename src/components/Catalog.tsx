import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Sparkles, RotateCcw, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { GALLERY_PROJECTS } from '../data/content';
import { GalleryProject } from '../types';
import { ImageModal } from './ImageModal';
import { ImageGallery } from './ui/carousel-circular-image-gallery';
import { buildWhatsAppUrl, trackConversionEvent, detectSearchIntent } from '../utils/analytics';

const ITEMS_PER_PAGE = 9;

type CatalogCategory = 'letreros-3d' | 'rotulos-fachadas' | 'cajas-luz' | 'stands-publicidad' | 'todos';

interface CategoryFilterTab {
  id: CatalogCategory;
  label: string;
  badge?: string;
}

const CATEGORY_TABS: CategoryFilterTab[] = [
  { id: 'letreros-3d', label: 'Letreros 3D' },
  { id: 'rotulos-fachadas', label: 'Rótulos & Fachadas Comerciales' },
  { id: 'cajas-luz', label: 'Cajas de Luz, Menuderos & Neón' },
  { id: 'stands-publicidad', label: 'Stands, Vallas & Señalética' },
  { id: 'todos', label: 'Todos los Trabajos' },
];

// Sets de IDs exactos según los títulos y tipos del catálogo real
const LETREROS_3D_PROJECT_IDS = new Set([
  'proj-4',  // Letras Acero Inoxidable
  'proj-6',  // Letreros 3D Panaderías
  'proj-7',  // Letras en Acero inoxidable con césped sintético
  'proj-8',  // Letras 3D Acrílicas con Respaldo Alucubónd
  'proj-9',  // Letras volumétricas
  'proj-12', // Letras 3D luz directa
  'proj-13', // Logos circulares
  'proj-14', // Logotipo Empresarial Alto Relieves
  'proj-15', // Letras retro iluminacion
  'proj-18', // Letras retro iluminacion
  'proj-20', // Letras 3D sin luz + Instalación
]);

const ROTULOS_FACHADAS_PROJECT_IDS = new Set([
  'proj-1',  // Rótulos Promoción
  'proj-2',  // Restaurantes & Asaderos
  'proj-3',  // Peluquerías
  'proj-21', // Rótulo luminoso
  'proj-23', // Alucobond
]);

const CAJAS_LUZ_PROJECT_IDS = new Set([
  'proj-5',  // Rompe Tráfico 🚦 Redondos
  'proj-11', // Neón Flex
  'proj-16', // Letreros Forma de nube
  'proj-21', // Rótulo luminoso
  'proj-22', // Menudero individuales
]);

const STANDS_PUBLICIDAD_PROJECT_IDS = new Set([
  'proj-10', // Arañas Publicitarias
  'proj-17', // Señalética en vidrio acrílico
  'proj-19', // Stands
  'proj-24', // Vallas publicitarias
]);

export const Catalog: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>('letreros-3d');
  const flippedTimerRef = useRef<number | null>(null);
  const catalogGridRef = useRef<HTMLDivElement>(null);

  // Cerrar tarjeta volteada cuando se toca fuera en móvil
  useEffect(() => {
    const handleOutsideInteraction = (e: MouseEvent | TouchEvent) => {
      if (catalogGridRef.current && !catalogGridRef.current.contains(e.target as Node)) {
        setFlippedId(null);
        if (flippedTimerRef.current) clearTimeout(flippedTimerRef.current);
      }
    };

    document.addEventListener('touchstart', handleOutsideInteraction, { passive: true });
    document.addEventListener('mousedown', handleOutsideInteraction);

    return () => {
      document.removeEventListener('touchstart', handleOutsideInteraction);
      document.removeEventListener('mousedown', handleOutsideInteraction);
      if (flippedTimerRef.current) clearTimeout(flippedTimerRef.current);
    };
  }, []);

  const handleCardFlip = (id: string) => {
    setFlippedId((prev) => {
      const next = prev === id ? null : id;
      if (flippedTimerRef.current) clearTimeout(flippedTimerRef.current);
      if (next !== null) {
        flippedTimerRef.current = window.setTimeout(() => {
          setFlippedId(null);
        }, 5000);
      }
      return next;
    });
  };

  // Pre-seleccionar la categoría según la búsqueda de Google Ads
  useEffect(() => {
    const intent = detectSearchIntent();
    if (intent === 'letras-3d') {
      setActiveCategory('letreros-3d');
    } else if (intent === 'rotulos') {
      setActiveCategory('rotulos-fachadas');
    } else if (intent === 'cajas-de-luz') {
      setActiveCategory('cajas-luz');
    } else if (intent === 'stands') {
      setActiveCategory('stands-publicidad');
    } else {
      setActiveCategory('letreros-3d');
    }
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'todos') return GALLERY_PROJECTS;
    if (activeCategory === 'letreros-3d') {
      return GALLERY_PROJECTS.filter((p) => LETREROS_3D_PROJECT_IDS.has(p.id));
    }
    if (activeCategory === 'rotulos-fachadas') {
      return GALLERY_PROJECTS.filter((p) => ROTULOS_FACHADAS_PROJECT_IDS.has(p.id));
    }
    if (activeCategory === 'cajas-luz') {
      return GALLERY_PROJECTS.filter((p) => CAJAS_LUZ_PROJECT_IDS.has(p.id));
    }
    if (activeCategory === 'stands-publicidad') {
      return GALLERY_PROJECTS.filter((p) => STANDS_PUBLICIDAD_PROJECT_IDS.has(p.id));
    }
    return GALLERY_PROJECTS;
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
        <div id="catalogo-titulo" className="scroll-mt-24 text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight mb-4 drop-shadow-md">
            Catálogo de Trabajos Realizados
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Explora nuestros modelos predilectos fabricados con acabados de alta durabilidad, corte de precisión e iluminación LED de bajo consumo.
          </p>
        </div>

        {/* ========================================================
            FILTROS DE CATEGORÍA
           ======================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-16 max-w-4xl mx-auto px-1 sm:px-0">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id);
                  setCurrentPage(1);
                }}
                className={`relative inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 text-center ${
                  isActive
                    ? 'bg-[#8C0000] text-white shadow-lg shadow-[#8C0000]/50 border border-red-500/60 scale-[1.02] sm:scale-105'
                    : 'bg-[#141414]/90 hover:bg-[#202020] text-slate-300 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================
            2. GRILLA CONTINUA DE PRODUCTOS / CARDS FLIP 3D
           ======================================================== */}

          {/* Product Cards Grid (Horizontal Pill Video Style) */}
          <div ref={catalogGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 justify-items-center">
            {currentProjects.map((project, index) => {
              const isFlipped = flippedId === project.id;
              const projectImages = project.images && project.images.length > 0 
                ? project.images 
                : [project.image];

              return (
                <div 
                  key={project.id}
                  className="w-full max-w-[390px] h-[295px] sm:h-[325px] md:h-[345px] [perspective:1200px] select-none touch-manipulation cursor-pointer group"
                  onMouseEnter={() => {
                    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                      setFlippedId(project.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
                      setFlippedId(null);
                    }
                  }}
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] rounded-[22px] shadow-xl hover:shadow-2xl ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    
                    {/* ----------------------------------------------------
                        CARA FRONTAL: ESTILO PILL/VIDEO CARD CON CARRUSEL CIRCULAR DE FONDO
                       ---------------------------------------------------- */}
                    <div 
                      onClick={() => handleCardFlip(project.id)}
                      className={`absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-[22px] overflow-hidden bg-[#141414] border border-white/10 shadow-lg ${
                        !isFlipped ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
                      }`}
                    >
                      {/* Galería Circular de fondo que mantiene su animación */}
                      <ImageGallery
                        images={projectImages.map((url) => ({ title: project.title, url }))}
                        className="w-full h-full"
                        aspectRatio="w-full h-full"
                        showControls={true}
                        autoPlayInterval={3800 + (index * 450)}
                      />

                      {/* Overlay Inferior con Título Blanco y Centrado */}
                      <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-4.5 bg-gradient-to-t from-black/95 via-black/70 to-transparent pointer-events-none text-center">
                        <h3 className="text-sm sm:text-base font-extrabold text-white leading-tight font-display drop-shadow-md truncate text-center">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* ----------------------------------------------------
                        CARA TRASERA: INFORMACIÓN TÉCNICA & BOTÓN WHATSAPP
                       ---------------------------------------------------- */}
                    <div 
                      onClick={() => setFlippedId(null)}
                      className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-[#1c1c1c] via-[#141414] to-[#0d0d0d] text-white rounded-[22px] p-5 border border-[#8C0000]/50 flex flex-col justify-between overflow-y-auto ${
                        isFlipped ? 'pointer-events-auto z-20' : 'pointer-events-none z-0'
                      }`}
                    >
                      
                      {/* Contenido Superior */}
                      <div className="space-y-2.5">
                        {/* Título Blanco y Centrado */}
                        <h3 className="text-base sm:text-lg font-extrabold text-white font-display leading-tight text-center">
                          {project.title}
                        </h3>

                        {/* Descripción */}
                        {project.description && (
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 text-center">
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

                      {/* Botón de Cotizar Directo a WhatsApp con aislamiento total de eventos */}
                      <div className="pt-2 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={buildWhatsAppUrl(`Hola Mr Rótulos, estoy interesado en cotizar el modelo de su catálogo: *${project.title}*. ¿Podrían brindarme más información?`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            trackConversionEvent('click_whatsapp', {
                              category: 'Lead',
                              label: `Cotizar Producto: ${project.title}`,
                              source: 'catalog_card_cta',
                            });
                          }}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#8C0000] hover:bg-[#730000] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#8C0000]/40 transition-all cursor-pointer active:scale-95 hover:scale-[1.02]"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-white" />
                          <span>Cotizar este Modelo</span>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================
              3. PAGINACIÓN Y CONTROL DE VISTAS (FLECHAS Y NÚMEROS EN UNA SOLA LÍNEA)
             ======================================================== */}
          {totalPages > 1 && (
            <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-3 mt-10 sm:mt-16 w-full px-2">
              {/* Botón Anterior */}
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center justify-center gap-1 h-9 px-3 sm:h-11 sm:px-5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 border shrink-0 ${
                  currentPage === 1
                    ? 'opacity-30 cursor-not-allowed border-white/10 bg-white/5 text-gray-400'
                    : 'cursor-pointer border-white/20 bg-[#1c0202]/90 hover:bg-[#8C0000] text-white hover:border-[#8C0000] shadow-md shadow-[#8C0000]/25 hover:scale-105 active:scale-95'
                }`}
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline sm:inline">Anterior</span>
              </button>

              {/* Indicadores de Página */}
              <div className="flex items-center gap-1 sm:gap-1.5 bg-black/70 backdrop-blur-md p-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10 shadow-inner shrink-0">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full font-extrabold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 ${
                      currentPage === page
                        ? 'bg-[#8C0000] text-white shadow-md shadow-[#8C0000]/50 scale-105 border border-red-500/40'
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
                className={`flex items-center justify-center gap-1 h-9 px-3 sm:h-11 sm:px-5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 border shrink-0 ${
                  currentPage === totalPages
                    ? 'opacity-30 cursor-not-allowed border-white/10 bg-white/5 text-gray-400'
                    : 'cursor-pointer border-white/20 bg-[#1c0202]/90 hover:bg-[#8C0000] text-white hover:border-[#8C0000] shadow-md shadow-[#8C0000]/25 hover:scale-105 active:scale-95'
                }`}
                aria-label="Página siguiente"
              >
                <span className="hidden xs:inline sm:inline">Siguiente</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
