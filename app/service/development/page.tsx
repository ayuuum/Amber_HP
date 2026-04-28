import ConsultingPageClient from '@/components/pages/ConsultingPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI・Webシステム開発 | 業務改善・AI導入支援',
    description: '株式会社AmberのAI・Webシステム開発。業務システム、社内ツール、生成AI連携、AI導入支援まで、現場の運用に合わせて設計・開発します。',
    keywords: ['AIシステム開発', 'Webシステム開発', 'AI導入支援', '業務システム開発', '業務効率化', 'DX推進', '中小企業AI導入'],
}

export default function ConsultingPage() {
    const blogPosts = getAllPosts('development')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                'name': 'AI・Webシステム開発',
                'description': '業務システム、社内ツール、生成AI連携、AI導入支援まで、現場の運用に合わせて設計・開発するサービス。',
                'provider': {
                    '@type': 'Organization',
                    'name': '株式会社Amber',
                    'url': siteUrl,
                },
                'areaServed': 'JP',
                'serviceType': 'AI and Web System Development',
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

