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
        className="relative overflow-hidden px-6 py-24 md:py-32"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-sequoia-black/10 shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)]"
            >
              <Image
                src={placeholders.aboutTeaser}
                alt="現場とテクノロジーをつなぐAmberのイメージ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow-light mb-4"
              >
                私たちについて
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6 text-3xl font-bold tracking-tight text-sequoia-black md:text-4xl lg:text-5xl"
              >
                現場とテクノロジーの<br />あいだに
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-lead mb-6 text-lg font-bold text-sequoia-black md:text-xl"
              >
                暮らしを支える産業に、最新のテクノロジーを。
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mb-8 text-sm leading-relaxed text-sequoia-black/85 md:text-base"
              >
                AIソリューション（開発・研修・導入支援）とAIプロダクト（Pine）で、現場の業務再設計から定着までを伴走します。ミッション・体制・会社概要は企業情報をご覧ください。
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
          </div>
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
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-sequoia-black mb-12"
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
              alt="パートナーシップ・ビジネスのイメージ(仮の写真)"
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
