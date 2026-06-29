import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ServiceLineupSection from '@/components/sections/ServiceLineupSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import AboutSection from '@/components/sections/AboutSection'
import StoriesSection from '@/components/sections/StoriesSection'
import HomeNewsPreview from '@/components/sections/HomeNewsPreview'
import ForestCtaSection from '@/components/sections/ForestCtaSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { buildContactHref } from '@/lib/contact'

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
        <ServiceLineupSection />
        <FeaturesSection />
        <AboutSection variant="teaser" />
        <StoriesSection />
        <HomeNewsPreview />
        <ForestCtaSection
          primaryLabel="相談する"
          primaryHref={buildContactHref('home-forest-cta')}
        />
        <Footer />
      </main>
    </>
  )
}
