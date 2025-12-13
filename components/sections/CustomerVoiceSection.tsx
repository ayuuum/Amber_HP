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
    hidden: { opacity: 0, y: 50, rotateX: -20, rotateY: -15, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
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
      className="py-24 px-6 bg-stone-gray/30"
      style={{ perspective: 1000 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            導入実績
          </h2>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 200 }}
            className="text-2xl text-warm-amber font-bold mb-8"
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
                scale: 1.05, 
                rotateY: index === 0 ? 8 : -8,
                rotateX: 5,
                z: 30,
                transition: { duration: 0.3 }
              }}
              style={{ perspective: 1000 }}
              className="bg-warm-cream p-8 rounded-sm border border-stone-gray shadow-lg overflow-hidden"
            >
              <div className="relative h-40 mb-6 rounded-sm overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt=""
                  fill
                  className="object-cover opacity-80"
                />
              </div>
              <p className="text-espresso-brown leading-relaxed mb-4">
                {testimonial.text}
              </p>
              <p className="text-sm text-stone-gray">{testimonial.author}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
