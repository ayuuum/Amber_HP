'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { buildContactHref } from '@/lib/contact'
import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import {
  fadeUpEditorialItem,
  MOTION_EASE,
  MOTION_HERO_VIDEO,
  MOTION_HERO_VIDEO_DELAY,
  staggerContainerHero,
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
            className="absolute inset-0 h-full w-full max-w-full object-cover"
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
          <motion.div initial="hidden" animate="visible" variants={staggerContainerHero}>
            <motion.h1 className="hero-heading flex flex-col gap-y-1 text-white md:gap-y-2 md:text-sequoia-black" variants={fadeUpEditorialItem}>
              <span className="block break-keep md:whitespace-nowrap">暮らしを支える産業に、</span>
              <span className="block md:whitespace-nowrap">
                <AnimatedTextCycle
                  words={heroTechModifiers}
                  interval={3800}
                  className="text-white md:text-sequoia-green"
                />
              </span>
              <span className="block md:whitespace-nowrap">テクノロジーを。</span>
            </motion.h1>
            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={fadeUpEditorialItem}
            >
              <Link
                href={buildContactHref('hero')}
                className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-semibold shadow-sm transition-[background-color,transform,box-shadow] duration-brand hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgb(255_255_255_/_0.28)] max-md:bg-[var(--color-cream)] max-md:text-[var(--color-green-dark)] max-md:hover:bg-white md:btn-primary"
              >
                相談する
              </Link>
              <Link href="/#lineup" className="btn-hero-outline min-w-[160px]">
                サービスを見る
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-0 hidden min-h-[calc(100dvh-5rem)] w-full md:block md:w-1/2 lg:w-2/5"
        initial={
          prefersReducedMotion
            ? { clipPath: clipTo, opacity: 1 }
            : { clipPath: clipFrom, opacity: 0 }
        }
        animate={{ clipPath: clipTo, opacity: 1 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: MOTION_HERO_VIDEO,
                delay: MOTION_HERO_VIDEO_DELAY,
                ease: MOTION_EASE,
                opacity: { duration: MOTION_HERO_VIDEO * 0.85, delay: MOTION_HERO_VIDEO_DELAY + 0.15 },
              }
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
            className="absolute inset-0 h-full w-full max-w-full object-cover"
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
