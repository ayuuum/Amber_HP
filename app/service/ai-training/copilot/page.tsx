import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrainingLPTemplate from '@/components/pages/training/TrainingLPTemplate'
import { copilotData } from '@/components/pages/training/data/copilot'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: copilotData.metaTitle,
  description: copilotData.metaDescription,
  keywords: copilotData.metaKeywords,
  openGraph: {
    title: copilotData.metaTitle,
    description: copilotData.metaDescription,
    url: `${siteUrl}/service/ai-training/copilot`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: copilotData.metaTitle,
    description: copilotData.metaDescription,
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-training/copilot`,
  },
}

export default function CopilotTrainingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Microsoft 365 Copilot 法人研修',
    description: copilotData.metaDescription,
    provider: {
      '@type': 'Organization',
      name: '株式会社Amber',
      url: siteUrl,
    },
    hasCourseInstance: [
      { '@type': 'CourseInstance', courseMode: 'onsite', name: 'AI業務活用コース（基礎）', timeRequired: 'PT10H' },
      { '@type': 'CourseInstance', courseMode: 'onsite', name: 'AI業務実装コース（応用）', timeRequired: 'PT10H' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <TrainingLPTemplate data={copilotData} />
      <Footer />
    </>
  )
}
