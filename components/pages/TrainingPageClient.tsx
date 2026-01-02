'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import type { BlogPost } from '@/lib/markdown'

const curriculum = [
    {
        title: 'ChatGPTの基本と安全な使い方',
        description: '基本的な考え方から、リスクを回避するための安全な利用ガイドラインまでを習得します。',
    },
    {
        title: '資料作成・要約・企画立案',
        description: '議事録の要約、企画書の骨子作成、リサーチ業務など、日常業務の効率化を実践します。',
    },
    {
        title: '社内文書・マニュアル作成',
        description: '手間のかかるマニュアル作成や社内文書のドラフト作成をAIで効率化する方法を学びます。',
    },
    {
        title: '営業・顧客対応への活用',
        description: 'メール文面の作成、想定問答集の作成など、営業活動の質とスピードを向上させます。',
    },
    {
        title: '社内展開のためのルール作り',
        description: '組織として継続的に活用するための運用ルールやプロンプトの共有方法を策定します。',
    },
]

const features = [
    {
        title: '実務直結のワークショップ',
        description: '実際の業務を題材にしたワーク中心の構成で、「明日から使える」スキルを身につけます。',
    },
    {
        title: '職種・業種別カスタマイズ',
        description: '営業、人事、製造など、各職種の業務フローに合わせた内容にカスタマイズします。',
    },
    {
        title: 'プロンプト・テンプレート提供',
        description: '研修後すぐに業務で使える高品質なプロンプトや業務テンプレートを提供します。',
    },
    {
        title: '運用ルール・注意点の整理',
        description: '社内で迷わず安全に使うための運用ルールやセキュリティの注意点も整理します。',
    },
]

type TrainingPageClientProps = {
    blogPosts: BlogPost[]
}

export default function TrainingPageClient({ blogPosts }: TrainingPageClientProps) {
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
                <div className="mb-12">
                    <Link href="/#ai-training" className="text-deep-forest-green hover:text-deep-forest-green transition-colors">
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
                            src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80&auto=format&fit=crop"
                            alt="法人向けAI研修"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-deep-forest-green text-white px-6 py-3 rounded-sm text-lg font-bold shadow-lg">
                            助成金活用で75%OFF
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center lg:text-left order-1 lg:order-2"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
                            法人向け生成AI研修
                        </h1>
                        <p className="text-xl text-deep-forest-green leading-relaxed mb-6 font-medium">
                            「AIを知る」ことではなく、<br />
                            「AIが仕事の一部になる」ことを目的としています。
                        </p>
                        <div className="text-lg text-deep-forest-green leading-relaxed space-y-4">
                            <p>
                                「明日から仕事のやり方が変わる研修」を設計します。<br />
                                一度きりの勉強会で終わらせない、実務定着型の研修です。
                            </p>
                            <p>
                                リスキリング助成金などの活用により、研修費用の最大75%が補助されます。<br />
                                煩雑な申請手続きもサポートいたします。
                            </p>
                            <div className="pt-4">
                                <Link
                                    href="/service/training/blog"
                                    className="inline-block text-deep-forest-green hover:text-deep-forest-green transition-colors font-semibold"
                                >
                                    関連記事を見る →
                                </Link>
                            </div>
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
                        こんな方のための研修です
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        {[
                            "生成AIが話題だが、業務でどう使えばいいかわからない",
                            "社員ごとに使い方がバラバラで、効果が出ていない",
                            "研修をやっても、現場で使われずに終わってしまう"
                        ].map((text, i) => (
                            <div key={i} className="bg-white p-6 rounded-sm shadow-md border-l-4 border-deep-forest-green flex-1">
                                <p className="text-deep-forest-green font-medium leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-12 text-center">
                        Amberの研修の特徴
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                className="bg-deep-forest-green text-white p-8 rounded-sm shadow-xl"
                            >
                                <h3 className="text-xl font-bold mb-4 border-b border-deep-forest-green/50 pb-2 inline-block">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed opacity-90">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Curriculum */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-12 text-center">
                        主な研修内容
                    </h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {curriculum.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.02,
                                    y: -6,
                                    transition: { duration: 0.25 }
                                }}
                                className="bg-white p-8 rounded-sm border border-deep-forest-green shadow-lg"
                            >
                                <h3 className="text-xl font-semibold text-deep-forest-green mb-4">{item.title}</h3>
                                <p className="text-deep-forest-green leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Blog Preview Section */}
                <BlogPreviewSection posts={blogPosts} category="training" />
            </div>
        </main>
    )
}

