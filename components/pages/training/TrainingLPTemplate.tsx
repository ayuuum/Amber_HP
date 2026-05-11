'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, CircleSlash, PenLine, GraduationCap, Cog, ArrowRight, BadgeCheck } from 'lucide-react'
import { placeholders } from '@/lib/placeholder-images'
import type { ToolLPData } from './types'

const problemIcons = [AlertTriangle, CircleSlash, PenLine]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
}

export default function TrainingLPTemplate({ data }: { data: ToolLPData }) {
  return (
    <main className="min-h-screen bg-color-bg" style={{'--lp-accent': data.accentRgb} as React.CSSProperties}>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sequoia-black/10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(15,42,30,0.06) 0%, transparent 65%)' }}
        />
        <div className="relative mx-auto max-w-6xl">
          {/* パンくず */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-sequoia-black/50" aria-label="パンくずリスト">
            <Link href="/" className="hover:text-accent transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/service/ai-training" className="hover:text-accent transition-colors">生成AI活用研修</Link>
            <span>/</span>
            <span className="text-sequoia-black/80">{data.toolName} 法人研修</span>
          </nav>

          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent/30 bg-accent/8 px-3 py-1 text-xs font-medium tracking-wider text-accent">
                  研修サービス
                </span>
                <span className="rounded-full border border-sequoia-black/15 px-3 py-1 text-xs font-medium tracking-wider text-sequoia-black/60">
                  {data.toolBadge}
                </span>
              </div>

              <h1 className="page-heading mb-4">
                {data.toolName}<br />
                <span className="text-accent">法人研修</span>
              </h1>

              <p className="mb-3 text-base font-semibold text-accent md:text-lg">
                {data.tagline}
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-sequoia-black/80 md:text-lg">
                {data.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/company#contact"
                  className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                  無料相談・資料請求
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/service/ai-training"
                  className="inline-flex items-center gap-2 rounded-sm border border-sequoia-black/20 px-6 py-3 text-sm font-semibold text-sequoia-black/80 transition-colors hover:border-accent hover:text-accent"
                >
                  研修の全体像を見る
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-sequoia-black/10 shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)]"
            >
              <Image
                src={placeholders.trainingHero}
                alt={`${data.toolName} 法人研修の様子`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* よくある失敗 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl md:mb-24">
            <p className="eyebrow-light mb-4">よくある課題</p>
            <h2 className="section-heading mb-6">
              {data.toolName}の導入後、<br />こんな状態になっていませんか？
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {data.problems.map((problem, idx) => {
              const Icon = problemIcons[idx] ?? AlertTriangle
              return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-sm border border-sequoia-black/10 bg-white p-8"
                >
                  <Icon className="mb-6 h-8 w-8 text-accent" aria-hidden="true" strokeWidth={1.5} />
                  <p className="mb-3 text-xs font-bold tracking-[0.15em] text-sequoia-black/55">{problem.label}</p>
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-sequoia-black md:text-xl">
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{problem.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 2コース構成 */}
      <section id="courses" className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl md:mb-24">
            <p className="eyebrow-light mb-4">カリキュラム</p>
            <h2 className="section-heading mb-6">
              2コース × 10時間で、<br />定着まで設計する
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* 基礎コース */}
            <motion.div
              {...fadeUp}
              className="flex flex-col overflow-hidden rounded-sm border border-sequoia-black/10 bg-white"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-color-bg-subtle">
                <Image
                  src={placeholders.courseBasic}
                  alt={`${data.toolName} 基礎コース：研修の様子`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
              <div className="mb-6 flex items-center gap-4">
                <GraduationCap className="h-9 w-9 text-accent" aria-hidden="true" strokeWidth={1.5} />
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium tracking-wider text-accent">
                  基礎 / Lv1 をカバー
                </span>
              </div>
              <p className="mb-2 text-4xl font-black leading-none tracking-tight text-accent/20">01</p>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl">
                AI業務活用コース
              </h3>
              <p className="mb-6 text-sm font-medium text-accent">
                {data.toolName} を全社員が使いこなす
              </p>

              <div className="mb-6 grid grid-cols-2 gap-6 border-y border-sequoia-black/10 py-5">
                <div>
                  <p className="mb-1 text-xs font-medium tracking-wider text-sequoia-black/55">対象</p>
                  <p className="text-sm font-semibold text-sequoia-black">{data.basicCourse.target}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium tracking-wider text-sequoia-black/55">時間</p>
                  <p className="text-sm font-semibold text-sequoia-black">10時間・対面</p>
                </div>
              </div>

              <p className="mb-3 text-xs font-medium tracking-wider text-sequoia-black/55">学ぶこと</p>
              <ul className="mb-6 divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
                {data.basicCourse.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 text-sm text-sequoia-black/85">
                    <span className="h-1 w-3 shrink-0 bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-sm bg-color-bg-subtle p-5">
                <p className="mb-2 text-xs font-medium tracking-wider text-accent">成果物</p>
                <p className="text-xs leading-relaxed text-sequoia-black/85 md:text-sm">
                  {data.basicCourse.outcome}
                </p>
              </div>
              </div>
            </motion.div>

            {/* 応用コース */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col overflow-hidden rounded-sm border border-sequoia-black/10 bg-white"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-color-bg-subtle">
                <Image
                  src={placeholders.courseAdvanced}
                  alt={`${data.toolName} 応用コース：研修終了時の成果物`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              <div className="flex flex-1 flex-col p-8 md:p-10">
              <div className="mb-6 flex items-center gap-4">
                <Cog className="h-9 w-9 text-accent" aria-hidden="true" strokeWidth={1.5} />
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium tracking-wider text-accent">
                  応用 / Lv2・Lv3 をカバー
                </span>
              </div>
              <p className="mb-2 text-4xl font-black leading-none tracking-tight text-accent/20">02</p>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl">
                AI業務実装コース
              </h3>
              <p className="mb-6 text-sm font-medium text-accent">
                {data.toolName} で業務プロセスを再設計する
              </p>

              <div className="mb-6 grid grid-cols-2 gap-6 border-y border-sequoia-black/10 py-5">
                <div>
                  <p className="mb-1 text-xs font-medium tracking-wider text-sequoia-black/55">対象</p>
                  <p className="text-sm font-semibold text-sequoia-black">{data.advancedCourse.target}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium tracking-wider text-sequoia-black/55">時間</p>
                  <p className="text-sm font-semibold text-sequoia-black">10時間・対面</p>
                </div>
              </div>

              <p className="mb-3 text-xs font-medium tracking-wider text-sequoia-black/55">学ぶこと</p>
              <ul className="mb-6 divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
                {data.advancedCourse.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 py-3 text-sm text-sequoia-black/85">
                    <span className="h-1 w-3 shrink-0 bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-sm bg-color-bg-subtle p-5">
                <p className="mb-2 text-xs font-medium tracking-wider text-accent">成果物</p>
                <p className="text-xs leading-relaxed text-sequoia-black/85 md:text-sm">
                  {data.advancedCourse.outcome}
                </p>
              </div>
              </div>
            </motion.div>
          </div>

          <p className="mt-8 text-center text-sm text-sequoia-black/60">
            ※どちらからでも独立して受講いただけます。スケジュールは御社の業務都合に合わせて柔軟に設計します。
          </p>
        </div>
      </section>

      {/* Amberが選ばれる3つの理由 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl md:mb-24">
            <p className="eyebrow-light mb-4">Amberの3つの理由</p>
            <h2 className="section-heading mb-6">
              研修が「現場に根付く」理由
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
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
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-sm border border-sequoia-black/10 bg-white p-8"
              >
                <p className="mb-4 text-5xl font-black leading-none tracking-tight text-accent/20">
                  {reason.num}
                </p>
                <h3 className="mb-3 text-lg font-bold tracking-tight text-sequoia-black md:text-xl">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 助成金バナー */}
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            {...fadeUp}
            className="flex flex-col items-start gap-6 rounded-sm border border-accent/20 bg-white p-8 md:flex-row md:items-center md:gap-10 md:p-10"
          >
            <BadgeCheck className="h-10 w-10 shrink-0 text-accent" aria-hidden="true" strokeWidth={1.5} />
            <div className="flex-1">
              <p className="mb-2 text-xs font-bold tracking-wider text-accent">助成金対応</p>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-sequoia-black md:text-2xl">
                人材開発支援助成金の対象となり得ます
              </h3>
              <p className="text-sm leading-relaxed text-sequoia-black/80">
                当研修は、厚生労働省「人材開発支援助成金（人への投資促進コース）」の対象となり得ます。受講料の最大75%が助成される場合があります。詳細はお問い合わせください。
              </p>
            </div>
            <Link
              href="/company#contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              助成金について相談する
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 関連研修 */}
      {data.relatedTools.length > 0 && (
        <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp}>
              <p className="eyebrow-light mb-8">関連する研修</p>
              <div className="flex flex-wrap gap-3">
                {data.relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="inline-flex items-center gap-2 rounded-sm border border-sequoia-black/15 px-5 py-3 text-sm font-medium text-sequoia-black/80 transition-colors hover:border-accent hover:text-accent"
                  >
                    {tool.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ))}
                <Link
                  href="/service/ai-training"
                  className="inline-flex items-center gap-2 rounded-sm border border-sequoia-black/15 px-5 py-3 text-sm font-medium text-sequoia-black/80 transition-colors hover:border-accent hover:text-accent"
                >
                  研修の全体像を見る
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-accent px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div {...fadeUp}>
            <p className="mb-4 text-sm font-medium tracking-wider text-white/70">まずは無料でご相談ください</p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {data.toolName}研修、<br className="md:hidden" />どこから始めればいいか、<br />一緒に考えます。
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              貴社の規模・IT環境・現在の活用状況をお聞きした上で、最適なコース・スケジュール・費用の目安をご提案します。
            </p>
            <Link
              href="/company#contact"
              className="inline-flex items-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold text-accent shadow-lg transition-opacity hover:opacity-90"
            >
              無料相談・資料請求
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
