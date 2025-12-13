'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          inquiryType: 'general',
          message: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ perspective: 1000 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            お問い合わせ
          </h2>
          <p className="text-xl text-espresso-brown leading-relaxed mb-4">
            まずは壁打ち相談としてご利用ください。<br />
            無理な営業は一切行いませんので、ご安心ください。
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40, rotateX: -20, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: 40, rotateX: -20, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotateY: 1, rotateX: 1 }}
          onSubmit={handleSubmit}
          className="bg-warm-cream p-8 rounded-sm border border-stone-gray shadow-xl"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-espresso-brown font-semibold mb-2">
                お名前 <span className="text-warm-amber">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, rotateY: 2 }}
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label htmlFor="company" className="block text-espresso-brown font-semibold mb-2">
                会社名
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, rotateY: 2 }}
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label htmlFor="email" className="block text-espresso-brown font-semibold mb-2">
                メールアドレス <span className="text-warm-amber">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, rotateY: 2 }}
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label htmlFor="phone" className="block text-espresso-brown font-semibold mb-2">
                電話番号
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, rotateY: 2 }}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label htmlFor="inquiryType" className="block text-espresso-brown font-semibold mb-2">
                お問い合わせ種別 <span className="text-warm-amber">*</span>
              </label>
              <motion.select
                whileFocus={{ scale: 1.02, rotateY: 2 }}
                id="inquiryType"
                name="inquiryType"
                required
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green"
              >
                <option value="general">一般的なお問い合わせ</option>
                <option value="demo">デモ依頼</option>
                <option value="consulting">顧問相談</option>
                <option value="service">サービスについて</option>
              </motion.select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <label htmlFor="message" className="block text-espresso-brown font-semibold mb-2">
                メッセージ <span className="text-warm-amber">*</span>
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02, rotateY: 2 }}
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-gray rounded-sm bg-warm-cream text-espresso-brown focus:outline-none focus:border-deep-forest-green resize-none"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="pt-4"
            >
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="mb-4 p-4 bg-green-100 text-green-800 rounded-sm text-center"
                >
                  お問い合わせありがとうございます。担当者よりご連絡いたします。
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="mb-4 p-4 bg-red-100 text-red-800 rounded-sm text-center"
                >
                  送信に失敗しました。もう一度お試しください。
                </motion.div>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, rotateY: 5, z: 20 }}
                whileTap={{ scale: 0.98 }}
                style={{ perspective: 1000 }}
                className="w-full bg-deep-forest-green text-warm-cream px-8 py-4 rounded-sm hover:bg-espresso-brown transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </motion.button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
