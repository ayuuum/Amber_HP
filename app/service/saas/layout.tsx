import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'ホームサービス業のためのAIエージェント | 株式会社Amber',
  description: 'ホームサービス事業者の業務を包括的にサポートするAIエージェント。予約管理、顧客管理、請求・入金管理、LINE対応、AI受電、AI自動マーケティングを一つのシステムで実現します。',
  keywords: ['ホームサービス', 'Vertical SaaS', '予約管理システム', 'LINE連携', 'AIエージェント', '業務管理システム'],
  openGraph: {
    title: 'ホームサービス業のためのAIエージェント | 株式会社Amber',
    description: 'ホームサービス事業者の業務を包括的にサポートするAIエージェント。予約管理から請求まで、すべてが一つのシステムで完結します。',
    url: `${siteUrl}/service/saas`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ホームサービス業のためのAIエージェント | 株式会社Amber',
    description: 'ホームサービス事業者の業務を包括的にサポートするAIエージェント。',
  },
  alternates: {
    canonical: `${siteUrl}/service/saas`,
  },
}

export default function SaaSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


