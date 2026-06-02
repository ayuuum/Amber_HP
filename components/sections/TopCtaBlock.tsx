'use client'

import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SplitHeading from '@/components/ui/split-heading'

export default function TopCtaBlock() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="section-pad border-t border-sequoia-black/10 bg-color-bg"
    >
      <div className="mx-auto max-w-4xl">
        {/* カード本体：深緑グラデ + グロー */}
        <div className="relative overflow-hidden rounded-sm bg-green-dark px-8 py-16 text-white shadow-[0_32px_80px_-24px_rgba(10,28,20,0.5)] md:px-16 md:py-20">
          {/* 右奥グロー */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-sequoia-green opacity-20 blur-[100px]"
          />
          {/* グリッドテクスチャ */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            {/* 左：コピー */}
            <div className="max-w-lg">
              <motion.p
                className="eyebrow-forest mb-5"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                お問い合わせ
              </motion.p>
              <SplitHeading
                as="h2"
                className="mb-5 text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white md:text-4xl lg:text-5xl"
                delay={0.05}
              >
                お気軽にご相談ください。
              </SplitHeading>
              <motion.p
                className="text-sm leading-relaxed text-white/75 md:text-base"
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                現場の課題を整理し、AI導入の優先順位を確認します。
              </motion.p>
            </div>

            {/* 右：CTA */}
            <motion.div
              className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/company#contact"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold text-green-dark shadow-sm transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-sequoia-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                お問い合わせ
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/25 px-8 py-4 text-sm font-medium text-white/90 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/45 hover:bg-white/8"
              >
                サービスを見る
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
