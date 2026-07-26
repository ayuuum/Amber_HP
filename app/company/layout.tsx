import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '会社情報',
  description: '現場が回り続ける仕組みを、技術で実装する。株式会社Amberのミッション、原則、代表、会社概要。',
  openGraph: {
    title: '会社情報 | 株式会社Amber',
    description: '現場が回り続ける仕組みを、技術で実装する。',
    url: `${siteUrl}/company`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/company`,
  },
}

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
