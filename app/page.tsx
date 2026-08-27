import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeHero from '@/components/home/HomeHero'
import MissionSection from '@/components/home/MissionSection'
import IndustriesSection from '@/components/home/IndustriesSection'
import WhatWeDoSection from '@/components/home/WhatWeDoSection'
import WhatWeBuildSection from '@/components/home/WhatWeBuildSection'
import RealOperationsSection from '@/components/home/RealOperationsSection'
import CaseStudies from '@/components/home/CaseStudies'
import HowWeWorkSection from '@/components/home/HowWeWorkSection'
import CompanyTeaserSection from '@/components/home/CompanyTeaserSection'
import FinalCta from '@/components/home/FinalCta'
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
    <main className="min-h-screen bg-white">
      <Header />
      <HomeHero />
      <MissionSection />
      <IndustriesSection />
      <WhatWeDoSection />
      <WhatWeBuildSection />
      <RealOperationsSection />
      <CaseStudies />
      <HowWeWorkSection />
      <CompanyTeaserSection />
      <FinalCta />
      <Footer />
    </main>
  )
}
