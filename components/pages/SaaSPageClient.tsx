'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import type { BlogPost } from '@/lib/markdown'

const features = [
    {
        title: '自社予約ページ＋LINE連携',
        description: '自社専用の予約ページ作成とLINE公式アカウントとの連携で、24時間自動で予約を受け付けます。',
    },
    {
        title: '顧客・作業履歴の一元管理',
        description: '顧客情報と過去の作業履歴、好みなどを紐づけて管理。リピート提案や紹介依頼がスムーズになります。',
    },
    {
        title: '予約・スタッフ管理',
        description: '複数のスタッフのスケジュール調整もドラッグ＆ドロップで簡単。移動時間やエリアも考慮できます。',
    },
    {
        title: '請求書・入金管理の自動化',
        description: '作業完了後の請求書発行から、入金確認、催促メールまでを自動化し、未回収リスクを防ぎます。',
    },
    {
        title: '口コミ・再来促進の自動化',
        description: '作業後のお礼メールや口コミ依頼、定期的なメンテナンス案内（リコール）を自動で配信します。',
    },
    {
        title: '会計ソフト連携',
        description: '主要な会計ソフトとデータを連携し、日々の売上計上や経理処理の手間を大幅に削減します。',
    },
]

type SaaSPageClientProps = {
    blogPosts: BlogPost[]
}

export default function SaaSPageClient({ blogPosts }: SaaSPageClientProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        hover: {
            scale: 1.02,
            y: -6,
            transition: { duration: 0.25 },
        },
    }

    return (
        <main className="min-h-screen pt-24 pb-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link href="/#vertical-saas" className="text-deep-forest-green hover:text-deep-forest-green transition-colors">
                        ← Back to Home
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
                        ホームサービス業のための<br />AI業務OS
                    </h1>
                    <p className="text-xl text-deep-forest-green max-w-3xl mx-auto leading-relaxed mb-4 font-bold">
                        「現場の仕事」と「事務作業」を、AIで一つの滑らかな流れに。
                    </p>
                    <p className="text-lg text-deep-forest-green max-w-3xl mx-auto leading-relaxed mb-6">
                        ホームサービス事業者の運営を、インフラから劇的に進化させます。
                    </p>
                    <div>
                        <Link
                            href="/service/saas/blog"
                            className="inline-block text-deep-forest-green hover:text-deep-forest-green transition-colors font-semibold"
                        >
                            関連記事を見る →
                        </Link>
                    </div>
                </motion.div>

                {/* Target & Problems */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24 grid md:grid-cols-2 gap-12"
                >
                    <div className="bg-white/50 p-8 rounded-sm">
                        <h2 className="text-2xl font-serif font-bold text-deep-forest-green mb-6">
                            対象となる事業者様
                        </h2>
                        <ul className="space-y-3 text-deep-forest-green font-medium">
                            <li className="flex items-center"><span className="text-deep-forest-green mr-2">●</span>ハウスクリーニング</li>
                            <li className="flex items-center"><span className="text-deep-forest-green mr-2">●</span>不用品回収</li>
                            <li className="flex items-center"><span className="text-deep-forest-green mr-2">●</span>リフォーム・修理</li>
                            <li className="flex items-center"><span className="text-deep-forest-green mr-2">●</span>害虫駆除・引越し など</li>
                        </ul>
                        <p className="mt-4 text-sm text-deep-forest-green opacity-80">
                            ※個人のお客様から直接依頼を受けるホームサービス事業者向け
                        </p>
                    </div>
                    <div className="bg-white/50 p-8 rounded-sm">
                        <h2 className="text-2xl font-serif font-bold text-deep-forest-green mb-6">
                            よくあるお悩み
                        </h2>
                        <ul className="space-y-3 text-deep-forest-green">
                            <li className="flex items-start">
                                <span className="text-red-400 mr-2 font-bold">✕</span>
                                予約・見積・請求がバラバラで管理が大変
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-400 mr-2 font-bold">✕</span>
                                LINE・電話・各サービスの連絡が分散している
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-400 mr-2 font-bold">✕</span>
                                プラットフォーム手数料が高く、利益が残らない
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-400 mr-2 font-bold">✕</span>
                                リピーターや紹介が仕組み化されていない
                            </li>
                        </ul>
                    </div>
                </motion.div>


                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-12 text-center">
                        Amberのできること
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover="hover"
                                className="bg-white p-6 rounded-sm border border-deep-forest-green shadow-lg"
                            >
                                <h3 className="text-xl font-semibold text-deep-forest-green mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-deep-forest-green leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* UI Image */}
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.01, y: -4 }}
                    className="bg-white p-4 md:p-8 rounded-sm border border-deep-forest-green shadow-xl overflow-hidden mb-24"
                >
                    <div className="relative aspect-video rounded-sm overflow-hidden bg-white">
                        <Image
                            src="/images/saas-dashboard.png"
                            alt="AI業務OSのダッシュボード画面イメージ"
                            fill
                            className="object-contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest-green/10 via-transparent to-transparent" />
                    </div>
                </motion.div>

                {/* Philosophy & Goal */}
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Goal */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-2xl font-serif font-bold text-deep-forest-green mb-6">
                            このサービスが目指す状態
                        </h2>
                        <ul className="space-y-4 text-deep-forest-green text-lg">
                            <li className="flex items-center">
                                <span className="text-deep-forest-green text-2xl mr-3">◎</span>
                                事務作業に追われず、現場と顧客対応に集中できる
                            </li>
                            <li className="flex items-center">
                                <span className="text-deep-forest-green text-2xl mr-3">◎</span>
                                自社で予約が回り、プラットフォーム手数料に依存しない
                            </li>
                            <li className="flex items-center">
                                <span className="text-deep-forest-green text-2xl mr-3">◎</span>
                                スマホ一つで、仕事の全体が把握できる
                            </li>
                        </ul>
                    </motion.div>

                    {/* Philosophy */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-deep-forest-green text-white p-8 rounded-sm shadow-xl"
                    >
                        <h2 className="text-2xl font-serif font-bold mb-6 border-b border-deep-forest-green/30 pb-4">
                            Amberが大切にしていること
                        </h2>
                        <p className="leading-relaxed mb-4 opacity-90">
                            Amberは、テクノロジーで仕事を置き換えたいのではなく、
                            <strong>「現場で働く人の負担を減らしたい」</strong>と考えています。
                        </p>
                        <p className="leading-relaxed text-lg font-medium">
                            難しい言葉や派手な機能ではなく、<br />
                            <strong>「ちゃんと使える」</strong><br />
                            <strong>「ちゃんと楽になる」</strong><br />
                            ことを何によりも大切にしています。
                        </p>
                    </motion.div>
                </div>

                {/* Blog Preview Section */}
                <BlogPreviewSection posts={blogPosts} category="saas" />
            </div>
        </main>
    )
}

