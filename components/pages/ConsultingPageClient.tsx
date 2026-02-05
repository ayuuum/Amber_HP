'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import type { BlogPost } from '@/lib/markdown'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'

const plans = [
    {
        name: 'ライト',
        price: '¥50,000/月',
        features: [
            '月1回の業務改善相談',
            '基本的な業務フロー分析',
            '改善提案レポート',
        ],
    },
    {
        name: 'スタンダード',
        price: '¥150,000/月',
        features: [
            '月2回の業務改善相談',
            '詳細な業務分析と改善提案',
            'テンプレート化支援',
            '業務自動化の実装支援',
        ],
        popular: true,
    },
    {
        name: 'カスタム',
        price: 'お問い合わせ',
        features: [
            '柔軟な相談頻度',
            '完全カスタマイズ対応',
            '長期伴走型支援',
            '専任コンサルタント',
        ],
    },
]

const serviceSteps = [
    {
        title: '現状整理・課題特定',
        description: '現在の業務内容をヒアリングし、どこに時間がかかっているか、AIでどこが改善できるかを整理します。',
    },
    {
        title: '実務に合わせたAI活用設計',
        description: '一般的な使い方ではなく、貴社の実際の業務フローの中にAIをどう組み込むかを具体的に設計します。',
    },
    {
        title: '業務フローの簡素化・自動化',
        description: 'AIツールの導入だけでなく、不要な業務の削減やフロー自体の見直しも含めて効率化します。',
    },
    {
        title: '社内定着・仕組みづくり',
        description: '担当者が変わっても誰でも同じ品質で業務が回るよう、マニュアル化や社内ルール作りを支援します。',
    },
]

const faqs = [
    {
        question: '特定のAIツール（ChatGPTなど）の導入しか支援してもらえませんか？',
        answer: 'いいえ。ChatGPTだけでなく、Claude、Gemini、GitHub Copilotなどの汎用ツールから、業界特化型のAI、さらには既存のSaaS（Notion, Slack等）に内蔵されたAI機能の活用まで、貴社の課題に最適なツールを選定・支援します。',
    },
    {
        question: 'コンサルプランの期間は決まっていますか？',
        answer: '標準的には3ヶ月〜6ヶ月を1つのフェーズとしていますが、単発の課題解決から1年以上の長期的な伴走支援まで、企業のフェーズに合わせて柔軟に対応可能です。',
    },
    {
        question: 'ITに詳しくない担当者でも大丈夫でしょうか？',
        answer: '全く問題ありません。むしろITに詳しくない現場の方が「AIで何ができるか」がクリアになった時のインパクトが大きいです。専門用語を使わず、実務ベースで分かりやすく支援します。',
    },
    {
        question: 'AIを導入して本当に収益は上がりますか？',
        answer: 'はい。単なる作業時間の削減（コストカット）だけでなく、削減した時間で「より付加価値の高い業務（顧客対応や新規提案）」に集中できる体制を作ることで、結果として売上・収益の向上を目指します。',
    },
]

type ConsultingPageClientProps = {
    blogPosts: BlogPost[]
}

