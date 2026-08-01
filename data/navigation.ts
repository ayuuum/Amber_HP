export const siteShell = {
  brandTagline: 'AI活用を、現場の成果に。',
  pineUrl: 'https://pine-home.com/',
} as const

export type NavLink = {
  title: string
  description: string
  href: string
}

/** サービス全体のハブ */
export const serviceOverview = {
  title: 'AI活用・実装支援',
  description: '構想から現場の成果まで、一貫して支援',
  href: '/service/ai-solution',
} as const

/** 3つのサービス領域（FDEは含めない） */
export const serviceDomains: readonly NavLink[] = [
  {
    title: 'AI活用戦略・ロードマップ',
    description: '優先順位と実行方法を明確にする入口',
    href: '/service/ai-solution#roadmap',
  },
  {
    title: 'AI人材育成・業務定着',
    description: '研修から実務利用・継続活用まで',
    href: '/service/ai-solution#training',
  },
  {
    title: 'AIエージェント・システム開発',
    description: '個社業務に合わせた仕組みを実装',
    href: '/service/ai-solution#build',
  },
] as const

/** 横断型の支援スタイル（独立した第4領域ではない） */
export const fdeStyleLink = {
  title: '現場伴走型支援（FDE）',
  description: '3領域を横断して現場に入る支援スタイル',
  href: '/#fde',
} as const
