'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import TopCtaBlock from '@/components/sections/TopCtaBlock'
import type { BlogPost } from '@/lib/markdown'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowRight } from 'lucide-react'
import { placeholders } from '@/lib/placeholder-images'

const serviceSteps = [
    {
        title: '業務整理・要件定義',
        description: '現場の業務フロー、既存ツール、手作業を整理し、開発すべき範囲と優先順位を明確にします。',
    },
    {
        title: 'Webシステム設計・開発',
        description: '予約管理、顧客管理、社内ツール、管理画面など、業務に合わせたWebシステムを設計・実装します。',
    },
    {
        title: '生成AI連携・自動化',
        description: '問い合わせ対応、文書作成、情報整理、レポート生成など、AIを組み込むべき箇所を実装します。',
    },
    {
        title: '運用定着・改善',
        description: '納品後の使い方、社内ルール、改善サイクルまで支援し、現場で使われ続ける状態を目指します。',
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
        <main className="min-h-screen pt-24 pb-24 px-6 bg-color-bg">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Breadcrumbs
                        items={[
                            { label: 'サービス', href: '/#services' },
                            { label: 'AI・Webシステム開発' }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative order-1 lg:order-none aspect-[4/3] w-full max-w-xl mx-auto lg:max-w-none rounded-sm overflow-hidden border border-sequoia-black/10 shadow-md bg-sequoia-black/5"
                    >
                        <Image
                            src={placeholders.systemDevelopment}
                            alt="AI・Webシステム開発と業務フロー設計を表すブランドビジュアル"
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(196,154,108,0.08),transparent_55%)] pointer-events-none" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                        className="text-center lg:text-left order-2 lg:order-none"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-sequoia-black mb-6 leading-tight">
                            AI・Webシステム開発
                        </h1>
                        <p className="text-lead mb-4">
                            通常のWeb開発から生成AI連携まで、<br className="hidden md:inline" />
                            現場の業務に合わせて設計・実装します。
                        </p>
                        <p className="text-lg text-sequoia-black leading-relaxed mb-8">
                            予約管理、顧客管理、社内ツール、業務自動化など、<br className="hidden md:inline" />
                            小さな試作から運用定着まで<span className="highlight">「パートナー」</span>として伴走します。
                        </p>
                        <div className="flex flex-col gap-5 items-center lg:items-start">
                            <Link
                                href="/company#contact"
                                className="btn-primary w-full sm:w-auto sm:max-w-[280px] inline-flex items-center justify-center gap-2"
                            >
                                開発相談をする
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/service/consulting/blog"
                                className="text-link inline-flex items-center gap-1.5 text-[15px]"
                            >
                                関連記事を見る
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
                {/* Target Audience */}
                <section className="py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-heading mb-6">こんな課題を抱える企業へ</h2>
                        <p className="section-subheading">
                            AIの活用や業務効率化でお困りの企業様に向けた伴走支援です。
                        </p>
                    </motion.div>
                    <div className="flex flex-col md:flex-row gap-5 justify-center">
                        {[
                            "予約・顧客管理・請求などの業務をシステム化したい",
                            "Excelや紙、複数ツールに散らばった運用を整理したい",
                            "生成AIを社内業務に組み込みたいが、何から作るべきか分からない",
                        ].map((text, i) => (
                            <div
                                key={i}
                                className="flex-1 min-w-0 py-5 px-6 rounded-sm border border-sequoia-black/10 bg-color-bg text-sequoia-black/90 text-center md:text-left text-[15px] leading-relaxed"
                            >
                                {text}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="max-w-4xl mx-auto mb-8">
                    <div className="relative aspect-[21/9] max-h-48 w-full rounded-sm overflow-hidden border border-sequoia-black/10 shadow-sm bg-sequoia-black/5">
                        <Image
                            src={placeholders.meeting}
                            alt="ヒアリング・伴走のイメージ（仮の写真）"
                            fill
                            className="object-cover"
                            sizes="(max-width: 896px) 100vw, 896px"
                        />
                    </div>
                </div>

                {/* Service Contents */}
                <section className="py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-heading mb-6">開発・支援内容</h2>
                        <p className="section-subheading">要件整理から実装、AI連携、運用定着まで、一貫して伴走します。</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {serviceSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="rounded-sm border border-sequoia-black/10 bg-color-bg p-8 flex flex-col shadow-sm"
                            >
                                <span className="text-2xl font-semibold text-sequoia-black/70 mb-3 tabular-nums">0{index + 1}</span>
                                <h3 className="text-xl font-semibold text-sequoia-black mb-4">{step.title}</h3>
                                <p className="text-sequoia-black/90 leading-relaxed flex-grow text-[15px]">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Goal Section（周辺セクションと同じクリーム系トーンに統一） */}
                <section className="py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-sm border border-sequoia-green/15 bg-[rgba(251,247,240,0.95)] p-8 md:p-10 shadow-sm"
                    >
                        <div className="text-center mb-10 md:mb-12">
                            <h2 className="section-heading mb-4">この開発支援で目指すこと</h2>
                            <p className="section-subheading">
                                導入だけで終わらず、現場に根ざした変化として定着させます。
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="rounded-sm border border-sequoia-black/10 bg-color-bg p-6 text-left shadow-sm">
                                <h3 className="text-lg md:text-xl font-bold text-sequoia-black mb-3">本来の仕事へ集中</h3>
                                <p className="text-sequoia-black/90 leading-relaxed text-[15px]">
                                    手作業を減らし、お客様対応や企画など、本来やりたい仕事に時間を使える状態を作ります。
                                </p>
                            </div>
                            <div className="rounded-sm border border-sequoia-black/10 bg-color-bg p-6 text-left shadow-sm">
                                <h3 className="text-lg md:text-xl font-bold text-sequoia-black mb-3">業務の標準化</h3>
                                <p className="text-sequoia-black/90 leading-relaxed text-[15px]">
                                    特定の人しかできない仕事をなくし、誰がやっても同じ品質で業務が回る、標準化された組織を作ります。
                                </p>
                            </div>
                            <div className="rounded-sm border border-sequoia-black/10 bg-color-bg p-6 text-left shadow-sm">
                                <h3 className="text-lg md:text-xl font-bold text-sequoia-black mb-3">AIの日常化</h3>
                                <p className="text-sequoia-black/90 leading-relaxed text-[15px]">
                                    AIが「特別な新しい技術」ではなく、文房具のように当たり前に使われる状態を目指します。
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* CTA */}
                <TopCtaBlock />

                {/* Blog Preview Section */}
                <BlogPreviewSection posts={blogPosts} category="consulting" />
            </div>
        </main>
    )
}

