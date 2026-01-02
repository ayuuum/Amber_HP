'use client'

import { useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'

export default function ContactSection() {
  const [step, setStep] = useState(1)
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

  // localStorageから自動保存データを読み込む
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed)
      } catch (e) {
        console.error('Failed to parse saved form data', e)
      }
    }
  }, [])

  // フォームデータを自動保存
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem('contactFormData', JSON.stringify(formData))
    }
  }, [formData])

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
        // 送信成功後は保存データを削除
        localStorage.removeItem('contactFormData')
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

  const nextStep = () => {
    if (step === 1 && formData.name && formData.email && formData.inquiryType) {
      setStep(2)
    }
  }

  const prevStep = () => {
    setStep(1)
  }

  const isStep1Valid = formData.name && formData.email && formData.inquiryType

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-deep-forest-green mb-6">
            お問い合わせ
          </h2>
          <p className="text-xl text-deep-forest-green leading-relaxed mb-4">
            まずは壁打ち相談としてご利用ください。<br />
            無理な営業は一切行いませんので、ご安心ください。
          </p>
        </motion.div>

        {/* 進捗インジケーター */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-deep-forest-green' : 'text-white'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-deep-forest-green bg-deep-forest-green text-white' : 'border-deep-forest-green'}`}>
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </div>
              <span className="text-sm font-semibold hidden sm:inline">基本情報</span>
            </div>
            <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-deep-forest-green' : 'bg-white'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-deep-forest-green' : 'text-white'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-deep-forest-green bg-deep-forest-green text-white' : 'border-deep-forest-green'}`}>
                2
              </div>
              <span className="text-sm font-semibold hidden sm:inline">詳細情報</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.98 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-sm border border-deep-forest-green shadow-xl"
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-deep-forest-green mb-6">基本情報</h3>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-deep-forest-green font-semibold mb-2">
                    お名前 <span className="text-deep-forest-green">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-deep-forest-green rounded-sm bg-white text-deep-forest-green focus:outline-none focus:border-deep-forest-green"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-deep-forest-green font-semibold mb-2">
                    メールアドレス <span className="text-deep-forest-green">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-deep-forest-green rounded-sm bg-white text-deep-forest-green focus:outline-none focus:border-deep-forest-green"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="inquiryType" className="block text-deep-forest-green font-semibold mb-2">
                    お問い合わせ種別 <span className="text-deep-forest-green">*</span>
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    id="inquiryType"
                    name="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-deep-forest-green rounded-sm bg-white text-deep-forest-green focus:outline-none focus:border-deep-forest-green"
                  >
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="demo">デモ依頼</option>
                    <option value="consulting">顧問相談</option>
                    <option value="service">サービスについて</option>
                  </motion.select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="pt-4"
                >
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep1Valid}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-deep-forest-green text-white px-8 py-4 rounded-sm hover:bg-deep-forest-green transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                  >
                    次へ進む
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-deep-forest-green mb-6">詳細情報</h3>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="company" className="block text-deep-forest-green font-semibold mb-2">
                    会社名
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-deep-forest-green rounded-sm bg-white text-deep-forest-green focus:outline-none focus:border-deep-forest-green"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="phone" className="block text-deep-forest-green font-semibold mb-2">
                    電話番号
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-deep-forest-green rounded-sm bg-white text-deep-forest-green focus:outline-none focus:border-deep-forest-green"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="message" className="block text-deep-forest-green font-semibold mb-2">
                    メッセージ <span className="text-deep-forest-green">*</span>
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-deep-forest-green rounded-sm bg-white text-deep-forest-green focus:outline-none focus:border-deep-forest-green resize-none"
                    placeholder="お問い合わせ内容をご記入ください"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="pt-4 space-y-4"
                >
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="p-6 bg-green-50 border-2 border-green-200 rounded-sm"
                    >
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-green-800 mb-2">お問い合わせありがとうございます</h4>
                          <p className="text-green-700 text-sm mb-4">
                            担当者より24時間以内にご連絡いたします。
                          </p>
                          <div className="bg-green-100 p-4 rounded-sm">
                            <p className="text-green-800 text-sm font-semibold mb-2">次のステップ：</p>
                            <ul className="text-green-700 text-sm space-y-1 list-disc list-inside">
                              <li>担当者よりメールまたは電話でご連絡</li>
                              <li>30分の無料相談（営業なし）</li>
                              <li>ご要望に合わせた提案</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="p-4 bg-red-100 text-red-800 rounded-sm text-center"
                    >
                      送信に失敗しました。もう一度お試しください。
                    </motion.div>
                  )}
                  <div className="flex gap-4">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 border-2 border-deep-forest-green text-deep-forest-green px-6 py-3 rounded-sm hover:bg-deep-forest-green hover:text-white transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      戻る
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.message}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-deep-forest-green text-white px-8 py-3 rounded-sm hover:bg-deep-forest-green transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isSubmitting ? '送信中...' : '送信する'}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
