'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function CompanyProfileSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    return (
        <section
            id="company" // Linked from Header
            ref={sectionRef}
            className="py-24 px-6 bg-white relative overflow-hidden"
        >
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-deep-forest-green mb-8 text-center"
                >
                    Company
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="max-w-3xl mx-auto text-center mb-20"
                >
                    <p className="text-xl md:text-2xl font-serif font-bold text-deep-forest-green leading-relaxed">
                        「暮らしを支える人に、<br className="md:hidden" />最新のテクノロジーを。」
                    </p>
                    <p className="mt-6 text-deep-forest-green/80 leading-relaxed">
                        私たちは、現場で働く人々の努力が正当に評価され、報われる世界を目指しています。
                        日々の業務上の非効率をテクノロジーで解消し、働く人が本来の価値を発揮できる環境を創造します。
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* 左側：代表挨拶・プロフィール */}
                    <div className="lg:col-span-7 space-y-12">
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-2xl font-bold text-deep-forest-green mb-8 flex items-center gap-4 border-b border-deep-forest-green pb-4"
                            >
                                代表プロフィール
                            </motion.h3>

                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="w-full md:w-48 h-64 relative rounded-sm overflow-hidden flex-shrink-0 shadow-lg"
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                                        alt="松井 歩武"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <p className="text-sm text-deep-forest-green font-bold">代表取締役</p>
                                        <p className="text-2xl font-serif font-bold text-deep-forest-green mt-1">松井 歩武</p>
                                        <p className="text-sm text-deep-forest-green/60 mt-1 font-serif">Ayumu Matsui</p>
                                    </div>
                                    <p className="text-base leading-relaxed text-deep-forest-green/90">
                                        慶應義塾大学商学部在学中からベンチャーキャピタルでインターン。<br />
                                        新卒で戦略コンサルティングファームに入社。その後スタートアップにて経営企画。<br />
                                        大手IT企業にて法人向け生成AI研修の講師を務める。
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* 右側：会社概要 */}
                    <div className="lg:col-span-5">
                        <motion.h3
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-2xl font-bold text-deep-forest-green mb-8 flex items-center gap-4 border-b border-deep-forest-green pb-4"
                        >
                            会社概要
                        </motion.h3>

                        <motion.dl
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-deep-forest-green/30 pb-4">
                                <dt className="font-bold text-deep-forest-green">会社名</dt>
                                <dd className="sm:col-span-2 text-deep-forest-green">株式会社Amber</dd>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-deep-forest-green/30 pb-4">
                                <dt className="font-bold text-deep-forest-green">代表取締役</dt>
                                <dd className="sm:col-span-2 text-deep-forest-green">松井 歩武</dd>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 border-b border-deep-forest-green/30 pb-4">
                                <dt className="font-bold text-deep-forest-green">所在地</dt>
                                <dd className="sm:col-span-2 text-deep-forest-green">
                                    〒105-0001<br />
                                    東京都港区虎ノ門３丁目１−１ 2階
                                </dd>
                            </div>
                        </motion.dl>
                    </div>
                </div>
            </div>
        </section>
    )
}
