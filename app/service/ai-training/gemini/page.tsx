import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrainingLPTemplate from '@/components/pages/training/TrainingLPTemplate'
import { geminiData } from '@/components/pages/training/data/gemini'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: geminiData.metaTitle,
  description: geminiData.metaDescription,
  keywords: geminiData.metaKeywords,
  openGraph: {
    title: geminiData.metaTitle,
    description: geminiData.metaDescription,
    url: `${siteUrl}/service/ai-training/gemini`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: geminiData.metaTitle,
    description: geminiData.metaDescription,
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-training/gemini`,
  },
}

export default function GeminiTrainingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Gemini for Workspace 法人研修',
    description: geminiData.metaDescription,
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
      <TrainingLPTemplate data={geminiData} />
      <Footer />
    </>
  )
}
