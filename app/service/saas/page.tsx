import SaaSPageClient from '@/components/pages/SaaSPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ホームサービス事業者向けAI業務OS | Vertical SaaS | 株式会社Amber',
    description: '予約管理から施工、請求までをAIで一気通貫。ホームサービス業（ハウスクリーニング・リフォーム等）の現場を深く知るAmberが提供する、次世代のVertical SaaS。業務効率を最大化し、収益性を向上させます。',
    keywords: ['Vertical SaaS', 'ホームサービス業', '業務効率化', 'AI予約管理', '施工管理アプリ', 'DX', '現場DX'],
}

export default function SaaSPage() {
    const blogPosts = getAllPosts('saas')
    const siteUrl = 'https://amber-inc.com'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': ['Service', 'SoftwareApplication'],
        'name': 'ホームサービス向けAI業務OS',
        'description': '予約管理から施工、請求までをAIで一気通貫する次世代Vertical SaaS。',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web',
        'provider': {
            '@type': 'Organization',
            'name': '株式会社Amber',
            'url': siteUrl,
        },
        'areaServed': 'JP',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            <SaaSPageClient blogPosts={blogPosts} />
            <Footer />
        </>
    )
}
