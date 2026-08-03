'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { buildContactHref } from '@/lib/contact'
import { heroCopy, heroMedia } from '@/data/home'

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion()
  const [canPlayVideo, setCanPlayVideo] = useState(false)
  const contactHref = buildContactHref('home-hero', 'ai-solution')

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setCanPlayVideo(mq.matches && Boolean(heroMedia.videoSrc))
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const showVideo = canPlayVideo && heroMedia.videoSrc && !prefersReducedMotion

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-dark-green md:min-h-[92svh]">
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            className="h-full w-full object-cover object-[70%_center]"
            autoPlay
            muted
            loop
            playsInline
            poster={heroMedia.poster}
            aria-hidden
          >
            <source src={heroMedia.videoSrc!} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={heroMedia.image}
            alt={heroMedia.imageAlt}
            fill
            priority
            className="object-cover object-[70%_center]"
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,21,17,0.92)_0%,rgba(8,21,17,0.78)_42%,rgba(8,21,17,0.35)_68%,rgba(8,21,17,0.22)_100%)]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/55 via-transparent to-dark-green/30" aria-hidden />
      </div>

      <div className="home-container relative z-10 w-full pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="max-w-xl">
          <h1 className="home-hero-title mb-7">
            {heroCopy.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mb-5 max-w-lg text-[0.95rem] font-normal leading-[1.85] text-white/90 md:text-base md:leading-[1.9]">
            {heroCopy.body}
          </p>

          <p className="mb-9 text-[13px] leading-relaxed tracking-wide text-white/60">
            {heroCopy.highlights.join('  ·  ')}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href={contactHref} className="btn-pill-on-dark w-full sm:w-auto">
              {heroCopy.primaryCta}
            </Link>
            <Link href={heroCopy.secondaryHref} className="btn-pill-ghost-on-dark w-full sm:w-auto">
              {heroCopy.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
