import { offerings } from '@/data/offerings'

export const siteShell = {
  brandTagline: '生成AI活用を、導入から定着まで。',
  pineUrl: 'https://pine-home.com/',
} as const

export const mainNav = [
  { label: '対応環境', href: '/#environments' },
  { label: '支援事例', href: '/cases' },
  { label: 'Amberについて', href: '/company' },
] as const

export const serviceMegaMenu = offerings.map((o) => ({
  title: o.title,
  description: o.navDescription,
  href: o.href,
}))
