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
                現場が回り続ける仕組みを、技術で実装する。
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
      className="relative overflow-hidden px-6 pt-32 pb-24 md:pt-40 md:pb-36"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ページヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <p className="eyebrow-light mb-4">企業情報</p>
          <h2 className="page-heading mb-6">Amberについて</h2>
        </motion.div>

        {/* ミッション + 写真 Split型 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-sequoia-black/10 shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)]">
            <Image
              src={placeholders.aboutTeaser}
              alt="Amberのミッションを表すイメージ"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-sequoia-green">ミッション</p>
            <h3 className="mb-8 text-2xl font-bold leading-[1.3] tracking-tight text-sequoia-black md:text-3xl lg:text-4xl">
              現場が回り続ける仕組みを、<br />技術で実装する。
            </h3>
            <div className="space-y-5 text-sm leading-relaxed text-sequoia-black/85 md:text-base">
              <p>
                ハウスクリーニング、物流、介護、建設、製造。暮らしを支える産業の業務には、まだ手作業や属人的な仕組みが多く残っています。
              </p>
              <p>
                Amberは、現場で動く生成AIシステムと業務管理プロダクトを、設計から定着まで一気通貫で届けています。
              </p>
              <p>
                研修して終わりにしない、開発して終わりにしない。現場で使われ続けるところまでが、私たちの仕事です。
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
