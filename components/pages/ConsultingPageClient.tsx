'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  House,
  Truck,
  Heart,
  HardHat,
  Factory,
  Cpu,
  Bot,
  Crosshair,
  Footprints,
  Anchor,
  Eye,
  Wrench,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import { placeholders } from '@/lib/placeholder-images'
import type { BlogPost } from '@/lib/markdown'
import Breadcrumbs from '@/components/Breadcrumbs'

const stages = [
  {
    lv: '03',
    name: 'AIエージェント',
    desc: 'AIが自ら判断して業務を回す段階です。組織オペレーションを自律化していきます。',
  },
  {
    lv: '02',
    name: 'AI自動化',
    desc: '業務システムとAIを統合し、定型業務を自動化する段階です。業務プロセスをAI前提で再設計します。',
  },
  {
    lv: '01',
    name: 'AI活用(Copilot)',
    desc: '日常業務にAIを組み込み、効率化を進める段階です。個別タスクの高速化が出発点になります。',
  },
]

const services: {
  badge: string
  num: string
  title: string
  subtitle: string
  description: string
  items: string[]
  icon: LucideIcon
  image: string
}[] = [
  {
    badge: 'Lv1・Lv2 をカバー',
    num: '01',
    title: 'AI業務システム開発',
    subtitle: '業務プロセスをAI前提で再構築',
    description:
      '業務管理SaaS、顧客台帳、点検記録、配車システムなど、現場の基幹業務にAIを組み込んだ業務システムを設計・開発します。',
    items: [
      '業務棚卸しと要件定義',
      '業務システムの設計・開発',
      '生成AI機能の組み込み',
      '現場展開と運用支援',
    ],
    icon: Cpu,
    image: placeholders.serviceSystemDev,
  },
  {
    badge: 'Lv2・Lv3 をカバー',
    num: '02',
    title: 'AIエージェント開発',
    subtitle: '業務オペレーションを自律化',
    description:
      '顧客対応、社内問い合わせ、データ集計、レポート生成など、業務の一部をAIが自律的に回すエージェントを設計・実装します。',
    items: [
      '自律化対象業務の特定とKPI設計',
      'エージェントの設計と実装',
      '運用ガバナンスの設計',
      '組織全体への展開',
    ],
    icon: Bot,
    image: placeholders.serviceAgent,
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

const industries: { name: string; desc: string; icon: LucideIcon }[] = [
  { name: 'ホームサービス', desc: '清掃・修繕・害虫駆除・訪問サービス全般', icon: House },
  { name: '物流・運輸', desc: '配車・倉庫管理・ドライバー業務', icon: Truck },
  { name: '介護・ヘルスケア', desc: '記録業務・シフト・利用者対応', icon: Heart },
  { name: '建設・施工', desc: '現場管理・図面・施工記録', icon: HardHat },
  { name: '製造・素材', desc: '研究・品質管理・現場改善', icon: Factory },
]

const flow: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '現場に入る',
    desc: '2〜4週間にわたり、現場で業務動線を確認します。机上のヒアリングでは見えない業務実態と、AIで解決可能な課題を見極めます。',
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
  return (
    <main className="min-h-screen bg-color-bg">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sequoia-black/10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* 背景装飾：右上の薄い深緑halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(15,42,30,0.06) 0%, transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: 'AIシステム開発' }]} />
          <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow-light mb-6">受託開発サービス</p>
              <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight text-sequoia-black md:text-7xl">
                AIシステム<br />開発
              </h1>
              <p className="mb-3 text-base text-sequoia-green md:text-lg">
                AI活用 → AI自動化 → AIエージェント
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-sequoia-black/80 md:text-lg">
                3段階のAI活用を、業務システムとして実装する開発パートナーです。設計・開発から定着まで、一気通貫で伴走します。
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-sequoia-black/10 shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)]"
            >
              <Image
                src={placeholders.consultingHero}
                alt="現場業務とAIシステムのイメージ"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3段階のAI活用 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">3段階のAI活用</p>
            <h2 className="section-heading mb-6">
              AI成熟度に合わせた、<br />段階的な実装
            </h2>
            <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              生成AI活用は積み上げ式です。Lv1の業務適用が定着しなければLv2は機能せず、Lv2の運用なくしてLv3には到達できません。Amberはどの段階からでも伴走します。
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="grid gap-12 md:grid-cols-[280px_1fr] md:items-center md:gap-20"
          >
            <svg
              viewBox="0 0 280 260"
              className="mx-auto h-auto w-full max-w-[280px]"
              role="img"
              aria-label="3段階のAI活用ピラミッド"
            >
              <polygon points="140,20 100,80 180,80" fill="rgb(15 42 30)" />
              <polygon points="100,80 60,160 220,160 180,80" fill="rgb(15 42 30 / 0.7)" />
              <polygon points="60,160 20,250 260,250 220,160" fill="rgb(15 42 30 / 0.45)" />
              <text x="140" y="58" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" letterSpacing="1">Lv 03</text>
              <text x="140" y="125" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" letterSpacing="1">Lv 02</text>
              <text x="140" y="215" textAnchor="middle" fontSize="11" fill="white" fontWeight="700" letterSpacing="1">Lv 01</text>
            </svg>
            <div className="space-y-3">
              {stages.map((stage) => (
                <div
                  key={stage.lv}
                  className="grid items-center gap-4 rounded-sm border border-sequoia-black/10 bg-white p-6 md:grid-cols-[120px_1fr_2fr] md:gap-8 md:p-8"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold tracking-wider text-sequoia-green md:text-sm">Lv</span>
                    <span className="text-5xl font-black leading-none tracking-tight text-sequoia-green md:text-6xl">
                      {stage.lv}
                    </span>
                  </div>
                  <p className="text-lg font-bold tracking-tight text-sequoia-black md:text-xl">{stage.name}</p>
                  <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{stage.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2つの開発サービス */}
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">2つの開発サービス</p>
            <h2 className="section-heading mb-6">
              業務システムから<br />エージェントまで
            </h2>
            <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              御社の現状と目指す段階に応じた、2つの開発サービスです。いずれも現場観察から始め、定着まで伴走します。
            </p>
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {services.map((service, idx) => {
              const Icon = service.icon
              const isReversed = idx % 2 === 1
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
                >
                  {/* 画像 */}
                  <div className={isReversed ? 'md:order-2' : ''}>
                    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm border border-sequoia-black/10 shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)]">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* テキスト */}
                  <div className={isReversed ? 'md:order-1' : ''}>
                    <div className="mb-6 flex items-center gap-4">
                      <Icon className="h-9 w-9 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                      <span className="rounded-full bg-sequoia-green/10 px-3 py-1 text-xs font-medium tracking-wider text-sequoia-green">
                        {service.badge}
                      </span>
                    </div>
                    <p className="mb-3 text-5xl font-black leading-none tracking-tight text-sequoia-green/25 md:text-6xl">
                      {service.num}
                    </p>
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl lg:text-4xl">
                      {service.title}
                    </h3>
                    <p className="mb-5 text-sm font-medium text-sequoia-green md:text-base">{service.subtitle}</p>
                    <p className="mb-8 text-sm leading-relaxed text-sequoia-black/80 md:text-base">{service.description}</p>
                    <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 py-3 text-sm text-sequoia-black/85"
                        >
                          <span className="h-1 w-3 bg-sequoia-green" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Split型：思想 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-0 py-0">
        <div className="grid md:grid-cols-2 md:items-stretch">
          <motion.div
            {...fadeUp}
            className="relative aspect-[5/4] md:aspect-auto"
          >
            <Image
              src={placeholders.consultingSplit}
              alt="現場での業務理解と対話のイメージ"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            {...fadeUp}
            className="flex items-center bg-color-bg-subtle px-6 py-16 md:px-16 md:py-24"
          >
            <div className="max-w-xl">
              <p className="eyebrow-light mb-6">Amberの姿勢</p>
              <h2 className="mb-8 text-3xl font-bold leading-[1.25] tracking-tight text-sequoia-black md:text-5xl lg:text-6xl">
                机上ではなく、<br />現場で。
              </h2>
              <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
                ヒアリングシートと議事録だけでは、現場で使われるAIは作れません。実際の業務動線を歩き、現場の手元で困りごとを観察し、そこから設計を始めます。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amberの3つの特徴 — ヒーロー型レイアウト（1つ大型 + 2つサブ） */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          {/* セクションヘッダーを2カラム構造に：左に eyebrow、右に大見出し */}
          <motion.div {...fadeUp} className="mb-16 grid gap-6 md:mb-24 md:grid-cols-[200px_1fr] md:items-end md:gap-12">
            <p className="eyebrow-light">Amberの3つの特徴</p>
            <h2 className="section-heading">
              業界を絞り、現場に入り、<br className="hidden md:inline" />定着まで伴走
            </h2>
          </motion.div>

          {/* メイン特徴1つ：大型表示 */}
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

          {/* サブ特徴2つ：横並び */}
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

      {/* 業界フォーカス — Bento Grid 型（1つ大型＋4つ小型） */}
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          {/* ヘッダーは右寄せに変えてリズム変化 */}
          <motion.div {...fadeUp} className="mb-16 grid gap-6 md:mb-20 md:grid-cols-[1fr_1.5fr] md:gap-12">
            <p className="eyebrow-light">業界フォーカス</p>
            <div>
              <h2 className="section-heading mb-6">
                暮らしを支える産業に、集中投資
              </h2>
              <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
                暮らしを支える産業の現場業務を主戦場に、業界の構造へ深く入り込んだ実装を行います。
              </p>
            </div>
          </motion.div>

          {/* Bento Grid：1番目が大型、残り4つが小型 */}
          <motion.div
            {...fadeUp}
            className="grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6"
          >
            {industries.map((ind, idx) => {
              const Icon = ind.icon
              const isFeatured = idx === 0
              return (
                <div
                  key={ind.name}
                  className={`group rounded-sm border border-sequoia-black/10 bg-white transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-sequoia-green/40 hover:shadow-[0_12px_30px_-12px_rgba(15,42,30,0.18)] ${
                    isFeatured ? 'md:col-span-1 md:row-span-2 p-8 md:p-10 flex flex-col justify-between' : 'p-6 md:p-7'
                  }`}
                >
                  <div>
                    <Icon
                      className={`text-sequoia-green ${isFeatured ? 'mb-8 h-12 w-12' : 'mb-5 h-7 w-7'}`}
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <h4
                      className={`mb-3 font-bold tracking-tight text-sequoia-black ${
                        isFeatured ? 'text-2xl md:text-3xl' : 'text-base'
                      }`}
                    >
                      {ind.name}
                    </h4>
                    <p
                      className={`leading-relaxed text-sequoia-black/70 ${
                        isFeatured ? 'text-sm md:text-base' : 'text-xs'
                      }`}
                    >
                      {ind.desc}
                    </p>
                  </div>
                  {isFeatured && (
                    <p className="mt-8 text-xs font-bold tracking-[0.2em] text-sequoia-green">
                      主力業界
                    </p>
                  )}
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* 進め方 — 横タイムライン型レイアウト */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          {/* センター揃えヘッダー */}
          <motion.div {...fadeUp} className="mb-20 text-center">
            <p className="eyebrow-light mb-4 inline-block">進め方</p>
            <h2 className="section-heading mx-auto mb-6 max-w-3xl">
              3つのフェーズで、現場に届くAI
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              小さく始めて、運用に合わせて改善していきます。納品で終わりではなく、現場で動き続ける状態をつくります。
            </p>
          </motion.div>

          {/* 横タイムライン：矢印で結ぶ */}
          <div className="relative">
            {/* 横の繋ぎ線（PC のみ） */}
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
                    {/* タイムライン上のサークル */}
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
      <BlogPreviewSection posts={blogPosts} category="consulting" />
    </main>
  )
}
