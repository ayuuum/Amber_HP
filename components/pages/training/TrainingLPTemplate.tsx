'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, CircleSlash, PenLine, GraduationCap, Cog, ArrowRight } from 'lucide-react'
import type { ToolLPData } from './types'
import { buildContactHref } from '@/lib/contact'
import { editorialTransition, scrollRevealTransition, STAGGER_EDITORIAL } from '@/lib/motion-safe'
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs'
import ContactCTA from '@/components/ui/ContactCTA'

const problemIcons = [AlertTriangle, CircleSlash, PenLine]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: editorialTransition(),
}

export default function TrainingLPTemplate({ data }: { data: ToolLPData }) {
  const contactHref = buildContactHref(data.slug, 'ai-solution')
  const practicalScenes = data.basicCourse.items.slice(0, 4)

  return (
    <main className="min-h-screen bg-white" style={{'--lp-accent': data.accentRgb} as React.CSSProperties}>

      {/* Hero */}
      <section className="relative overflow-hidden bg-off-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="home-container">
          <PageBreadcrumbs
            items={[
              { label: 'トップ', href: '/' },
              { label: 'AI活用・実装支援', href: '/service/ai-solution' },
              { label: `${data.toolName} 法人研修` },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={editorialTransition()}
            className="max-w-3xl"
          >
            <p className="home-label mb-4 text-brand-green">
              研修サービス · {data.toolBadge}
            </p>

            <h1 className="home-h2 mb-4">
              {data.toolName}
              <span className="mt-1 block text-brand-green">法人研修</span>
            </h1>

            <p className="mb-3 text-base font-medium text-brand-green md:text-lg">
              {data.tagline}
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
              {data.heroDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href={contactHref} className="btn-pill-primary-solid inline-flex items-center gap-2">
                無料相談・資料請求
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/service/ai-solution" className="btn-pill-outline inline-flex items-center gap-2">
                研修の全体像を見る
              </Link>
            </div>

            <div className="mt-10 max-w-3xl border-t border-sequoia-black/8 pt-6">
              <p className="mb-3 text-xs tracking-wider text-secondary">
                相談しやすいテーマ
              </p>
              <div className="flex flex-wrap gap-2">
                {practicalScenes.map((scene) => (
                  <span
                    key={scene}
                    className="rounded-full border border-brand-green/20 bg-light-green px-3 py-1.5 text-xs text-sequoia-black/80"
                  >
                    {scene}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* よくある失敗 */}
      <section className="home-section border-b border-sequoia-black/8 bg-white">
        <div className="home-container">
          <motion.div {...fadeUp} className="mb-12 max-w-3xl md:mb-16">
            <p className="home-label mb-3 text-brand-green">よくある課題</p>
            <h2 className="home-h2">
              {data.toolName}の導入後、<br />こんな状態になっていませんか？
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {data.problems.map((problem, idx) => {
              const Icon = problemIcons[idx] ?? AlertTriangle
              return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={scrollRevealTransition(idx)}
                  className="home-card border border-sequoia-black/8 bg-off-white p-7"
                >
                  <Icon className="mb-5 h-7 w-7 text-brand-green" aria-hidden="true" strokeWidth={1.5} />
                  <p className="mb-2 text-xs tracking-[0.12em] text-secondary">{problem.label}</p>
                  <h3 className="mb-3 text-lg font-medium tracking-tight text-sequoia-black md:text-xl">
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-secondary md:text-base">{problem.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 2コース構成 */}
      <section id="courses" className="home-section border-b border-sequoia-black/8 bg-off-white">
        <div className="home-container">
          <motion.div {...fadeUp} className="mb-12 max-w-3xl md:mb-16">
            <p className="home-label mb-3 text-brand-green">カリキュラム</p>
            <h2 className="home-h2">
              2コース × 10時間で、<br />定着まで設計する
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* 基礎コース */}
            <motion.div
              {...fadeUp}
              className="home-card flex flex-col border border-sequoia-black/8 bg-white p-8 md:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <GraduationCap className="h-8 w-8 text-brand-green" aria-hidden="true" strokeWidth={1.5} />
                <span className="rounded-full bg-light-green px-3 py-1 text-xs tracking-wider text-brand-green">
                  基礎 / Lv1 をカバー
                </span>
              </div>
              <p className="mb-2 text-3xl text-sequoia-black/25">01</p>
              <h3 className="home-h3 mb-2">AI業務活用コース</h3>
              <p className="mb-6 text-sm font-medium text-brand-green">
                {data.toolName} を全社員が使いこなす
              </p>

              <div className="mb-6 grid grid-cols-2 gap-6 border-y border-sequoia-black/8 py-5">
                <div>
                  <p className="mb-1 text-xs tracking-wider text-secondary">対象</p>
                  <p className="text-sm font-medium text-sequoia-black">{data.basicCourse.target}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-wider text-secondary">時間</p>
                  <p className="text-sm font-medium text-sequoia-black">10時間・対面</p>
                </div>
              </div>

              <p className="mb-3 text-xs tracking-wider text-secondary">学ぶこと</p>
              <ul className="mb-6 divide-y divide-sequoia-black/8 border-y border-sequoia-black/8">
                {data.basicCourse.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 text-sm text-secondary">
                    <span className="h-1 w-3 shrink-0 bg-brand-green" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-2xl bg-off-white p-5">
                <p className="mb-2 text-xs tracking-wider text-brand-green">成果物</p>
                <p className="text-xs leading-relaxed text-secondary md:text-sm">
                  {data.basicCourse.outcome}
                </p>
              </div>
            </motion.div>

            {/* 応用コース */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={editorialTransition(STAGGER_EDITORIAL)}
              className="home-card flex flex-col border border-sequoia-black/8 bg-white p-8 md:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <Cog className="h-8 w-8 text-brand-green" aria-hidden="true" strokeWidth={1.5} />
                <span className="rounded-full bg-light-green px-3 py-1 text-xs tracking-wider text-brand-green">
                  応用 / Lv2・Lv3 をカバー
                </span>
              </div>
              <p className="mb-2 text-3xl text-sequoia-black/25">02</p>
              <h3 className="home-h3 mb-2">AI業務実装コース</h3>
              <p className="mb-6 text-sm font-medium text-brand-green">
                {data.toolName} で業務プロセスを再設計する
              </p>

              <div className="mb-6 grid grid-cols-2 gap-6 border-y border-sequoia-black/8 py-5">
                <div>
                  <p className="mb-1 text-xs tracking-wider text-secondary">対象</p>
                  <p className="text-sm font-medium text-sequoia-black">{data.advancedCourse.target}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-wider text-secondary">時間</p>
                  <p className="text-sm font-medium text-sequoia-black">10時間・対面</p>
                </div>
              </div>

              <p className="mb-3 text-xs tracking-wider text-secondary">学ぶこと</p>
              <ul className="mb-6 divide-y divide-sequoia-black/8 border-y border-sequoia-black/8">
                {data.advancedCourse.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 text-sm text-secondary">
                    <span className="h-1 w-3 shrink-0 bg-brand-green" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-2xl bg-off-white p-5">
                <p className="mb-2 text-xs tracking-wider text-brand-green">成果物</p>
                <p className="text-xs leading-relaxed text-secondary md:text-sm">
                  {data.advancedCourse.outcome}
                </p>
              </div>
            </motion.div>
          </div>

          <p className="mt-8 text-center text-sm text-secondary">
            ※どちらからでも独立して受講いただけます。スケジュールは御社の業務都合に合わせて柔軟に設計します。
          </p>
        </div>
      </section>

      {/* Amberが選ばれる3つの理由 */}
      <section className="home-section border-b border-sequoia-black/8 bg-white">
        <div className="home-container">
          <motion.div {...fadeUp} className="mb-12 max-w-3xl md:mb-16">
            <p className="home-label mb-3 text-brand-green">Amberの3つの理由</p>
            <h2 className="home-h2">研修が「現場に根付く」理由</h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                num: '01',
                title: '自社実業務に直結したカスタマイズ',
                desc: `${data.toolName} × 御社の業種・職種・IT環境に合わせて教材を設計します。汎用例題ではなく、実際の業務で演習を行います。`,
              },
              {
                num: '02',
                title: '動くワークフロー／アプリが残る',
                desc: '研修終了時、受講者の手元に「自社業務で動く成果物」が残ります。知識だけでなく、明日から使えるものをお持ち帰りいただきます。',
              },
              {
                num: '03',
                title: '対面で、できるところまで個別フォロー',
                desc: '研修中、講師が各受講者の手元を見ながら「実際に業務で動かせる状態」になるまで個別に対応します。「分かったつもり」では終わらせません。',
              },
            ].map((reason, idx) => (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={scrollRevealTransition(idx)}
                className="home-card border border-sequoia-black/8 bg-off-white p-7"
              >
                <p className="mb-4 text-4xl text-sequoia-black/25">{reason.num}</p>
                <h3 className="mb-3 text-lg font-medium tracking-tight text-sequoia-black md:text-xl">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary md:text-base">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 助成金は補助情報（ページ下部） */}
      <section className="home-section border-b border-sequoia-black/8 bg-white !py-10 md:!py-12">
        <div className="home-container">
          <motion.div {...fadeUp} className="max-w-3xl border-t border-sequoia-black/8 pt-8">
            <h3 className="mb-2 text-base font-medium text-sequoia-black">人材開発支援助成金について</h3>
            <p className="text-sm leading-relaxed text-secondary">
              要件を満たす場合、厚生労働省の人材開発支援助成金の対象となる可能性があります。補助率・補助額は企業規模や訓練内容により異なります。詳細はお問い合わせ時にご案内します。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 関連研修 */}
      {data.relatedTools.length > 0 && (
        <section className="home-section bg-white !py-14 md:!py-16">
          <div className="home-container">
            <motion.div {...fadeUp}>
              <p className="home-label mb-6 text-brand-green">関連する研修</p>
              <div className="flex flex-wrap gap-3">
                {data.relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="btn-pill-outline inline-flex items-center gap-2 !px-5 !py-2.5 text-sm"
                  >
                    {tool.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ))}
                <Link
                  href="/service/ai-solution"
                  className="btn-pill-outline inline-flex items-center gap-2 !px-5 !py-2.5 text-sm"
                >
                  研修の全体像を見る
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <ContactCTA
        source={data.slug}
        headingLines={['研修から定着まで、', '進め方を相談する。']}
        body={`${data.toolName}研修を含むAI活用の進め方を、現場の状況に合わせて整理します。`}
        ctaLabel="無料相談・資料請求"
      />
    </main>
  )
}
