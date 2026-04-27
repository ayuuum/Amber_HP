import JsonLd from '@/components/JsonLd'
import { siteUrl, siteMetadata } from '@/lib/site-metadata'

export default function StructuredData() {
  // グローバル（サイト共通）: Organization / WebSite / LocalBusiness のみ
  // ページ固有（Service / FAQ / BlogPosting等）は各ページで出し分ける

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.name,
    alternateName: 'Amber Inc.',
    url: siteUrl,
    logo: `${siteUrl}/og-image.jpg`,
    description: siteMetadata.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: '東京都',
      addressLocality: '港区',
      postalCode: '105-0001',
      streetAddress: '虎ノ門3丁目1-1 2階',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-80-3814-0263',
      contactType: 'customer service',
      email: 'ayumu.matsui@amber-inc.com',
      availableLanguage: ['Japanese'],
    },
    founder: {
      '@type': 'Person',
      name: '松井 歩武',
      jobTitle: '代表取締役',
      sameAs: [
        // 'https://twitter.com/ayumu_matsui',
        // 'https://www.linkedin.com/in/ayumu-matsui',
      ],
    },
    sameAs: [
      // 'https://twitter.com/amber_inc',
      // 'https://www.facebook.com/amber.inc',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.name,
    url: siteUrl,
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteMetadata.name,
    image: `${siteUrl}/og-image.jpg`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+81-80-3814-0263',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '虎ノ門3丁目1-1 2階',
      addressLocality: '港区',
      addressRegion: '東京都',
      postalCode: '105-0001',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.6664,
      longitude: 139.7466,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  }

  return (
    <>
      <JsonLd id="jsonld-organization" data={organizationSchema} />
      <JsonLd id="jsonld-website" data={websiteSchema} />
      <JsonLd id="jsonld-localbusiness" data={localBusinessSchema} />
    </>
  )
}
