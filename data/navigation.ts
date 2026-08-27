import { offerings } from '@/data/offerings'

export const siteShell = {
  brandTagline: 'Technology for Essential Industries.',
  pineUrl: 'https://pine-home.com/',
} as const

export const mainNav = [
  { label: 'Industries', href: '/#industries' },
  { label: 'Work', href: '/cases' },
  { label: 'Company', href: '/company' },
] as const

export const serviceMegaMenu = offerings.map((o) => ({
  title: o.title,
  description: o.shortTitle,
  href: o.href,
}))
