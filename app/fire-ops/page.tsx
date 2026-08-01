import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import FireOpsPageClient from '@/components/pages/fire-ops/FireOpsPageClient'
import { fireOpsPage } from '@/data/fire-ops'
import { siteUrl } from '@/lib/site-metadata'

const pageUrl = `${siteUrl}${fireOpsPage.meta.path}`

export const metadata: Metadata = {
  title: fireOpsPage.meta.title,
  description: fireOpsPage.meta.description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: fireOpsPage.meta.ogTitle,
    description: fireOpsPage.meta.description,
    url: pageUrl,
    type: 'website',
    locale: 'ja_JP',
    siteName: '株式会社Amber',
  },
  twitter: {
    card: 'summary_large_image',
    title: fireOpsPage.meta.ogTitle,
    description: fireOpsPage.meta.description,
  },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: '消防設備会社向け 点検・補修案件管理システム',
  alternateName: 'Amber FireOps',
  description: fireOpsPage.meta.description,
  provider: {
    '@type': 'Organization',
    name: '株式会社Amber',
    url: siteUrl,
  },
  areaServed: {
    '@type': 'Country',
    name: 'JP',
  },
  serviceType: '業務システム開発・導入支援',
  url: pageUrl,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: fireOpsPage.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'トップ',
      item: siteUrl,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '消防設備会社向け 点検・補修案件管理システム',
      item: pageUrl,
    },
  ],
}

export default function FireOpsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FireOpsPageClient />
      <Footer />
    </>
  )
}
