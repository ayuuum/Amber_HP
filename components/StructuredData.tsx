import JsonLd from '@/components/JsonLd'
import { companyInfo } from '@/lib/company-info'
import { siteUrl, siteMetadata } from '@/lib/site-metadata'

export default function StructuredData() {
  // グローバル（サイト共通）: Organization / WebSite / LocalBusiness のみ
  // ページ固有（Service / FAQ / BlogPosting等）は各ページで出し分ける

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.name,
    alternateName: companyInfo.legalNameEn,
    url: siteUrl,
    logo: `${siteUrl}/opengraph-image`,
    description: siteMetadata.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: companyInfo.addressRegion,
      addressLocality: companyInfo.addressLocality,
      postalCode: companyInfo.postalCode,
      streetAddress: companyInfo.streetAddressAscii,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: companyInfo.phoneE164,
      contactType: 'customer service',
      email: companyInfo.email,
      availableLanguage: ['Japanese'],
    },
    founder: {
      '@type': 'Person',
      name: companyInfo.representativeName,
      jobTitle: companyInfo.representativeTitle,
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
    image: `${siteUrl}/opengraph-image`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: companyInfo.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.streetAddressAscii,
      addressLocality: companyInfo.addressLocality,
      addressRegion: companyInfo.addressRegion,
      postalCode: companyInfo.postalCode,
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: companyInfo.geo.latitude,
      longitude: companyInfo.geo.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...companyInfo.openingHours.days],
      opens: companyInfo.openingHours.opens,
      closes: companyInfo.openingHours.closes,
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
