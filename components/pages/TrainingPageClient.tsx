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
  AlertTriangle,
  CircleSlash,
  PenLine,
  type LucideIcon,
} from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { placeholders } from '@/lib/placeholder-images'

// よくある失敗（顧客課題）
const failures: { icon: LucideIcon; label: string; title: string; desc: string }[] = [
  {
    icon: AlertTriangle,
    label: 'パターン 01',
    title: 'ツールを配って終わり',
    desc: 'ChatGPTのアカウントを配布するだけで運用を始めても、使う人と使わない人で二極化し、組織としての底上げには繋がりません。',
  },
  {
    icon: CircleSlash,
    label: 'パターン 02',
    title: '単発研修で終わり',
    desc: '2時間の集合研修を1回実施するだけでは、翌週には誰もAIを開かなくなり、定着しないまま投資が消えていきます。',
  },
  {
    icon: PenLine,
    label: 'パターン 03',
    title: 'いきなりエージェント',
    desc: '「AIエージェントで業務を自動化したい」と意気込むものの、社員がAIで業務補助すらできていない状態。土台が育っていないため、結局は頓挫します。',
  },
]

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
    name: 'AI活用（Copilot）',
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
      '個人で作る自社AI（Custom GPTs / Projects / NotebookLM）',
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

const comparisons: { label: string; existing: string; amber: string }[] = [
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
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(15,42,30,0.06) 0%, transparent 65%)',
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
              <h1 className="page-heading mb-6">
                生成AI<br />活用研修
              </h1>
              <p className="mb-3 text-base font-medium text-sequoia-green md:text-lg">
                AI活用 → AI自動化 → AIエージェント
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-sequoia-black/80 md:text-lg">
                業務への組み込みまで支援する研修です。
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

      {/* よくある失敗（課題提起） */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl md:mb-24">
            <p className="eyebrow-light mb-4">よくある失敗</p>
            <h2 className="section-heading mb-6">
              ツール導入だけでは、<br />何も変わりません
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {failures.map((f, idx) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-sm border border-sequoia-black/10 bg-white p-8"
                >
                  <Icon className="mb-6 h-8 w-8 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                  <p className="mb-3 text-xs font-bold tracking-[0.15em] text-sequoia-black/55">{f.label}</p>
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-sequoia-black md:text-xl">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3段階のAI活用 */}
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">3段階のAI活用</p>
            <h2 className="section-heading mb-6">
              レベルに応じた研修と、<br />定着の仕組み
            </h2>
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
              <polygon points="140,20 100,80 180,80" fill="rgb(13 92 58)" />
              <polygon points="100,80 60,160 220,160 180,80" fill="rgb(13 92 58 / 0.7)" />
              <polygon points="60,160 20,250 260,250 220,160" fill="rgb(13 92 58 / 0.45)" />
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
        className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">コース体系</p>
            <h2 className="section-heading mb-6">
              3段階を、<br />2コースで橋渡し
            </h2>
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

                    <div className="rounded-sm bg-color-bg-subtle p-5">
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
      <section className="border-b border-sequoia-black/10 bg-color-bg-subtle px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">カスタマイズ</p>
            <h2 className="section-heading mb-6">
              御社のIT環境に応じた、<br />教材設計
            </h2>
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

          <div className="mt-10 rounded-sm bg-white p-8">
            <p className="mb-3 text-xs font-bold tracking-wider text-sequoia-green">共通する設計思想</p>
            <p className="text-sm leading-relaxed text-sequoia-black/85 md:text-base">
              すべてノーコード、GUI完結です。特定ベンダーや専門エンジニアに依存せず、現場社員が継続して運用できる仕組みのみを扱います。
            </p>
          </div>
        </div>
      </section>

      {/* Amberの3つの理由 ＋ 比較表（統合） */}
      <section className="border-b border-sequoia-black/10 bg-color-bg px-6 py-24 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="section-header">
            <p className="eyebrow-light mb-4">Amberの3つの理由</p>
            <h2 className="section-heading mb-6">
              研修が<br />「現場に根付く」理由
            </h2>
          </motion.div>

          {/* 3つの理由 */}
          <div className="mb-20 grid gap-12 md:mb-24 md:grid-cols-3 md:gap-16">
            {reasons.map((r, idx) => {
              const Icon = r.icon
              return (
                <motion.div
                  key={r.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 flex items-baseline gap-4">
                    <Icon className="h-9 w-9 text-sequoia-green" aria-hidden="true" strokeWidth={1.5} />
                    <p className="text-5xl font-black leading-none tracking-tight text-sequoia-green/30 md:text-6xl">
                      {r.num}
                    </p>
                  </div>
                  <h3 className="mb-4 text-xl font-bold tracking-tight text-sequoia-black md:text-2xl">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{r.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* 比較表（同セクション内） */}
          <motion.div {...fadeUp}>
            <p className="eyebrow-light mb-4">既存研修との違い</p>
            <h3 className="mb-10 text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl">
              一目で分かる、3つの違い
            </h3>
            <div className="overflow-hidden rounded-sm border border-sequoia-black/10">
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
            </div>
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
