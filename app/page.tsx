import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServiceSection from '@/components/sections/ServiceSection'
import WhyAmberSection from '@/components/sections/WhyAmberSection'
import StatsSection from '@/components/sections/StatsSection'
import CustomerLogosSection from '@/components/sections/CustomerLogosSection'
import BlogSection from '@/components/sections/BlogSection'
import CustomerVoiceSection from '@/components/sections/CustomerVoiceSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import StructuredData from '@/components/StructuredData'
import { getAllPosts } from '@/lib/markdown'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
  description: 'AI顧問サービスとホームサービス事業者向けVertical SaaSを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
  keywords: ['AI顧問サービス', '生成AI研修', 'Vertical SaaS', 'ホームサービス', '業務効率化', '中小企業', 'AI導入'],
  openGraph: {
    title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
    description: 'AI顧問サービスとホームサービス事業者向けVertical SaaSを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
    url: siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
    description: 'AI顧問サービスとホームサービス事業者向けVertical SaaSを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  // 各カテゴリから最新記事を1件ずつ取得
  const consultingPosts = getAllPosts('consulting')
  const trainingPosts = getAllPosts('training')
  const saasPosts = getAllPosts('saas')

  const latestPosts = {
    consulting: consultingPosts.length > 0 ? consultingPosts[0] : undefined,
    training: trainingPosts.length > 0 ? trainingPosts[0] : undefined,
    saas: saasPosts.length > 0 ? saasPosts[0] : undefined,
  }

  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServiceSection />
        <WhyAmberSection />
        <StatsSection />
        <CustomerLogosSection />
        <BlogSection latestPosts={latestPosts} />
        <CustomerVoiceSection />
        <FAQSection />
        <ContactSection />
        <Footer />
        <FloatingCTA />
      </main>
    </>
  )
}
