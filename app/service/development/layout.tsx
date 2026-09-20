import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'AI活用・実装支援 | 株式会社Amber',
  description:
    'Essential Industries向けに、業務変革・AI/業務システムの設計開発・データ連携まで実装します。',
  keywords: [
    'Essential Industries',
    '業務変革',
    'AIシステム開発',
    '業務システム開発',
    '生成AI研修',
    'データ連携',
  ],
  openGraph: {
    title: 'AI活用・実装支援 | 株式会社Amber',
    description:
      'Essential Industries向けに、業務変革・AI/業務システムの設計開発・データ連携まで実装します。',
    url: `${siteUrl}/service/ai-solution`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI活用・実装支援 | 株式会社Amber',
    description:
      'Essential Industries向けに、業務変革・AI/業務システムの設計開発・データ連携まで実装します。',
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-solution`,
  },
}

export default function DevelopmentBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
