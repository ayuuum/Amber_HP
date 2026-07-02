import {
  AlertTriangle,
  CircleSlash,
  PenLine,
  Eye,
  Wrench,
  TrendingUp,
  GraduationCap,
  Cog,
  Bot,
  type LucideIcon,
} from 'lucide-react'
import { aiSolutionAssets } from '@/lib/ai-solution-assets'

export const gaps: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: AlertTriangle,
    title: 'AIを入れたけど誰も使わない',
    desc: 'ツールを配るだけでは、明日の仕事は変わりません。',
  },
  {
    icon: CircleSlash,
    title: '研修したけど翌週には元に戻る',
    desc: '知識は増えても、業務の流れに入らなければ使われません。',
  },
  {
    icon: PenLine,
    title: 'システムを作ったけど現場が使わない',
    desc: '動くものがあっても、現場で回らなければ残りません。',
  },
]

export const stages: {
  num: string
  name: string
  subtitle: string
  change: string
  body: string
  footer: string
  image: string
  imageAlt: string
  icon: LucideIcon
}[] = [
  {
    num: '01',
    name: '使える',
    subtitle: '個人の生産性が上がる',
    change: 'まず、人が使えるようにする',
    body: '見積、報告書、問い合わせ文。毎日の仕事でAIを開く状態をつくります。自社業務向けプロンプト集と個人GPTを整え、全社員向け実践プログラム（10時間・対面）で定着まで伴走します。',
    footer: 'まずは「使える」状態を、全社員で揃えます。',
    image: aiSolutionAssets.stages.usable,
    imageAlt: '全社員向けAI研修のイメージ',
    icon: GraduationCap,
  },
  {
    num: '02',
    name: '回る',
    subtitle: 'プロセスがAI前提で動く',
    change: '次に、業務の中で回す',
    body: '問い合わせ、承認、共有。AIを個人技で終わらせず、業務の流れに組み込みます。動くワークフローと組織共有の自社AIをつくり、業務実装プログラム（10時間・対面）で現場に入ります。',
    footer: '個人ではなく、プロセスとして回る状態にします。',
    image: aiSolutionAssets.stages.flow,
    imageAlt: '業務プロセス再設計のイメージ',
    icon: Cog,
  },
  {
    num: '03',
    name: '残る',
    subtitle: '仕組みとして組織に残る',
    change: '最後に、仕組みとして残す',
    body: '業務システムとAIエージェントが、定常業務の一部を担う形まで進めます。業務管理システム・AIエージェントを構築し、個別見積で仕組みとして残します。',
    footer: '納品で終わらせず、現場で動き続ける仕組みにします。',
    image: aiSolutionAssets.stages.remain,
    imageAlt: '業務システム構築のイメージ',
    icon: Bot,
  },
]

export const methodVisual = {
  image: aiSolutionAssets.cases.cleaning,
  imageAlt: '現場業務の導線を確認するイメージ',
  lead: '提案書を作る前に、日々の業務を見ます。研修から始めるのか、業務設計や開発まで必要かを、現場の流れから決めます。',
} as const

export const methodPrinciples: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '現場を見る',
    desc: '日報、見積、問い合わせ、承認など、AIを入れる業務を確認します。',
    icon: Eye,
  },
  {
    num: '02',
    title: '支援範囲を決める',
    desc: '研修だけで足りるか、業務フローやシステム化まで必要かを切り分けます。',
    icon: Wrench,
  },
  {
    num: '03',
    title: '業務に残す',
    desc: 'プロンプト、ワークフロー、AIエージェントを業務に残します。',
    icon: TrendingUp,
  },
]

export const contrastColumns = [
  {
    label: '研修会社',
    summary: '使い方は学べる。でも、業務は変わりにくい。',
    body: '受講直後は理解できても、日々の見積・報告・問い合わせ対応に組み込まれなければ元に戻ります。',
    tone: 'muted' as const,
  },
  {
    label: 'SIer',
    summary: 'システムはできる。でも、現場で使われないことがある。',
    body: '要件通りに作っても、使う人の業務導線や教育が変わらなければ、結局手作業が残ります。',
    tone: 'muted' as const,
  },
  {
    label: 'Amber',
    summary: '研修、業務設計、開発、定着までまとめて支援。',
    body: 'AIを使える人を増やし、業務の流れに組み込み、必要なシステムやエージェントまで実装します。',
    tone: 'accent' as const,
  },
]

export const serviceItems = [
  {
    label: '生成AI研修',
    title: '社員がAIを使える状態にする',
    body: 'ChatGPT、Copilot、Gemini、Claudeなど、御社の環境に合わせて、実務で使う型とプロンプトを整えます。',
  },
  {
    label: '業務プロセス設計',
    title: 'AIを業務の流れに組み込む',
    body: '問い合わせ、見積、報告、承認、共有など、AI前提の業務フローに組み直します。',
  },
  {
    label: 'AIシステム・エージェント開発',
    title: '仕組みとして残る形にする',
    body: '社内GPT、ワークフロー、業務管理システム、AIエージェントを個別に設計・実装します。',
  },
] as const

export const toolCards = [
  {
    badge: 'Microsoft 環境',
    name: 'Microsoft 365 Copilot',
    desc: 'Word・Excel・Teams + Copilot Studio',
    logo: aiSolutionAssets.logos.copilot,
    accentRgb: '31 111 168',
  },
  {
    badge: 'OpenAI',
    name: 'ChatGPT',
    desc: 'Custom GPTs・ChatGPT Agent・全社定着',
    logo: aiSolutionAssets.logos.chatgpt,
    accentRgb: '22 135 107',
  },
  {
    badge: 'Google',
    name: 'Gemini for Workspace',
    desc: 'Docs/Sheets・NotebookLM・Gems',
    logo: aiSolutionAssets.logos.gemini,
    accentRgb: '61 107 171',
  },
  {
    badge: 'Anthropic',
    name: 'Claude Code',
    desc: 'コードなし業務自動化・ワークフロー構築',
    logo: aiSolutionAssets.logos.claude,
    accentRgb: '192 106 79',
  },
] as const

export const environments = [
  { name: 'Microsoft 環境', summary: 'Microsoft 365 Copilot / Copilot Studio' },
  { name: 'Google 環境', summary: 'Gemini in Workspace / NotebookLM / Gems' },
  { name: 'マルチツール', summary: 'ChatGPT / Claude / Gemini の使い分け' },
] as const
