import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'AI・Webシステム開発 | 株式会社Amber',
  description: '業務システム、社内ツール、生成AI連携、AI導入支援まで、現場の運用に合わせて設計・開発します。',
  keywords: ['AIシステム開発', 'Webシステム開発', '業務システム開発', 'AI導入支援', '業務改善', '業務自動化'],
  openGraph: {
    title: 'AI・Webシステム開発 | 株式会社Amber',
    description: '業務システム、社内ツール、生成AI連携、AI導入支援まで、現場の運用に合わせて設計・開発します。',
    url: `${siteUrl}/service/consulting`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI・Webシステム開発 | 株式会社Amber',
    description: '業務システム、社内ツール、生成AI連携まで、現場の運用に合わせて設計・開発します。',
  },
  alternates: {
    canonical: `${siteUrl}/service/consulting`,
  },
}

export default function ConsultingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


