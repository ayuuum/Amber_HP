'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { MOTION_BASE, MOTION_EASE } from '@/lib/motion-safe'

type AboutSectionProps = {
  /** トップ用の短い要約。企業ページでは省略。 */
  variant?: 'default' | 'teaser'
}

export default function AboutSection({ variant = 'default' }: AboutSectionProps) {
  const sectionRef = useRef(null)

  if (variant === 'teaser') {
    return (
      <section
        id="company-intro"
        ref={sectionRef}
        className="relative overflow-hidden border-t border-sequoia-black/10 bg-color-bg-subtle"
      >
        <div className="grid md:grid-cols-2 md:items-stretch">
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: MOTION_BASE, ease: MOTION_EASE }}
            className="relative min-h-[320px] md:min-h-[480px]"
          >
            <Image
              src="/images/about-mission-mountain.png"
              alt="Amberのミッションを表すイメージ"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sequoia-black/25 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-color-bg-subtle/20"
              aria-hidden
            />
          </motion.div>
          <div className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-16">
            <div className="section-header mb-0 max-w-xl">
              <motion.h2
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION_BASE, ease: MOTION_EASE }}
                className="heading-h3 mb-4"
              >
                暮らしを支える産業に特化し、設計から定着まで一気通貫で届けます。
              </motion.h2>
              <motion.p
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: MOTION_BASE, delay: 0.04, ease: MOTION_EASE }}
                className="text-body mb-8 text-sequoia-black/85"
              >
                現場が回り続ける仕組みを、技術で実装する。
              </motion.p>
            </div>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_BASE, delay: 0.08, ease: MOTION_EASE }}
            >
              <Link href="/company" className="text-link">
                企業情報を見る
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-color-bg-subtle px-6 pt-32 pb-24 md:pt-40 md:pb-36"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_BASE, ease: MOTION_EASE }}
          className="section-header mb-0 md:mb-24"
        >
          <p className="eyebrow-light mb-4">企業情報</p>
          <h2 className="page-heading mb-6">Amberについて</h2>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_BASE, delay: 0.04, ease: MOTION_EASE }}
          className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-sequoia-black/10 md:aspect-[4/5]">
            <Image
              src="/images/about-mission-mountain.png"
              alt="Amberのミッションを表すイメージ"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
          <div className="surface-card rounded-sm p-6 md:p-8">
            <p className="text-caption mb-4 font-semibold uppercase tracking-[0.2em] text-sequoia-green">
              ミッション
            </p>
            <h3 className="heading-h3 mb-8">
              現場が回り続ける仕組みを、
              <br className="hidden md:inline" />
              技術で実装する。
            </h3>
            <div className="space-y-5 text-body text-sequoia-black/85">
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
