'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Cog,
  Wand2,
  Package,
  Users,
  Microscope,
  Globe,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { placeholders } from '@/lib/placeholder-images'

const stages = [
  {
    lv: '03',
    name: 'AIエージェント',
    desc: 'AIが自ら判断して業務を回す段階です。Lv2の経験なくしては到達できません。',
  },
  {
    lv: '02',
    name: 'AI自動化',
    desc: 'ワークフローを組み、AIに定型業務を任せる段階です。Lv1の定着が前提となります。',
  },
  {
    lv: '01',
    name: 'AI活用(Copilot)',
    desc: 'AIで業務を速く、ラクにする段階です。全社員にとっての出発点となります。',
  },
]

const courses: {
  badge: string
  num: string
  title: string
  subtitle: string
  target: string
  duration: string
  items: string[]
  outcome: string
  icon: LucideIcon
  image: string
}[] = [
  {
    badge: '基礎 / Lv1 をカバー',
    num: '01',
    title: 'AI業務活用コース',
    subtitle: '業務での「使いこなし」を全社員に',
    target: '全社員',
    duration: '10時間・対面',
    items: [
      '主要AIツールの使い分け',
      'プロンプト設計と業務文書への応用',
      '情報収集・分析・データ整理',
      '個人で作る自社AI(Custom GPTs / Projects / NotebookLM)',
    ],
    outcome:
      '自社業務向けプロンプトテンプレート集と個人GPT。研修終了時、明日から使える形でお持ち帰りいただきます。',
    icon: GraduationCap,
    image: placeholders.courseBasic,
  },
  {
    badge: '応用 / Lv2・Lv3 をカバー',
    num: '02',
    title: 'AI業務実装コース',
    subtitle: '組織の業務プロセスをAI前提で再設計',
    target: 'DX推進・部門リーダー・経営層',
    duration: '10時間・対面',
    items: [
      '組織共有の自社AI構築',
      '業務プロセスのAI前提での再設計',
      'AIエージェントの設計と実装',
      '運用ガバナンスと組織展開',
    ],
    outcome:
      '動く自社AIとAIエージェント。研修終了時、組織で運用可能な状態でお渡しします。',
    icon: Cog,
    image: placeholders.courseAdvanced,
  },
]

const environments: {
  tag: string
  name: string
  basic: string
  advanced: string
  icon: LucideIcon
}[] = [
  {
    tag: 'パターン A',
    name: 'Microsoft 環境中心',
    basic:
      'Microsoft 365 Copilot を主軸に、Word / Excel / PowerPoint / Outlook / Teams を業務に活用します。',
    advanced:
      'Copilot Studio / Copilot Studio Agent Builder で組織共有AIとエージェントを構築します。',
    icon: Microscope,
  },
  {
    tag: 'パターン B',
    name: 'Google Workspace 環境中心',
    basic:
      'Gemini in Workspace を主軸に、Docs / Sheets / Slides / Gmail。NotebookLM および Gems を活用します。',
    advanced:
      'Gemini Deep Research / Gemini Live を組み込んだ業務再設計とエージェントを実装します。',
    icon: Globe,
  },
  {
    tag: 'パターン C',
    name: 'マルチツール環境',
    basic:
      'ChatGPT / Claude / Gemini を使い分け。Custom GPTs および Claude Projects を構築します。',
    advanced:
      'ChatGPT Agent / Claude Skills / Perplexity Comet など、目的別エージェントを実装します。',
    icon: Layers,
  },
]

const reasons: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '自社実業務に直結したカスタマイズ',
    desc: '業界・職種・IT環境・現場業務に合わせて教材を設計します。汎用例題ではなく、御社の実業務で演習を行います。',
    icon: Wand2,
  },
  {
    num: '02',
    title: '動くワークフロー／アプリが残る',
    desc: '研修終了時、受講者の手元に「自社業務で動くプロンプト集・自社AI・エージェント」が残ります。知識ではなく、明日から使える成果物を持ち帰っていただきます。',
    icon: Package,
  },
  {
    num: '03',
    title: '対面研修で、できるところまで個別フォロー',
    desc: '研修中、講師が各受講者の手元を見ながら「実際に業務で動かせる状態」になるまで個別に対応します。「分かったつもり」では終わらせません。',
    icon: Users,
  },
]

