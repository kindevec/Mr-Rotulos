import React, { useState, useEffect } from 'react';
import { Home, Layers, Sparkles, Send } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { trackConversionEvent, buildWhatsAppUrl } from '../utils/analytics';

export const MobileBottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inicio' | 'servicios' | 'catalogo' | 'nosotros' | 'contactos'>('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const servicios = document.getElementById('servicios');
      const catalogo = document.getElementById('catalogo');
      const nosotros = document.getElementById('nosotros');
      const contactos = document.getElementById('contactos');

      if (contactos && scrollPos >= contactos.offsetTop) {
        setActiveTab('contactos');
      } else if (catalogo && scrollPos >= catalogo.offsetTop) {
        setActiveTab('catalogo');
      } else if (nosotros && scrollPos >= nosotros.offsetTop) {
        setActiveTab('nosotros');
      } else if (servicios && scrollPos >= servicios.offsetTop) {
        setActiveTab('servicios');
      } else {
        setActiveTab('inicio');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppMobile = () => {
    trackConversionEvent('click_whatsapp', {
      category: 'Lead',
      label: 'Clic WhatsApp desde barra móvil inferior',
      source: 'floating_whatsapp',
    });
  };

  return (
    <nav 
      aria-label="Navegación Móvil" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8E5DF] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto h-13">
        {/* Tab 1: Inicio */}
        <a
          href="#inicio"
          onClick={() => setActiveTab('inicio')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'inicio' ? 'text-[#8C0000] font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Inicio</span>
        </a>

        {/* Tab 2: Servicios */}
        <a
          href="#servicios"
          onClick={() => setActiveTab('servicios')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'servicios' ? 'text-[#8C0000] font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Servicios</span>
        </a>

        {/* Tab 3: Central Highlighted WhatsApp Button */}
        <div className="flex items-center justify-center">
          <a
            href={buildWhatsAppUrl('Hola Mr Rótulos, necesito cotizar desde Quito.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppMobile}
            className="pulse-whatsapp -mt-5 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg border-2 border-white active:scale-95 transition-transform"
            aria-label="Chatear por WhatsApp"
          >
            <WhatsAppIcon className="w-6 h-6 fill-current" />
          </a>
        </div>

        {/* Tab 4: Catálogo */}
        <a
          href="#catalogo"
          onClick={() => setActiveTab('catalogo')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'catalogo' ? 'text-[#8C0000] font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Catálogo</span>
        </a>

        {/* Tab 5: Contactos */}
        <a
          href="#contactos"
          onClick={() => setActiveTab('contactos')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] transition-colors ${
            activeTab === 'contactos' ? 'text-[#8C0000] font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Send className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Contactos</span>
        </a>
      </div>
    </nav>
  );
};
