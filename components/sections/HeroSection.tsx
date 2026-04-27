'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { placeholders } from '@/lib/placeholder-images'

const ease = [0.22, 1, 0.36, 1] as const
const ROTATE_WORDS = ['現場で役立つ', '最新の', '導入しやすい', '成果につながる']
const PINE_HOME_URL = 'https://pine-home.com/'
const HERO_STATS = [
  { value: '58', label: 'Pine運用パートナー店舗' },
  { value: '2', label: '事業軸（Solution / Product）' },
  { value: '24h', label: '最短で初回ヒアリング調整' },
] as const

const titleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  useEffect(() => setIsMounted(true), [])

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const t = setInterval(() => setWordIndex((i) => (i + 1) % ROTATE_WORDS.length), 3200)
    return () => clearInterval(t)
  }, [prefersReducedMotion])

  return (
    <section className="relative min-h-screen pt-40 md:pt-48 lg:pt-56 pb-24 md:pb-28 px-6 overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={placeholders.mountainHero}
          alt=""
          fill
          className="animate-hero-drift object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* 写真の荘厳さを残しつつ、クリーム文字でTreeline寄りのヒーローに */}
      <div className="absolute inset-0 z-[5] bg-[rgba(10,28,20,0.45)] pointer-events-none" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-[rgba(15,42,30,0.2)] via-transparent to-[rgba(10,28,20,0.55)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-[5] h-44 bg-gradient-to-t from-[#FBF7F0] via-[#FBF7F0]/90 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <motion.h1
          initial="hidden"
          animate={isMounted ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="flex flex-col items-center text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-cream)] mb-8 md:mb-10 text-center drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
        >
          <span className="block mb-4 md:mb-6 text-2xl md:text-4xl lg:text-5xl font-medium text-[var(--color-cream-muted)] font-sans">
            暮らしを支える産業に、
          </span>
          <span className="block">
            <span className="relative inline-block h-[1.2em] w-[13em] md:w-[14em] shrink-0 overflow-hidden text-center">
              {prefersReducedMotion ? (
                <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
                  {ROTATE_WORDS[0]}
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                    transition={{ duration: 0.55, ease }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                  >
                    {ROTATE_WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              )}
            </span>
          </span>
          <span className="block mt-1 md:mt-2">テクノロジーを。</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="text-base md:text-lg lg:text-xl text-[var(--color-cream)] leading-relaxed max-w-2xl mx-auto mb-6 text-balance drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)]"
        >
          AIソリューション事業とAIプロダクト事業を通じて、現場に根づく業務基盤をつくります。
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mx-auto max-w-3xl text-sm md:text-base text-[var(--color-cream-muted)]"
        >
          通常のWebシステム開発から生成AIを組み込んだ業務改善、出張訪問サービス向け予約管理システム「Pine」まで、現場の運用に合わせて設計・実装します。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap"
        >
          <Link href="/service/consulting" className="btn-primary w-full min-w-[230px] sm:w-auto">
            開発・AI導入を相談する
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href={PINE_HOME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-hero w-full min-w-[230px] sm:w-auto"
          >
            Pineを見る
            <ExternalLink className="size-4" aria-hidden="true" />
            <span className="sr-only">（新しいタブで開く）</span>
          </a>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, y: 14 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {HERO_STATS.map((item) => (
            <li
              key={item.label}
              className="rounded-sm border border-white/20 bg-white/[0.06] px-4 py-3 text-center backdrop-blur-sm"
            >
              <p className="text-lg font-semibold text-[var(--color-cream)] md:text-xl">{item.value}</p>
              <p className="text-xs text-[var(--color-cream-muted)]">{item.label}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