type Comparison = { label: string; existing: string; amber: string }

const comparisons: Comparison[] = [
  { label: 'ゴール', existing: 'AIツールの操作を知る', amber: '自社業務へのAI組み込み' },
  { label: '演習', existing: '汎用例題', amber: '汎用例題＋実際の業務' },
  {
    label: '終了時の状態',
    existing: '知識が増えた',
    amber: '動くワークフロー／アプリが残り、組織が自走できる状態',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
}

export default function TrainingPageClient() {
  return (
    <main className="min-h-screen bg-color-bg">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sequoia-black/10 px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* 背景装飾：左上の薄い深緑halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(15,42,30,0.06) 0%, transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <Breadcrumbs items={[{ label: '生成AI活用研修' }]} />
          <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow-light mb-6">研修サービス</p>
              <h1 className="hero-heading mb-6">
                生成AI<br />活用研修
              </h1>
              <p className="mb-3 text-base text-sequoia-green md:text-lg">
                AI活用 → AI自動化 → AIエージェント
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-sequoia-black/80 md:text-lg">
                「ツールの使い方」で終わらせず、自社業務への組み込みまでを設計します。組織のAI活用度に合わせて橋渡しする、AmberのAI研修プログラムです。
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-sequoia-black/10 shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)]"
            >
              <Image
                src={placeholders.trainingHero}
                alt="生成AI活用研修のイメージ"
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
              レベルに応じた研修と、<br />定着の仕組み
            </h2>
            <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              生成AI活用は積み上げ式です。Lv1の定着なくしてLv2は機能せず、Lv2の経験なくしてLv3には到達できません。Amberの2コースで、3段階を橋渡しします。
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

      {/* 2コース */}
      <section
        id="courses"
        className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">コース体系</p>
            <h2 className="section-heading mb-6">
              3段階を、<br />2コースで橋渡し
            </h2>
            <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              基礎・応用、いずれも10時間・対面集中です。独立受講も可能です。御社のIT環境に応じて教材をカスタマイズします。
            </p>
          </motion.div>

          <div className="space-y-20 md:space-y-28">
            {courses.map((course, idx) => {
              const Icon = course.icon
              const isReversed = idx % 2 === 1
              return (
                <motion.div
                  key={course.title}
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
                        src={course.image}
                        alt={course.title}
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
                        {course.badge}
                      </span>
                    </div>
                    <p className="mb-3 text-5xl font-black leading-none tracking-tight text-sequoia-green/25 md:text-6xl">
                      {course.num}
                    </p>
                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl lg:text-4xl">
                      {course.title}
                    </h3>
                    <p className="mb-6 text-sm font-medium text-sequoia-green md:text-base">{course.subtitle}</p>

                    <div className="mb-6 grid grid-cols-2 gap-6 border-y border-sequoia-black/10 py-5">
                      <div>
                        <p className="mb-1 text-xs font-medium tracking-wider text-sequoia-black/55">対象</p>
                        <p className="text-sm font-semibold text-sequoia-black">{course.target}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-medium tracking-wider text-sequoia-black/55">時間</p>
                        <p className="text-sm font-semibold text-sequoia-black">{course.duration}</p>
                      </div>
                    </div>

                    <p className="mb-3 text-xs font-medium tracking-wider text-sequoia-black/55">学ぶこと</p>
                    <ul className="mb-6 divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
                      {course.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 py-3 text-sm text-sequoia-black/85"
                        >
                          <span className="h-1 w-3 bg-sequoia-green" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-sm bg-color-bg p-5">
                      <p className="mb-2 text-xs font-medium tracking-wider text-sequoia-green">成果物</p>
                      <p className="text-xs leading-relaxed text-sequoia-black/85 md:text-sm">{course.outcome}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <p className="mt-10 text-center text-sm text-sequoia-black/65">
            ※どちらからでも独立して受講いただけます。スケジュールは御社の業務都合に合わせて柔軟に設計します。
          </p>
        </div>
      </section>

      {/* IT環境カスタマイズ */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">カスタマイズ</p>
            <h2 className="section-heading mb-6">
              御社のIT環境に応じた、<br />教材設計
            </h2>
            <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
              利用中のITツールに応じて、教材・演習・事例を調整します。受講後すぐに実業務で使える状態を目指します。
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="border-t border-sequoia-black/10">
            {environments.map((env) => {
              const Icon = env.icon
              return (
                <div
                  key={env.tag}
                  className="grid gap-6 border-b border-sequoia-black/10 py-10 md:grid-cols-[300px_1fr_1fr] md:gap-12 md:py-12"
                >
                  <div className="flex flex-col gap-3">
                    <Icon className="h-8 w-8 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                    <p className="text-xs font-bold tracking-wider text-sequoia-green">{env.tag}</p>
                    <h3 className="text-xl font-bold tracking-tight text-sequoia-black md:text-2xl">{env.name}</h3>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold tracking-wider text-sequoia-black/55">基礎コース</p>
                    <p className="text-sm leading-relaxed text-sequoia-black/85 md:text-base">{env.basic}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold tracking-wider text-sequoia-black/55">応用コース</p>
                    <p className="text-sm leading-relaxed text-sequoia-black/85 md:text-base">{env.advanced}</p>
                  </div>
                </div>
              )
            })}
          </motion.div>

          <div className="mt-10 rounded-sm bg-color-bg-subtle p-8">
            <p className="mb-3 text-xs font-bold tracking-wider text-sequoia-green">共通する設計思想</p>
            <p className="text-sm leading-relaxed text-sequoia-black/85 md:text-base">
              すべてノーコード、GUI完結です。特定ベンダーや専門エンジニアに依存せず、現場社員が継続して運用できる仕組みのみを扱います。
            </p>
          </div>
        </div>
      </section>

      {/* Split型：思想 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-0 py-0">
        <div className="grid md:grid-cols-2 md:items-stretch">
          <motion.div
            {...fadeUp}
            className="flex items-center bg-color-bg-subtle px-6 py-16 md:px-16 md:py-24 md:order-1 order-2"
          >
            <div className="max-w-xl">
              <p className="eyebrow-light mb-6">Amberの姿勢</p>
              <h2 className="mb-8 text-3xl font-bold leading-[1.25] tracking-tight text-sequoia-black md:text-5xl lg:text-6xl">
                研修の翌日から、<br />現場が変わる。
              </h2>
              <p className="text-base leading-relaxed text-sequoia-black/80 md:text-lg">
                座学で「分かったつもり」になる研修は、翌週には忘れられます。Amberは研修中に、受講者の手元で実際の業務AIが動くところまで作り込みます。明日から使える成果物を、必ず持ち帰っていただきます。
              </p>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="relative aspect-[5/4] md:aspect-auto md:order-2 order-1"
          >
            <Image
              src={placeholders.trainingSplit}
              alt="研修後に現場で動くAIのイメージ"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Amberの3つの理由 — Split型（左：見出しスティッキー / 右：縦リスト） */}
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
            {/* 左カラム：見出しを大きく、スティッキー */}
            <motion.div {...fadeUp} className="md:sticky md:top-32 md:self-start">
              <p className="eyebrow-light mb-4">Amberの3つの理由</p>
              <h2 className="section-heading">
                研修が<br />「現場に<br className="md:hidden" />根付く」理由
              </h2>
            </motion.div>

            {/* 右カラム：3理由を縦に並べ、それぞれ強調 */}
            <div className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
              {reasons.map((r, idx) => {
                const Icon = r.icon
                return (
                  <motion.div
                    key={r.num}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-6 py-12 md:grid-cols-[80px_1fr] md:gap-10 md:py-16"
                  >
                    <div className="flex items-start gap-3">
                      <Icon
                        className="h-7 w-7 shrink-0 text-sequoia-green"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <p className="text-3xl font-black leading-none tracking-tight text-sequoia-green/30">
                        {r.num}
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-3 text-xl font-bold tracking-tight text-sequoia-black md:text-2xl">
                        {r.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{r.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 比較表 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">既存研修との違い</p>
            <h2 className="section-heading">
              「使い方を知る」ではなく、<br />「自社業務に組み込む」
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="overflow-hidden rounded-sm border border-sequoia-black/10">
            <table className="w-full">
              <thead>
                <tr className="bg-color-bg-subtle">
                  <th className="border-b border-sequoia-black/10 p-6 text-left text-xs font-bold tracking-wider text-sequoia-black/55"></th>
                  <th className="border-b border-sequoia-black/10 p-6 text-left text-xs font-bold tracking-wider text-sequoia-black/55">既存のAI研修</th>
                  <th className="border-b border-sequoia-black/10 bg-sequoia-green/10 p-6 text-left text-xs font-bold tracking-wider text-sequoia-green">Amber研修</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {comparisons.map((row, idx) => (
                  <tr key={row.label} className={idx === comparisons.length - 1 ? '' : 'border-b border-sequoia-black/10'}>
                    <th className={`bg-color-bg-subtle p-6 text-left font-bold text-sequoia-black/65 ${idx === comparisons.length - 1 ? '' : 'border-b border-sequoia-black/10'}`}>{row.label}</th>
                    <td className={`p-6 text-sequoia-black/65 ${idx === comparisons.length - 1 ? '' : 'border-b border-sequoia-black/10'}`}>{row.existing}</td>
                    <td className={`bg-sequoia-green/[0.04] p-6 font-medium text-sequoia-black ${idx === comparisons.length - 1 ? '' : 'border-b border-sequoia-black/10'}`}>{row.amber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* 助成金 */}
      <section id="subsidy" className="bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">人材開発支援助成金</p>
            <h2 className="section-heading">
              企業向け職業訓練の<br />助成金対象となる可能性
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
            <div>
              <p className="mb-5 text-sm leading-relaxed text-sequoia-black/85 md:text-base">
                人材開発支援助成金は、企業が従業員に職業訓練を実施する際の費用を国が補助する制度です。Amberの研修プログラムは、要件を満たすことで本助成金の対象となる可能性があります。
              </p>
              <p className="mb-5 text-sm leading-relaxed text-sequoia-black/85 md:text-base">
                主な要件は「10時間以上の研修プログラム」と「事前の計画届提出」です。Amberの「1コース10時間」設計は、この要件を標準でクリアしています。
              </p>
              <p className="text-xs leading-relaxed text-sequoia-black/55">
                ※補助率・補助額は企業規模や訓練内容によって異なります。申請手続きは提携社労士をご紹介します。
              </p>
            </div>
            <div className="rounded-sm bg-white p-10 text-center md:p-12">
              <p className="mb-5 text-xs font-bold tracking-wider text-sequoia-green">標準クリアの要件</p>
              <p className="mb-6 text-3xl font-black leading-tight tracking-tight text-sequoia-black md:text-4xl">
                10時間 <span className="text-sequoia-green">×</span> 計画届
              </p>
              <p className="border-t border-sequoia-black/10 pt-5 text-xs leading-relaxed text-sequoia-black/75">
                「10時間以上」「事前計画届」の主要件を、Amberの1コース10時間設計が標準でクリアします。詳細は個別にご相談ください。
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
