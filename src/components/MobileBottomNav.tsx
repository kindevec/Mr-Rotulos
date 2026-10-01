import React, { useState, useEffect, useRef } from 'react';
import { AnimatedTabBar, TabItem } from './ui/animated-tab-bar';
import { Home, Layers, Sparkles, Users, Send } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { buildWhatsAppUrl, trackConversionEvent } from '../utils/analytics';

interface MobileBottomNavProps {
  isAdsMode?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ isAdsMode = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = (href: string) => {
    isNavigatingRef.current = true;
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1100);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 70;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Las 5 secciones oficiales con Catálogo en el medio exacto (índice 2)
  const mobileTabItems: TabItem[] = [
    {
      label: 'Inicio',
      href: '#inicio',
      color: '#8C0000',
      icon: <Home className="w-5 h-5" />,
      onClick: () => scrollToSection('#inicio'),
    },
    {
      label: 'Servicios',
      href: '#servicios',
      color: '#8C0000',
      icon: <Layers className="w-5 h-5" />,
      onClick: () => scrollToSection('#servicios'),
    },
    {
      label: 'Catálogo',
      href: '#catalogo',
      color: '#8C0000',
      icon: <Sparkles className="w-5 h-5" />,
      onClick: () => scrollToSection('#catalogo'),
    },
    {
      label: 'Nosotros',
      href: '#nosotros',
      color: '#8C0000',
      icon: <Users className="w-5 h-5" />,
      onClick: () => scrollToSection('#nosotros'),
    },
    {
      label: 'Contactos',
      href: '#contactos',
      color: '#8C0000',
      icon: <Send className="w-5 h-5" />,
      onClick: () => scrollToSection('#contactos'),
    },
  ];

  // Escuchar el scroll para sincronizar la pestaña activa en tiempo real
  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const checkScrollPosition = () => {
      ticking = false;

      // Si el usuario acaba de presionar una pestaña, ignorar el scroll intermedio
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Si llegó al fondo de la página, fijar Contactos (última sección)
      if (scrollY + windowHeight >= docHeight - 80) {
        setActiveIndex(mobileTabItems.length - 1);
        return;
      }

      const triggerPoint = scrollY + windowHeight * 0.38;

      // Mapear cada pestaña a su posición vertical real en la página
      const tabPositions = mobileTabItems
        .map((item, index) => {
          const id = item.href?.replace('#', '');
          const el = id ? document.getElementById(id) : null;
          return {
            index,
            id,
            top: el ? el.offsetTop : -1,
          };
        })
        .filter((item) => item.top >= 0)
        // Ordenar de abajo hacia arriba para detectar la sección activa correcta
        .sort((a, b) => b.top - a.top);

      for (const tab of tabPositions) {
        if (triggerPoint >= tab.top) {
          setActiveIndex((prev) => (prev !== tab.index ? tab.index : prev));
          break;
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(checkScrollPosition);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handleTabChange = (index: number) => {
    isNavigatingRef.current = true;
    setActiveIndex(index);

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1100);
  };

  if (isAdsMode) {
    return (
      <aside
        aria-label="Cotización Inmediata Móvil"
        className="fixed bottom-0 inset-x-0 z-40 w-full lg:hidden bg-[#0d0000]/95 backdrop-blur-xl border-t border-[#8C0000]/60 px-3 py-2.5 shadow-[0_-10px_35px_rgba(140,0,0,0.5)] flex items-center justify-center pointer-events-auto"
      >
        <a
          href={buildWhatsAppUrl('Hola Mister Rótulos, deseo una cotización inmediata para mi negocio en Quito.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            trackConversionEvent('click_whatsapp', {
              category: 'Lead',
              label: 'WhatsApp Barra Móvil Ads',
              source: 'floating_whatsapp',
            });
          }}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs xs:text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all duration-200 shadow-black/40"
        >
          <WhatsAppIcon className="w-5 h-5 fill-current text-white" />
          <span>COTIZAR POR WHATSAPP EN 15 MIN</span>
        </a>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Navegación Móvil"
      className="fixed -bottom-[1px] inset-x-0 z-40 w-full lg:hidden pointer-events-auto select-none"
    >
      <AnimatedTabBar
        items={mobileTabItems}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />
    </aside>
  );
};
