"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"

declare global {
  interface Window {
    gsap?: any;
    MotionPathPlugin?: any;
  }
}

export interface ImageData {
  title: string
  url: string
}

const DEFAULT_IMAGES: ImageData[] = [
  {
    title: "Mini canine",
    url: "https://cdn.21st.dev/assets/mirror/b1/b1ab68992eb01519f23a76b122d710baf7737e6fb5ba81fe0e6ce827c0adca53.jpg",
  },
  {
    title: "Wheely tent",
    url: "https://cdn.21st.dev/assets/mirror/5a/5a176462f7be28c9ee9b8feb93bdd78ae287f855e8d1abc19ca7614d124d0d63.jpg",
  },
  {
    title: "Red food things",
    url: "https://cdn.21st.dev/assets/mirror/59/59404a1cb0c461264e7c4a431db19a9562702ea0f8aa98183ea402b4fc36888d.jpg",
  },
  {
    title: "Sand boat",
    url: "https://cdn.21st.dev/assets/mirror/45/45f394d2aeb2dfaa436d09342f030468eb70bf8646e82c6e650c8302063aaded.jpg",
  },
  {
    title: "Screen thing",
    url: "https://cdn.21st.dev/assets/mirror/36/363360a8b7b8cbd8294000ce1b9131a30f69a81300d0830dc249d7ae0b045b34.jpg",
  },
  {
    title: "Horse tornado",
    url: "https://cdn.21st.dev/assets/mirror/c3/c309fef094d8c89f53ee1e530fc7b1d861a63bb4bfd276bc1d9f51ff69ebcddb.jpg",
  },
]

export interface ImageGalleryProps {
  images?: ImageData[]
  className?: string
  aspectRatio?: string
  showControls?: boolean
  autoPlayInterval?: number
  onImageClick?: (image: ImageData, index: number) => void
}

