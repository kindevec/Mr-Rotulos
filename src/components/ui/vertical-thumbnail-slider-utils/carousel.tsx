"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { cn } from "@/lib/utils";

interface CarouselContextType {
  mainRef: ReturnType<typeof useEmblaCarousel>[0];
  mainApi: ReturnType<typeof useEmblaCarousel>[1];
  thumbsRef: ReturnType<typeof useEmblaCarousel>[0];
  thumbsApi: ReturnType<typeof useEmblaCarousel>[1];
  selectedIndex: number;
  onThumbClick: (index: number) => void;
  thumbnails: string[];
  registerThumbnail: (index: number, src: string) => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

export function useSliderContext() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useSliderContext must be used within a Carousel");
  }
  return context;
}

interface CarouselProps {
  options?: EmblaOptionsType;
  className?: string;
  children: ReactNode;
}

export const Carousel: React.FC<CarouselProps> = ({ options, className, children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const [mainRef, mainApi] = useEmblaCarousel({
    loop: false,
    ...options,
  });

  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y",
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbsApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbsApi.scrollTo(index);
  }, [mainApi, thumbsApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
    };
  }, [mainApi, onSelect]);

  const registerThumbnail = useCallback((index: number, src: string) => {
    setThumbnails((prev) => {
      const next = [...prev];
      next[index] = src;
      return next;
    });
  }, []);

  return (
    <CarouselContext.Provider
      value={{
        mainRef,
        mainApi,
        thumbsRef,
        thumbsApi,
        selectedIndex,
        onThumbClick,
        thumbnails,
        registerThumbnail,
      }}
    >
      <div className={cn("relative flex gap-3 select-none", className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

interface SliderContainerProps {
  className?: string;
  children: ReactNode;
}

export const SliderContainer: React.FC<SliderContainerProps> = ({ className, children }) => {
  const { mainRef } = useSliderContext();

  return (
    <div ref={mainRef} className={cn("overflow-hidden flex-1", className)}>
      <div className="flex h-full touch-pan-y">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ index?: number }>, { index });
          }
          return child;
        })}
      </div>
    </div>
  );
};

interface SliderProps {
  thumbnailSrc?: string;
  className?: string;
  children: ReactNode;
  index?: number;
}

export const Slider: React.FC<SliderProps> = ({ thumbnailSrc, className, children, index = 0 }) => {
  const { registerThumbnail } = useSliderContext();

  useEffect(() => {
    if (thumbnailSrc) {
      registerThumbnail(index, thumbnailSrc);
    }
  }, [thumbnailSrc, index, registerThumbnail]);

  return (
    <div className={cn("min-w-0 flex-[0_0_100%] h-full relative", className)}>
      {children}
    </div>
  );
};

interface ThumbsSliderProps {
  className?: string;
  thumbsClassName?: string;
  thumbsSliderClassName?: string;
}

export const ThumbsSlider: React.FC<ThumbsSliderProps> = ({
  className,
  thumbsClassName,
  thumbsSliderClassName,
}) => {
  const { thumbsRef, thumbnails, selectedIndex, onThumbClick } = useSliderContext();

  return (
    <div className={cn("shrink-0", className)}>
      <div ref={thumbsRef} className={cn("overflow-hidden", thumbsClassName)}>
        <div className="flex flex-col gap-2.5 h-full">
          {thumbnails.map((src, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                type="button"
                aria-label={`Ver diapositiva ${index + 1}`}
                className={cn(
                  "relative w-16 sm:w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shrink-0",
                  isSelected
                    ? "border-[#8C0000] ring-2 ring-[#8C0000]/30 opacity-100 scale-102"
                    : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-400",
                  thumbsSliderClassName
                )}
              >
                <img
                  src={src}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const SliderDotButton: React.FC<{ index: number; onClick: () => void }> = ({ index, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-500 transition-colors"
      aria-label={`Ir al punto ${index + 1}`}
    />
  );
};
