'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import {
  fadeUpEditorialItem,
  MOTION_EASE,
  MOTION_HERO_VIDEO,
  MOTION_HERO_VIDEO_DELAY,
  staggerContainerEditorial,
} from '@/lib/motion-safe'
import { cn } from '@/lib/utils'
import { placeholders } from '@/lib/placeholder-images'

const heroTechModifiers: string[] = ['最新の', '現場で使える', '業務に根づく']
const heroVideoSrc = '/videos/hero-mountains.mp4'

const clipFrom = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
const clipTo = 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)'

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative flex min-h-screen w-full flex-col bg-color-bg text-sequoia-black md:flex-row md:overflow-hidden',
        'pt-24 md:pt-20',
      )}
      aria-label="トップヒーロー"
    >
      <div className="pointer-events-none absolute inset-0 z-0 md:hidden" aria-hidden>
        {prefersReducedMotion ? (
          <Image
            src={placeholders.mountainHero}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div
        className={cn(
          'relative z-20 flex w-full min-h-[calc(100dvh-5rem)] flex-col justify-end bg-transparent px-6 pb-12',
          'md:w-1/2 md:min-h-0 md:justify-center md:px-10 md:py-10 lg:w-3/5 lg:px-14 lg:py-12',
          'md:bg-color-bg',
        )}
      >
        <div className="max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerEditorial}>
            <motion.h1 className="hero-heading flex flex-col gap-y-2 text-white md:text-sequoia-black" variants={fadeUpEditorialItem}>
              <span>暮らしを支える産業に、</span>
              <span>
                <AnimatedTextCycle
                  words={heroTechModifiers}
                  interval={3800}
                  className="text-white md:text-sequoia-green"
                />
              </span>
              <span>テクノロジーを。</span>
            </motion.h1>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-0 hidden min-h-[calc(100dvh-5rem)] w-full md:block md:w-1/2 lg:w-2/5"
        initial={prefersReducedMotion ? { clipPath: clipTo } : { clipPath: clipFrom }}
        animate={{ clipPath: clipTo }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: MOTION_HERO_VIDEO, delay: MOTION_HERO_VIDEO_DELAY, ease: MOTION_EASE }
        }
      >
        {prefersReducedMotion ? (
          <Image
            src={placeholders.mountainHero}
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-color-bg/95 via-color-bg/75 to-transparent"
          aria-hidden
        />
      </motion.div>
    </section>
  )
}
