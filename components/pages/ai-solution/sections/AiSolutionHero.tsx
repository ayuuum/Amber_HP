'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { aiSolutionAssets } from '@/lib/ai-solution-assets'
import {
  fadeUpEditorialItem,
  MOTION_EASE,
  MOTION_HERO_VIDEO,
  MOTION_HERO_VIDEO_DELAY,
  staggerContainerHero,
} from '@/lib/motion-safe'
import { cn } from '@/lib/utils'

const clipFrom = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
const clipTo = 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)'

export default function AiSolutionHero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className={cn(
        'relative flex min-h-[88vh] w-full flex-col bg-color-bg text-sequoia-black md:min-h-screen md:flex-row md:overflow-hidden',
        'border-b border-sequoia-black/10 pt-24 md:pt-20',
      )}
      aria-label="AIソリューション"
    >
      <div className="pointer-events-none absolute inset-0 z-0 md:hidden" aria-hidden>
        <Image
          src={aiSolutionAssets.stages.flow}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-black/20" />
      </div>

      <div
        className={cn(
          'relative z-20 flex w-full flex-col justify-end px-6 pb-12 md:w-[46%] md:justify-center md:px-10 md:py-16 lg:w-[44%] lg:px-14',
          'min-h-[calc(100dvh-5rem)] md:min-h-0 md:bg-color-bg',
        )}
      >
        <div className="max-w-2xl">
          <motion.div initial={false} animate="visible" variants={staggerContainerHero}>
            <motion.p
              className="eyebrow-light mb-4 text-white/85 md:text-sequoia-black/70"
              variants={fadeUpEditorialItem}
            >
              AIソリューション
            </motion.p>
            <motion.h1
              className="page-heading mb-4 text-[clamp(2rem,9vw,3.6rem)] text-white md:mb-6 md:text-[clamp(2.75rem,5.1vw,4.6rem)] md:text-sequoia-black"
              variants={fadeUpEditorialItem}
            >
              AIを、
              <br />
              現場の仕事にする
            </motion.h1>
            <motion.p
              className="mb-6 text-base font-medium text-white/85 md:text-lg md:text-sequoia-green"
              variants={fadeUpEditorialItem}
            >
              人材開発支援助成金 対象 | 上場企業への研修実績あり
            </motion.p>
            <motion.p
              className="text-body mb-8 max-w-xl text-white/85 md:text-sequoia-black/80"
              variants={fadeUpEditorialItem}
            >
              導入して終わりにしない。従業員10〜300名の企業向けに、業務に根づく生成AI研修と開発を提供します。
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 lg:flex-row lg:items-center"
              variants={fadeUpEditorialItem}
            >
              <Link
                href="#ai-solution-form"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold shadow-sm transition-[background-color,transform,box-shadow] duration-brand hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none lg:w-[200px] max-md:bg-[var(--color-cream)] max-md:text-[var(--color-green-dark)] max-md:hover:bg-white md:bg-green-dark md:text-white md:hover:bg-green-dark/85 md:focus-visible:shadow-[0_0_0_3px_rgba(27,58,45,0.25)]"
              >
                <span className="whitespace-nowrap">無料相談を予約する</span>
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="#ai-solution-form"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-sm border px-5 text-sm font-semibold transition-[border-color,color,background-color] duration-brand focus-visible:outline-none focus-visible:ring-2 lg:w-[200px] max-md:border-white/60 max-md:bg-black/10 max-md:text-white max-md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] max-md:hover:border-white md:border-sequoia-black/20 md:text-sequoia-black md:hover:border-green-dark md:hover:bg-green-dark/5 md:hover:text-green-dark md:focus-visible:ring-green-dark/30"
              >
                <span className="whitespace-nowrap">資料をダウンロード</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-0 hidden min-h-[calc(100dvh-5rem)] w-full overflow-hidden md:block md:w-[54%] lg:w-[56%]"
        initial={prefersReducedMotion ? false : { clipPath: clipFrom }}
        animate={{ clipPath: clipTo }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: MOTION_HERO_VIDEO,
                delay: MOTION_HERO_VIDEO_DELAY,
                ease: MOTION_EASE,
              }
        }
        style={{ clipPath: clipTo }}
      >
        <Image
          src={aiSolutionAssets.stages.flow}
          alt=""
          fill
          className="object-cover"
          sizes="56vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-color-bg/88 via-color-bg/18 to-transparent"
          aria-hidden
        />
      </motion.div>
    </section>
  )
}
