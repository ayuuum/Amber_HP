'use client'

import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'AI顧問サービスはどのような内容ですか？',
    answer: 'AI顧問サービスは、ツール選定から実際の運用まで、横に立って一緒に進める顧問として支援するサービスです。現状整理・課題特定から始まり、実務に合わせたAI活用設計、業務フローの簡素化・自動化、社内定着・仕組みづくりまで、段階的にサポートします。',
  },
  {
    question: '導入期間はどのくらいかかりますか？',
    answer: '導入期間は、お客様の業務規模や課題の複雑さによって異なります。一般的には、初期の現状整理・課題特定に1-2週間、AI活用設計と実装に1-2ヶ月、社内定着までに3-6ヶ月程度を想定しています。',
  },
  {
    question: '料金はいくらですか？',
    answer: 'AI顧問サービスは、ライトプラン（¥50,000/月）、スタンダードプラン（¥150,000/月）、カスタムプラン（お問い合わせ）の3つのプランをご用意しています。詳しくは各サービスページをご覧ください。',
  },
  {
    question: '生成AI研修の助成金について教えてください',
    answer: 'リスキリング助成金などの活用により、研修費用の最大75%が補助されます。煩雑な申請手続きもサポートいたしますので、お気軽にお問い合わせください。',
  },
  {
    question: 'Vertical SaaSはどのような業種に対応していますか？',
    answer: 'ハウスクリーニング、不用品回収、リフォーム・修理、害虫駆除・引越しなど、個人のお客様から直接依頼を受けるホームサービス事業者様に対応しています。',
  },
  {
    question: 'サポート体制はどうなっていますか？',
    answer: '導入後も継続的にサポートいたします。月1回の定期相談（ライトプラン）や月2回の相談（スタンダードプラン）に加えて、メールや電話でのサポートも対応しています。',
  },
  {
    question: '無料相談は本当に営業なしですか？',
    answer: 'はい、無料相談（30分）では、営業活動は一切行いません。お客様の課題をヒアリングし、AI導入の可能性や改善案をお伝えする、壁打ち相談としてご利用ください。',
  },
  {
    question: '既存のシステムとの連携は可能ですか？',
    answer: 'はい、可能です。主要な会計ソフトとの連携や、既存の業務システムとの連携も対応しています。詳しくはお問い合わせください。',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            よくある質問
          </h2>
          <p className="text-xl text-deep-forest-green leading-relaxed">
            お客様からよくいただく質問をまとめました
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-deep-forest-green rounded-sm overflow-hidden shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-colors"
              >
                <span className="font-semibold text-deep-forest-green pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-deep-forest-green flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-deep-forest-green leading-relaxed border-t border-deep-forest-green/30">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-deep-forest-green mb-4">
            他にご質問がございましたら、お気軽にお問い合わせください。
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-deep-forest-green text-white px-8 py-3 rounded-sm hover:bg-deep-forest-green transition-colors font-semibold"
          >
            お問い合わせする
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

