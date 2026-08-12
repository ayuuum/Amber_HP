'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function HomeHeroInquiry() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    if (String(data.get('website') ?? '').trim()) {
      setStatus('success')
      return
    }

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: '',
          phone: '',
          inquiryType: 'ai-solution',
          message,
          sourcePage: 'home-hero',
          referrerPath: typeof document !== 'undefined' ? document.referrer || '/' : '/',
          website: '',
        }),
      })
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="w-full max-w-md rounded-sm border border-white/20 bg-[var(--color-cream)] p-4 text-sequoia-black shadow-[0_24px_60px_-40px_rgba(0,0,0,0.55)] md:p-6">
      {status === 'success' ? (
        <div aria-live="polite" className="py-2">
          <p className="font-medium text-sequoia-black">送信しました</p>
          <p className="mt-2 text-sm leading-relaxed text-sequoia-black/70">
            内容を確認のうえ、通常1営業日以内にご連絡します。
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-5 text-sm text-brand-green underline underline-offset-4 hover:text-dark-green"
          >
            戻る
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4" noValidate>
          <div className="border-b border-sequoia-black/10 pb-3 md:pb-4">
            <p className="text-[0.95rem] font-medium leading-snug text-sequoia-black">
              まずは相談だけでも大丈夫です
            </p>
            <p className="mt-1.5 text-xs text-secondary">通常1営業日以内に返信します</p>
          </div>

          <div>
            <label htmlFor="hero-name" className="mb-1.5 block text-xs font-medium text-sequoia-black/70">
              お名前
            </label>
            <input
              id="hero-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="hero-field-light"
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label htmlFor="hero-email" className="mb-1.5 block text-xs font-medium text-sequoia-black/70">
              メールアドレス
            </label>
            <input
              id="hero-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              spellCheck={false}
              className="hero-field-light"
              placeholder="name@company.co.jp"
            />
          </div>

          <div>
            <label htmlFor="hero-message" className="mb-1.5 block text-xs font-medium text-sequoia-black/70">
              相談内容
            </label>
            <textarea
              id="hero-message"
              name="message"
              required
              rows={2}
              className="hero-field-light resize-none"
              placeholder="いまの課題や相談したいこと"
            />
          </div>

          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />

          {status === 'error' ? (
            <p className="text-sm text-red-700" aria-live="polite">
              入力内容を確認してください
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-pill-primary-solid w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? '送信中…' : '相談する'}
          </button>
        </form>
      )}
    </div>
  )
}
