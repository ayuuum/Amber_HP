import TrainingPageClient from '@/components/pages/TrainingPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: '法人向け生成AI研修 | 助成金対応・ChatGPT実務定着リスキリング',
    description: '助成金活用で最大75%OFF。実務直結の法人向け生成AI研修。明日から仕事で使えるスキルを習得。ChatGPTの基礎から高度なプロンプト活用まで。',
    keywords: ['法人向け生成AI研修', 'ChatGPT研修', '生成AI活用', 'リスキリング', '人材開発支援助成金', '社員教育'],
}

export default function TrainingPage() {
    const blogPosts = getAllPosts('training')
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amber-inc.com'

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
                '@type': 'FAQPage',
                'mainEntity': [
                    {
                        '@type': 'Question',
                        'name': '助成金の受給対象になりますか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': '雇用保険を納めている正社員がいらっしゃる企業様であれば、「人材開発支援助成金」の対象となる可能性が高いです。具体的な受給要件については、無料相談にて診断・ご案内いたします。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': '研修の時間はどのくらいですか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': '標準的なプログラムは、1回3時間×2回の計6時間、あるいは1日（6時間）完結型ですが、貴社の課題や参加者のスキルレベルに合わせて1時間から数日間のプログラムまで調整可能です。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': '全くパソコンを使わない部署への研修も可能ですか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': 'はい。現場作業中心の企業様でも、報告書作成や顧客対応の効率化など、スマートフォンからでも使えるAI活用法を提案可能です。'
                        }
                    },
                    {
                        '@type': 'Question',
                        'name': 'プロンプト（指示文）が難しそうですが、使いこなせますか？',
                        'acceptedAnswer': {
                            '@type': 'Answer',
                            'text': 'ご安心ください。「プロンプトを作る技術」を学ぶのではなく、あらかじめ用意された高品質な「テンプレート」を選んで使う方法から指導するため、誰でも即座に成果を出せます。'
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

