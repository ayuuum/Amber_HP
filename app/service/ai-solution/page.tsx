import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AiSolutionPageClient from '@/components/pages/ai-solution/AiSolutionPageClient'
import { getAllPosts } from '@/lib/markdown'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: 'AIソリューション | AIで業務を変える',
  description:
    '使える・回る・残る。研修して終わりにしない、開発して終わりにしない。全社員のAI定着から業務システム構築まで、現場から定着まで一気通貫で伴走します。',
  keywords: [
    'AIソリューション',
    '生成AI研修',
    'AIシステム開発',
    'AI導入支援',
    '人材開発支援助成金',
    '現場定着',
    '暮らしを支える産業',
    '中小企業AI',
  ],
  openGraph: {
    title: 'AIソリューション | 株式会社Amber',
    description:
      '使える・回る・残る。研修・開発・定着まで一気通貫で伴走するAIソリューション。',
    url: `${siteUrl}/service/ai-solution`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIソリューション | 株式会社Amber',
    description:
      '使える・回る・残る。現場から定着まで一気通貫で伴走するAIソリューション。',
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-solution`,
  },
}

export default function AiSolutionPage() {
  const devPosts = getAllPosts('development')
  const trainPosts = getAllPosts('training')
  const blogPosts = [...devPosts, ...trainPosts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'AIソリューション',
        description:
          '暮らしを支える産業向けのAIソリューション。全社員のAI定着から業務システム・エージェント構築まで、設計から定着まで一気通貫で伴走します。',
        provider: {
          '@type': 'Organization',
          name: '株式会社Amber',
          url: siteUrl,
        },
        areaServed: 'JP',
        serviceType: 'AI Solution',
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
      <AiSolutionPageClient blogPosts={blogPosts} />
      <Footer />
    </>
  )
}
