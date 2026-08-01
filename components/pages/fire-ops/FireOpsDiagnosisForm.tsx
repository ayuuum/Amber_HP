'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import FadeUp from '@/components/home/FadeUp'
import { fireOpsPage } from '@/data/fire-ops'
import { trackEvent } from '@/lib/track-event'

type FormErrors = Partial<Record<string, string>>

const labelMap = {
  monthly: Object.fromEntries(fireOpsPage.diagnosis.monthlyVolume.map((o) => [o.value, o.label])),
  methods: Object.fromEntries(fireOpsPage.diagnosis.managementMethods.map((o) => [o.value, o.label])),
  bottleneck: Object.fromEntries(fireOpsPage.diagnosis.bottleneckSteps.map((o) => [o.value, o.label])),
  cycle: Object.fromEntries(fireOpsPage.diagnosis.cycleTime.map((o) => [o.value, o.label])),
}

export default function FireOpsDiagnosisForm() {
  const formId = useId()
  const startedRef = useRef(false)
  const [monthlyVolume, setMonthlyVolume] = useState('')
  const [methods, setMethods] = useState<string[]>([])
  const [bottleneck, setBottleneck] = useState('')
  const [cycleTime, setCycleTime] = useState('')
  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [website, setWebsite] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'config'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const markStart = () => {
      if (startedRef.current) return
      startedRef.current = true
      trackEvent('fireops_diagnosis_start')
    }

    const section = document.getElementById(fireOpsPage.diagnosis.id)
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          markStart()
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const toggleMethod = (value: string) => {
    setMethods((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    )
  }

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (!monthlyVolume) next.monthlyVolume = '月間の点検件数を選択してください'
    if (methods.length === 0) next.methods = '現在の管理方法を1つ以上選択してください'
    if (!bottleneck) next.bottleneck = '一番止まりやすい工程を選択してください'
    if (!cycleTime) next.cycleTime = '点検から請求までの期間を選択してください'
    if (!company.trim()) next.company = '会社名を入力してください'
    if (!email.trim()) next.email = 'メールアドレスを入力してください'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'メールアドレスの形式を確認してください'
    if (!privacyAgreed) next.privacy = 'プライバシーポリシーへの同意が必要です'
    return next
  }

  const buildMessage = () => {
    const methodLabels = methods.map((value) => labelMap.methods[value] ?? value).join('、')
    return [
      '【FireOps 業務診断リクエスト】',
      '',
      `月間の点検件数: ${labelMap.monthly[monthlyVolume] ?? monthlyVolume}`,
      `現在の管理方法: ${methodLabels}`,
      `一番止まりやすい工程: ${labelMap.bottleneck[bottleneck] ?? bottleneck}`,
      `点検から請求までの期間: ${labelMap.cycle[cycleTime] ?? cycleTime}`,
      '',
      message.trim() ? `相談内容:\n${message.trim()}` : '相談内容: （未記入）',
    ].join('\n')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')
    setStatusMessage('')

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setStatusMessage('入力内容を確認してください。')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company.trim(),
          name: name.trim() || company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          inquiryType: 'fire-ops',
          message: buildMessage(),
          sourcePage: 'fire-ops-diagnosis',
          referrerPath: window.location.pathname,
          website,
        }),
      })

      const data = (await response.json()) as {
        success?: boolean
        dryRun?: boolean
        error?: string
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'submit_failed')
      }

      if (data.dryRun) {
        setStatus('config')
        setStatusMessage(
          '送信先が未設定のため、本番送信は行われていません。NOTION / Supabase / Resend などの問い合わせ配信設定を確認してください。',
        )
        return
      }

      trackEvent('fireops_diagnosis_submit', {
        monthly_volume: monthlyVolume,
        bottleneck,
      })
      setStatus('success')
      setStatusMessage('')
    } catch {
      setStatus('error')
      setStatusMessage(
        '送信に失敗しました。時間をおいて再度お試しいただくか、お問い合わせページからご連絡ください。',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <section id={fireOpsPage.diagnosis.id} className="home-section border-t border-sequoia-black/8 bg-white">
        <div className="home-container">
          <div
            className="mx-auto max-w-2xl border border-brand-green/20 bg-light-green/40 px-6 py-12 text-center md:px-10"
            role="status"
            aria-live="polite"
          >
            <h2 className="home-h3 text-brand-green">{fireOpsPage.diagnosis.successTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">{fireOpsPage.diagnosis.successBody}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={fireOpsPage.diagnosis.id} className="home-section border-t border-sequoia-black/8 bg-white">
      <div className="home-container">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="home-label mb-3 text-brand-green">3分診断</p>
          <h2 className="home-h2">
            {fireOpsPage.diagnosis.headline[0]}
            <br />
            {fireOpsPage.diagnosis.headline[1]}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary md:text-lg">
            {fireOpsPage.diagnosis.description}
          </p>
        </FadeUp>

        <FadeUp className="mx-auto mt-10 max-w-3xl md:mt-14" delay={0.05}>
          <form
            onSubmit={handleSubmit}
            className="relative border border-sequoia-black/10 bg-off-white p-5 md:p-8"
            noValidate
          >
            <fieldset className="space-y-8">
              <legend className="sr-only">業務診断フォーム</legend>

              <FieldGroup
                id={`${formId}-monthly`}
                label="月間の点検件数"
                required
                error={errors.monthlyVolume}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {fireOpsPage.diagnosis.monthlyVolume.map((option) => (
                    <RadioCard
                      key={option.value}
                      name={`${formId}-monthly`}
                      value={option.value}
                      checked={monthlyVolume === option.value}
                      label={option.label}
                      onChange={setMonthlyVolume}
                    />
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup
                id={`${formId}-methods`}
                label="現在の管理方法"
                required
                hint="複数選択可"
                error={errors.methods}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {fireOpsPage.diagnosis.managementMethods.map((option) => (
                    <label
                      key={option.value}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                        methods.includes(option.value)
                          ? 'border-brand-green bg-white text-sequoia-black'
                          : 'border-sequoia-black/10 bg-white text-sequoia-black/80 hover:border-brand-green/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-sequoia-black/30 text-brand-green focus:ring-brand-green/30"
                        checked={methods.includes(option.value)}
                        onChange={() => toggleMethod(option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup
                id={`${formId}-bottleneck`}
                label="一番止まりやすい工程"
                required
                error={errors.bottleneck}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {fireOpsPage.diagnosis.bottleneckSteps.map((option) => (
                    <RadioCard
                      key={option.value}
                      name={`${formId}-bottleneck`}
                      value={option.value}
                      checked={bottleneck === option.value}
                      label={option.label}
                      onChange={setBottleneck}
                    />
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup
                id={`${formId}-cycle`}
                label="点検から請求までの期間"
                required
                error={errors.cycleTime}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {fireOpsPage.diagnosis.cycleTime.map((option) => (
                    <RadioCard
                      key={option.value}
                      name={`${formId}-cycle`}
                      value={option.value}
                      checked={cycleTime === option.value}
                      label={option.label}
                      onChange={setCycleTime}
                    />
                  ))}
                </div>
              </FieldGroup>

              <div className="grid gap-5 border-t border-sequoia-black/8 pt-8 md:grid-cols-2">
                <TextField
                  id={`${formId}-company`}
                  label="会社名"
                  required
                  autoComplete="organization"
                  value={company}
                  onChange={setCompany}
                  error={errors.company}
                />
                <TextField
                  id={`${formId}-name`}
                  label="氏名"
                  autoComplete="name"
                  value={name}
                  onChange={setName}
                />
                <TextField
                  id={`${formId}-email`}
                  label="メールアドレス"
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={setEmail}
                  error={errors.email}
                />
                <TextField
                  id={`${formId}-phone`}
                  label="電話番号"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={setPhone}
                />
              </div>

              <div>
                <label htmlFor={`${formId}-message`} className="mb-2 block text-sm font-medium text-sequoia-black">
                  相談内容 <span className="font-normal text-secondary">任意</span>
                </label>
                <textarea
                  id={`${formId}-message`}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="field-base min-h-[120px] resize-y"
                />
              </div>

              <div>
                <label className="flex items-start gap-3 text-sm text-sequoia-black">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-sequoia-black/30 text-brand-green focus:ring-brand-green/30"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    aria-invalid={Boolean(errors.privacy)}
                    aria-describedby={errors.privacy ? `${formId}-privacy-error` : undefined}
                  />
                  <span>
                    <Link href="/privacy" className="text-brand-green underline-offset-2 hover:underline">
                      プライバシーポリシー
                    </Link>
                    に同意のうえ、送信します。
                    <span className="ml-1 text-brand-green">必須</span>
                  </span>
                </label>
                {errors.privacy ? (
                  <p id={`${formId}-privacy-error`} className="mt-2 text-sm text-red" role="alert">
                    {errors.privacy}
                  </p>
                ) : null}
              </div>

              {/* honeypot */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor={`${formId}-website`}>website</label>
                <input
                  id={`${formId}-website`}
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div aria-live="polite">
                  {statusMessage ? (
                    <p
                      className={`border px-4 py-3 text-sm ${
                        status === 'config'
                          ? 'border-amber-soft/40 bg-[#FBF6EE] text-[#8A5A12]'
                          : 'border-red/20 bg-[#FDF2F1] text-red'
                      }`}
                      role="alert"
                    >
                      {statusMessage}
                      {status === 'error' ? (
                        <>
                          {' '}
                          <Link href="/contact?source=fire-ops-diagnosis&inquiry=fire-ops" className="underline">
                            お問い合わせページへ
                          </Link>
                        </>
                      ) : null}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-pill-primary-solid inline-flex min-h-12 w-full justify-center text-base disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? '送信中…' : fireOpsPage.diagnosis.submitLabel}
                </button>
              </div>
            </fieldset>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}

function FieldGroup({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div role="group" aria-labelledby={id}>
      <div className="mb-3 flex flex-wrap items-baseline gap-2">
        <p id={id} className="text-sm font-medium text-sequoia-black">
          {label}
          {required ? <span className="ml-1 text-brand-green">必須</span> : null}
        </p>
        {hint ? <span className="text-xs text-secondary">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p className="mt-2 text-sm text-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function RadioCard({
  name,
  value,
  checked,
  label,
  onChange,
}: {
  name: string
  value: string
  checked: boolean
  label: string
  onChange: (value: string) => void
}) {
  return (
    <label
      className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
        checked
          ? 'border-brand-green bg-white text-sequoia-black'
          : 'border-sequoia-black/10 bg-white text-sequoia-black/80 hover:border-brand-green/30'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="h-4 w-4 border-sequoia-black/30 text-brand-green focus:ring-brand-green/30"
      />
      {label}
    </label>
  )
}

function TextField({
  id,
  label,
  required,
  type = 'text',
  autoComplete,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  required?: boolean
  type?: string
  autoComplete?: string
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-sequoia-black">
        {label}{' '}
        {required ? (
          <span className="text-brand-green">必須</span>
        ) : (
          <span className="font-normal text-secondary">任意</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field-base h-12"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
