'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ExternalLink, Layers, Package, type LucideIcon } from 'lucide-react'
import { MOTION_BASE, MOTION_EASE } from '@/lib/motion-safe'
import { cn } from '@/lib/utils'
import SplitHeading from '@/components/ui/split-heading'
import { buildContactHref } from '@/lib/contact'

type Pillar = {
  num: string
  label: string
  title: string
  summary: string
  detail: string
  items: string[]
  href: string
  cta: string
  external?: boolean
  icon: LucideIcon
  links?: { label: string; href: string; external?: boolean }[]
}

const pillars: Pillar[] = [
  {
    num: '01',
    label: '事業 01',
    title: 'AIソリューション',
    summary: '開発・研修・導入支援を組み合わせ、現場に定着する仕組みを実装します。',
    detail:
      'AIシステム開発、生成AI活用研修、導入コンサルティングを一体で提供。現場観察から業務設計、実装、運用定着までを一気通貫で伴走します。',
    items: ['AIシステム開発', '生成AI活用研修', '導入コンサルティング'],
    href: '/service/development',
    cta: '詳細を見る',
    icon: Layers,
    links: [
      { label: 'AIシステム開発', href: '/service/development' },
      { label: '生成AI活用研修', href: '/service/ai-training' },
      { label: '導入相談', href: buildContactHref('development', 'development') },
    ],
  },
  {
    num: '02',
    label: '事業 02',
    title: 'AI SaaS',
    summary: '個社支援で見えた共通課題を、出張訪問サービス向けソフトウェア「Pine」として提供しています。',
    detail:
      '現場支援で蓄積した知見を、出張訪問サービス向けソフトウェア「Pine」に実装。予約・顧客管理を軸に、継続的に機能を拡張しています。',
    items: ['予約・顧客管理', 'LINE / Web予約', '生成AI機能の拡張'],
    href: 'https://pine-home.com/',
    cta: 'Pineを見る',
    external: true,
    icon: Package,
    links: [
      { label: 'Pine公式サイト', href: 'https://pine-home.com/', external: true },
      { label: '導入相談', href: buildContactHref('pine', 'pine') },
    ],
  },
]

type BusinessPillarsSectionProps = {
  /** 'top' = トップページ用 / 'company' = 企業情報ページ用 */
  variant?: 'top' | 'company'
}

