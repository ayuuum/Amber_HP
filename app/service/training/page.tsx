import TrainingPageClient from '@/components/pages/TrainingPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '法人向け生成AI研修・DX人材育成 | 助成金対応・ChatGPT/Claude実務定着',
    description: '助成金活用で最大75%OFF。ChatGPT、Claude、Gemini、Copilotを網羅した実務直結の法人向け生成AI研修。リスキリングから業務自動化、プロンプトエンジニアリングまで、明日から使えるスキルを習得。',
    keywords: ['法人向け生成AI研修', 'ChatGPT研修', 'Claude研修', 'Gemini活用', 'リスキリング', 'DX人材育成', '人材開発支援助成金', 'プロンプトエンジニアリング', '業務効率化'],
}

export default function TrainingPage() {
    const blogPosts = getAllPosts('training')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.amber-inc.com'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                'name': '法人向け生成AI研修',
                'description': '実務直結の法人向け生成AI研修。助成金活用で最大75%OFF。',
                'provider': {
                    '@type': 'Organization',
                    'name': '株式会社Amber',
                    'url': siteUrl,
                },
                'areaServed': 'JP',
                'serviceType': 'AI Training',
            },
            {
                '@type': 'Course',
                'name': '法人向け生成AI実務定着研修',
                'description': 'ChatGPT、Claude、Geminiなどの生成AIを実務に定着させるための実践的プログラム。',
                'provider': {
                    '@type': 'Organization',
                    'name': '株式会社Amber',
                    'url': siteUrl,
                },
                'hasCourseInstance': {
                    '@type': 'CourseInstance',
                    'courseMode': 'On-site or Online',
                    'courseWorkload': 'PT6H'
                }
            },
            {
                '@type': 'FAQPage',
                'mainEntity': [
                    {
                        '@type': 'Question',
                        'name': '助成金の受給対象になりますか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': '雇用保険を納めている正社員がいらっしゃる企業様であれば、「人材開発支援助成金（リスキリング支援コース）」の対象となる可能性が高いです。最大75%の助成が受けられます。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': 'ChatGPT以外のAIツールも学べますか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': 'はい、可能です。ChatGPTに加え、最新のClaude 3.5 SonnetやGoogle Gemini、Microsoft Copilotなど、貴社の利用環境や目的に合わせた最適なツールの活用方法を指導します。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': '研修の時間はどのくらいですか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': '標準的なプログラムは、1回3時間×2回の計6時間ですが、最短1時間の講演から数日間のワークショップまで柔軟にカスタマイズ可能です。'
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
            <TrainingPageClient blogPosts={blogPosts} />
            <Footer />
        </>
    )
}

