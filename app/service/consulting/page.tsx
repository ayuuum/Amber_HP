import ConsultingPageClient from '@/components/pages/ConsultingPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI活用支援・AI顧問サービス | 業務改善・DXコンサルティング',
    description: '企業のAI活用支援なら株式会社Amber。業務フローの抜本的改革から実務定着まで伴走するAI顧問サービス。生産性向上を実現し、「使われないAI」課題を解決します。',
    keywords: ['AI活用支援', 'AI顧問', '業務効率化', 'DX推進', 'ChatGPT活用コンサル', '中小企業AI導入'],
}

export default function ConsultingPage() {
    const blogPosts = getAllPosts('consulting')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amber-inc.com'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                'name': 'AI活用支援・AI顧問サービス',
                'description': '業務フローの抜本的改革から実務定着まで伴走するAI顧問サービス。',
                'provider': {
                    '@type': 'Organization',
                    'name': '株式会社Amber',
                    'url': siteUrl,
                },
                'areaServed': 'JP',
                'serviceType': 'AI Consulting',
            },
            {
                '@type': 'FAQPage',
                'mainEntity': [
                    {
                        '@type': 'Question',
                        'name': '特定のAIツール（ChatGPTなど）の導入しか支援してもらえませんか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': 'いいえ。ChatGPTだけでなく、Claude、Gemini、GitHub Copilotなどの汎用ツールから、業界特化型のAI、さらには既存のSaaS（Notion, Slack等）に内蔵されたAI機能の活用まで、貴社の課題に最適なツールを選定・支援します。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': 'コンサルプランの期間は決まっていますか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': '標準的には3ヶ月〜6ヶ月を1つのフェーズとしていますが、単発の課題解決から1年以上の長期的な伴走支援まで、企業のフェーズに合わせて柔軟に対応可能です。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': 'ITに詳しくない担当者でも大丈夫でしょうか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': '全く問題ありません。むしろITに詳しくない現場の方が「AIで何ができるか」がクリアになった時のインパクトが大きいです。専門用語を使わず、実務ベースで分かりやすく支援します。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': 'AIを導入して本当に収益は上がりますか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': 'はい。単なる作業時間の削減（コストカット）だけでなく、削減した時間で「より付加価値の高い業務（顧客対応や新規提案）」に集中できる体制を作ることで、結果として売上・収益の向上を目指します。'
                        }
                    }
                ]
            }
        ]
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