// Main component for the Image Gallery
export function ImageGallery({
  images = DEFAULT_IMAGES,
  className = "",
  aspectRatio = "aspect-[4/3]",
  showControls = true,
  autoPlayInterval = 4500,
  onImageClick
}: ImageGalleryProps) {
  const instanceId = React.useId().replace(/[^a-zA-Z0-9]/g, '_')
  const [opened, setOpened] = useState(0)
  const [inPlace, setInPlace] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [gsapReady, setGsapReady] = useState(false)
  const autoplayTimer = useRef<number | null>(null)

  useEffect(() => {
    // This effect loads the GSAP library and its plugin from a CDN.
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin)
        setGsapReady(true)
        return
      }

      if (!document.querySelector('script[src*="gsap.min.js"]')) {
        const gsapScript = document.createElement("script")
        gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        gsapScript.onload = () => {
          if (!document.querySelector('script[src*="MotionPathPlugin.min.js"]')) {
            const motionPathScript = document.createElement("script")
            motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"
            motionPathScript.onload = () => {
              if (window.gsap && window.MotionPathPlugin) {
                window.gsap.registerPlugin(window.MotionPathPlugin)
                setGsapReady(true)
              }
            }
            document.body.appendChild(motionPathScript)
          }
        }
        document.body.appendChild(gsapScript)
      } else if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin)
        setGsapReady(true)
      } else {
        const checkInterval = setInterval(() => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin)
            setGsapReady(true)
            clearInterval(checkInterval)
          }
        }, 100)
        return () => clearInterval(checkInterval)
      }
    }

    loadScripts()
  }, [])

  const onClick = (index: number) => {
    if (!disabled) setOpened(index)
  }

  const onInPlace = (index: number) => setInPlace(index)

  const next = useCallback(() => {
    setOpened((currentOpened) => {
      let nextIndex = currentOpened + 1
      if (nextIndex >= images.length) nextIndex = 0
      return nextIndex
    })
  }, [images.length])

  const prev = useCallback(() => {
    setOpened((currentOpened) => {
      let prevIndex = currentOpened - 1
      if (prevIndex < 0) prevIndex = images.length - 1
      return prevIndex
    })
  }, [images.length])

  // Disable clicks during animation transitions
  useEffect(() => setDisabled(true), [opened])
  useEffect(() => setDisabled(false), [inPlace])

  // Autoplay and timer reset logic
  useEffect(() => {
    if (!gsapReady || autoPlayInterval <= 0 || images.length <= 1) return

    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current)
    }

    autoplayTimer.current = window.setInterval(next, autoPlayInterval)

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current)
      }
    }
  }, [opened, gsapReady, next, autoPlayInterval, images.length])

  return (
    <div className={`relative w-full h-full overflow-hidden select-none group/gallery ${className}`}>
      <div 
        className={`relative w-full h-full ${aspectRatio} overflow-hidden rounded-[22px] bg-[#121212] shadow-sm`}
        onClick={() => onImageClick && onImageClick(images[opened], opened)}
      >
        {images.length === 1 ? (
          <div className="w-full h-full">
            <img 
              src={images[0]?.url} 
              alt={images[0]?.title || 'Imagen'} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : gsapReady ? (
          images.map((image, i) => (
            <div
              key={`${image.url}-${i}`}
              className="absolute left-0 top-0 h-full w-full cursor-pointer"
              style={{ zIndex: inPlace === i ? i : images.length + 1 }}
            >
              <GalleryImage
                total={images.length}
                id={i}
                instanceId={instanceId}
                url={image.url}
                title={image.title}
                open={opened === i}
                inPlace={inPlace === i}
                onInPlace={onInPlace}
              />
            </div>
          ))
        ) : (
          <div className="w-full h-full">
            <img 
              src={images[0]?.url} 
              alt={images[0]?.title || 'Imagen'} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {showControls && images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-2.5 top-1/2 z-[60] flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-[#8C0000] active:scale-95 disabled:opacity-0"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            disabled={disabled}
            aria-label="Previous Image"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            className="absolute right-2.5 top-1/2 z-[60] flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-md opacity-0 group-hover/gallery:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-[#8C0000] active:scale-95 disabled:opacity-0"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            disabled={disabled}
            aria-label="Next Image"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

interface GalleryImageProps {
  url: string
  title: string
  open: boolean
  inPlace: boolean
  id: number
  instanceId: string
  onInPlace: (id: number) => void
  total: number
}

function GalleryImage({ url, title, open, inPlace, id, instanceId, onInPlace, total }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true)
  const clip = useRef<SVGCircleElement>(null)

  // --- Animation Constants ---
  const gap = 8
  const circleRadius = 5.5
  const defaults = { transformOrigin: "center center" }
  const duration = 0.4
  const width = 400
  const height = 340
  const scale = 700

  const bigSize = circleRadius * scale
  const overlap = 0

  // --- Position Calculation Functions ---
  const getPosSmall = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: 22,
    r: circleRadius,
  })
  const getPosSmallAbove = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  })
  const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 7 })
  const getPosEnd = () => ({ cx: width / 2 - bigSize + overlap, cy: height / 2, r: bigSize })
  const getPosStart = () => ({ cx: width / 2 + bigSize - overlap, cy: height / 2, r: bigSize })

  // --- Animation Logic ---
  useEffect(() => {
    const gsap = window.gsap
    if (!gsap) return

    setLoaded(false)
    if (clip.current) {
      const flipDuration = firstLoad ? 0 : duration
      const upDuration = firstLoad ? 0 : 0.2
      const bounceDuration = firstLoad ? 0.01 : 1
      const delay = firstLoad ? 0 : flipDuration + upDuration

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            duration: upDuration,
            ease: "power3.inOut",
          })
          .to(clip.current, {
            ...defaults,
            ...getPosEnd(),
            duration: flipDuration,
            ease: "power4.in",
            onComplete: () => onInPlace(id),
          })
      } else {
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            delay: delay,
            duration: flipDuration,
            ease: "power4.out",
          })
          .to(clip.current, {
            ...defaults,
            motionPath: {
              path: [getPosSmallAbove(), getPosSmall()],
              curviness: 1,
            },
            duration: bounceDuration,
            ease: "bounce.out",
          })
      }
    }
  }, [open])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={`h-full w-full object-cover transition-opacity duration-200 ${
        open || inPlace ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <defs>
        <clipPath id={`gal_${instanceId}_${id}_circleClip`}>
          <circle className="clip" cx="0" cy="0" r={circleRadius} ref={clip}></circle>
        </clipPath>
        <clipPath id={`gal_${instanceId}_${id}_squareClip`}>
          <rect className="clip" width={width} height={height}></rect>
        </clipPath>
      </defs>
      <g clipPath={`url(#gal_${instanceId}_${id}${inPlace ? "_squareClip" : "_circleClip"})`}>
        <image width={width} height={height} href={url} preserveAspectRatio="xMidYMid slice" className="pointer-events-none"></image>
      </g>
    </svg>
  )
}

interface TabsProps {
  images: ImageData[]
  instanceId: string
  onSelect: (index: number) => void
}

function Tabs({ images, instanceId, onSelect }: TabsProps) {
  const gap = 8
  const circleRadius = 5.5
  const width = 400
  const height = 290

  const getPosX = (i: number) =>
    width / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap)
  const getPosY = () => 22

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full pointer-events-none"
    >
      {images.map((image, i) => (
        <g key={`tab_${instanceId}_${image.url}_${i}`} className="pointer-events-auto">
          <defs>
            <clipPath id={`tab_${instanceId}_${i}_clip`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
            </clipPath>
          </defs>
          <image
            x={getPosX(i) - circleRadius}
            y={getPosY() - circleRadius}
            width={circleRadius * 2}
            height={circleRadius * 2}
            href={image.url}
            clipPath={`url(#tab_${instanceId}_${i}_clip)`}
            className="pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={(e) => {
              e.stopPropagation()
              onSelect(i)
            }}
            className="cursor-pointer fill-white/10 stroke-white/90 hover:stroke-[#8C0000] hover:stroke-[2.5px] transition-all shadow-md"
            strokeWidth="1.5"
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 1.5}
          />
        </g>
      ))}
    </svg>
  )
}

export default ImageGallery;
