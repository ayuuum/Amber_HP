import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import BusinessPillarsSection from '@/components/sections/BusinessPillarsSection'
import AboutSection from '@/components/sections/AboutSection'
import HomeNewsPreview from '@/components/sections/HomeNewsPreview'
import TopCtaBlock from '@/components/sections/TopCtaBlock'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { siteUrl, siteMetadata } from '@/lib/site-metadata'

export const metadata: Metadata = {
  title: siteMetadata.defaultTitle,
  description: siteMetadata.description,
  keywords: [...siteMetadata.keywords],
  openGraph: {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.description,
    url: siteUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.defaultTitle,
    description: siteMetadata.description,
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
        <BusinessPillarsSection />
        <AboutSection variant="teaser" />
        <HomeNewsPreview />
        <TopCtaBlock />
        <Footer />
      </main>
    </>
  )
}
