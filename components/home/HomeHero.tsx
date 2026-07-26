'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { buildContactHref } from '@/lib/contact'
import { heroCopy, heroMedia } from '@/data/home'
import HeroConversation from '@/components/home/HeroConversation'
import { MOTION_EDITORIAL, MOTION_EASE, STAGGER_HERO_TEXT } from '@/lib/motion-safe'

export default function HomeHero() {
  const prefersReducedMotion = useReducedMotion()
  const [canPlayVideo, setCanPlayVideo] = useState(false)
  const contactHref = buildContactHref('home-hero', 'ai-solution')

  useEffect(() => {
    // モバイルでは大型動画を読み込まない
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setCanPlayVideo(mq.matches && Boolean(heroMedia.videoSrc))
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const showVideo = canPlayVideo && heroMedia.videoSrc && !prefersReducedMotion

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-dark-green md:min-h-[90svh] md:min-h-[700px]">
      {/* Background media */}
      <div className="absolute inset-0">
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
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
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark-green/90 via-dark-green/45 to-dark-green/25"
          aria-hidden
        />
      </div>

      <div className="home-container relative z-10 w-full pb-16 pt-32 md:pb-20 md:pt-36 lg:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: MOTION_EDITORIAL, ease: MOTION_EASE }}
            className="max-w-2xl"
          >
            <h1 className="home-h1 mb-6">
              {heroCopy.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_EDITORIAL, delay: STAGGER_HERO_TEXT, ease: MOTION_EASE }}
              className="mb-10 max-w-xl text-base leading-[1.75] text-white/85 md:text-lg"
            >
              {heroCopy.body}
            </motion.p>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_EDITORIAL, delay: STAGGER_HERO_TEXT * 2, ease: MOTION_EASE }}
              className="flex flex-col gap-3 sm:flex-row sm:gap-4"
            >
              <Link href={contactHref} className="btn-pill-primary w-full sm:w-auto">
                {heroCopy.primaryCta}
              </Link>
              <Link href={heroCopy.secondaryHref} className="btn-pill-secondary w-full sm:w-auto">
                {heroCopy.secondaryCta}
              </Link>
            </motion.div>
          </motion.div>

          <div className="hidden justify-end lg:flex">
            <HeroConversation />
          </div>
        </div>

        {/* Mobile conversation — below CTAs, not overlapping faces */}
        <div className="mt-10 lg:hidden">
          <HeroConversation compact />
        </div>
      </div>
    </section>
  )
}
