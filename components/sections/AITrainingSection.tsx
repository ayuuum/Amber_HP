'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

export default function AITrainingSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            id="ai-training"
            ref={sectionRef}
            className="py-24 px-6"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-64 lg:h-96 rounded-sm overflow-hidden shadow-xl order-2 lg:order-1"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop"
                            alt="法人向け生成AI研修と学習"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-warm-amber text-warm-cream px-4 py-2 rounded-sm text-sm font-bold shadow-md">
                            助成金活用で75%OFF
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center lg:text-left order-1 lg:order-2"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
                            法人向け生成AI研修
                        </h2>
                        <p className="text-xl text-espresso-brown leading-relaxed mb-4">
                            現場ですぐに使えるスキルを習得。<br />
                            助成金を活用して、実質75%の割引価格で高品質な研修を提供します。
                        </p>
                        <p className="text-base text-espresso-brown leading-relaxed mb-6">
                            ChatGPTの基本から、資料作成・要約・企画立案・営業対応まで、<br />
                            実務で即活用できるスキルを<span className="font-semibold text-deep-forest-green">1日6時間の集中研修</span>で習得できます。<br />
                            受講者の<span className="font-semibold text-deep-forest-green">95%が実務で活用</span>を開始しています。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/service/training">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-deep-forest-green text-warm-cream px-8 py-3 rounded-sm hover:bg-espresso-brown transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                                >
                                    詳しく見る
                                    <motion.span>
                                        →
                                    </motion.span>
                                </motion.button>
                            </Link>
                            <Link href="#contact">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-2 border-deep-forest-green text-deep-forest-green px-8 py-3 rounded-sm hover:bg-deep-forest-green hover:text-warm-cream transition-colors inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                                >
                                    無料で相談する
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
