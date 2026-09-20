'use client'

import { useState } from 'react'

type Props = {
  slug: string
  resourceTitle: string
}

export default function ResourceLeadForm({ slug, resourceTitle }: Props) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [downloadPath, setDownloadPath] = useState(`/downloads/${slug}.md`)
  const [website, setWebsite] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/resources/${encodeURIComponent(slug)}/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          company,
          email,
          sourcePage: `resource-${slug}`,
          referrerPath: typeof window !== 'undefined' ? window.location.pathname : '',
          website,
        }),
      })

      const data = (await response.json().catch(() => null)) as {
        success?: boolean
        error?: string
        downloadPath?: string
      } | null

      if (!response.ok || !data?.success) {
        if (name.trim() && email.trim() && response.status >= 500) {
          setDownloadPath(`/downloads/${slug}.md`)
          setUnlocked(true)
          return
        }
        setError(data?.error || '送信に失敗しました。入力内容をご確認ください。')
        return
      }

      if (data.downloadPath) {
        setDownloadPath(data.downloadPath)
      }
      setUnlocked(true)
    } catch {
      setDownloadPath(`/downloads/${slug}.md`)
      setUnlocked(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (unlocked) {
    return (
      <div className="rounded-2xl border border-sequoia-black/8 bg-off-white px-6 py-8 text-center md:px-10">
        <p className="home-body mb-2">ありがとうございます。</p>
        <p className="home-body mb-6 text-sequoia-black/70">
          「{resourceTitle}」をダウンロードできます。
        </p>
        <a href={downloadPath} className="btn-pill-primary-solid inline-flex" download>
          資料をダウンロード
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-sequoia-black/8 bg-off-white px-6 py-8 md:px-10">
      <h2 className="home-h3 mb-2">無料で資料を受け取る</h2>
      <p className="home-body mb-6 text-sequoia-black/70">
        お名前とメールアドレスをご入力ください。送信後にダウンロードできます。
      </p>

      <div className="space-y-4 text-left">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">お名前 *</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-sequoia-black/15 bg-white px-3 py-2"
            autoComplete="name"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">会社名</span>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-lg border border-sequoia-black/15 bg-white px-3 py-2"
            autoComplete="organization"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">メールアドレス *</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-sequoia-black/15 bg-white px-3 py-2"
            autoComplete="email"
          />
        </label>
        <label className="hidden" aria-hidden="true">
          <span>website</span>
          <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

      <button type="submit" disabled={isSubmitting} className="btn-pill-primary-solid mt-6 inline-flex disabled:opacity-60">
        {isSubmitting ? '送信中…' : '送信してダウンロード'}
      </button>
    </form>
  )
}
