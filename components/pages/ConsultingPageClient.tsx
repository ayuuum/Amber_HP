'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import TopCtaBlock from '@/components/sections/TopCtaBlock'
import type { BlogPost } from '@/lib/markdown'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArrowRight } from 'lucide-react'

const serviceSteps = [
    {
        title: '現状整理・課題特定',
        description: '業務をヒアリングし、時間がかかっているところとAIで改善できる点を整理します。',
    },
    {
        title: '実務に合わせたAI活用設計',
        description: '貴社の業務フローにAIをどう組み込むか、具体的に設計します。',
    },
    {
        title: '業務フローの簡素化・自動化',
        description: 'AI導入に加え、不要な業務の削減やフロー見直しで効率化します。',
    },
    {
        title: '社内定着・仕組みづくり',
        description: 'マニュアルや社内ルールで、誰がやっても同じ品質で回る仕組みを支援します。',
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
                            { label: 'サービス', href: '/' },
                            { label: 'AI導入支援' }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-sequoia-black mb-6 leading-tight">
                            AI導入支援
                        </h1>
                        <p className="text-lead mb-4">
                            Claude、ChatGPT、Gemini などの生成AIを、<br className="hidden md:inline" />
                            現場の業務に定着するまで伴走支援します。
                        </p>
                        <p className="text-lg text-sequoia-black leading-relaxed mb-8">
                            ツール選定から実際の運用まで、<br className="hidden md:inline" />
                            <span className="highlight">「横に立って一緒に進める顧問」</span>として支援します。
                        </p>
                        <div className="flex flex-col gap-5 items-center">
                            <Link
                                href="/company#contact"
                                className="btn-primary w-full sm:w-auto sm:max-w-[280px] inline-flex items-center justify-center gap-2"
                            >
                                お問い合わせ
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
                            "AIツールを導入したが、使われなくなっている",
                            "業務が属人化しており、人に依存している",
                            "手作業が多く、本来やるべき仕事に時間が割けない",
                        ].map((text, i) => (
                            <div
                                key={i}
                                className="flex-1 min-w-0 py-5 px-6 rounded-sm border border-sequoia-black/10 bg-white/80 text-sequoia-black/90 text-center md:text-left text-[15px] leading-relaxed"
                            >
                                {text}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Service Contents */}
                <section className="py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-heading mb-6">サービス内容</h2>
                        <p className="section-subheading">現状整理から社内定着まで、一貫して伴走します。</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {serviceSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="rounded-sm border border-sequoia-black/10 bg-white p-8 flex flex-col shadow-sm"
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

                {/* Goal Section */}
                <section className="py-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-green-dark text-white p-12 text-center rounded-sm shadow-2xl"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">このサービスで目指すこと</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 border border-white/30 rounded-sm text-left">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">本来の仕事へ集中</h3>
                                <p className="text-white/80 leading-relaxed">手作業を減らし、お客様対応や企画など、本来やりたい仕事に時間を使える状態を作ります。</p>
                            </div>
                            <div className="p-6 border border-white/30 rounded-sm text-left">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">業務の標準化</h3>
                                <p className="text-white/80 leading-relaxed">特定の人しかできない仕事をなくし、誰がやっても同じ品質で業務が回る、標準化された組織を作ります。</p>
                            </div>
                            <div className="p-6 border border-white/30 rounded-sm text-left">
                                <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">AIの日常化</h3>
                                <p className="text-white/80 leading-relaxed">AIが「特別な新しい技術」ではなく、文房具のように当たり前に使われる状態を目指します。</p>
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

