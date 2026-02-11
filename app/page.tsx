import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import WhyAmberSection from '@/components/sections/WhyAmberSection'
import ContactSection from '@/components/sections/ContactSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
  description: 'AI導入支援とホームサービス事業者向け業務システムを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
  keywords: ['AI導入支援', '生成AI研修', 'ホームサービス向け業務システム', 'ホームサービス', '業務効率化', '中小企業', 'AI導入'],
  openGraph: {
    title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
    description: 'AI導入支援とホームサービス事業者向け業務システムを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
    url: siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
    description: 'AI導入支援とホームサービス事業者向け業務システムを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyAmberSection />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </main>
  )
}
