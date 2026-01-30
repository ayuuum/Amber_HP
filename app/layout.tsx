import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'
import StructuredData from '@/components/StructuredData'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amber-inc.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '株式会社Amber | AI顧問サービス・生成AI研修・Vertical SaaS【東京】',
    template: '%s | 株式会社Amber',
  },
  description: '東京を拠点にAI顧問サービス、中小企業向け生成AI研修、ホームサービス事業者向けVertical SaaSを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。株式会社Amber公式サイト。',
  keywords: ['AI顧問サービス', '生成AI研修', 'Vertical SaaS', 'ホームサービス', '業務効率化', '中小企業', 'AI導入'],
  authors: [{ name: '株式会社Amber' }],
  creator: '株式会社Amber',
  publisher: '株式会社Amber',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    siteName: '株式会社Amber',
    title: '株式会社Amber | AI顧問サービス・生成AI研修・Vertical SaaS【東京】',
    description: '東京を拠点にAI顧問サービス、中小企業向け生成AI研修、ホームサービス事業者向けVertical SaaSを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。株式会社Amber公式サイト。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '株式会社Amber',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社Amber | AI顧問サービス・生成AI研修・Vertical SaaS【東京】',
    description: '東京を拠点にAI顧問サービス、中小企業向け生成AI研修、ホームサービス事業者向けVertical SaaSを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。株式会社Amber公式サイト。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <StructuredData />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
