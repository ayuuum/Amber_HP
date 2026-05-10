import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrainingLPTemplate from '@/components/pages/training/TrainingLPTemplate'
import { claudeCodeData } from '@/components/pages/training/data/claude-code'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: claudeCodeData.metaTitle,
  description: claudeCodeData.metaDescription,
  keywords: claudeCodeData.metaKeywords,
  openGraph: {
    title: claudeCodeData.metaTitle,
    description: claudeCodeData.metaDescription,
    url: `${siteUrl}/service/ai-training/claude-code`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: claudeCodeData.metaTitle,
    description: claudeCodeData.metaDescription,
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-training/claude-code`,
  },
}

export default function ClaudeCodeTrainingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Claude Code 法人研修',
    description: claudeCodeData.metaDescription,
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
      <TrainingLPTemplate data={claudeCodeData} />
      <Footer />
    </>
  )
}
