import { aiSolutionAssets } from '@/lib/ai-solution-assets'

export type StoryCase = {
  industry: string
  title: string
  quote: string
  before: string
  after: string
  image: string
  imageAlt: string
  metrics: { label: string; value: string }[]
}

export const storyCases: StoryCase[] = [
  {
    industry: 'ハウスクリーニング業',
    title: '複数店舗を1つの業務OSに',
    quote: '店舗ごとにバラバラだった予約・配車・顧客管理を、1台帳で横断できるようにしました。',
    before: '店舗ごとにバラバラだった予約・配車・顧客管理',
    after: '1つの業務OSで全店舗を横断管理',
    image: aiSolutionAssets.cases.cleaning,
    imageAlt: 'ハウスクリーニング業の導入イメージ',
    metrics: [
      { label: '統合', value: '複数店舗 → 1台帳' },
      { label: '対象', value: '予約・配車・顧客' },
    ],
  },
  {
    industry: '消防設備点検業',
    title: '紙の帳票からデジタル業務へ',
    quote: '点検報告とスケジュール管理をデジタル化し、現場の手戻りを減らしました。',
    before: '紙の点検報告とスケジュール管理',
    after: 'デジタル業務フローへ完全移行',
    image: aiSolutionAssets.cases.fire,
    imageAlt: '消防設備点検業の導入イメージ',
    metrics: [
      { label: '帳票', value: '紙 → デジタル' },
      { label: '管理', value: '点検・顧客台帳' },
    ],
  },
  {
    industry: '素材・化学',
    title: '部門横断のAI標準化',
    quote: '業務棚卸しから内製化プログラムを設計し、全社のAI活用度を揃えました。',
    before: '研究・現場部門のAI活用度にばらつき',
    after: '研究と現場で、同じAIの使い方が回る',
    image: aiSolutionAssets.cases.chemical,
    imageAlt: '素材・化学業界の導入イメージ',
    metrics: [
      { label: '範囲', value: '部門横断' },
      { label: '成果', value: '全社のAI標準化' },
    ],
  },
]
