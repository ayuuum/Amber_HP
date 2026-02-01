'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactSection from '@/components/sections/ContactSection'
import { motion } from 'framer-motion'
import { Briefcase, Users, Heart } from 'lucide-react'

export default function RecruitPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-deep-forest-green mb-8">
                            Recruit
                        </h1>
                        <p className="text-xl md:text-2xl font-serif font-bold text-deep-forest-green leading-relaxed">
                            暮らしを支える現場に、<br />テクノロジーの光を。
                        </p>
                    </motion.div>

                    <div className="space-y-20">
                        <section>
                            <h2 className="text-2xl font-bold text-deep-forest-green mb-8 flex items-center gap-3 border-b border-deep-forest-green pb-4">
                                <Heart className="w-6 h-6" />
                                私たちの想い
                            </h2>
                            <p className="text-lg leading-relaxed text-deep-forest-green/90">
                                Amberは、汗を流して社会を支える「現場」の方々が、もっとも報われる社会を作りたいと考えています。<br />
                                戦略コンサル、VC、そして実際の現場経験。多様なバックグラウンドを持つメンバーが、本気で「現場のDX」に挑んでいます。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-deep-forest-green mb-8 flex items-center gap-3 border-b border-deep-forest-green pb-4">
                                <Briefcase className="w-6 h-6" />
                                募集職種
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 border border-deep-forest-green/20 rounded-sm bg-deep-forest-green/5">
                                    <h3 className="text-xl font-bold text-deep-forest-green mb-2">AI コンサルタント</h3>
                                    <p className="text-sm text-deep-forest-green/70 mb-4">クライアント企業のAI導入・業務改善を伴走支援します。</p>
                                </div>
                                <div className="p-6 border border-deep-forest-green/20 rounded-sm bg-deep-forest-green/5">
                                    <h3 className="text-xl font-bold text-deep-forest-green mb-2">ソフトウェアエンジニア</h3>
                                    <p className="text-sm text-deep-forest-green/70 mb-4">ホームサービス業向けSaaSの開発をリードします。</p>
                                </div>
                            </div>
                        </section>

                        <section className="bg-deep-forest-green text-white p-12 rounded-sm text-center">
                            <h2 className="text-3xl font-serif font-bold mb-6">Join Us</h2>
                            <p className="mb-8">新しい産業のインフラを、一緒に作りませんか？</p>
                            <a
                                href="#contact"
                                className="inline-block bg-white text-deep-forest-green px-10 py-4 rounded-sm font-bold hover:bg-white/90 transition-colors"
                            >
                                選考に申し込む
                            </a>
                        </section>
                    </div>
                </div>
            </div>
            <ContactSection />
            <Footer />
        </main>
    )
}
