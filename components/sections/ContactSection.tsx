'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
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
      className="section-forest relative overflow-hidden border-t border-sequoia-black/10 px-6 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-40"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, rgba(245,245,244,0.35) 50%, transparent 100%)',
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-16">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={editorialTransition()}
          className="lg:sticky lg:top-28"
        >
          <p className="eyebrow-forest mb-5">Contact</p>
          <h2 className="section-heading-invert mb-6">
            現場に合う形から、
            <br />
            一緒に整理します。
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-on-dark-muted md:text-lg">
            AI活用、Pine、業務提携など、相談内容が固まっていない段階でも問題ありません。
            いまの業務・体制・困っていることから確認します。
          </p>
          <div className="mt-10 space-y-4 border-t border-white/15 pt-8">
            {['AI Solution / 研修・開発・業務実装', 'Pine / 訪問サービス向け予約受付', '業務提携・採用・その他のご相談'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-medium text-on-dark-muted">
                <span className="h-px w-8 bg-white/30" aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-white/55">
            メールでも受け付けています:{' '}
            <a
              href="mailto:ayumu.matsui@amber-inc.com"
              className="text-white underline underline-offset-4 transition-colors hover:text-white/85"
            >
              ayumu.matsui@amber-inc.com
            </a>
          </p>
        </motion.div>

        <motion.form
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={editorialTransition(STAGGER_EDITORIAL * 2)}
          onSubmit={handleSubmit}
          ref={formRef}
          className="rounded-sm border border-white/10 bg-[var(--color-cream)] p-5 text-sequoia-black shadow-[0_30px_80px_-45px_rgba(0,0,0,0.65)] md:p-8"
        >
          <div className="mb-8 flex items-center justify-between border-b border-sequoia-black/10 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sequoia-green">Inquiry</p>
              <p className="mt-1 text-sm text-sequoia-black/60">通常1営業日以内に確認します。</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sequoia-black/55">
              <span className={step >= 1 ? 'text-sequoia-green' : undefined}>01</span>
              <span className="h-px w-8 bg-sequoia-black/20" aria-hidden />
              <span className={step >= 2 ? 'text-sequoia-green' : undefined}>02</span>
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
                className="space-y-6"
              >
                <h3 className="mb-5 text-xl font-bold text-sequoia-black md:text-2xl">まずは連絡先を教えてください。</h3>
                
                <motion.div
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(1)}
                >
                  <label htmlFor="name" className="mb-2 block font-semibold text-sequoia-black">
                    お名前 <span className="text-sequoia-green">*</span>
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
                    className="field-base h-12"
                  />
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(2)}
                >
                  <label htmlFor="email" className="mb-2 block font-semibold text-sequoia-black">
                    メールアドレス <span className="text-sequoia-green">*</span>
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
                    className="field-base h-12"
                  />
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(3)}
                >
                  <label htmlFor="inquiryType" className="mb-2 block font-semibold text-sequoia-black">
                    相談したいこと <span className="text-sequoia-green">*</span>
                  </label>
                  <motion.select
                    id="inquiryType"
                    name="inquiryType"
                    autoComplete="off"
                    required
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="field-base h-12"
                  >
                    {contactFormInquiryTypes.map((value) => (
                      <option key={value} value={value}>
                        {contactInquiryLabels[value]}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={fieldReveal(4)}
                  className="pt-4"
                >
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full"
                  >
                    相談内容を入力する
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={stepSlide}
                className="space-y-6"
              >
                <h3 className="mb-5 text-xl font-bold text-sequoia-black md:text-2xl">相談内容を教えてください。</h3>

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(1)}
                >
                  <label htmlFor="company" className="mb-2 block font-semibold text-sequoia-black">
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
                    className="field-base h-12"
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
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(2)}
                >
                  <label htmlFor="phone" className="mb-2 block font-semibold text-sequoia-black">
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
                    className="field-base h-12"
                  />
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={fieldReveal(3)}
                >
                  <label htmlFor="message" className="mb-2 block font-semibold text-sequoia-black">
                    相談内容 <span className="text-sequoia-green">*</span>
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
                    className="field-base resize-none"
                    placeholder={messagePlaceholder}
                  />
                </motion.div>

                <motion.div
                  initial={false}
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
                      className="rounded-sm border border-sequoia-green/20 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sequoia-green text-white shadow-sm">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="mb-1 text-base font-bold text-sequoia-black">お問い合わせありがとうございます</h4>
                          <p className="text-sm leading-relaxed text-sequoia-black/70">
                            {isDryRun
                              ? 'ローカル開発環境のため、実際の外部送信は行わずに送信フローを確認しました。'
                              : '担当者より24時間以内にご連絡いたします。'}
                          </p>
                          {!isDryRun && (
                            <div className="mt-4 rounded-sm border border-sequoia-black/10 bg-sequoia-black/[0.03] p-4">
                              <p className="mb-2 text-xs font-bold tracking-wider text-sequoia-black">次のステップ</p>
                              <ul className="space-y-1 text-sm leading-relaxed text-sequoia-black/70">
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
                      className="rounded-sm border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-800 shadow-sm"
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
                      className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
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