export default function BusinessPillarsSection({ variant = 'top' }: BusinessPillarsSectionProps) {
  const ref = useRef(null)

  const eyebrow = variant === 'company' ? '事業' : null
  const headingText = variant === 'company' ? '2つの事業' : '事業内容'
  const lead =
    variant === 'company'
      ? '個社支援で磨いた実装力と、SaaSとして届ける再現性。この2つを軸に、現場が回り続ける仕組みを提供しています。'
      : null
  return (
    <section
      id="services"
      ref={ref}
      className={cn(
        'section-pad border-t border-sequoia-black/10',
        variant === 'company' ? 'bg-color-bg-subtle' : 'bg-color-bg',
      )}
      aria-labelledby="business-pillars-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="section-header">
          {eyebrow && (
            <motion.p
              className="eyebrow-light mb-4"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_BASE, ease: MOTION_EASE }}
            >
              {eyebrow}
            </motion.p>
          )}
          <SplitHeading
            as="h2"
            id="business-pillars-heading"
            className="section-heading mb-6"
            delay={0.05}
          >
            {headingText}
          </SplitHeading>
          {lead && (
            <motion.p
              className="max-w-3xl text-sm leading-relaxed text-sequoia-black/80 md:text-base"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_BASE, delay: 0.04, ease: MOTION_EASE }}
            >
              {lead}
            </motion.p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            // AI SaaS（Pine）は深緑塗りでソリューションカードと対比させる
            const isDark = pillar.external
            return (
              <motion.article
                key={pillar.label}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: MOTION_BASE,
                  delay: 0.04 + idx * 0.04,
                  ease: MOTION_EASE,
                }}
                className={cn(
                  'group relative overflow-hidden p-10 interactive-card md:p-12',
                  isDark
                    ? 'surface-dark-card hover:border-white/30'
                    : 'surface-card hover:border-sequoia-green/40',
                )}
              >
                {isDark ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(27,58,45,0.18),transparent_62%)] opacity-0 transition-opacity duration-brand group-hover:opacity-100"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(27,58,45,0.07),transparent_60%)] opacity-0 transition-opacity duration-brand group-hover:opacity-100"
                  />
                )}

                <span
                  aria-hidden
                  className={cn(
                    'num-badge pointer-events-none absolute -right-4 -top-6 select-none opacity-40 md:-right-6 md:-top-8',
                    isDark ? 'text-white/10' : 'text-sequoia-green/[0.08]',
                  )}
                >
                  {pillar.num}
                </span>

                <div className="relative">
                  <div className="mb-8 flex items-center justify-between">
                    <Icon
                      className={cn('h-10 w-10', isDark ? 'text-[color:var(--color-cream)]' : 'text-sequoia-green')}
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        'text-xs font-bold tracking-[0.2em]',
                        isDark ? 'text-on-dark-subtle' : 'text-sequoia-black/55',
                      )}
                    >
                      {pillar.label}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      'heading-h3 mb-4',
                      isDark ? 'text-[color:var(--color-cream)]' : 'text-sequoia-black',
                    )}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={cn(
                      'mb-8 text-sm leading-relaxed md:text-base',
                      isDark ? 'text-on-dark-muted' : 'text-sequoia-black/80',
                    )}
                  >
                    {variant === 'company' ? pillar.detail : pillar.summary}
                  </p>

                  <ul
                    className={cn(
                      'mb-10 divide-y border-y',
                      isDark ? 'divide-white/10 border-white/10' : 'divide-sequoia-black/10 border-sequoia-black/10',
                    )}
                  >
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          'flex items-center gap-3 py-3 text-sm',
                          isDark ? 'text-on-dark-muted' : 'text-sequoia-black/85',
                        )}
                      >
                        <span
                          className={cn('h-1 w-4', isDark ? 'bg-sequoia-green-accent' : 'bg-sequoia-green')}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {(() => {
                    const visibleLinks = pillar.links?.filter(
                      (link) => variant === 'company' || link.label !== '導入相談',
                    )
                    if (!visibleLinks?.length) return null
                    return (
                    <div
                      className={cn(
                        'mb-8 flex flex-wrap gap-2',
                        isDark ? 'text-[color:var(--color-cream)]' : 'text-sequoia-black',
                      )}
                    >
                      {visibleLinks.map((link) =>
                        link.external ? (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'inline-flex items-center gap-1 rounded-sm border px-3 py-2 text-xs font-bold transition-[border-color,color,background-color]',
                              isDark
                                ? 'border-white/[0.18] text-on-dark-muted hover:border-white/40 hover:text-[color:var(--color-cream)]'
                                : 'border-sequoia-black/15 text-sequoia-black/75 hover:border-sequoia-green hover:text-sequoia-green',
                            )}
                          >
                            {link.label}
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            <span className="sr-only">（新しいタブで開く）</span>
                          </a>
                        ) : (
                          <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                              'inline-flex items-center rounded-sm border px-3 py-2 text-xs font-bold transition-[border-color,color,background-color]',
                              isDark
                                ? 'border-white/[0.18] text-on-dark-muted hover:border-white/40 hover:text-[color:var(--color-cream)]'
                                : 'border-sequoia-black/15 text-sequoia-black/75 hover:border-sequoia-green hover:text-sequoia-green',
                            )}
                          >
                            {link.label}
                          </Link>
                        ),
                      )}
                    </div>
                    )
                  })()}

                  {pillar.external ? (
                    <a
                      href={pillar.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex items-center gap-2 text-sm font-bold transition-[color,gap] duration-200 group-hover:gap-3',
                        isDark
                          ? 'text-[color:var(--color-cream)] group-hover:text-white'
                          : 'text-sequoia-black group-hover:text-sequoia-green',
                      )}
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
