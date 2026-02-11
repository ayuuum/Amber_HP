'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { BrainCircuit, GraduationCap, LayoutDashboard, ArrowRight } from 'lucide-react'

const services = [
    {
        id: 'ai-consulting',
        title: 'AI導入支援',
        description: '現場の課題を理解したプロが、AI導入から定着まで一緒に進めます。',
        icon: BrainCircuit,
        href: '/service/consulting',
        features: ['業務改善・自動化支援', '社内研修・勉強会', '伴走型プロジェクト推進'],
    },
    {
        id: 'ai-training',
        title: '法人向け生成AI研修',
        description: '助成金で実質75%OFF。現場で使えるスキルを1日で習得します。',
        icon: GraduationCap,
        href: '/service/training',
        features: ['助成金活用サポート', '実践的カリキュラム', '受講後サポートあり'],
    },
    {
        id: 'vertical-saas',
        title: 'ホームサービス向け業務システム',
        description: '予約・顧客・請求をひとつのツールで、現場の負荷を削減します。',
        icon: LayoutDashboard,
        href: '/service/saas',
        features: ['予約・顧客一元管理', '自動リマインド通知', '請求書・見積書作成'],
    },
]

export default function ServiceSection() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const [isMounted, setIsMounted] = (require('react').useState)(false)
    require('react').useEffect(() => {
        setIsMounted(true)
    }, [])

    const cardVariants = {
        hidden: { opacity: 0, y: 32, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    }

    return (
        <section
            id="services"
            ref={sectionRef}
            className="py-24 px-6 bg-deep-forest-green/5 relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
                        Our Services
                    </h2>
                    <p className="text-xl text-deep-forest-green max-w-3xl mx-auto leading-relaxed">
                        現場の課題をテクノロジーで解決する<br />
                        3つのサービス
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isMounted && isInView ? 'visible' : (isMounted ? 'visible' : 'hidden')}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3 }
                                }}
                                className="bg-white rounded-sm border border-deep-forest-green/10 shadow-lg overflow-hidden flex flex-col h-full group"
                            >
                                <div className="p-8 flex-grow">
                                    <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-deep-forest-green/10 text-deep-forest-green group-hover:bg-deep-forest-green group-hover:text-white transition-colors duration-300">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-deep-forest-green mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-deep-forest-green/80 leading-relaxed mb-6 text-sm lg:text-base">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2 mb-8">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center text-sm text-deep-forest-green/70">
                                                <span className="w-1.5 h-1.5 bg-deep-forest-green/60 rounded-full mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6 pt-0 mt-auto">
                                    <Link href={service.href} className="w-full">
                                        <div className="w-full py-3 px-4 border border-deep-forest-green text-deep-forest-green rounded-sm hover:bg-deep-forest-green hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium group-hover:shadow-md">
                                            詳しく見る
                                            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
