'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { heroCopy, heroMedia } from '@/data/home'
import HomeHeroInquiry from '@/components/home/HomeHeroInquiry'

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion()
  const [canPlayVideo, setCanPlayVideo] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setCanPlayVideo(mq.matches && Boolean(heroMedia.videoSrc))
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const showVideo = canPlayVideo && heroMedia.videoSrc && !prefersReducedMotion

  return (
    <section className="relative flex min-h-0 items-start bg-dark-green md:min-h-[92svh] md:items-center">
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(8,21,17,0.88)_0%,rgba(8,21,17,0.72)_36%,rgba(8,21,17,0.38)_66%,rgba(8,21,17,0.22)_100%)]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/45 via-transparent to-dark-green/20" aria-hidden />
      </div>

      <div className="home-container relative z-10 w-full pb-10 pt-24 md:pb-16 md:pt-32">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.9fr)] lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0 max-w-xl lg:pt-0">
            <h1 className="home-hero-title mb-3 md:mb-6">
              {heroCopy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mb-5 max-w-md text-[0.95rem] font-normal leading-[1.75] text-white/90 md:mb-8 md:max-w-lg md:text-base md:leading-[1.9]">
              {heroCopy.body}
            </p>

            <Link href={heroCopy.secondaryHref} className="btn-pill-ghost-on-dark w-full sm:w-auto">
              {heroCopy.secondaryCta}
            </Link>
          </div>

          <div className="flex w-full justify-center">
            <HomeHeroInquiry />
          </div>
        </div>
      </div>
    </section>
  )
}
