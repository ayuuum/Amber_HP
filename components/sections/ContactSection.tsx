'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import { placeholders } from '@/lib/placeholder-images'
import { MOTION_EDITORIAL, STAGGER_EDITORIAL, MOTION_EASE, editorialTransition } from '@/lib/motion-safe'
import { contactFormInquiryTypes, contactInquiryLabels, getContactPreset, type ContactInquiryType } from '@/lib/contact'

type ContactFormData = {
  name: string
  company: string
  email: string
  phone: string
  inquiryType: ContactInquiryType
  message: string
  sourcePage: string
  referrerPath: string
  website: string
}

const initialFormData: ContactFormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  inquiryType: 'general',
  message: '',
  sourcePage: '',
  referrerPath: '',
  website: '',
}

const fieldReveal = (idx: number) => ({
  duration: MOTION_EDITORIAL,
  delay: idx * STAGGER_EDITORIAL,
  ease: MOTION_EASE,
})

const stepSlide = {
  duration: MOTION_EDITORIAL,
  ease: MOTION_EASE,
}

export default function ContactSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isDryRun, setIsDryRun] = useState(false)
  const [messagePlaceholder, setMessagePlaceholder] = useState('お問い合わせ内容をご記入ください')
  const sectionRef = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Apply URL context without pre-filling the message body.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const preset = getContactPreset(params.get('source'), params.get('inquiry'))
    setFormData({
      ...initialFormData,
      inquiryType: preset.inquiryType,
      sourcePage: params.get('source') ?? '',
      referrerPath: document.referrer || window.location.pathname,
    })
    setMessagePlaceholder(preset.message || 'お問い合わせ内容をご記入ください')
  }, [])

  const readCurrentFormData = (): ContactFormData => {
    const form = formRef.current
    if (!form) return formData

    const fieldValue = (name: keyof ContactFormData) => {
      const field = form.elements.namedItem(name)
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
        return field.value
      }
      return String(formData[name] ?? '')
    }

    return {
      ...formData,
      name: fieldValue('name'),
      company: fieldValue('company'),
      email: fieldValue('email'),
      phone: fieldValue('phone'),
      inquiryType: fieldValue('inquiryType') as ContactInquiryType,
      message: fieldValue('message'),
      website: fieldValue('website'),
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const currentData = readCurrentFormData()
    if (!currentData.name.trim() || !currentData.email.trim() || !currentData.message.trim()) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setIsDryRun(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentData),
      })

      const data = await response.json()

      if (data.success) {
        setIsDryRun(Boolean(data.dryRun))
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      void error
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget
    if (name === 'inquiryType') {
      setFormData({
        ...formData,
        inquiryType: value as ContactInquiryType,
      })
      return
    }

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const nextStep = () => {
    const currentData = readCurrentFormData()
    if (step === 1 && currentData.name.trim() && currentData.email.trim() && currentData.inquiryType) {
      setFormData(currentData)
      setSubmitStatus('idle')
      setStep(2)
      return
    }

    setSubmitStatus('error')
  }

  const prevStep = () => {
    setStep(1)
  }

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
          animate={{ opacity: 1, y: 0 }}
          transition={editorialTransition()}
          className="mb-10 text-center"
        >
          <h2 className="section-heading mb-6 text-white ">
            お問い合わせ
          </h2>
          <p className="text-white/80 text-sm">
            メールでのお問い合わせ：{' '}
            <a
              href="mailto:ayumu.matsui@amber-inc.com"
              className="text-white underline underline-offset-2 hover:text-white/90 transition-colors"
            >
              ayumu.matsui@amber-inc.com
            </a>
          </p>
        </motion.div>

        {/* 進捗インジケーター */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={editorialTransition(STAGGER_EDITORIAL * 2)}
          className="mb-7 rounded-sm border border-white/35 bg-white/24 p-4 shadow-[0_8px_24px_-16px_rgba(27,58,45,0.2)] backdrop-blur-2xl"
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
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={editorialTransition(STAGGER_EDITORIAL * 2)}
          onSubmit={handleSubmit}
          ref={formRef}
          className="rounded-sm border border-white/40 bg-white/[0.34] p-6 shadow-[0_8px_24px_-16px_rgba(27,58,45,0.25)] backdrop-blur-2xl md:p-8"
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={stepSlide}
                className="space-y-6"
              >
                <h3 className="mb-5 text-xl font-bold text-white md:text-2xl">基本情報</h3>
                
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(1)}
                >
                  <label htmlFor="name" className="mb-2 block font-semibold text-white">
                    お名前 <span className="text-white/85">*</span>
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onInput={handleChange}
                    className="field-base field-glass h-12"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(2)}
                >
                  <label htmlFor="email" className="mb-2 block font-semibold text-white">
                    メールアドレス <span className="text-white/85">*</span>
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onInput={handleChange}
                    className="field-base field-glass h-12"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(3)}
                >
                  <label htmlFor="inquiryType" className="mb-2 block font-semibold text-white">
                    お問い合わせ種別 <span className="text-white/85">*</span>
                  </label>
                  <motion.select
                    id="inquiryType"
                    name="inquiryType"
                    autoComplete="off"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="field-base field-glass h-12"
                  >
                    {contactFormInquiryTypes.map((value) => (
                      <option key={value} value={value}>
                        {contactInquiryLabels[value]}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={fieldReveal(4)}
                  className="pt-4"
                >
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full "
                  >
                    次へ進む
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={stepSlide}
                className="space-y-6"
              >
                <h3 className="mb-5 text-xl font-bold text-white md:text-2xl">詳細情報</h3>

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(1)}
                >
                  <label htmlFor="company" className="mb-2 block font-semibold text-white">
                    会社名
                  </label>
                  <motion.input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    onInput={handleChange}
                    className="field-base field-glass h-12"
                  />
                </motion.div>

                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  onInput={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(2)}
                >
                  <label htmlFor="phone" className="mb-2 block font-semibold text-white">
                    電話番号
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onInput={handleChange}
                    className="field-base field-glass h-12"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(3)}
                >
                  <label htmlFor="message" className="mb-2 block font-semibold text-white">
                    メッセージ <span className="text-white/85">*</span>
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onInput={handleChange}
                    className="field-base field-glass resize-none"
                    placeholder={messagePlaceholder}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={fieldReveal(4)}
                  className="pt-4 space-y-4"
                >
                  <div aria-live="polite">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={editorialTransition()}
                      className="rounded-sm border border-white/45 bg-white/16 p-5 shadow-[0_8px_24px_-16px_rgba(27,58,45,0.25)] backdrop-blur-2xl"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/45 bg-sequoia-green/90 text-white shadow-sm backdrop-blur-md">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="mb-1 text-base font-bold text-white">お問い合わせありがとうございます</h4>
                          <p className="text-sm leading-relaxed text-white/80">
                            {isDryRun
                              ? 'ローカル開発環境のため、実際の外部送信は行わずに送信フローを確認しました。'
                              : '担当者より24時間以内にご連絡いたします。'}
                          </p>
                          {!isDryRun && (
                            <div className="mt-4 rounded-sm border border-white/35 bg-white/18 p-4 backdrop-blur-xl">
                              <p className="mb-2 text-xs font-bold tracking-wider text-white">次のステップ</p>
                              <ul className="space-y-1 text-sm leading-relaxed text-white/75">
                                <li>担当者よりメールまたは電話でご連絡</li>
                                <li>ご状況の確認・ヒアリング</li>
                                <li>ご要望に合わせた提案</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="rounded-sm border border-red-200/70 bg-white/[0.42] p-4 text-center text-sm font-medium text-red-800 shadow-sm backdrop-blur-xl"
                    >
                      必須項目を確認して、もう一度お試しください。
                    </motion.div>
                  )}
                  </div>
                  {submitStatus !== 'success' && (
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
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex-1  disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                    >
                      {isSubmitting ? '送信中…' : '送信する'}
                    </motion.button>
                  </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
