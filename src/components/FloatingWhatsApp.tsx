import React, { useState, useEffect, useRef } from 'react';
import { buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';

const WhatsAppOfficialIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.15C10.57 20.15 9.12 19.75 7.85 19L7.55 18.82L4.44 19.64L5.27 16.61L5.07 16.3C4.24 14.98 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.68 12.04 3.68C14.25 3.68 16.31 4.54 17.87 6.1C19.42 7.66 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.05 20.15ZM16.56 14.39C16.31 14.27 15.09 13.67 14.87 13.59C14.64 13.5 14.48 13.46 14.31 13.71C14.15 13.96 13.69 14.5 13.55 14.66C13.41 14.83 13.27 14.85 13.02 14.73C12.77 14.6 11.98 14.34 11.04 13.51C10.31 12.86 9.82 12.06 9.68 11.81C9.54 11.56 9.66 11.43 9.79 11.3C9.9 11.19 10.03 11.02 10.15 10.88C10.28 10.74 10.32 10.63 10.4 10.47C10.48 10.3 10.44 10.16 10.38 10.04C10.32 9.91 9.82 8.7 9.62 8.19C9.41 7.7 9.21 7.77 9.06 7.76H8.58C8.41 7.76 8.15 7.82 7.92 8.07C7.69 8.32 7.05 8.92 7.05 10.14C7.05 11.36 7.94 12.54 8.06 12.7C8.19 12.87 9.81 15.36 12.28 16.43C12.87 16.68 13.33 16.83 13.69 16.95C14.28 17.13 14.82 17.11 15.25 17.04C15.72 16.97 16.71 16.44 16.92 15.86C17.13 15.27 17.13 14.78 17.06 14.66C17 14.54 16.81 14.51 16.56 14.39Z"/>
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl('Hola Mr. Rótulos, me gustaría cotizar un rótulo para mi negocio.');
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealedMobile, setIsRevealedMobile] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar el botón si el usuario hace click/touch fuera en móvil
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsRevealedMobile(false);
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('mousedown', handleOutsideClick);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobileView = typeof window !== 'undefined' && window.innerWidth < 1024;

    if (isMobileView) {
      // Si en móvil está recogido, el primer toque NO va a WhatsApp, solo lo revela
      if (!isRevealedMobile) {
        e.preventDefault();
        setIsRevealedMobile(true);

        // Si el cliente no lo aplasta, vuelve a ocultarse tras 5.5 segundos
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
          setIsRevealedMobile(false);
        }, 5500);
        return;
      }

      // Si ya estaba revelado y el cliente lo aplasta, navega normalmente a WhatsApp
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    }

    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: 'Clic WhatsApp flotante interactivo',
      source: 'floating_whatsapp',
    });
  };

  const isVisible = isHovered || isRevealedMobile;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:bottom-[calc(1.75rem+env(safe-area-inset-bottom,0px))] right-0 z-50 flex items-center select-none pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botón Flotante de WhatsApp: Verde Oficial con Sombra y Pulso */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-button"
        onClick={handleButtonClick}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`relative group flex items-center justify-center w-11 h-11 xs:w-12 xs:h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#20BA5A] border-2 border-white/80 shadow-[0_6px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(37,211,102,0.5)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.5),0_0_22px_rgba(37,211,102,0.7)] transition-all duration-400 ease-out cursor-pointer active:scale-95 ${
          isVisible
            ? '-translate-x-3 sm:-translate-x-4 md:-translate-x-5 md:scale-110'
            : 'translate-x-6 sm:translate-x-7 md:translate-x-8 md:hover:translate-x-0'
        }`}
        aria-label="Contactar por WhatsApp a Mr. Rótulos"
      >
        {/* Anillo de pulso verde cuando está en reposo */}
        <span
          className={`absolute inset-0 rounded-full bg-[#25D366] transition-opacity duration-300 pointer-events-none ${
            isVisible ? 'opacity-0' : 'opacity-45 animate-ping'
          }`}
        />

        {/* Ícono Oficial de WhatsApp en color blanco */}
        <WhatsAppOfficialIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 text-white relative z-10 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
