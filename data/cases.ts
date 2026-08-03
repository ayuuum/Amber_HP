import { aiSolutionAssets } from '@/lib/ai-solution-assets'

export type CaseStatus = '支援実績' | '開発事例' | '進行中' | '構想事例'

export type CaseItem = {
  slug: string
  industry: string
  theme: string
  status: CaseStatus
  /** 3サービスへの対応ラベル */
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

/** 完了実績のみ「導入後の変化」表記。それ以外は「目指す業務の状態」 */
export function isCompletedCase(status: CaseStatus): boolean {
  return status === '支援実績'
}

export const cases: CaseItem[] = [
  {
    slug: 'chemical-ai-standardization',
    industry: '素材・化学',
    theme: '部門横断のAI標準化',
    status: '支援実績',
    serviceLabel: '生成AI導入・活用支援',
    tags: ['製造・化学', '生成AI導入・活用支援'],
    challenge: '研究・現場部門でAI活用度にばらつきがあり、全社で使える状態になっていなかった。',
    beforeState: '部門ごとにツールや使い方が異なり、推進のノウハウが共有されていなかった。',
    support: '業務棚卸しから内製化プログラムを設計し、部門横断のAI標準化を推進。',
    change: '研究と現場で、同じAIの使い方が回る状態へ。',
    before: '部門ごとの活用度にばらつき',
    after: '部門横断のAI標準化',
    deliverables: ['業務課題マップ', 'AI活用テーマ一覧', '研修・内製化プログラム', '推進体制の設計'],
    nextSteps: '優先テーマの実装と、他部門への横展開を継続支援。',
    relatedServices: [
      { label: '生成AI導入・活用支援', href: '/service/ai-solution#adoption' },
      { label: 'AI定着・運用改善支援', href: '/service/ai-solution#operation' },
    ],
    image: aiSolutionAssets.cases.chemical,
    imageAlt: '素材・化学業界の支援イメージ',
    anonymous: true,
  },
  {
    slug: 'fire-equipment-digitalization',
    industry: '消防設備点検',
    theme: '点検業務のデジタル化',
    status: '開発事例',
    serviceLabel: '現場業務フローの整理・システム化支援',
    tags: ['建設・設備・保守', 'AIエージェント・業務システム開発'],
    challenge: '紙の点検報告とスケジュール管理が手戻りを生んでいた。',
    beforeState: '帳票が紙中心で、現場と事務所の情報連携に時間がかかっていた。',
    support: '点検報告とスケジュール管理のデジタル化、業務フローの再設計。',
    change: '現場の手戻りを減らし、点検から進捗を追える業務フローを目指して整備中。',
    before: '紙の帳票・スケジュール',
    after: 'デジタルで進捗を追える業務フロー',
    deliverables: ['業務フロー設計', '点検報告のデジタル化', 'スケジュール管理の整備'],
    nextSteps: '利用定着と追加機能の改善を継続。',
    relatedServices: [
      { label: 'AIエージェント・業務システム開発', href: '/service/ai-solution#build' },
      { label: 'AI定着・運用改善支援', href: '/service/ai-solution#operation' },
    ],
    image: aiSolutionAssets.cases.fire,
    imageAlt: '消防設備点検業の支援イメージ',
    anonymous: true,
  },
  {
    slug: 'cleaning-operations-os',
    industry: 'ハウスクリーニング',
    theme: '複数店舗の横断管理',
    status: '開発事例',
    serviceLabel: '業務システム化支援',
    tags: ['現場業務', 'AIエージェント・業務システム開発'],
    challenge: '店舗ごとに予約・配車・顧客管理が分断されていた。',
    beforeState: '店舗単位で情報が閉じており、横断での状況把握が難しかった。',
    support: '複数店舗を横断できる業務台帳・運用設計を支援。',
    change: '予約・配車・顧客情報を横断して把握できる状態を目指して整備中。',
    before: '店舗ごとに分断された管理',
    after: '複数店舗の横断管理',
    deliverables: ['業務台帳設計', '予約・配車・顧客の統合方針', '運用ルール'],
    nextSteps: '運用定着と、追加拠点への展開を支援。',
    relatedServices: [
      { label: 'AIエージェント・業務システム開発', href: '/service/ai-solution#build' },
      { label: '生成AI導入・活用支援', href: '/service/ai-solution#adoption' },
    ],
    image: aiSolutionAssets.cases.cleaning,
    imageAlt: 'ハウスクリーニング業の支援イメージ',
    anonymous: true,
  },
]

export function getCaseBySlug(slug: string): CaseItem | undefined {
  return cases.find((c) => c.slug === slug)
}

export function getAllCaseSlugs(): string[] {
  return cases.map((c) => c.slug)
}
