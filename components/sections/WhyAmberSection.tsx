'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crosshair, Footprints, Anchor, type LucideIcon } from 'lucide-react'

const strengths: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '業界を絞り込む',
    desc: '暮らしを支える産業に特化しています。業界の業務構造を深く理解し、共通する型をプロダクトとシステムに落とし込んでいきます。',
    icon: Crosshair,
  },
  {
    num: '02',
    title: '提案書の前に、現場に入る',
    desc: '業務をヒアリングのみでは設計しません。現場で業務動線を共に歩いた上で提案します。机上で設計したシステムが現場で使われない構造を、私たちは熟知しています。',
    icon: Footprints,
  },
  {
    num: '03',
    title: '定着まで伴走する',
    desc: '納品では終わらせません。導入後の運用、現場定着、効果検証までをパッケージにしています。「使われなければ意味がない」を前提とした設計思想です。',
    icon: Anchor,
  },
]

export default function WhyAmberSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="why-amber"
      ref={sectionRef}
      className="bg-color-bg-subtle px-6 py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 grid gap-6 md:mb-24 md:grid-cols-[200px_1fr] md:items-end md:gap-12"
        >
          <p className="eyebrow-light">Amberの3つの特徴</p>
          <h2 className="section-heading">
            業界を絞り、現場に入り、<br className="hidden md:inline" />定着まで伴走
          </h2>
        </motion.div>

        {/* メイン1つ：大型表示 */}
        {(() => {
          const main = strengths[0]
          const MainIcon = main.icon
          return (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-16 grid gap-12 border-y border-sequoia-black/10 py-16 md:grid-cols-[1fr_2fr] md:gap-20 md:py-20"
            >
              <div>
                <div className="mb-8 flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sequoia-green/10">
                    <MainIcon className="h-8 w-8 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                  </div>
                  <p className="text-7xl font-black leading-none tracking-tight text-sequoia-green/25 md:text-8xl">
                    {main.num}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="mb-6 text-2xl font-bold tracking-tight text-sequoia-black md:text-4xl">
                  {main.title}
                </h3>
                <p className="text-base leading-relaxed text-sequoia-black/85 md:text-lg">{main.desc}</p>
              </div>
            </motion.div>
          )
        })()}

        {/* サブ2つ：横並び */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {strengths.slice(1).map((s, idx) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-5 flex items-baseline gap-4">
                  <Icon className="h-7 w-7 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                  <p className="text-4xl font-black leading-none tracking-tight text-sequoia-green/30 md:text-5xl">
                    {s.num}
                  </p>
                </div>
                <h3 className="mb-3 text-lg font-bold tracking-tight text-sequoia-black md:text-xl">{s.title}</h3>
                <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
