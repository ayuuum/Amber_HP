'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Crosshair,
  Footprints,
  Anchor,
  Eye,
  Wrench,
  TrendingUp,
  AlertTriangle,
  CircleSlash,
  PenLine,
  Database,
  Workflow,
  MessageSquare,
  Bot,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import type { BlogPost } from '@/lib/markdown'

// 山のSVG（Hero ダーク用、Sequoia/Treeline 稜線）
function MountainSVG() {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-0 h-[55%] w-full pointer-events-none select-none"
      aria-hidden
    >
      <defs>
        <linearGradient id="c-mtn-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(15 42 30 / 0.0)" />
          <stop offset="100%" stopColor="rgb(15 42 30 / 0.55)" />
        </linearGradient>
        <linearGradient id="c-mtn-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(10 28 20 / 0.0)" />
          <stop offset="100%" stopColor="rgb(10 28 20 / 0.8)" />
        </linearGradient>
        <linearGradient id="c-mtn-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(8 20 14 / 0.0)" />
          <stop offset="100%" stopColor="rgb(8 20 14 / 1.0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,280 L180,120 L320,200 L480,80 L600,160 L720,60 L840,140 L960,40 L1080,130 L1200,70 L1320,150 L1440,90 L1440,320 L0,320 Z"
        fill="url(#c-mtn-back)"
        opacity="0.6"
      />
      <path
        d="M0,300 L120,180 L240,240 L400,130 L520,210 L640,100 L760,180 L900,80 L1020,160 L1140,100 L1260,170 L1380,110 L1440,160 L1440,320 L0,320 Z"
        fill="url(#c-mtn-mid)"
        opacity="0.75"
      />
      <path
        d="M0,320 L160,220 L280,280 L420,180 L560,250 L680,160 L800,230 L940,140 L1060,210 L1180,160 L1300,220 L1440,180 L1440,320 L0,320 Z"
        fill="url(#c-mtn-front)"
        opacity="0.9"
      />
    </svg>
  )
}

const rotatingWords = ['業務システム', 'AIエージェント', '自社AI']

// 課題3つ
const challenges: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: AlertTriangle,
    title: '何から手をつければよいか分からない',
    desc: '生成AIを業務に取り入れたいが、どこから始めるべきか、どこまで自動化できるかが社内で見えていない。',
  },
  {
    icon: CircleSlash,
    title: 'PoCで止まってしまう',
    desc: '試作はできたが、現場で使われ続けるシステムにならない。実装と運用の間に大きな溝がある。',
  },
  {
    icon: PenLine,
    title: '机上の設計と現場の実態がズレる',
    desc: 'ヒアリングと議事録だけで進めた開発は、現場で使われない。受託先が現場を理解していない。',
  },
]

// できること（capabilities）
const capabilities: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Database,
    title: '業務管理システムの設計・開発',
    desc: '予約・顧客台帳・点検記録・配車・請求など、現場の基幹業務を支える業務管理システムを開発します。',
  },
  {
    icon: MessageSquare,
    title: '生成AI機能の組み込み',
    desc: '要約・分類・自動返信・文書生成など、既存業務に必要な生成AI機能を実装し、現場の手間を減らします。',
  },
  {
    icon: Workflow,
    title: '業務プロセスの自動化',
    desc: '紙やExcelで運用していた業務プロセスを、AI＋自動化で組み直します。判断ロジックも含めて設計します。',
  },
  {
    icon: Bot,
    title: 'AIエージェントの実装',
    desc: '顧客対応・社内問い合わせ・データ集計など、業務の一部をAIが自律的に回す仕組みを構築します。',
  },
]

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

// 事例（社名は出さない、業界・業務内容で抽象化）
const cases: { industry: string; title: string; desc: string }[] = [
  {
    industry: 'ハウスクリーニング業',
    title: '店舗分断された予約・配車・顧客管理を、出張訪問サービス向けソフトウェアへ統合',
    desc: '店舗ごとに分かれていた予約・配車・顧客台帳を1つの出張訪問サービス向けソフトウェアに集約しました。繁忙期の機会損失を低減し、店舗運営の標準化を進めています。',
  },
  {
    industry: '消防設備点検業',
    title: '紙ベースの点検報告とスケジュール管理を、業務システムへ移行',
    desc: '紙で運用されていた点検報告と顧客台帳を業務システムに置き換えました。点検結果の検索性と顧客対応の精度を向上させています。',
  },
  {
    industry: '素材・化学',
    title: '研究・現場部門の生成AI活用度のばらつきを、内製化プログラムで解消',
    desc: '業務棚卸しから始める生成AI内製化プログラムを設計しました。受講後の業務適用までを伴走し、組織全体のAI活用度を引き上げています。',
  },
]

const flow: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '現場に入る',
    desc: '初回打ち合わせから始め、必要に応じて現場で業務動線を確認します。机上のヒアリングでは見えない業務実態と、AIで解決可能な課題を見極めます。',
    icon: Eye,
  },
  {
    num: '02',
    title: '業務を組み直す',
    desc: '抽出した課題に対するAIシステムを設計・開発します。プロトタイプを現場で試し、運用に乗る形まで磨き込みます。',
    icon: Wrench,
  },
  {
    num: '03',
    title: '定着させる',
    desc: '導入後の運用支援、現場メンバーへの引き渡し、効果検証までを担当します。Amberが抜けても動く状態を構築します。',
    icon: TrendingUp,
  },
]

