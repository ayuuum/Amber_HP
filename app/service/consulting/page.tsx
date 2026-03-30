import ConsultingPageClient from '@/components/pages/ConsultingPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI導入支援 | 業務改善・DXコンサルティング',
    description: '企業のAI導入支援なら株式会社Amber。業務フローの抜本的改革から実務定着まで伴走するAI導入支援サービス。生産性向上を実現し、「使われないAI」課題を解決します。',
    keywords: ['AI導入支援', 'AI活用支援', '業務効率化', 'DX推進', 'ChatGPT活用コンサル', 'Claude活用支援', '中小企業AI導入'],
}

export default function ConsultingPage() {
    const blogPosts = getAllPosts('consulting')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                'name': 'AI導入支援',
                'description': '業務フローの抜本的改革から実務定着まで伴走するAI導入支援サービス。',
                'provider': {
                    '@type': 'Organization',
                    'name': '株式会社Amber',
                    'url': siteUrl,
                },
                'areaServed': 'JP',
                'serviceType': 'AI Consulting',
            },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            <ConsultingPageClient blogPosts={blogPosts} />
            <Footer />
        </>
    )
}

