'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const testimonials = [
  {
    text: '「現場の非効率な作業が大幅に減り、本来注力すべき業務に集中できるようになりました。AI顧問サービスの提案が的確で、すぐに効果を実感できました。」',
    author: '- ホームサービス事業者様',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80&auto=format&fit=crop',
  },
  {
    text: '「予約管理から請求まで、すべてが一つのシステムで完結するようになり、業務効率が格段に向上しました。LINE対応も自動化され、顧客満足度も上がっています。」',
    author: '- ホームサービス事業者様',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop',
  },
]

export default function CustomerVoiceSection() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section 
      id="customer-voice" 
      ref={sectionRef}
      className="py-24 px-6 bg-white/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            導入実績
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl text-deep-forest-green font-bold mb-8"
          >
            70店舗導入予定
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -6,
                transition: { duration: 0.25 }
              }}
              className="bg-white p-8 rounded-sm border border-deep-forest-green shadow-lg overflow-hidden"
            >
              <div className="relative h-40 mb-6 rounded-sm overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.author}の導入事例`}
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <p className="text-deep-forest-green leading-relaxed mb-4">
                {testimonial.text}
              </p>
              <p className="text-sm text-white">{testimonial.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
