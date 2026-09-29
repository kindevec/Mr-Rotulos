import React, { useState } from 'react';
import { Phone, Menu, X, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { trackConversionEvent, PHONE_NUMBER, FORMATTED_PHONE, buildWhatsAppUrl } from '../utils/analytics';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        
        {/* LADO IZQUIERDO: 3 Secciones de navegación */}
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

        {/* CENTRO: Logo y Nombre del Negocio */}
        <div className="flex items-center justify-center px-0 xs:px-2 sm:px-6 xl:px-10 2xl:px-12">
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

        {/* LADO DERECHO: 2 Secciones restantes + Botones */}
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-5 flex-1 justify-end">
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 2xl:gap-12 text-base lg:text-lg xl:text-xl font-extrabold text-[#F0EDE8]">
            <a href="#catalogo" className="hover:text-[#8C0000] transition-colors py-1 px-1 tracking-wide">
              Catálogo
            </a>
            <a href="#contactos" className="hover:text-[#8C0000] transition-colors py-1 px-1 tracking-wide">
              Contactos
            </a>
          </nav>

          <div className="ml-auto flex items-center gap-2 xs:gap-3 sm:gap-4">

          {/* Botón Llamar */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={() => handleCallClick('header_call')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-[#8C0000] hover:bg-[#730000] rounded-xl shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Llamar</span>
          </a>

          {/* Botón WhatsApp */}
          <a
            href={buildWhatsAppUrl('Hola Mr Rótulos, necesito una cotización rápida para un rótulo en Quito.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick('header_whatsapp')}
            className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold text-white bg-[#8C0000] hover:bg-[#730000] rounded-xl shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Botón de Menú Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 sm:w-7 sm:h-7" /> : <Menu className="w-6 h-6 sm:w-7 sm:h-7" />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile slide down drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#191919] border-t border-[#2d2d2d] px-5 py-4 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-2 text-base font-bold text-[#F0EDE8]">
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Servicios
            </a>
            <a
              href="#nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Nosotros
            </a>
            <a
              href="#catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Catálogo
            </a>
            <a
              href="#contactos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg bg-[#8C0000] text-white font-bold flex items-center justify-between"
            >
              <span>Contactos</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </nav>
          <div className="pt-2 border-t border-[#2d2d2d] flex flex-col gap-2">
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={() => {
                setMobileMenuOpen(false);
                handleCallClick('header_call');
              }}
              className="w-full py-2.5 flex items-center justify-center gap-2 bg-[#8C0000] hover:bg-[#730000] rounded-xl font-bold text-xs text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Llamar al {FORMATTED_PHONE}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
