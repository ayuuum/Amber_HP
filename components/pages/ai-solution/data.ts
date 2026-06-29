import {
  AlertTriangle,
  CircleSlash,
  PenLine,
  Eye,
  Footprints,
  Wrench,
  Package,
  TrendingUp,
  Crosshair,
  Anchor,
  GraduationCap,
  Cog,
  Bot,
  type LucideIcon,
} from 'lucide-react'
import { storyCases } from '@/lib/stories'

export const stickyNavItems = [
  { id: 'gap', label: 'よくある状態' },
  { id: 'stages', label: '3段階' },
  { id: 'method', label: '進め方' },
  { id: 'why', label: 'Amberの強み' },
  { id: 'proof', label: '事例' },
  { id: 'contact', label: '相談' },
] as const

export const gaps: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: AlertTriangle,
    title: 'AIを入れたけど誰も使わない',
    desc: 'アカウントを配るだけでは使われません。人が足りないまま現場の負担は減りません。',
  },
  {
    icon: CircleSlash,
    title: '研修したけど翌週には元に戻る',
    desc: '集合研修だけでは誰もAIを開きません。働き方はそのままです。',
  },
  {
    icon: PenLine,
    title: 'システムを作ったけど現場が使わない',
    desc: '試作はできても現場では使われません。結局は人が回しています。',
  },
]

export const stages: {
  num: string
  name: string
  subtitle: string
  change: string
  example: string
  deliverable: string
  means: string
  icon: LucideIcon
}[] = [
  {
    num: '01',
    name: '使える',
    subtitle: '個人の生産性が上がる',
    change: 'AIを使える人が増える',
    example: '見積が30分→5分。報告書の下書きが自分でできる',
    deliverable: '自社業務向けプロンプト集・個人GPT',
    means: '全社員向け実践プログラム（10時間・対面）',
    icon: GraduationCap,
  },
  {
    num: '02',
    name: '回る',
    subtitle: 'プロセスがAI前提で動く',
    change: '業務プロセスがAI前提で回る',
    example: '問い合わせ対応が半自動化。承認フローが一本化される',
    deliverable: '動くワークフロー・組織共有の自社AI',
    means: '業務実装プログラム（10時間・対面）',
    icon: Cog,
  },
  {
    num: '03',
    name: '残る',
    subtitle: '仕組みとして組織に残る',
    change: '現場が勝手に回る状態になる',
    example: '業務システムとAIエージェントが定常業務を担当',
    deliverable: '業務管理システム・AIエージェント',
    means: '業務システム・エージェント構築（個別見積）',
    icon: Bot,
  },
]

export const methodSteps: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '現場へ行く',
    desc: '提案書の前に現場で業務動線を歩きます。議事録だけでは設計しません。',
    icon: Eye,
  },
  {
    num: '02',
    title: '業務を理解する',
    desc: 'どこにAIを組み込むかを特定します。',
    icon: Footprints,
  },
  {
    num: '03',
    title: '一緒に設計する',
    desc: 'AI前提でプロセスを組み直します。',
    icon: Wrench,
  },
  {
    num: '04',
    title: '動くものを作る',
    desc: '明日から使える成果物を実装します。',
    icon: Package,
  },
  {
    num: '05',
    title: '定着まで伴走する',
    desc: '納品でも研修修了でも終わらせません。運用と効果検証まで担当します。',
    icon: TrendingUp,
  },
]

export const whyAmber: { num: string; title: string; desc: string; icon: LucideIcon }[] = [
  {
    num: '01',
    title: '研修でも開発でも片方だけでは終わらない',
    desc: '知識を教えるかシステムを作るか。Amberはその間を埋めて伴走します。',
    icon: Crosshair,
  },
  {
    num: '02',
    title: '現場から設計する',
    desc: '現場へ行き業務を理解した上でAIを組み込みます。',
    icon: Footprints,
  },
  {
    num: '03',
    title: '一気通貫で届ける',
    desc: '教育から定着まで同じチームが担当します。',
    icon: Anchor,
  },
]

export const contrastColumns = [
  { key: 'training', label: '研修会社', tone: 'muted' as const },
  { key: 'sier', label: 'SIer', tone: 'muted' as const },
  { key: 'amber', label: 'Amber', tone: 'accent' as const },
]

export const contrastRows: { label: string; training: string; sier: string; amber: string }[] = [
  {
    label: 'やること',
    training: '知識を教える',
    sier: 'システムを作る',
    amber: '業務が変わるまで伴走',
  },
  {
    label: '現場',
    training: '教室',
    sier: '仕様書',
    amber: '現場に入る',
  },
  {
    label: '終わり方',
    training: '修了',
    sier: '納品',
    amber: '現場で動き続ける',
  },
  {
    label: '成果物',
    training: 'スキル',
    sier: 'ソースコード',
    amber: '動く仕組みが残る',
  },
]

export const proofCases = storyCases.map(({ industry, before, after, metrics }) => ({
  industry,
  before,
  after,
  metrics,
}))

export const toolCards = [
  {
    href: '/service/ai-training/copilot',
    badge: 'Microsoft 環境',
    name: 'Microsoft 365 Copilot',
    desc: 'Word・Excel・Teams + Copilot Studio',
    accentRgb: '31 111 168',
  },
  {
    href: '/service/ai-training/chatgpt',
    badge: 'OpenAI',
    name: 'ChatGPT',
    desc: 'Custom GPTs・ChatGPT Agent・全社定着',
    accentRgb: '22 135 107',
  },
  {
    href: '/service/ai-training/gemini',
    badge: 'Google',
    name: 'Gemini for Workspace',
    desc: 'Docs/Sheets・NotebookLM・Gems',
    accentRgb: '61 107 171',
  },
  {
    href: '/service/ai-training/claude-code',
    badge: 'Anthropic',
    name: 'Claude Code',
    desc: 'コードなし業務自動化・ワークフロー構築',
    accentRgb: '192 106 79',
  },
] as const

export const environments = [
  { name: 'Microsoft 環境', summary: 'Microsoft 365 Copilot / Copilot Studio' },
  { name: 'Google 環境', summary: 'Gemini in Workspace / NotebookLM / Gems' },
  { name: 'マルチツール', summary: 'ChatGPT / Claude / Gemini の使い分け' },
] as const
