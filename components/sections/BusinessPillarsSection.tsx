'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ExternalLink, Layers, Package, type LucideIcon } from 'lucide-react'

type Pillar = {
  num: string
  label: string
  title: string
  description: string
  items: string[]
  href: string
  cta: string
  external?: boolean
  icon: LucideIcon
}

const pillars: Pillar[] = [
  {
    num: '01',
    label: '事業 01',
    title: 'AIソリューション',
    description:
      'AIシステム開発、生成AI活用研修、導入コンサルティングを組み合わせ、現場の業務に馴染む仕組みを設計・実装します。',
    items: ['AIシステム開発', '生成AI活用研修', '導入コンサルティング'],
    href: '/service/development',
    cta: '事業の詳細を見る',
    icon: Layers,
  },
  {
    num: '02',
    label: '事業 02',
    title: 'AIプロダクト',
    description:
      '個社支援で見えた業界共通の課題を、出張訪問サービス向け業務管理SaaS「Pine」としてプロダクト化しています。',
    items: ['予約・顧客管理', 'LINE / Web予約', '生成AI機能の拡張'],
    href: 'https://pine-home.com/',
    cta: 'Pineを見る',
    external: true,
    icon: Package,
  },
]

export default function BusinessPillarsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section
      ref={ref}
      className="border-t border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36"
      aria-labelledby="business-pillars-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="section-header"
        >
          <p className="eyebrow-light mb-4">事業の全体像</p>
          <h2
            id="business-pillars-heading"
            className="section-heading mb-6"
          >
            現場で磨き、<br />仕組みにする。
          </h2>
          <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
            個別支援で得た知見を整理し、共通する部分をプロダクトに反映していきます。2つの事業を行き来しながら、現場で使える業務基盤を整えていきます。
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <motion.article
                key={pillar.label}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative overflow-hidden rounded-sm border border-sequoia-black/10 bg-white p-10 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-sequoia-green/40 hover:shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)] md:p-12"
              >
                {/* 背景の巨大番号 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-12 select-none text-[200px] font-black leading-none tracking-tight text-sequoia-green/[0.05] md:text-[240px]"
                >
                  {pillar.num}
                </span>

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <Icon
                      className="h-10 w-10 text-sequoia-green"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span className="text-xs font-bold tracking-[0.2em] text-sequoia-black/55">
                      {pillar.label}
                    </span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-sequoia-black/80 md:text-base">
                    {pillar.description}
                  </p>

                  <ul className="mb-10 divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 py-3 text-sm text-sequoia-black/85"
                      >
                        <span className="h-1 w-3 bg-sequoia-green" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {pillar.external ? (
                    <a
                      href={pillar.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-sequoia-black transition-[color,gap] duration-200 group-hover:gap-3 group-hover:text-sequoia-green"
                    >
                      {pillar.cta}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">（新しいタブで開く）</span>
                    </a>
                  ) : (
                    <Link
                      href={pillar.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-sequoia-black transition-[color,gap] duration-200 group-hover:gap-3 group-hover:text-sequoia-green"
                    >
                      {pillar.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
