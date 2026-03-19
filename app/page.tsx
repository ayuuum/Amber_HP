import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ServiceSection from '@/components/sections/ServiceSection'
import TopCtaBlock from '@/components/sections/TopCtaBlock'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

export const metadata: Metadata = {
  title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
  description: '暮らしを支える人に、テクノロジーを。AI導入支援とホームサービス向け業務システムを提供しています。',
  keywords: ['AI導入支援', 'ホームサービス向け業務システム', 'ホームサービス', '業務効率化', '中小企業', 'AI導入'],
  openGraph: {
    title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
    description: '暮らしを支える人に、テクノロジーを。AI導入支援とホームサービス向け業務システムを提供しています。',
    url: siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '株式会社Amber | 暮らしを支える人に、テクノロジーを。',
    description: '暮らしを支える人に、テクノロジーを。AI導入支援とホームサービス向け業務システムを提供しています。',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <ServiceSection />
        <TopCtaBlock />
        <Footer />
      </main>
    </>
  )
}