type ConsultingPageClientProps = {
  blogPosts: BlogPost[]
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
}

export default function ConsultingPageClient({ blogPosts }: ConsultingPageClientProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => { setIsMounted(true) }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(rotatingWords[0])
      return
    }
    const current = rotatingWords[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % rotatingWords.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, prefersReducedMotion])

  return (
    <main className="min-h-screen bg-color-bg">
      {/* Hero — ダーク基調＋タイピング演出 */}
      <section
        className="relative flex min-h-screen flex-col justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #071510 0%, #0A1C14 40%, #0F2A1E 100%)' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgb(255 255 255 / 0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgb(255 255 255 / 0.025) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgb(26 138 85 / 0.08) 0%, transparent 65%)' }}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { x: [0, -24, 0], y: [0, 20, 0], scale: [1, 1.05, 1] }
          }
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          animate={prefersReducedMotion ? { opacity: 1 } : { y: [0, -12, 0], scale: [1.02, 1.06, 1.02] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0"
        >
          <MountainSVG />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-32 md:pt-40 md:pb-40">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:mb-8"
          >
            受託開発サービス
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <h1
              className="font-black leading-[1.08] tracking-[-0.04em] text-white md:leading-[1.02]"
              style={{ fontSize: 'clamp(40px, 7.5vw, 96px)' }}
            >
              現場で動く
              <br />
              <span
                className="inline-block"
                style={{ color: 'rgb(26 138 85)', minWidth: '4ch' }}
              >
                {displayed}
                <span
                  className="ml-1 inline-block h-[0.85em] w-[3px] align-middle"
                  style={{
                    background: 'rgb(26 138 85)',
                    animation: 'blink 1s step-end infinite',
                  }}
                />
              </span>
              <br />
              を設計から定着まで
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: 'rgb(245 245 244 / 0.7)' }}
          >
            業務管理システムから生成AI機能 自動化 エージェントまで
            <br />
            現場観察から定着まで一気通貫で伴走します。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/company#contact"
              className="inline-flex items-center gap-2 rounded-sm px-7 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'rgb(13 92 58)', border: '1px solid rgb(26 138 85 / 0.4)' }}
            >
              相談する
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>

        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      </section>

      {/* 課題提起 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl md:mb-24">
            <p className="eyebrow-light mb-4">よくある課題</p>
            <h2 className="section-heading mb-6">
              業務AI導入で<br />こんな壁にぶつかっていませんか
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {challenges.map((c, idx) => {
              const Icon = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-sm border border-sequoia-black/10 bg-white p-8"
                >
                  <Icon className="mb-6 h-8 w-8 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-sequoia-black md:text-xl">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* できること */}
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">できること</p>
            <h2 className="section-heading mb-6">
              業務システムから、<br />AIエージェントまで
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-sm border border-sequoia-black/10 bg-white p-8 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-sequoia-green/40 md:p-10"
                >
                  <Icon className="mb-6 h-9 w-9 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                  <h3 className="mb-3 text-xl font-bold tracking-tight text-sequoia-black md:text-2xl">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{cap.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Amberの3つの特徴 — ヒーロー型 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-16 grid gap-6 md:mb-24 md:grid-cols-[200px_1fr] md:items-end md:gap-12">
            <p className="eyebrow-light">Amberの3つの特徴</p>
            <h2 className="section-heading">
              業界を絞り、現場に入り、<br className="hidden md:inline" />定着まで伴走
            </h2>
          </motion.div>

          {(() => {
            const main = strengths[0]
            const MainIcon = main.icon
            return (
              <motion.div
                {...fadeUp}
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

      {/* 事例（社名なし、業界・業務内容で抽象化） */}
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">過去の支援事例</p>
            <h2 className="section-heading mb-6">
              現場に届いた<br />実際のシステム
            </h2>
          </motion.div>

          <div className="space-y-6">
            {cases.map((c, idx) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 rounded-sm border border-sequoia-black/10 bg-white p-8 md:grid-cols-[200px_1fr] md:items-baseline md:gap-10 md:p-10"
              >
                <p className="text-xs font-bold tracking-[0.15em] text-sequoia-green md:text-sm">
                  {c.industry}
                </p>
                <div>
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-sequoia-black md:text-xl">
                    {c.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-xs text-sequoia-black/55 md:text-sm">
            ※企業名は守秘のため非公開です。
          </p>
        </div>
      </section>

      {/* 進め方 — 横タイムライン */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-20 text-center">
            <p className="eyebrow-light mb-4 inline-block">進め方</p>
            <h2 className="section-heading mx-auto mb-6 max-w-3xl">
              3つのフェーズで、現場に届ける
            </h2>
          </motion.div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-[8.33%] right-[8.33%] top-8 hidden h-px bg-gradient-to-r from-transparent via-sequoia-green/30 to-transparent md:block"
            />
            <div className="grid gap-16 md:grid-cols-3 md:gap-8">
              {flow.map((step, idx) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-sequoia-green/30 bg-color-bg">
                      <Icon className="h-7 w-7 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                    </div>
                    <p className="mb-3 text-xs font-bold tracking-[0.2em] text-sequoia-green">フェーズ {step.num}</p>
                    <h3 className="mb-4 text-lg font-bold tracking-tight text-sequoia-black md:text-xl">{step.title}</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-sequoia-black/80 md:text-base">{step.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <BlogPreviewSection posts={blogPosts} category="development" />
    </main>
  )
}
