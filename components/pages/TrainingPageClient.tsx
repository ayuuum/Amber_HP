'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import BlogPreviewSection from '@/components/sections/BlogPreviewSection'
import StatsSection from '@/components/sections/StatsSection'
import CustomerVoiceSection from '@/components/sections/CustomerVoiceSection'
import type { BlogPost } from '@/lib/markdown'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Plus, Minus, Info, HelpCircle, Users, BookOpen } from 'lucide-react'
import { useState } from 'react'

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

const faqs = [
    {
        question: '助成金の受給対象になりますか？',
        answer: '正社員がいる企業様であれば、国の助成金（人材開発支援助成金など）の対象になることが多いです。条件の詳細は無料相談でお伝えします。',
    },
    {
        question: '研修の時間はどのくらいですか？',
        answer: '標準的なプログラムは、1回3時間×2回の計6時間、あるいは1日（6時間）完結型ですが、貴社の課題や参加者のスキルレベルに合わせて1時間から数日間のプログラムまで調整可能です。',
    },
    {
        question: '全くパソコンを使わない部署への研修も可能ですか？',
        answer: 'はい。現場作業中心の企業様でも、報告書作成や顧客対応の効率化など、スマートフォンからでも使えるAI活用法を提案可能です。',
    },
    {
        question: 'AIへの指示文は難しそうですが、使いこなせますか？',
        answer: '大丈夫です。指示文を一から作るのではなく、用意したテンプレートを選んで使う方法から教えるので、誰でもすぐに成果を出せます。',
    },
]

type TrainingPageClientProps = {
    blogPosts: BlogPost[]
}

export default function TrainingPageClient({ blogPosts }: TrainingPageClientProps) {
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
                            { label: '法人向け生成AI研修' }
                        ]}
                    />
                </div>

                {/* Hero Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-64 lg:h-96 rounded-sm overflow-hidden shadow-xl order-2 lg:order-1 bg-deep-forest-green"
                    >
                        <Image
                            src="/illustrations/hero-training.png"
                            alt="研修と学習を示すイラスト"
                            fill
                            className="object-contain p-8 md:p-10"
                            priority
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(196,154,108,0.12),transparent_55%)]" />
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
                        <p className="text-lead mb-4">
                            「AIを知る」ことではなく、<br className="hidden md:inline" />
                            「AIが仕事の一部になる」ことを目的としています。
                        </p>
                        <div className="text-lg text-deep-forest-green leading-relaxed space-y-4">
                            <p>
                                「明日から仕事のやり方が変わる研修」を設計します。<br className="hidden md:inline" />
                                一度きりの勉強会で終わらせない、実務定着型の研修です。
                            </p>
                            <p>
                                リスキリング助成金などの活用により、研修費用の<span className="highlight">最大75%</span>が補助されます。<br className="hidden md:inline" />
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

                {/* Grant Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 bg-deep-forest-green/5 p-8 md:p-12 rounded-sm border border-deep-forest-green/20"
                >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-forest-green mb-6">
                                人材開発支援助成金の活用で<br />
                                研修費用の最大75%が補助されます
                            </h2>
                            <p className="text-lg text-deep-forest-green mb-6 leading-relaxed">
                                「AI研修をやりたいが予算が…」という企業様も、国の助成金制度を活用することで大幅にコストを抑えた導入が可能です。
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-2 text-deep-forest-green font-medium">
                                    <Info className="w-5 h-5" />
                                    <span>リスキリング支援コースの活用</span>
                                </li>
                                <li className="flex items-center gap-2 text-deep-forest-green font-medium">
                                    <Info className="w-5 h-5" />
                                    <span>1人あたり最大10万円以上の補助</span>
                                </li>
                                <li className="flex items-center gap-2 text-deep-forest-green font-medium">
                                    <Info className="w-5 h-5" />
                                    <span>煩雑な申請書類の作成も無料サポート</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white p-6 rounded-sm shadow-xl border border-deep-forest-green text-center min-w-[280px]">
                            <p className="text-sm font-bold text-deep-forest-green mb-2">実質負担額のイメージ</p>
                            <div className="text-3xl font-bold text-deep-forest-green mb-1">
                                ¥50,000<span className="text-sm">〜</span>
                            </div>
                            <p className="text-xs text-deep-forest-green/60 mb-4">（1名あたりの想定）</p>
                            <div className="text-sm text-deep-forest-green font-bold bg-deep-forest-green/10 py-2 rounded-sm mb-4">
                                助成金で最大75%削減
                            </div>
                            <p className="text-xs text-left leading-relaxed text-deep-forest-green/70">
                                ※受給には一定の要件があります。詳細はお問い合わせください。
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Target Audience */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24 bg-white/50 p-8 md:p-12 rounded-sm"
                >
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-forest-green mb-4 text-center">
                        こんな方のための研修です
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        {[
                            { text: "生成AIが話題だが、業務でどう使えばいいかわからない", icon: HelpCircle },
                            { text: "社員ごとに使い方がバラバラで、効果が出ていない", icon: Users },
                            { text: "研修をやっても、現場で使われずに終わってしまう", icon: BookOpen },
                        ].map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div key={i} className="bg-white p-6 rounded-sm shadow-md border-l-4 border-deep-forest-green flex-1 flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-deep-forest-green/10 flex items-center justify-center text-deep-forest-green">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-deep-forest-green font-medium leading-relaxed pt-1">{item.text}</p>
                                </div>
                            )
                        })}
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
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-4 text-center">
                        実務に直結する<br className="md:hidden" />生成AI研修の4つの特徴
                    </h2>
                    <p className="text-lead text-center max-w-2xl mx-auto mb-12">明日から使えるスキルと仕組みを、職種に合わせてお届けします。</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02 }}
                                className="bg-deep-forest-green text-white p-8 rounded-sm shadow-xl"
                            >
                                <h3 className="text-xl font-bold mb-4 border-b border-white/30 pb-2 inline-block">
                                    {feature.title}
                                </h3>
                                <p className="leading-relaxed text-white/80">
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
                    <h2 className="text-3xl font-serif font-bold text-deep-forest-green mb-4 text-center">
                        実務で即戦力となる<br className="md:hidden" />研修カリキュラム
                    </h2>
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <p className="text-lead">
                            ChatGPT、Claude 3.5 Sonnet、Google Gemini、Microsoft Copilotなど、<br className="hidden md:inline" />
                            最新のAIツールを実務にどう組み込むかに焦点を当てたカリキュラムをご提供します。
                        </p>
                    </div>

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
                                    <p className="pb-6 text-deep-forest-green/80 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <StatsSection />
                <CustomerVoiceSection />

                {/* Blog Preview Section */}
                <BlogPreviewSection posts={blogPosts} category="training" />
            </div>
        </main>
    )
}

