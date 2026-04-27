'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { placeholders } from '@/lib/placeholder-images'
import { ArrowRight } from 'lucide-react'

type AboutSectionProps = {
  /** トップ用の短い要約。企業ページでは省略。 */
  variant?: 'default' | 'teaser'
}

export default function AboutSection({ variant = 'default' }: AboutSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  if (variant === 'teaser') {
    return (
      <section
        id="company-intro"
        ref={sectionRef}
        className="relative overflow-hidden px-6 py-20 md:py-24"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 font-serif text-2xl font-bold text-sequoia-black md:text-3xl"
          >
            現場とテクノロジーのあいだに
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-lead mb-6 text-xl font-bold text-sequoia-black md:text-2xl"
          >
            暮らしを支える産業に、最新のテクノロジーを。
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 text-base leading-relaxed text-sequoia-black/85 md:text-lg"
          >
            AI Solution（コンサル・開発・研修）と AI SaaS（Pine）で、現場の業務再設計から定着まで伴走します。ミッション・体制・会社概要は企業情報をご覧ください。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/company"
              className="btn-secondary inline-flex min-w-[200px] items-center justify-center gap-2"
            >
              企業情報を見る
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-40 md:pt-48 lg:pt-56 pb-32 px-6 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-sequoia-black mb-12"
        >
          私たちについて
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-12 max-w-3xl mx-auto"
        >
          <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-sequoia-black/10 shadow-sm bg-sequoia-black/5">
            <Image
              src={placeholders.handshake}
              alt="パートナーシップ・ビジネスのイメージ（仮の写真）"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-10 text-base md:text-lg leading-relaxed text-sequoia-black"
        >
          <motion.p variants={itemVariants} className="text-lead font-bold text-2xl md:text-3xl mb-10">
            「暮らしを支える産業に、最新のテクノロジーを。」
          </motion.p>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto">
            現場の負担を減らす。AI導入支援とホームサービス向けの業務システムを提供しています。
          </motion.p>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto">
            手作業や属人化に奪われた時間を、テクノロジーで取り戻します。
          </motion.p>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto">
            現場が楽になる仕組みを、一緒につくります。
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
