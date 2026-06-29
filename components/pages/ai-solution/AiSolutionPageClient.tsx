'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ForestCtaSection from '@/components/sections/ForestCtaSection'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import type { BlogPost } from '@/lib/markdown'
import { buildContactHref } from '@/lib/contact'
import { editorialTransition, STAGGER_EDITORIAL } from '@/lib/motion-safe'
import AiSolutionStickyNav from './AiSolutionStickyNav'
import {
  gaps,
  stages,
  methodSteps,
  whyAmber,
  contrastColumns,
  contrastRows,
  proofCases,
  toolCards,
  environments,
} from './data'
import { fadeUp, itemMotion } from './motion'

type AiSolutionPageClientProps = {
  blogPosts: BlogPost[]
}

export default function AiSolutionPageClient({ blogPosts }: AiSolutionPageClientProps) {
  return (
    <main className="min-h-screen bg-color-bg">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sequoia-black/10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(27,58,45,0.06) 0%, transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16 lg:grid-cols-[1.2fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={editorialTransition()}
            >
              <p className="eyebrow-light mb-4 md:mb-6">AIソリューション</p>
              <h1 className="page-heading mb-4 text-[clamp(1.75rem,5vw,3rem)] md:mb-6 md:text-[clamp(2.5rem,5vw,4rem)]">
                AIで業務を変える
              </h1>
              <p className="mb-6 text-base font-medium text-sequoia-green md:text-lg">
                使える → 回る → 残る
              </p>
              <p className="text-body mb-8 max-w-2xl text-sequoia-black/80">
                研修して終わりにしない。開発して終わりにしない。現場で使われ続けるところまで伴走します。
              </p>
              <Link
                href={buildContactHref('ai-solution', 'ai-solution')}
                className="btn-primary inline-flex gap-2"
              >
                導入相談する
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={editorialTransition(STAGGER_EDITORIAL)}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-sequoia-black/10 sm:aspect-[4/3]"
            >
              <Image
                src="/images/about-mission-mountain.png"
                alt="暮らしを支える産業の現場イメージ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      <AiSolutionStickyNav />

      {/* Gap */}
      <section
        id="gap"
        className="section-forest section-pad border-b border-sequoia-black/10"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header mb-0">
            <h2 className="section-heading-invert mb-6">
              こんな状態が
              <br />
              続いていませんか
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {gaps.map((g, idx) => {
              const Icon = g.icon
              return (
                <motion.div
                  key={g.title}
                  {...itemMotion(idx)}
                  className="rounded-sm border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                >
                  <Icon className="mb-6 h-8 w-8 text-white/90" aria-hidden strokeWidth={1.5} />
                  <h3 className="heading-h3 mb-3 text-xl text-white">{g.title}</h3>
                  <p className="text-sm leading-relaxed text-white/75 md:text-base">{g.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stages */}
      <section id="stages" className="section-pad border-b border-sequoia-black/10 bg-color-bg-subtle">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">使える・回る・残る</p>
            <h2 className="section-heading mb-6">
              業務が変わる
              <br />
              3つの段階
            </h2>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {stages.map((stage, idx) => {
              const Icon = stage.icon
              return (
                <motion.div
                  key={stage.num}
                  {...itemMotion(idx)}
                  className="surface-card grid gap-6 p-6 md:grid-cols-[auto_1fr] md:gap-10 md:p-10"
                >
                  <div className="flex items-start gap-4 md:flex-col md:gap-3">
                    <span className="num-badge text-5xl opacity-30 md:text-6xl">{stage.num}</span>
                    <Icon className="h-9 w-9 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="mb-4 flex flex-wrap items-baseline gap-3">
                      <h3 className="heading-h3 text-2xl md:text-3xl">{stage.name}</h3>
                      <span className="text-sm font-medium text-sequoia-green">{stage.subtitle}</span>
                    </div>
                    <p className="text-body mb-2 font-semibold text-sequoia-black">{stage.change}</p>
                    <p className="text-body mb-6 text-sequoia-black/75">{stage.example}</p>
                    <div className="grid gap-4 border-t border-sequoia-black/10 pt-6 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 text-xs font-bold tracking-wider text-sequoia-green">成果物</p>
                        <p className="text-sm text-sequoia-black/85">{stage.deliverable}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-bold tracking-wider text-sequoia-black/55">手段</p>
                        <p className="text-sm text-sequoia-black/65">{stage.means}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Method */}
      <section id="method" className="section-pad border-b border-sequoia-black/10 bg-color-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header text-center">
            <p className="eyebrow-light mb-4">進め方</p>
            <h2 className="section-heading mx-auto max-w-3xl">
              設計から定着まで一気通貫で
            </h2>
          </motion.div>
          <div className="mt-16 space-y-0">
            {methodSteps.map((step, idx) => {
              const Icon = step.icon
              const isLast = idx === methodSteps.length - 1
              return (
                <motion.div
                  key={step.num}
                  {...itemMotion(idx)}
                  className="relative grid gap-6 pb-12 md:grid-cols-[80px_1fr] md:gap-10 md:pb-16"
                >
                  {!isLast && (
                    <div
                      aria-hidden
                      className="absolute left-10 top-14 hidden h-[calc(100%-3rem)] w-px bg-sequoia-green/20 md:block"
                    />
                  )}
                  <div className="flex items-start gap-4 md:flex-col md:items-center">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-sequoia-green/30 bg-color-bg">
                      <Icon className="h-6 w-6 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                    </div>
                    <span className="num-badge text-3xl opacity-25 md:text-4xl">{step.num}</span>
                  </div>
                  <div className="md:pt-2">
                    <h3 className="heading-h3 mb-3 text-xl md:text-2xl">{step.title}</h3>
                    <p className="text-body max-w-2xl text-sequoia-black/80">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Amber */}
      <section id="why" className="section-pad border-b border-sequoia-black/10 bg-color-bg-subtle">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">Amberの強み</p>
            <h2 className="section-heading mb-6">なぜAmberなのか</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {whyAmber.map((w, idx) => {
              const Icon = w.icon
              return (
                <motion.div key={w.num} {...itemMotion(idx)} className="surface-card p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <Icon className="h-8 w-8 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                    <span className="num-badge text-3xl opacity-40">{w.num}</span>
                  </div>
                  <h3 className="heading-h3 mb-3 text-xl">{w.title}</h3>
                  <p className="text-body text-sequoia-black/80">{w.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contrast */}
      <section className="section-pad border-b border-sequoia-black/10 bg-color-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">比較</p>
            <h2 className="section-heading mb-6">他社との違い</h2>
          </motion.div>
          <motion.div {...fadeUp} className="overflow-x-auto">
            <table className="w-full min-w-[640px] overflow-hidden rounded-sm border border-sequoia-black/10">
              <thead>
                <tr className="bg-color-bg-subtle">
                  <th className="border-b border-sequoia-black/10 p-5 text-left text-xs font-bold tracking-wider text-sequoia-black/55" />
                  {contrastColumns.map((col) => (
                    <th
                      key={col.key}
                      className={`border-b border-sequoia-black/10 p-5 text-left text-xs font-bold tracking-wider ${
                        col.tone === 'accent'
                          ? 'bg-sequoia-green/10 text-sequoia-green'
                          : 'text-sequoia-black/55'
                      }`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {contrastRows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={idx < contrastRows.length - 1 ? 'border-b border-sequoia-black/10' : ''}
                  >
                    <th className="bg-color-bg-subtle p-5 text-left font-bold text-sequoia-black/65">
                      {row.label}
                    </th>
                    <td className="p-5 text-sequoia-black/65">{row.training}</td>
                    <td className="p-5 text-sequoia-black/65">{row.sier}</td>
                    <td className="bg-sequoia-green/[0.04] p-5 font-medium text-sequoia-black">
                      {row.amber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Proof */}
      <section id="proof" className="section-pad border-b border-sequoia-black/10 bg-color-bg-subtle">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">事例</p>
            <h2 className="section-heading mb-6">現場が変わった</h2>
          </motion.div>
          <div className="space-y-6">
            {proofCases.map((c, idx) => (
              <motion.div
                key={c.industry}
                {...itemMotion(idx)}
                className="surface-card grid gap-6 p-8 md:grid-cols-[160px_1fr_auto] md:items-start md:gap-10 md:p-10"
              >
                <p className="text-caption font-bold tracking-[0.15em] text-sequoia-green">
                  {c.industry}
                </p>
                <div>
                  <p className="text-body mb-2 text-sequoia-black/55">
                    <span className="font-medium text-sequoia-black/70">Before</span> {c.before}
                  </p>
                  <p className="text-body mb-4">
                    <span className="font-medium text-sequoia-green">After</span> {c.after}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:flex-col md:gap-2">
                  {c.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-sm border border-sequoia-black/10 bg-color-bg px-4 py-2 text-center"
                    >
                      <p className="text-[10px] font-bold tracking-wider text-sequoia-black/50">
                        {m.label}
                      </p>
                      <p className="text-sm font-semibold text-sequoia-black">{m.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-caption mt-8 text-sequoia-black/55">※企業名は守秘のため非公開です。</p>
        </div>
      </section>

      {/* Practical */}
      <section id="subsidy" className="section-pad border-b border-sequoia-black/10 bg-color-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-12">
            <p className="eyebrow-light mb-4">環境・ツール</p>
            <h2 className="section-heading mb-6">御社のIT環境に合わせて設計</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {environments.map((env) => (
                <div
                  key={env.name}
                  className="rounded-sm border border-sequoia-black/10 bg-color-bg-subtle p-5"
                >
                  <p className="mb-1 text-sm font-semibold text-sequoia-black">{env.name}</p>
                  <p className="text-xs text-sequoia-black/65">{env.summary}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="mb-16">
            <p className="eyebrow-light mb-4">ツール別</p>
            <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {toolCards.map((tool, idx) => (
                <motion.a
                  key={tool.href}
                  href={tool.href}
                  {...itemMotion(idx)}
                  className="group flex flex-col rounded-sm border border-sequoia-black/10 bg-white p-6 transition-shadow hover:shadow-lg"
                  style={{ '--lp-accent': tool.accentRgb } as React.CSSProperties}
                >
                  <span className="mb-3 text-xs font-medium tracking-wider text-sequoia-black/50">
                    {tool.badge}
                  </span>
                  <h3 className="mb-2 text-lg font-bold tracking-tight text-sequoia-black group-hover:text-accent transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mb-4 text-sm text-sequoia-black/70">{tool.desc}</p>
                  <span className="mt-auto text-xs font-semibold text-accent">詳細を見る →</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-3xl">
            <h3 className="heading-h3 mb-4">人材開発支援助成金</h3>
            <p className="text-body mb-4 text-sequoia-black/85">
              人材開発支援助成金は、企業が従業員に職業訓練を実施する際の費用を国が補助する制度です。Amberのプログラムは、要件を満たすことで本助成金の対象となる可能性があります。
            </p>
            <p className="text-xs text-sequoia-black/55">
              ※補助率・補助額は企業規模や訓練内容によって異なります。申請手続きは提携社労士をご紹介します。
            </p>
          </motion.div>
        </div>
      </section>

      <BlogPreviewSection posts={blogPosts} categories={['development', 'training']} />

      <div id="contact">
        <ForestCtaSection
          headline="お問い合わせ"
          subheadline="サービスに関するご質問やご相談は、お気軽にどうぞ。"
          primaryLabel="導入相談する"
          primaryHref={buildContactHref('ai-solution', 'ai-solution')}
        />
      </div>
    </main>
  )
}
