'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import type { BlogPost } from '@/lib/markdown'

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

type ConsultingPageClientProps = {
    blogPosts: BlogPost[]
}

export default function ConsultingPageClient({ blogPosts }: ConsultingPageClientProps) {
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
        <main className="min-h-screen pt-24 pb-24 px-6 bg-cream">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link href="/#ai-consulting" className="text-deep-forest-green hover:text-espresso-brown transition-colors">
                        ← Back to Home
                    </Link>
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
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop"
                            alt="業務改善と効率化"
                            fill
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center lg:text-left order-1 lg:order-2"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
                            AI顧問サービス
                        </h1>
                        <p className="text-xl text-espresso-brown leading-relaxed mb-6 font-medium">
                            AIを「導入する」サービスではなく、<br />
                            AIで「業務のやり方を変える」サービスです。
                        </p>
                        <p className="text-lg text-espresso-brown leading-relaxed mb-6">
                            ツール選定から実際の運用まで、<br />
                            <strong>「横に立って一緒に進める顧問」</strong>として支援します。
                        </p>
                        <div className="mb-8">
                            <Link
                                href="/service/consulting/blog"
                                className="inline-block text-deep-forest-green hover:text-warm-amber transition-colors font-semibold"
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
                            <div key={i} className="bg-warm-cream p-6 rounded-sm shadow-md border-l-4 border-deep-forest-green flex-1">
                                <p className="text-espresso-brown font-medium leading-relaxed">{text}</p>
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
                                className="bg-warm-cream p-8 rounded-sm border border-stone-gray shadow-lg flex flex-col"
                            >
                                <div className="text-4xl text-warm-amber font-bold mb-4">0{index + 1}</div>
                                <h3 className="text-xl font-semibold text-deep-forest-green mb-4">{step.title}</h3>
                                <p className="text-espresso-brown leading-relaxed flex-grow">
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
                    className="mb-24 bg-deep-forest-green text-warm-cream p-12 text-center rounded-sm shadow-2xl"
                >
                    <h2 className="text-3xl font-serif font-bold mb-8">このサービスで目指すこと</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-4 border border-warm-amber/30 rounded-sm">
                            <h3 className="text-xl font-bold mb-4 text-warm-amber">本来の仕事へ集中</h3>
                            <p className="opacity-90">作業時間を減らし、創造的な業務や顧客対応など、人間など本来やるべき価値ある仕事に集中できる状態を作ります。</p>
                        </div>
                        <div className="p-4 border border-warm-amber/30 rounded-sm">
                            <h3 className="text-xl font-bold mb-4 text-warm-amber">業務の標準化</h3>
                            <p className="opacity-90">特定の人しかできない仕事をなくし、誰がやっても同じ品質で業務が回る、標準化された組織を作ります。</p>
                        </div>
                        <div className="p-4 border border-warm-amber/30 rounded-sm">
                            <h3 className="text-xl font-bold mb-4 text-warm-amber">AIの日常化</h3>
                            <p className="opacity-90">AIが「特別な新しい技術」ではなく、文房具のように当たり前に使われる状態を目指します。</p>
                        </div>
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
                                className={`bg-warm-cream p-8 rounded-sm border-2 ${plan.popular
                                    ? 'border-warm-amber shadow-xl'
                                    : 'border-stone-gray shadow-lg'
                                    } relative`}
                            >
                                {plan.popular && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
                                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-warm-amber text-warm-cream px-4 py-1 rounded-sm text-sm font-semibold"
                                    >
                                        おすすめ
                                    </motion.div>
                                )}

                                <h4 className="text-2xl font-bold text-deep-forest-green mb-2">
                                    {plan.name}
                                </h4>
                                <p className="text-3xl font-bold text-warm-amber mb-6">
                                    {plan.price}
                                </p>

                                <ul className="space-y-3 text-espresso-brown">
                                    {plan.features.map((feature, featureIndex) => (
                                        <motion.li
                                            key={featureIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.6 + featureIndex * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <span className="text-warm-amber mr-2">✓</span>
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

