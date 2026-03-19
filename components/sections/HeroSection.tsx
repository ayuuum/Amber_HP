'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { GenerativeMountainScene } from '@/components/ui/mountain-scene'

const ease = [0.22, 1, 0.36, 1] as const
const ROTATE_WORDS = ['現場で役立つ', '最新の', '導入しやすい', '成果につながる']

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
      {/* 1. 動く背景グラデーション（控えめな opacity） */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,_rgba(196,154,108,0.08)_0,_rgba(196,154,108,0)_65%)] blur-3xl"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }
          }
          transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 12, ease: 'easeInOut' }}
          aria-hidden
        />
        <motion.div
          className="absolute top-1/4 left-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,_rgba(196,154,108,0.06)_0,_rgba(196,154,108,0)_60%)] blur-3xl"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { x: [0, -30, 0], y: [0, 15, 0], scale: [1, 1.1, 1] }
          }
          transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 15, ease: 'easeInOut' }}
          aria-hidden
        />
        <motion.div
          className="absolute bottom-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(196,154,108,0.04)_0,_rgba(196,154,108,0)_55%)] blur-3xl"
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { x: [0, 20, 0], y: [0, 25, 0], scale: [1, 1.05, 1] }
          }
          transition={prefersReducedMotion ? { duration: 0 } : { repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          aria-hidden
        />
      </div>

      {/* 2. 山シーン（薄めの opacity） */}
      <div className="absolute inset-0 z-0 opacity-[0.10]" aria-hidden>
        <GenerativeMountainScene color="#C49A6C" />
      </div>

      {/* テキスト視認性のオーバーレイ */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-[#FBF7F0]/50 via-transparent to-[#FBF7F0]/40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
        <motion.h1
          initial="hidden"
          animate={isMounted ? 'visible' : 'hidden'}
          variants={titleVariants}
          className="flex flex-col items-center text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-sequoia-black mb-8 md:mb-10 text-center"
        >
          <span className="block mb-4 md:mb-6 text-2xl md:text-4xl lg:text-5xl font-medium opacity-80 font-sans">
            暮らしを支える人に、
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
          className="text-base md:text-lg lg:text-xl text-sequoia-black/90 leading-relaxed max-w-2xl mx-auto mb-6 text-balance"
        >
          現場の負担を減らし、時間と収益を取り戻す。導入だけで終わらず、定着まで一緒に進めます。
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mx-auto max-w-3xl text-sm md:text-base text-sequoia-black/70"
        >
          AI導入支援とホームサービス向け業務システムで、現場のオペレーションをなめらかに整えます。
        </motion.p>
      </div>
    </section>
  )
}
