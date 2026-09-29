"use client";

import React from "react";
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
} from "./vertical-thumbnail-slider-utils/carousel";
import type { EmblaOptionsType } from "embla-carousel";

export interface VerticalSliderSlide {
  image: string;
  title: string;
  badge?: string;
}

const DEFAULT_SLIDES: VerticalSliderSlide[] = [
  {
    image: "/catalog/catalog-1.jpg",
    title: "Rótulo 3D + Giratorio Sabores Lojanos",
    badge: "Promoción Especial"
  },
  {
    image: "/catalog/catalog-2.jpg",
    title: "Rótulo Luminoso Restaurantes El Arepazo Paisa",
    badge: "LED 110V Alto Brillo"
  },
  {
    image: "/autotec-rotulo.jpg",
    title: "Letras Corpóreas AUTOTEC Tecnología & Seguridad",
    badge: "Corte Router CNC"
  },
  {
    image: "/reypollo-rotulo.jpg",
    title: "Rótulo Publicitario Luminoso La Brasa del Rey Pollo",
    badge: "Máximo Impacto Visual"
  },
  {
    image: "/nestle-rotulo.jpg",
    title: "Letras Corpóreas 3D Nestlé sobre Jardín Vertical",
    badge: "Acabado Corporativo"
  },
  {
    image: "/catalog/catalog-3.jpg",
    title: "Fachada Comercial en Gran Formato Asia Repuestos",
    badge: "Doble Nivel"
  }
];

interface VerticalThumbsSliderProps {
  slides?: VerticalSliderSlide[];
  className?: string;
  sliderHeight?: string;
}

export function VerticalthumbsSlider({
  slides = DEFAULT_SLIDES,
  className,
  sliderHeight = "h-[360px] sm:h-[420px] md:h-[460px]"
}: VerticalThumbsSliderProps) {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
  };

  return (
    <Carousel options={OPTIONS} className={`relative flex flex-row items-center gap-3 sm:gap-4 w-full ${className || ''}`}>
      
      {/* Contenedor Principal de la Diapositiva Activa */}
      <SliderContainer className={`gap-2 ${sliderHeight} w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#E8E5DF] bg-slate-900`}>
        {slides.map((slide, index) => (
          <Slider
            key={index}
            index={index}
            className="h-full w-full relative group"
            thumbnailSrc={slide.image}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
            
            {/* Título de pie de foto */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              {slide.badge && (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#8C0000] text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                  {slide.badge}
                </span>
              )}
              <p className="text-sm sm:text-base md:text-lg font-black font-display text-white drop-shadow-md">
                {slide.title}
              </p>
            </div>
          </Slider>
        ))}
      </SliderContainer>

      {/* Miniaturas Verticales a la Derecha */}
      <ThumbsSlider
        className="w-16 sm:w-20 shrink-0"
        thumbsClassName={`${sliderHeight} flex items-center`}
        thumbsSliderClassName="border-[#E8E5DF] hover:border-[#8C0000]"
      />

    </Carousel>
  );
}

export default VerticalthumbsSlider;
