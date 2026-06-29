export type ServiceLineupItem = {
  title: string
  summary: string
  image: string
  href: string
  badge?: string
  external?: boolean
}

export const serviceLineupItems: ServiceLineupItem[] = [
  {
    title: 'AIソリューション',
    summary: '使える・回る・残る。現場から定着まで伴走します。',
    image: '/images/brand/consulting-hero.png',
    href: '/service/ai-solution',
  },
  {
    title: 'Pine',
    summary: '出張訪問サービス向けAI SaaS。予約・顧客管理を軸に拡張中。',
    image: '/images/brand/amber-pine-product.svg',
    href: 'https://pine-home.com/',
    badge: 'AI SaaS',
    external: true,
  },
]
