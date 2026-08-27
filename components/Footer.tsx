'use client'

import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'
import { offerings } from '@/data/offerings'
import { siteShell } from '@/data/navigation'
import { useMessages } from '@/components/i18n/LocaleProvider'
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher'

export default function Footer() {
  const messages = useMessages()
  const year = new Date().getFullYear()
  const contactHref = buildContactHref('footer')
  const linkClass =
    'inline-flex min-h-11 items-center text-sm text-secondary transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 rounded-sm md:min-h-0 md:py-0.5'

  return (
    <footer className="border-t border-sequoia-black/8 bg-off-white">
      <div className="home-container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label={messages.common.companyName}>
              <span className="font-logo text-[1.75rem] leading-none text-brand-green">Amber</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">{messages.common.brandTagline}</p>
            <div className="mt-5">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">{messages.common.whatWeDo}</p>
            <ul className="space-y-0">
              {offerings.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">{messages.nav.company}</p>
            <ul className="space-y-0">
              <li>
                <Link href="/#industries" className={linkClass}>
                  {messages.nav.industries}
                </Link>
              </li>
              <li>
                <Link href="/cases" className={linkClass}>
                  {messages.nav.work}
                </Link>
              </li>
              <li>
                <Link href="/company" className={linkClass}>
                  {messages.nav.company}
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href={contactHref} className={linkClass}>
                  {messages.common.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">{messages.common.legal}</p>
            <ul className="space-y-0">
              <li>
                <Link href="/privacy" className={linkClass}>
                  {messages.common.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  {messages.common.terms}
                </Link>
              </li>
              <li>
                <Link href="/legal/tokushoho" className={linkClass}>
                  {messages.common.tokushoho}
                </Link>
              </li>
            </ul>
            <p className="mb-3 mt-8 text-xs font-medium tracking-wide text-secondary">{messages.common.products}</p>
            <ul className="space-y-0">
              <li>
                <a href={siteShell.pineUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Pine
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-sequoia-black/8 pt-6 text-xs text-secondary md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {messages.common.companyName}. All rights reserved.
          </p>
          <Link href={contactHref} className="hover:text-brand-green">
            {messages.common.contactForm}
          </Link>
        </div>
      </div>
    </footer>
  )
}
