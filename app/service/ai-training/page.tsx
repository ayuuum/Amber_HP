import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrainingPageClient from '@/components/pages/TrainingPageClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '生成AI活用研修 | 現場に根付く、3段階のAI活用',
  description:
    '株式会社Amberの法人向け生成AI活用研修。AI活用 → AI自動化 → AIエージェントの3段階を、AI業務活用コース（基礎10時間）／AI業務実装コース（応用10時間）の2コースで橋渡し。対面集中・人数上限なし、人材開発支援助成金の対象となり得る。',
  keywords: ['生成AI研修', '法人研修', 'AIエージェント', 'リスキリング', '人材開発支援助成金', 'ChatGPT 研修'],
  openGraph: {
    title: '生成AI活用研修 | 株式会社Amber',
    description:
      'AI活用 → AI自動化 → AIエージェントの3段階を、2コース（基礎10時間／応用10時間）で橋渡しする法人研修。',
    url: `${siteUrl}/service/ai-training`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '生成AI活用研修 | 株式会社Amber',
    description:
      '3段階のAI活用を2コース×10時間で橋渡し。御社のIT環境（Microsoft／Google／マルチツール）に応じた教材設計。',
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-training`,
  },
}

export default function TrainingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: '生成AI活用研修',
        description:
          'AI活用 → AI自動化 → AIエージェントの3段階を、AI業務活用コース（基礎10時間）／AI業務実装コース（応用10時間）の2コースで橋渡しする法人研修。',
        provider: {
          '@type': 'Organization',
          name: '株式会社Amber',
          url: siteUrl,
        },
        areaServed: 'JP',
        serviceType: 'AI Training',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <TrainingPageClient />
      <Footer />
    </>
  )
}
