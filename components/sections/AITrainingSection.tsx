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
            style={{ perspective: 1000 }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50, rotateY: -15 }}
                        animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: -50, rotateY: -15 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{ perspective: 1000 }}
                        className="relative h-64 lg:h-96 rounded-sm overflow-hidden shadow-xl order-2 lg:order-1"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80&auto=format&fit=crop"
                            alt="法人向けAI研修"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-warm-amber text-warm-cream px-4 py-2 rounded-sm text-sm font-bold shadow-md">
                            助成金活用で75%OFF
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30, rotateX: -15 }}
                        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center lg:text-left order-1 lg:order-2"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
                            法人向け生成AI研修
                        </h2>
                        <p className="text-xl text-espresso-brown leading-relaxed mb-6">
                            現場ですぐに使えるスキルを習得。<br />
                            助成金を活用して、実質75%の割引価格で高品質な研修を提供します。
                        </p>
                        <Link href="/service/training">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-deep-forest-green text-warm-cream px-8 py-3 rounded-sm hover:bg-espresso-brown transition-colors inline-flex items-center gap-2"
                            >
                                詳しく見る
                                <motion.span>
                                    →
                                </motion.span>
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
