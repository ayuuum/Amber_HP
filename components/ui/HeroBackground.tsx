'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'

type HeroBackgroundProps = {
  imageSrc: string
  imageAlt: string
  videoSrc?: string
  posterSrc?: string
  priority?: boolean
}

/** Full-bleed still or muted looping video; prefers-reduced-motion → still. */
export default function HeroBackground({
  imageSrc,
  imageAlt,
  videoSrc,
  posterSrc,
  priority = true,
}: HeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const useVideo = Boolean(videoSrc) && prefersReducedMotion !== true

  return (
    <div className="absolute inset-0 overflow-hidden">
      {useVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc ?? imageSrc}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          className="object-cover object-center"
          sizes="100vw"
        />
      )}
    </div>
  )
}
