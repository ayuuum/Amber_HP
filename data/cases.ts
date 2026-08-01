import { aiSolutionAssets } from '@/lib/ai-solution-assets'

export type CaseStatus = '支援実績' | '開発事例' | '進行中' | '構想事例'

export type CaseItem = {
  slug: string
  industry: string
  theme: string
  status: CaseStatus
  tags: string[]
  /** 一覧・詳細で使う短い要約 */
  summary: string
  challenge: string
  beforeState: string
  support: string
  /** 実施内容の内訳（既存情報の整理。新規の成果主張は含めない） */
  supportSteps: string[]
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

export const cases: CaseItem[] = [
  {
    slug: 'chemical-ai-standardization',
    industry: '素材・化学',
    theme: '部門横断のAI標準化',
    status: '支援実績',
    tags: ['製造・化学', 'AI人材育成・業務定着'],
    summary: '研究と現場でばらついていたAI活用を、共通の進め方と内製化の仕組みに揃えた支援です。',
    challenge:
      '研究部門と現場部門でAIの使い方や習熟度に差があり、全社で同じように使える状態になっていませんでした。推進のノウハウも部門内に閉じ、横展開が進みにくい状況でした。',
    beforeState:
      '部門ごとに使うツールやルールが異なり、成功した使い方が共有されにくい状態でした。現場ごとに独自の進め方が生まれ、標準化の起点がありませんでした。',
    support:
      'まず業務の棚卸しから着手し、活用テーマを整理したうえで、内製化プログラムと推進体制を設計しました。部門をまたいで同じAIの使い方が回る状態づくりを支援しました。',
    supportSteps: [
      '業務棚卸しと活用テーマの整理',
      '内製化プログラムの設計',
      '部門横断の標準化推進',
      '推進体制の設計',
    ],
    change: '研究と現場で、同じAIの使い方が回る状態へ移行しました。',
    before: '部門ごとの活用度にばらつき',
    after: '部門横断のAI標準化',
    deliverables: ['業務課題マップ', 'AI活用テーマ一覧', '研修・内製化プログラム', '推進体制の設計'],
    nextSteps: '優先テーマの実装と、他部門への横展開を継続支援します。',
    relatedServices: [
      { label: 'AI活用実行ロードマップ', href: '/service/ai-solution#roadmap' },
      { label: 'AI人材育成・業務定着', href: '/service/ai-solution#training' },
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
    tags: ['現場産業', '業務システム'],
    summary: '紙中心だった点検報告とスケジュール管理を、現場と事務所がつながるデジタル業務へ再設計した事例です。',
    challenge:
      '点検報告が紙中心で、スケジュール管理との連携にも手間がかかっていました。現場と事務所のあいだで情報の行き来に時間がかかり、手戻りが生まれやすい状態でした。',
    beforeState:
      '帳票が紙で運用され、入力・転記・確認の工程が分断されていました。現場の記録が事務所側の管理に反映されるまでに遅れが生じやすい状況でした。',
    support:
      '点検報告とスケジュール管理のデジタル化を進め、業務フロー自体を再設計しました。現場で記録した内容が、事務所側の運用につながる形を整えました。',
    supportSteps: [
      '点検〜報告の業務フロー設計',
      '点検報告のデジタル化',
      'スケジュール管理の整備',
    ],
    change: '現場の手戻りを減らし、デジタル業務フローへ移行しました。',
    before: '紙の帳票・スケジュール',
    after: 'デジタル業務フロー',
    deliverables: ['業務フロー設計', '点検報告のデジタル化', 'スケジュール管理の整備'],
    nextSteps: '利用定着と、追加機能の改善を継続します。',
    relatedServices: [
      { label: 'AIエージェント・システム開発', href: '/service/ai-solution#build' },
      { label: '現場伴走型支援（FDE）', href: '/#fde' },
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
    tags: ['現場産業', '業務システム'],
    summary: '店舗ごとに分かれていた予約・配車・顧客管理を、横断して把握できる業務台帳と運用に整えた事例です。',
    challenge:
      '店舗ごとに予約・配車・顧客管理が分かれており、全体の状況を一度に把握しにくい状態でした。店舗をまたいだ調整や確認に時間がかかっていました。',
    beforeState:
      '情報が店舗単位で閉じており、横断での状況把握が難しい状態でした。同じ種類の情報でも、店舗ごとに見え方や運用が揃っていませんでした。',
    support:
      '複数店舗を横断できる業務台帳と運用ルールの設計を支援しました。予約・配車・顧客の情報を、共通の方針のもとで扱える形へ整理しました。',
    supportSteps: [
      '業務台帳の設計',
      '予約・配車・顧客の統合方針の整理',
      '運用ルールの策定',
    ],
    change: '予約・配車・顧客情報を横断して把握できる状態へ移行しました。',
    before: '店舗ごとに分断された管理',
    after: '複数店舗の横断管理',
    deliverables: ['業務台帳設計', '予約・配車・顧客の統合方針', '運用ルール'],
    nextSteps: '運用定着と、追加拠点への展開を支援します。',
    relatedServices: [
      { label: 'AIエージェント・システム開発', href: '/service/ai-solution#build' },
      { label: 'AI活用実行ロードマップ', href: '/service/ai-solution#roadmap' },
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
