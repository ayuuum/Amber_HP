import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TrainingLPTemplate from '@/components/pages/training/TrainingLPTemplate'
import { chatgptData } from '@/components/pages/training/data/chatgpt'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: chatgptData.metaTitle,
  description: chatgptData.metaDescription,
  keywords: chatgptData.metaKeywords,
  openGraph: {
    title: chatgptData.metaTitle,
    description: chatgptData.metaDescription,
    url: `${siteUrl}/service/ai-training/chatgpt`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: chatgptData.metaTitle,
    description: chatgptData.metaDescription,
  },
  alternates: {
    canonical: `${siteUrl}/service/ai-training/chatgpt`,
  },
}

export default function ChatGPTTrainingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'ChatGPT 法人研修',
    description: chatgptData.metaDescription,
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
      <TrainingLPTemplate data={chatgptData} />
      <Footer />
    </>
  )
}
