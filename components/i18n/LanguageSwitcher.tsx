'use client'

import { useLocale } from '@/components/i18n/LocaleProvider'
import type { Locale } from '@/lib/i18n/config'

type Props = {
  className?: string
  tone?: 'light' | 'dark'
}

export default function LanguageSwitcher({ className = '', tone = 'light' }: Props) {
  const { locale, setLocale, messages } = useLocale()

  const inactive =
    tone === 'dark'
      ? 'text-white/55 hover:text-white'
      : 'text-sequoia-black/45 hover:text-sequoia-black'
  const active = tone === 'dark' ? 'text-white' : 'text-sequoia-black'
  const divider = tone === 'dark' ? 'text-white/30' : 'text-sequoia-black/25'

  const buttonClass = (target: Locale) =>
    `rounded-sm px-1.5 py-1 text-xs font-medium tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35 ${
      locale === target ? active : inactive
    }`

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="group"
      aria-label={messages.common.language}
    >
      <button type="button" className={buttonClass('ja')} onClick={() => setLocale('ja')} aria-pressed={locale === 'ja'}>
        JA
      </button>
      <span className={`text-xs ${divider}`} aria-hidden>
        /
      </span>
      <button type="button" className={buttonClass('en')} onClick={() => setLocale('en')} aria-pressed={locale === 'en'}>
        EN
      </button>
    </div>
  )
}
