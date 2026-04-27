'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { placeholders } from '@/lib/placeholder-images'

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  useEffect(() => setIsMounted(true), [])

  // 文字の subtle な「呼吸」を、reduced motion 環境では無効化
  const breathAnimation = prefersReducedMotion
    ? undefined
    : { opacity: [1, 0.92, 1] }

  return (
    <section className="relative min-h-screen pt-40 md:pt-48 lg:pt-56 pb-24 md:pb-28 px-6 overflow-hidden flex items-center">
      {/* 背景画像：ゆっくりドリフトする山写真 */}
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

      {/* オーバーレイ群（深緑の濃淡で写真を引き締める） */}
      <div className="absolute inset-0 z-[5] bg-[rgba(10,28,20,0.45)] pointer-events-none" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-[rgba(15,42,30,0.2)] via-transparent to-[rgba(10,28,20,0.55)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-[5] h-56 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

      {/* 中央コンテンツ */}
      <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 1.0, ease }}
          className="mb-8 text-4xl font-bold leading-[1.2] tracking-tight text-[var(--color-cream)] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] md:mb-10 md:text-6xl lg:text-7xl"
        >
          <motion.span
            className="block mb-2 md:mb-3"
            animate={breathAnimation}
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          >
            暮らしを支える産業に、
          </motion.span>
          <motion.span
            className="block"
            animate={breathAnimation}
            transition={{
              duration: 7,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: 0.4,
            }}
          >
            最新のテクノロジーを。
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mx-auto max-w-2xl text-balance text-base leading-relaxed text-[var(--color-cream)] drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] md:text-lg lg:text-xl"
        >
          AIソリューションとAIプロダクトで、産業の業務基盤を。
        </motion.p>
      </div>

      {/* スクロール促し */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isMounted ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease }}
          className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
            className="h-12 w-px bg-[var(--color-cream-muted)]"
          />
        </motion.div>
      )}
    </section>
  )
}
