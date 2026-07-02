'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp } from '../motion'

const inquiryOptions = [
  '研修について',
  '開発について',
  '助成金について',
  'その他',
] as const

type InquiryOption = (typeof inquiryOptions)[number]

type FormState = {
  company: string
  name: string
  email: string
  topic: InquiryOption
}

const initialFormState: FormState = {
  company: '',
  name: '',
  email: '',
  topic: '研修について',
}

export default function AiSolutionInlineFormSection() {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    const form = event.currentTarget
    const formBody = new FormData(form)
    const message = String(formBody.get('message') ?? '').trim()

    if (!formData.company.trim() || !formData.name.trim() || !formData.email.trim() || !message) {
      setError('必須項目を入力してください。')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: formData.company,
          name: formData.name,
          email: formData.email,
          phone: '',
          inquiryType: 'ai-solution',
          message: `相談内容: ${formData.topic}\n\n${message}`,
          sourcePage: 'ai-solution-lp',
          referrerPath: window.location.pathname,
          website: '',
        }),
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error('contact_failed')
      }

      window.location.href = '/service/ai-solution/thanks?cv=consultation'
    } catch {
      setError('送信に失敗しました。時間をおいてもう一度お試しください。')
      setIsSubmitting(false)
    }
  }

  return (
    <section id="ai-solution-form" className="section-forest border-t border-sequoia-black/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-[0.9fr_1.1fr] md:items-start md:py-32 lg:gap-16">
        <motion.div {...fadeUp} className="md:sticky md:top-28">
          <p className="eyebrow-forest mb-4">Contact</p>
          <h2 className="section-heading-invert">
            30分で、
            <br />
            導入の進め方を整理します。
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-on-dark-muted md:text-lg">
            研修、開発、助成金活用のどこから始めるべきかを、現在の業務と体制に合わせて確認します。
            電話番号は不要です。
          </p>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={handleSubmit}
          className="rounded-sm border border-white/10 bg-[var(--color-cream)] p-5 text-sequoia-black shadow-[0_30px_80px_-45px_rgba(0,0,0,0.65)] md:p-8"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-semibold text-sequoia-black">
                会社名 <span className="text-sequoia-green">*</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                required
                value={formData.company}
                onChange={handleChange}
                className="field-base h-12"
              />
            </div>

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-sequoia-black">
                氏名 <span className="text-sequoia-green">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="field-base h-12"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-sequoia-black">
                メールアドレス <span className="text-sequoia-green">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="field-base h-12"
              />
            </div>

            <div>
              <label htmlFor="topic" className="mb-2 block text-sm font-semibold text-sequoia-black">
                相談内容 <span className="text-sequoia-green">*</span>
              </label>
              <select
                id="topic"
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                className="field-base h-12"
              >
                {inquiryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-sequoia-black">
                相談内容の詳細 <span className="text-sequoia-green">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="field-base resize-none"
                placeholder="対象人数、現在の課題、希望時期などが分かればご記入ください。"
              />
            </div>
          </div>

          {error ? (
            <p className="mt-5 rounded-sm border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? '送信中...' : '無料相談を予約する'}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>

          <p className="mt-4 text-xs leading-relaxed text-sequoia-black/55">
            送信後、担当者より日程調整のご連絡をします。営業目的の情報提供は行いません。
          </p>
        </motion.form>
      </div>
    </section>
  )
}
