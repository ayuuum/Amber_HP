'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export default function StatementSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      ref={ref}
      className="section-forest relative overflow-hidden px-6 py-32 md:py-44"
      aria-label="Amberの姿勢"
    >
      {/* 上部装飾：薄い金のアクセントライン */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(212,168,83,0.4) 50%, transparent 100%)',
        }}
      />
      {/* 中央のhalo：視線を中心に集める */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[80%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245,245,244,0.10) 0%, rgba(245,245,244,0.04) 30%, transparent 70%)',
        }}
      />
      {/* 装飾：右下の薄い円で奥行き */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -bottom-32 h-[480px] w-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(245,245,244,0.08) 0%, transparent 60%)',
        }}
      />
      {/* 装飾：左上の薄い円 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 1.0, ease }}
          className="eyebrow-forest mb-8"
        >
          私たちが向き合うこと
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 1.0, delay: 0.15, ease }}
          className="text-3xl font-bold leading-[1.4] tracking-tight text-[var(--color-cream)] md:text-5xl lg:text-6xl"
        >
          現場で動かないAIに、<br />価値はない。
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="mx-auto mt-12 max-w-2xl text-base leading-relaxed text-[var(--color-cream-muted)] md:text-lg"
        >
          ツールを買うことではなく、業務を作り直すこと。
          <br className="hidden md:inline" />
          それが、Amberが向き合うたったひとつの問いです。
        </motion.p>
      </div>
    </section>
  )
}
