export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '株式会社Amber',
    url: 'https://amber-inc.com',
    logo: 'https://amber-inc.com/logo.png',
    description: 'AI顧問サービスとホームサービス事業者向けVertical SaaSを提供。現場の非効率をAIでなくし、働く人の時間と収益を取り戻します。',
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
    },
    sameAs: [
      // SNSアカウントがあれば追加
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI顧問サービス',
    provider: {
      '@type': 'Organization',
      name: '株式会社Amber',
    },
    areaServed: {
      '@type': 'Country',
      name: '日本',
    },
    description: '伴走型AI導入支援・業務改善・自動化サービス。現場で9ヶ月間働いた経験から、現場の課題を深く理解しています。',
  }

  const trainingServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '法人向け生成AI研修',
    provider: {
      '@type': 'Organization',
      name: '株式会社Amber',
    },
    description: '助成金を活用した法人向け生成AI研修。実務で使える生成AIの活用法を学べます。',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trainingServiceSchema) }}
      />
    </>
  )
}

