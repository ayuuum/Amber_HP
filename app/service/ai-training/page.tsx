import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrainingPageClient from '@/components/pages/TrainingPageClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '生成AI研修 | 現場で使えるAIスキルを体系的に習得',
  description:
    '株式会社Amberの法人向け生成AI研修。OFF-JT形式で全12回・計24時間、基礎から実務活用までを体系的に習得。人材開発支援助成金（事業展開等リスキリング支援コース）の対象となる場合があります。',
  keywords: ['生成AI研修', '法人研修', 'OFF-JT', 'リスキリング', '人材開発支援助成金', 'ChatGPT 研修'],
  openGraph: {
    title: '生成AI研修 | 株式会社Amber',
    description:
      '現場で使える生成AIスキルを体系的に習得する法人向け研修。OFF-JT形式で全12回・計24時間のプログラムを提供します。',
    url: `${siteUrl}/service/ai-training`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '生成AI研修 | 株式会社Amber',
    description:
      'OFF-JT形式の法人向け生成AI研修。全12回・計24時間で実務活用までを体系的に学べます。',
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
        name: '生成AI研修',
        description:
          '現場で使える生成AIスキルを体系的に習得する法人向け研修。OFF-JT形式で全12回・計24時間のプログラムを提供。',
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
