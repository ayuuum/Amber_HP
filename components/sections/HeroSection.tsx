'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import AnimatedTextCycle from '@/components/ui/animated-text-cycle'
import { fadeUpItem, staggerContainer } from '@/lib/motion-safe'
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />
      </div>

      {/* 左：コピー・CTA */}
      <div
        className={cn(
          'relative z-20 flex w-full flex-col justify-start bg-color-bg/35 px-6 py-10 backdrop-blur-[1px]',
          'md:w-1/2 md:justify-center md:px-10 md:py-12 lg:w-3/5 lg:px-14 lg:py-16',
          'md:bg-color-bg md:backdrop-blur-0',
        )}
      >
        <div>
          <motion.div
            className="md:border-0 md:bg-transparent md:p-0 md:shadow-none"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="flex flex-col gap-y-1 text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] md:text-5xl md:leading-[1.08] md:text-sequoia-black md:drop-shadow-none lg:text-[64px] xl:text-7xl"
              variants={fadeUpItem}
            >
              <span className="block whitespace-nowrap">暮らしを支える産業に、</span>
              <span className="block whitespace-nowrap">
                <AnimatedTextCycle
                  words={heroTechModifiers}
                  interval={3800}
                  className="whitespace-nowrap text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] md:text-sequoia-black md:drop-shadow-none"
                />
              </span>
              <span className="block whitespace-nowrap">テクノロジーを。</span>
            </motion.h1>

            <motion.div
              className="my-5 h-1 w-20 rounded-sm bg-sequoia-green md:my-6"
              variants={fadeUpItem}
              aria-hidden
            />

            <motion.div
              className="mt-2 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3"
              variants={fadeUpItem}
            >
              <Link
                href="/#services"
                className="btn-primary"
              >
                サービスを見る
              </Link>
              <Link
                href="/company#contact"
                className="text-base font-semibold text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] underline underline-offset-4 transition-colors hover:text-sequoia-green md:text-sequoia-black/70 md:drop-shadow-none md:no-underline md:hover:text-sequoia-green"
              >
                お問い合わせ
              </Link>
            </motion.div>
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
            : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
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

      {/* スクロールインジケーター */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sequoia-black/45">
          Scroll
        </span>
        <span className="relative flex h-9 w-[1px] overflow-hidden bg-sequoia-black/15">
          {!prefersReducedMotion && (
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-sequoia-green"
              animate={{ y: ['-100%', '300%'] }}
              transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
            />
          )}
        </span>
      </motion.div>
    </section>
  )
}