export default function ConsultingPageClient({ blogPosts }: ConsultingPageClientProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 32, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }

    return (
        <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Breadcrumbs
                        items={[
                            { label: 'サービス', href: '/' },
                            { label: 'AI活用支援・AI顧問サービス' }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-64 lg:h-96 rounded-sm overflow-hidden shadow-xl order-2 lg:order-1"
                    >
                        <Image
                            src="/images/consulting-meeting.png"
                            alt="業務改善と効率化"
                            fill
                            className="object-cover scale-[1.02]"
                            priority
                        />
                        {/* トーン統一（色味の寄せ + 文字が載っても耐える） */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-deep-forest-green/35 via-deep-forest-green/10 to-transparent" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,154,108,0.20),transparent_45%)]" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center lg:text-left order-1 lg:order-2"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6 leading-tight">
                            AI活用支援・<br className="md:hidden" />AI顧問サービス
                        </h1>
                        <p className="text-xl text-deep-forest-green leading-relaxed mb-6 font-medium">
                            AIを「導入する」サービスではなく、<br />
                            AIで「業務のやり方を変える」サービスです。
                        </p>
                        <p className="text-lg text-deep-forest-green leading-relaxed mb-6">
                            ツール選定から実際の運用まで、<br />
                            <strong>「横に立って一緒に進める顧問」</strong>として支援します。
                        </p>
                        <div className="mb-8">
                            <Link
                                href="/service/consulting/blog"
                                className="inline-block text-deep-forest-green hover:text-deep-forest-green transition-colors font-semibold"
                            >
                                関連記事を見る →
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Target Audience */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24 bg-white/50 p-8 md:p-12 rounded-sm"
                >
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-forest-green mb-8 text-center">
                        こんな課題を抱える企業へ
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        {[
                            "AIツールを導入したが、使われなくなっている",
                            "業務が属人化しており、人に依存している",
                            "手作業が多く、本来やるべき仕事に時間が割けない"
                        ].map((text, i) => (
                            <div key={i} className="bg-white p-6 rounded-sm shadow-md border-l-4 border-deep-forest-green flex-1">
                                <p className="text-deep-forest-green font-medium leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Service Contents */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-12 text-center">
                        サービス内容
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {serviceSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-sm border border-deep-forest-green shadow-lg flex flex-col"
                            >
                                <div className="text-4xl text-deep-forest-green font-bold mb-4">0{index + 1}</div>
                                <h3 className="text-xl font-semibold text-deep-forest-green mb-4">{step.title}</h3>
                                <p className="text-deep-forest-green leading-relaxed flex-grow">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Goal Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-24 bg-deep-forest-green text-white p-12 text-center rounded-sm shadow-2xl"
                >
                    <h2 className="text-3xl font-serif font-bold mb-8">このサービスで目指すこと</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-4 border border-deep-forest-green/30 rounded-sm">
                            <h3 className="text-xl font-bold mb-4 text-deep-forest-green">本来の仕事へ集中</h3>
                            <p className="opacity-90">作業時間を減らし、創造的な業務や顧客対応など、人間など本来やるべき価値ある仕事に集中できる状態を作ります。</p>
                        </div>
                        <div className="p-4 border border-deep-forest-green/30 rounded-sm">
                            <h3 className="text-xl font-bold mb-4 text-deep-forest-green">業務の標準化</h3>
                            <p className="opacity-90">特定の人しかできない仕事をなくし、誰がやっても同じ品質で業務が回る、標準化された組織を作ります。</p>
                        </div>
                        <div className="p-4 border border-deep-forest-green/30 rounded-sm">
                            <h3 className="text-xl font-bold mb-4 text-deep-forest-green">AIの日常化</h3>
                            <p className="opacity-90">AIが「特別な新しい技術」ではなく、文房具のように当たり前に使われる状態を目指します。</p>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-12 text-center">
                        よくあるご質問
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-deep-forest-green/20">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full py-4 flex items-center justify-between text-left transition-colors hover:text-deep-forest-green"
                                >
                                    <span className="text-lg font-bold text-deep-forest-green pr-8">
                                        Q. {faq.question}
                                    </span>
                                    {openFaq === index ? (
                                        <Minus className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <Plus className="w-5 h-5 flex-shrink-0" />
                                    )}
                                </button>
                                <motion.div
                                    initial={false}
                                    animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="pb-6 text-deep-forest-green/80 leading-relaxed leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Plans */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="pb-8"
                >
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-12 text-center">
                        料金ラインナップ
                    </h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.02,
                                    y: -6,
                                    transition: { duration: 0.25 }
                                }}
                                className={`bg-white p-8 rounded-sm border-2 ${plan.popular
                                    ? 'border-deep-forest-green shadow-xl'
                                    : 'border-deep-forest-green shadow-lg'
                                    } relative`}
                            >
                                {plan.popular && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
                                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-deep-forest-green text-white px-4 py-1 rounded-sm text-sm font-semibold"
                                    >
                                        おすすめ
                                    </motion.div>
                                )}

                                <h4 className="text-2xl font-bold text-deep-forest-green mb-2">
                                    {plan.name}
                                </h4>
                                <p className="text-3xl font-bold text-deep-forest-green mb-6">
                                    {plan.price}
                                </p>

                                <ul className="space-y-3 text-deep-forest-green">
                                    {plan.features.map((feature, featureIndex) => (
                                        <motion.li
                                            key={featureIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.6 + featureIndex * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <span className="text-deep-forest-green mr-2">✓</span>
                                            <span>{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Blog Preview Section */}
                <BlogPreviewSection posts={blogPosts} category="consulting" />
            </div>
        </main>
    )
}

