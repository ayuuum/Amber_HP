import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeHero from '@/components/home/HomeHero'
import ServicesOverview from '@/components/home/ServicesOverview'
import EnvironmentsSection from '@/components/home/EnvironmentsSection'
import DomainsSection from '@/components/home/DomainsSection'
import CaseStudies from '@/components/home/CaseStudies'
import MethodSection from '@/components/home/MethodSection'
import IndustriesSection from '@/components/home/IndustriesSection'
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
      <ServicesOverview />
      <EnvironmentsSection />
      <DomainsSection />
      <CaseStudies />
      <MethodSection />
      <IndustriesSection />
      <FinalCta />
      <Footer />
    </main>
  )
}
