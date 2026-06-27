'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
import { buildContactHref } from '@/lib/contact'
import { placeholders } from '@/lib/placeholder-images'
import { STAGGER_EDITORIAL, editorialTransition, scrollRevealTransition } from '@/lib/motion-safe'

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
    desc: '業務をヒアリングのみでは設計しません。現場で業務動線を共に歩いた上で提案します。',
    icon: Footprints,
  },
  {
    num: '03',
    title: '定着まで伴走する',
    desc: '納品では終わらせません。導入後の運用、現場定着、効果検証までをパッケージにしています。',
    icon: Anchor,
  },
]

const cases: { industry: string; title: string; desc: string }[] = [
  {
    industry: 'ハウスクリーニング業',
    title: '店舗分断された予約・配車・顧客管理を、出張訪問サービス向けソフトウェアへ統合',
    desc: '店舗ごとに分かれていた予約・配車・顧客台帳を1つの出張訪問サービス向けソフトウェアに集約しました。',
  },
  {
    industry: '消防設備点検業',
    title: '紙ベースの点検報告とスケジュール管理を、業務システムへ移行',
    desc: '紙で運用されていた点検報告と顧客台帳を業務システムに置き換えました。',
  },
  {
    industry: '素材・化学',
    title: '研究・現場部門の生成AI活用度のばらつきを、内製化プログラムで解消',
    desc: '業務棚卸しから始める生成AI内製化プログラムを設計しました。',
  },
]

const flow: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '現場に入る',
    desc: '初回打ち合わせから始め、必要に応じて現場で業務動線を確認します。',
    icon: Eye,
  },
  {
    num: '02',
    title: '業務を組み直す',
    desc: '抽出した課題に対するAIシステムを設計・開発します。',
    icon: Wrench,
  },
  {
    num: '03',
    title: '定着させる',
    desc: '導入後の運用支援、現場メンバーへの引き渡し、効果検証までを担当します。',
    icon: TrendingUp,
  },
]

type ConsultingPageClientProps = {
  blogPosts: BlogPost[]
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: editorialTransition(),
}

const itemMotion = (idx: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: scrollRevealTransition(idx),
})

export default function ConsultingPageClient({ blogPosts }: ConsultingPageClientProps) {
  return (
    <main className="min-h-screen bg-color-bg">
      <section className="relative overflow-hidden border-b border-sequoia-black/10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(27,58,45,0.06) 0%, transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-[1.15fr_0.85fr] items-start gap-4 sm:gap-6 md:items-center md:gap-16 lg:grid-cols-[1.2fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={editorialTransition()}
            >
              <p className="eyebrow-light mb-4 md:mb-6">AIシステム開発</p>
              <h1 className="page-heading mb-4 text-[clamp(1.375rem,4.5vw,2.25rem)] md:mb-6 md:text-[clamp(2.25rem,5vw,4.5rem)]">
                現場で動く
                <br />
                業務システムを
                <br />
                設計から定着まで
              </h1>
              <p className="text-body mb-6 max-w-2xl text-sequoia-black/80 md:mb-8">
                業務管理システムから生成AI機能・自動化・エージェントまで、現場観察から定着まで一気通貫で伴走します。
              </p>
              <Link
                href={buildContactHref('development', 'development')}
                className="btn-primary inline-flex gap-2"
              >
                相談する
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
                src={placeholders.consultingHero}
                alt="AIシステム開発のイメージ"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 42vw, 480px"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-sequoia-black/10 bg-color-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header mb-0">
            <p className="eyebrow-light mb-4">よくある課題</p>
            <h2 className="section-heading mb-6">
              業務AI導入で
              <br />
              こんな壁にぶつかっていませんか
            </h2>
          </motion.div>
          <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            {challenges.map((c, idx) => {
              const Icon = c.icon
              return (
                <motion.div key={c.title} {...itemMotion(idx)} className="surface-card p-8">
                  <Icon className="mb-6 h-8 w-8 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                  <h3 className="heading-h3 mb-3 text-xl">{c.title}</h3>
                  <p className="text-body text-sequoia-black/80">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-sequoia-black/10 bg-color-bg-subtle">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">できること</p>
            <h2 className="section-heading mb-6">
              業務システムから、
              <br />
              AIエージェントまで
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon
              return (
                <motion.div
                  key={cap.title}
                  {...itemMotion(idx)}
                  className="surface-card interactive-card p-8 md:p-10"
                >
                  <Icon className="mb-6 h-9 w-9 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                  <h3 className="heading-h3 mb-3">{cap.title}</h3>
                  <p className="text-body text-sequoia-black/80">{cap.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-sequoia-black/10 bg-color-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">Amberの3つの特徴</p>
            <h2 className="section-heading">業界を絞り、現場に入り、定着まで伴走</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {strengths.map((s, idx) => {
              const Icon = s.icon
              return (
                <motion.div key={s.num} {...itemMotion(idx)} className="surface-card p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <Icon className="h-8 w-8 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                    <span className="num-badge text-3xl opacity-40 md:text-4xl">{s.num}</span>
                  </div>
                  <h3 className="heading-h3 mb-3 text-xl">{s.title}</h3>
                  <p className="text-body text-sequoia-black/80">{s.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-pad border-b border-sequoia-black/10 bg-color-bg-subtle">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">過去の支援事例</p>
            <h2 className="section-heading mb-6">現場に届いた実際のシステム</h2>
          </motion.div>
          <div className="space-y-6">
            {cases.map((c, idx) => (
              <motion.div
                key={c.title}
                {...itemMotion(idx)}
                className="surface-card grid gap-4 p-8 md:grid-cols-[180px_1fr] md:items-baseline md:gap-10 md:p-10"
              >
                <p className="text-caption font-bold tracking-[0.15em] text-sequoia-green">{c.industry}</p>
                <div>
                  <h3 className="heading-h3 mb-3 text-xl">{c.title}</h3>
                  <p className="text-body text-sequoia-black/80">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-caption mt-8 text-sequoia-black/55">※企業名は守秘のため非公開です。</p>
        </div>
      </section>

      <section className="section-pad border-b border-sequoia-black/10 bg-color-bg">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header text-center">
            <p className="eyebrow-light mb-4">進め方</p>
            <h2 className="section-heading mx-auto max-w-3xl">3つのフェーズで、現場に届ける</h2>
          </motion.div>
          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {flow.map((step, idx) => {
              const Icon = step.icon
              return (
                <motion.div key={step.num} {...itemMotion(idx)} className="text-center">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-sm border border-sequoia-green/30 bg-color-bg">
                    <Icon className="h-6 w-6 text-sequoia-green" aria-hidden strokeWidth={1.5} />
                  </div>
                  <p className="text-caption mb-2 font-bold tracking-[0.2em] text-sequoia-green">
                    フェーズ {step.num}
                  </p>
                  <h3 className="heading-h3 mb-3 text-xl">{step.title}</h3>
                  <p className="text-body mx-auto max-w-xs text-sequoia-black/80">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <BlogPreviewSection posts={blogPosts} category="development" />
    </main>
  )
}
