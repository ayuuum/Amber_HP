import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '会社概要 | 株式会社Amber',
  description: '株式会社Amberの会社概要。AI顧問サービスとホームサービス事業者向けVertical SaaSを提供し、現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
  keywords: ['株式会社Amber', '会社概要', '企業情報', '代表取締役', '松井歩武'],
  openGraph: {
    title: '会社概要 | 株式会社Amber',
    description: '株式会社Amberの会社概要。AI顧問サービスとホームサービス事業者向けVertical SaaSを提供しています。',
    url: `${siteUrl}/company`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '会社概要 | 株式会社Amber',
    description: '株式会社Amberの会社概要。',
  },
  alternates: {
    canonical: `${siteUrl}/company`,
  },
}

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


