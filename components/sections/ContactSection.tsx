'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { placeholders } from '@/lib/placeholder-images'

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
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <Image
        src={placeholders.mountainHero}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[56rem]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <h2 className="section-heading mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
            お問い合わせ
          </h2>
        </motion.div>

        {/* 進捗インジケーター */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-7 rounded-sm border border-white/20 bg-white/72 p-4 shadow-[0_20px_48px_-28px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-white/75'}`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${step >= 1 ? 'border-sequoia-green bg-sequoia-green text-white' : 'border-white/50 bg-transparent text-white/75'}`}>
                {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </div>
              <span className="hidden text-sm font-semibold sm:inline">基本情報</span>
            </div>
            <div className={`h-1 w-14 rounded-full ${step >= 2 ? 'bg-sequoia-green' : 'bg-white/30'}`} />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-white/75'}`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${step >= 2 ? 'border-sequoia-green bg-sequoia-green text-white' : 'border-white/50 bg-transparent text-white/75'}`}>
                2
              </div>
              <span className="hidden text-sm font-semibold sm:inline">詳細情報</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.98 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleSubmit}
          className="surface-card-strong border border-white/20 bg-white/80 p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-8"
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
                <h3 className="mb-5 text-xl font-bold text-sequoia-black md:text-2xl">基本情報</h3>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sequoia-black font-semibold mb-2">
                    お名前 <span className="text-sequoia-black">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="field-base h-12 bg-white/85 focus:border-sequoia-green/60 focus:ring-2 focus:ring-sequoia-green/20"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sequoia-black font-semibold mb-2">
                    メールアドレス <span className="text-sequoia-black">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="field-base h-12 bg-white/85 focus:border-sequoia-green/60 focus:ring-2 focus:ring-sequoia-green/20"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="inquiryType" className="block text-sequoia-black font-semibold mb-2">
                    お問い合わせ種別 <span className="text-sequoia-black">*</span>
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    id="inquiryType"
                    name="inquiryType"
                    autoComplete="off"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="field-base h-12 bg-white/85 focus:border-sequoia-green/60 focus:ring-2 focus:ring-sequoia-green/20"
                  >
                    <option value="service">サービス導入・お見積り</option>
                    <option value="partnership">業務提携・投資・出資</option>
                    <option value="recruiting">採用・参画</option>
                    <option value="demo">デモ・資料請求</option>
                    <option value="general">その他・一般的なお問い合わせ</option>
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
                    className="btn-primary w-full bg-sequoia-green text-white shadow-[0_14px_32px_-16px_rgba(18,92,70,0.55)] hover:bg-sequoia-green/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                  >
                    次へ進む
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
                <h3 className="mb-5 text-xl font-bold text-sequoia-black md:text-2xl">詳細情報</h3>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="company" className="block text-sequoia-black font-semibold mb-2">
                    会社名
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    className="field-base h-12 bg-white/85 focus:border-sequoia-green/60 focus:ring-2 focus:ring-sequoia-green/20"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="phone" className="block text-sequoia-black font-semibold mb-2">
                    電話番号
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="field-base h-12 bg-white/85 focus:border-sequoia-green/60 focus:ring-2 focus:ring-sequoia-green/20"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="message" className="block text-sequoia-black font-semibold mb-2">
                    メッセージ <span className="text-sequoia-black">*</span>
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    autoComplete="off"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="field-base bg-white/85 resize-none focus:border-sequoia-green/60 focus:ring-2 focus:ring-sequoia-green/20"
                    placeholder="お問い合わせ内容をご記入ください…"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="pt-4 space-y-4"
                >
                  <div aria-live="polite">
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
                  </div>
                  <div className="flex gap-4">
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-secondary flex-1"
                    >
                      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                      戻る
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !formData.message}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex-1 bg-sequoia-green text-white shadow-[0_14px_32px_-16px_rgba(18,92,70,0.55)] hover:bg-sequoia-green/90 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                    >
                      {isSubmitting ? '送信中…' : '送信する'}
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
