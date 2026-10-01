import React from 'react';
import { Phone } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { trackConversionEvent, PHONE_NUMBER, buildWhatsAppUrl } from '../utils/analytics';

interface HeaderProps {
  isAdsMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isAdsMode = false }) => {
  const handleCallClick = (source: 'header_call') => {
    trackConversionEvent('click_to_call', {
      category: 'Contact',
      label: 'Llamada telefónica desde encabezado',
      source,
    });
  };

  const handleWhatsAppClick = (source: 'header_whatsapp') => {
    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: 'Clic WhatsApp desde encabezado',
      source,
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#191919] border-b border-[#2d2d2d] transition-shadow duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-3 xs:px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-18 lg:h-20 flex items-center justify-between">
        
        {/* LADO IZQUIERDO: 3 Secciones de navegación en Desktop (Ocultas en Modo Ads) */}
        {!isAdsMode && (
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 2xl:gap-12 text-base lg:text-lg xl:text-xl font-extrabold text-[#F0EDE8] flex-1 justify-end">
            <a href="#inicio" className="hover:text-[#8C0000] transition-colors py-1 px-1 tracking-wide">
              Inicio
            </a>
            <a href="#servicios" className="hover:text-[#8C0000] transition-colors py-1 px-1 tracking-wide">
              Servicios
            </a>
            <a href="#nosotros" className="hover:text-[#8C0000] transition-colors py-1 px-1 tracking-wide">
              Nosotros
            </a>
          </nav>
        )}

        {/* CENTRO / LOGO: Logo y Nombre del Negocio */}
        <div className={`flex items-center ${isAdsMode ? 'justify-start' : 'justify-start lg:justify-center'} px-0 xs:px-2 sm:px-6 xl:px-10 2xl:px-12`}>
          <a href="#" className="flex items-center gap-2 xs:gap-3 sm:gap-3.5 group">
            <img
              src="/logo.png"
              alt="Mr. Rótulos"
              className="w-9 h-9 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain group-hover:scale-105 transition-transform duration-200 shrink-0"
            />
            <span className="text-base xs:text-lg sm:text-2xl lg:text-3xl font-black tracking-tight text-white uppercase leading-none whitespace-nowrap font-display">
              Mr <span className="text-[#8C0000]">Rótulos</span>
            </span>
          </a>
        </div>

        {/* LADO DERECHO: 2 Secciones restantes (Ocultas en Modo Ads) + Botones de Contacto */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-5 flex-1 justify-end">
          {!isAdsMode && (
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10 2xl:gap-12 text-base lg:text-lg xl:text-xl font-extrabold text-[#F0EDE8]">
              <a href="#catalogo" className="hover:text-[#8C0000] transition-colors py-1 px-1 tracking-wide">
                Catálogo
              </a>
              <a href="#contactos" className="hover:text-[#8C0000] transition-colors py-1 px-1 tracking-wide">
                Contactos
              </a>
            </nav>
          )}

          <div className="ml-auto flex items-center gap-2 xs:gap-3 sm:gap-4">
            {/* Botón Llamar (Tablet / Desktop) */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => handleCallClick('header_call')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-[#8C0000] hover:bg-[#730000] rounded-xl shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Llamar</span>
            </a>

            {/* Botón WhatsApp (En móvil ubicado en lugar del menú hamburguesa) */}
            <a
              href={buildWhatsAppUrl('Hola Mr Rótulos, necesito una cotización rápida para un rótulo en Quito.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsAppClick('header_whatsapp')}
              className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold text-white bg-[#8C0000] hover:bg-[#730000] rounded-xl shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
