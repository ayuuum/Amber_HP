import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomeHero from '@/components/home/HomeHero'
import ProofStrip from '@/components/home/ProofStrip'
import ValueBento from '@/components/home/ValueBento'
import CaseStudies from '@/components/home/CaseStudies'
import AxProcess from '@/components/home/AxProcess'
import Capabilities from '@/components/home/Capabilities'
import FdeStyle from '@/components/home/FdeStyle'
import TrustPrinciples from '@/components/home/TrustPrinciples'
import LatestInsights from '@/components/home/LatestInsights'
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
      <ProofStrip />
      <ValueBento />
      <CaseStudies />
      <AxProcess />
      <Capabilities />
      <FdeStyle />
      <TrustPrinciples />
      <LatestInsights />
      <FinalCta />
      <Footer />
    </main>
  )
}
