import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrainingLPTemplate from '@/components/pages/training/TrainingLPTemplate'
import { githubCopilotData } from '@/components/pages/training/data/github-copilot'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: githubCopilotData.metaTitle,
  description: githubCopilotData.metaDescription,
  keywords: githubCopilotData.metaKeywords,
  openGraph: {
    title: githubCopilotData.metaTitle,
    description: githubCopilotData.metaDescription,
    url: `${siteUrl}/service/ai-training/github-copilot`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: githubCopilotData.metaTitle,
    description: githubCopilotData.metaDescription,
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-training/github-copilot`,
  },
}

export default function GitHubCopilotTrainingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'GitHub Copilot 法人研修',
    description: githubCopilotData.metaDescription,
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
      <TrainingLPTemplate data={githubCopilotData} />
      <Footer />
    </>
  )
}
