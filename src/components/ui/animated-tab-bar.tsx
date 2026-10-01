"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export interface TabItem {
  icon: React.ReactNode;
  color?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
}

export interface AnimatedTabBarProps {
  items: TabItem[];
  defaultIndex?: number;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export const AnimatedTabBar: React.FC<AnimatedTabBarProps> = ({
  items,
  defaultIndex = 0,
  activeIndex: controlledIndex,
  onTabChange,
  className = "",
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const activeIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 380);

  const ballControls = useAnimationControls();
  const pathControls = useAnimationControls();

  const isMountedRef = useRef(false);
  const prevIndexRef = useRef(activeIndex);

  // Medir el ancho del contenedor dinámicamente con ResizeObserver de alto rendimiento
  useEffect(() => {
    if (!containerRef.current) return;

    const initialWidth = containerRef.current.offsetWidth;
    if (initialWidth > 0) {
      setWidth(initialWidth);
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const measured = Math.round(entry.contentRect.width);
        if (measured > 0) {
          setWidth((prev) => (prev !== measured ? measured : prev));
        }
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const itemCount = items.length || 1;
  const itemWidth = width / itemCount;
  const activeCenterX = (activeIndex + 0.5) * itemWidth;

  // Generador de curva SVG optimizado para deslizamiento horizontal
  const generatePath = (cx: number, w: number, depth: number = 48, h: number = 76) => {
    const yTop = 16;
    const halfNotch = 44;
    const currentDepth = Math.max(yTop, depth);
    const cp = 18;

    const x0 = Math.max(0, cx - halfNotch);
    const x3 = Math.min(w, cx + halfNotch);

    return `
      M 0,${yTop}
      L ${x0},${yTop}
      C ${x0 + cp},${yTop} ${cx - cp},${currentDepth} ${cx},${currentDepth}
      C ${cx + cp},${currentDepth} ${x3 - cp},${yTop} ${x3},${yTop}
      L ${w},${yTop}
      L ${w},${h}
      L 0,${h}
      Z
    `.replace(/\s+/g, " ").trim();
  };

  // Efecto maestro: Desplazamiento lateral suave horizontal (sin saltos verticales)
  useEffect(() => {
    // 1. Al cargar la página: fijar posición inicial
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      prevIndexRef.current = activeIndex;
      ballControls.set({
        x: activeCenterX - 26,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
      });
      pathControls.set({
        d: generatePath(activeCenterX, width, 48, 76),
      });
      return;
    }

    // 2. Si cambia de sección: deslizamiento lateral horizontal fluido
    if (prevIndexRef.current !== activeIndex) {
      const toIdx = activeIndex;
      const toCx = (toIdx + 0.5) * itemWidth;
      prevIndexRef.current = activeIndex;

      // Desplazamiento lateral suave del círculo
      ballControls.start({
        x: toCx - 26,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 360,
          damping: 30,
          mass: 0.8,
        },
      });

      // Desplazamiento lateral sincronizado de la muesca
      pathControls.start({
        d: generatePath(toCx, width, 48, 76),
        transition: {
          type: "spring",
          stiffness: 360,
          damping: 30,
          mass: 0.8,
        },
      });
    } else {
      ballControls.set({ x: activeCenterX - 26, y: 0 });
      pathControls.set({ d: generatePath(activeCenterX, width, 48, 76) });
    }
  }, [activeIndex, activeCenterX, width, itemWidth, ballControls, pathControls]);

  const handleItemClick = (index: number) => {
    if (controlledIndex === undefined) {
      setInternalIndex(index);
    }
    const item = items[index];
    if (item?.onClick) {
      item.onClick();
    } else if (item?.href) {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      style={{ height: "calc(74px + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Base sólida inferior idéntica al Hero (#0a0000) anti-subpixel gap y soporte safe-area */}
      <div className="absolute inset-x-0 -bottom-2 h-10 bg-[#0a0000] pointer-events-none" />

      {/* Fondo SVG con muesca interactiva en color exacto del Hero (#0a0000) con borde #8C0000 */}
      <svg
        className="absolute top-0 left-0 w-full h-[76px] pointer-events-none"
        viewBox={`0 0 ${width} 76`}
        preserveAspectRatio="none"
      >
        <motion.path
          d={generatePath(activeCenterX, width, 48, 76)}
          fill="#0a0000"
          animate={pathControls}
        />
      </svg>

      {/* Botón Círculo Flotante: Rojo Milano Deslizante con Ícono en Blanco (Acelerado en GPU) */}
      <motion.div
        className="absolute top-[2px] z-20 w-[52px] h-[52px] rounded-full flex items-center justify-center cursor-pointer overflow-hidden shadow-[0_8px_25px_rgba(140,0,0,0.65),0_0_18px_rgba(140,0,0,0.5)] ring-2 ring-[#8C0000]/60 will-change-transform transform-gpu"
        style={{
          background: "linear-gradient(135deg, #B81D1D 0%, #8C0000 55%, #6B0000 100%)",
        }}
        animate={ballControls}
      >
        {/* Destello de luz reflectante diagonal estático */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/35 via-white/10 to-transparent pointer-events-none rounded-full" />

        {/* Ícono Activo en Blanco con transición suave */}
        <motion.div
          key={activeIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 450, damping: 26 }}
          className="relative z-10 text-white [&_svg]:stroke-white [&_svg]:w-6 [&_svg]:h-6 [&_svg]:stroke-[2.2] flex items-center justify-center will-change-transform"
        >
          {activeItem?.icon}
        </motion.div>
      </motion.div>

      {/* Elementos de Navegación (Iconos Inactivos y Etiquetas con estilo del Hero) */}
      <div className="relative z-10 w-full h-full flex items-center justify-around pt-3 pb-[env(safe-area-inset-bottom,0px)]">
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleItemClick(index)}
              className="flex-1 h-full flex flex-col items-center justify-center cursor-pointer outline-none group select-none"
              aria-label={item.label || `Pestaña ${index + 1}`}
            >
              <div
                className={`transition-[opacity,transform] duration-200 ease-out will-change-[opacity,transform] flex flex-col items-center justify-center ${
                  isActive
                    ? "opacity-0 pointer-events-none translate-y-2.5 scale-75"
                    : "opacity-85 group-hover:opacity-100 group-hover:scale-105 active:scale-95"
                }`}
              >
                <div className="w-6 h-6 text-[#E8E5DF]/80 group-hover:text-white transition-colors duration-150 flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5 [&_svg]:stroke-current [&_svg]:stroke-[2.2]">
                  {item.icon}
                </div>
                {item.label && (
                  <span className="text-[10px] font-bold text-[#E8E5DF]/85 group-hover:text-white transition-colors duration-150 mt-1 leading-none tracking-tight">
                    {item.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
