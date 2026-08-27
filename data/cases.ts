import { aiSolutionAssets } from '@/lib/ai-solution-assets'

export type CaseStatus = '支援実績' | '開発事例' | '進行中' | '構想事例'

export type CaseItem = {
  slug: string
  industry: string
  enIndustry: string
  theme: string
  status: CaseStatus
  serviceLabel: string
  tags: string[]
  challenge: string
  beforeState: string
  support: string
  change: string
  before: string
  after: string
  deliverables: string[]
  nextSteps: string
  relatedServices: { label: string; href: string }[]
  image: string
  imageAlt: string
  anonymous: true
}

export function isCompletedCase(status: CaseStatus): boolean {
  return status === '支援実績'
}

/** 優先順: 消防設備 → 製造・素材・化学 → Field Services */
export const cases: CaseItem[] = [
  {
    slug: 'fire-equipment-digitalization',
    industry: '消防設備点検',
    enIndustry: 'Fire Equipment Inspection',
    theme: '消防設備点検の業務基盤を再構築',
    status: '開発事例',
    serviceLabel: '業務基盤の再設計・システム化',
    tags: ['設備・保守・点検', 'AI & Software'],
    challenge: '点検、報告、修繕、スケジュールなど分断された業務を整理し、現場から事務まで一貫して情報が流れる業務基盤へ。',
    beforeState: '帳票が紙中心で、現場と事務所の情報連携に時間がかかっていた。',
    support: '点検報告とスケジュール管理のデジタル化、業務フローの再設計。',
    change: '現場の手戻りを減らし、点検から進捗を追える業務フローを目指して整備中。',
    before: '紙の帳票・スケジュール',
    after: 'デジタルで進捗を追える業務フロー',
    deliverables: ['業務フロー設計', '点検報告のデジタル化', 'スケジュール管理の整備'],
    nextSteps: '利用定着と追加機能の改善を継続。',
    relatedServices: [
      { label: 'AI & Software', href: '/service/ai-solution#build' },
      { label: 'Data & Integration', href: '/service/ai-solution#operation' },
    ],
    image: aiSolutionAssets.cases.fire,
    imageAlt: '消防設備点検業の支援イメージ',
    anonymous: true,
  },
  {
    slug: 'chemical-ai-standardization',
    industry: '素材・化学',
    enIndustry: 'Materials & Chemicals',
    theme: '大規模組織におけるAI活用基盤の構築',
    status: '支援実績',
    serviceLabel: '業務変革・活用基盤',
    tags: ['製造・素材・化学', 'Business Transformation'],
    challenge: '業務課題の整理からAI活用テーマの設計、実装・組織展開までを支援。',
    beforeState: '部門ごとにツールや使い方が異なり、推進のノウハウが共有されていなかった。',
    support: '業務棚卸しから内製化プログラムを設計し、部門横断のAI標準化を推進。',
    change: '研究と現場で、同じAIの使い方が回る状態へ。',
    before: '部門ごとの活用度にばらつき',
    after: '部門横断の活用基盤',
    deliverables: ['業務課題マップ', '活用テーマ一覧', '内製化プログラム', '推進体制の設計'],
    nextSteps: '優先テーマの実装と、他部門への横展開を継続支援。',
    relatedServices: [
      { label: 'Business Transformation', href: '/service/ai-solution#adoption' },
      { label: 'Data & Integration', href: '/service/ai-solution#operation' },
    ],
    image: aiSolutionAssets.cases.chemical,
    imageAlt: '素材・化学業界の支援イメージ',
    anonymous: true,
  },
  {
    slug: 'cleaning-operations-os',
    industry: 'Field Services',
    enIndustry: 'Field Services',
    theme: '訪問・現場業務を統合する業務基盤',
    status: '開発事例',
    serviceLabel: '業務基盤の統合',
    tags: ['Field Services', 'AI & Software'],
    challenge: '予約、顧客、現場、店舗などに分散していた情報を統合し、業務全体を一つの仕組みへ。',
    beforeState: '店舗単位で情報が閉じており、横断での状況把握が難しかった。',
    support: '複数拠点を横断できる業務台帳・運用設計を支援。',
    change: '予約・配車・顧客情報を横断して把握できる状態を目指して整備中。',
    before: '拠点ごとに分断された管理',
    after: '業務全体を一つの仕組みへ',
    deliverables: ['業務台帳設計', '予約・配車・顧客の統合方針', '運用ルール'],
    nextSteps: '運用定着と、追加拠点への展開を支援。',
    relatedServices: [
      { label: 'AI & Software', href: '/service/ai-solution#build' },
      { label: 'Business Transformation', href: '/service/ai-solution#adoption' },
    ],
    image: aiSolutionAssets.cases.cleaning,
    imageAlt: '訪問・現場業務の支援イメージ',
    anonymous: true,
  },
]

export function getCaseBySlug(slug: string): CaseItem | undefined {
  return cases.find((c) => c.slug === slug)
}

export function getAllCaseSlugs(): string[] {
  return cases.map((c) => c.slug)
}
