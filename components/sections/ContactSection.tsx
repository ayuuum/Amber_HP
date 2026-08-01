'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
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

const inputClass =
  'w-full rounded-xl border border-sequoia-black/12 bg-white px-4 py-3 text-sm text-sequoia-black outline-none transition-colors placeholder:text-secondary/70 focus:border-brand-green/40 focus:ring-2 focus:ring-brand-green/15'

export default function ContactSection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isDryRun, setIsDryRun] = useState(false)
  const [messagePlaceholder, setMessagePlaceholder] = useState('お問い合わせ内容をご記入ください')
  const formRef = useRef<HTMLFormElement>(null)

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
    if (!currentData.name.trim() || !currentData.email.trim() || !currentData.message.trim() || !privacyAgreed) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setIsDryRun(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      setFormData({ ...formData, inquiryType: value as ContactInquiryType })
      return
    }
    setFormData({ ...formData, [name]: value })
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

  return (
    <section id="contact" className="home-section scroll-mt-24 border-t border-sequoia-black/8 bg-off-white">
      <div className="home-container">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <p className="home-label mb-3 text-brand-green">お問い合わせフォーム</p>
          <h2 className="home-h3 mb-3">相談内容をお送りください</h2>
          <p className="text-sm leading-relaxed text-secondary md:text-base">
            通常1営業日以内に確認し、ご連絡します。メール:{' '}
            <a href="mailto:ayumu.matsui@amber-inc.com" className="text-brand-green hover:underline">
              ayumu.matsui@amber-inc.com
            </a>
          </p>
        </div>

        <motion.form
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={editorialTransition()}
          onSubmit={handleSubmit}
          ref={formRef}
          className="home-card mx-auto max-w-2xl border border-sequoia-black/8 bg-white p-5 md:p-8"
        >
          <div className="mb-8 flex items-center justify-between border-b border-sequoia-black/8 pb-5">
            <p className="text-sm text-secondary">ステップ {step} / 2</p>
            <div className="flex items-center gap-2 text-xs font-medium text-secondary">
              <span className={step >= 1 ? 'text-brand-green' : undefined}>01</span>
              <span className="h-px w-8 bg-sequoia-black/15" aria-hidden />
              <span className={step >= 2 ? 'text-brand-green' : undefined}>02</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={stepSlide}
                className="space-y-5"
              >
                <h3 className="text-lg font-medium text-sequoia-black md:text-xl">まずは連絡先を教えてください</h3>

                <motion.div initial={false} animate={{ opacity: 1 }} transition={fieldReveal(1)}>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-sequoia-black">
                    お名前 <span className="text-brand-green">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onInput={handleChange}
                    className={inputClass}
                  />
                </motion.div>

                <motion.div initial={false} animate={{ opacity: 1 }} transition={fieldReveal(2)}>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-sequoia-black">
                    メールアドレス <span className="text-brand-green">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onInput={handleChange}
                    className={inputClass}
                  />
                </motion.div>

                <motion.div initial={false} animate={{ opacity: 1 }} transition={fieldReveal(3)}>
                  <label htmlFor="inquiryType" className="mb-2 block text-sm font-medium text-sequoia-black">
                    相談したいこと <span className="text-brand-green">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    autoComplete="off"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {contactFormInquiryTypes.map((value) => (
                      <option key={value} value={value}>
                        {contactInquiryLabels[value]}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {submitStatus === 'error' && step === 1 ? (
                  <p className="text-sm text-red-700" role="alert">
                    必須項目を入力してください。
                  </p>
                ) : null}

                <button type="button" onClick={nextStep} className="btn-pill-primary-solid inline-flex w-full gap-2">
                  相談内容を入力する
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={stepSlide}
                className="space-y-5"
              >
                <h3 className="text-lg font-medium text-sequoia-black md:text-xl">相談内容を教えてください</h3>

                <motion.div initial={false} animate={{ opacity: 1 }} transition={fieldReveal(1)}>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-sequoia-black">
                    会社名
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    onInput={handleChange}
                    className={inputClass}
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

                <motion.div initial={false} animate={{ opacity: 1 }} transition={fieldReveal(2)}>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-sequoia-black">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onInput={handleChange}
                    className={inputClass}
                  />
                </motion.div>

                <motion.div initial={false} animate={{ opacity: 1 }} transition={fieldReveal(3)}>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-sequoia-black">
                    相談内容 <span className="text-brand-green">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onInput={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder={messagePlaceholder}
                  />
                </motion.div>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-secondary">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-sequoia-black/20 text-brand-green focus:ring-brand-green/30"
                    required
                  />
                  <span>
                    <Link href="/privacy" className="text-brand-green hover:underline">
                      プライバシーポリシー
                    </Link>
                    に同意のうえ、送信します。
                    <span className="text-brand-green"> *</span>
                  </span>
                </label>

                <div aria-live="polite">
                  {submitStatus === 'success' ? (
                    <div className="rounded-2xl border border-brand-green/20 bg-light-green/50 p-5">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                          <CheckCircle2 className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <h4 className="mb-1 font-medium text-sequoia-black">お問い合わせありがとうございます</h4>
                          <p className="text-sm leading-relaxed text-secondary">
                            {isDryRun
                              ? 'ローカル開発環境のため、実際の外部送信は行わずに送信フローを確認しました。'
                              : '担当者よりご連絡いたします。'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {submitStatus === 'error' ? (
                    <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                      必須項目とプライバシーポリシーへの同意を確認して、もう一度お試しください。
                    </p>
                  ) : null}
                </div>

                {submitStatus !== 'success' ? (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={() => setStep(1)} className="btn-pill-outline inline-flex flex-1 gap-2">
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                      戻る
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-pill-primary-solid inline-flex flex-1 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? '送信中…' : '送信する'}
                    </button>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
