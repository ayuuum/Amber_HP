'use client'

import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'
import { siteShell } from '@/data/navigation'
import { useMessages } from '@/components/i18n/LocaleProvider'

export default function Footer() {
  const messages = useMessages()
  const year = new Date().getFullYear()
  const contactHref = buildContactHref('footer')
  const linkClass =
    'inline-flex min-h-11 items-center text-sm text-secondary transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 rounded-sm md:min-h-0 md:py-0.5'

  return (
    <footer className="border-t border-sequoia-black/8 bg-off-white">
      <div className="home-container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label={messages.common.companyName}>
              <span className="font-logo text-[1.75rem] leading-none text-brand-green">Amber</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">{messages.common.brandTagline}</p>
            <p className="mt-5 text-xs font-medium text-sequoia-black">{messages.common.products}</p>
            <ul className="mt-2 space-y-0">
              <li>
                <a
                  href={siteShell.pineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Pine
                </a>
              </li>
              <li>
                <Link href="/fire-ops" className={linkClass}>
                  {messages.footer.fireOps}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">{messages.footer.site}</p>
            <ul className="space-y-0">
              <li>
                <Link href="/service/ai-solution" className={linkClass}>
                  {messages.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/cases" className={linkClass}>
                  {messages.nav.work}
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  {messages.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/resources" className={linkClass}>
                  {messages.footer.resources}
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  {messages.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">{messages.nav.company}</p>
            <ul className="space-y-0">
              <li>
                <Link href="/company" className={linkClass}>
                  {messages.nav.company}
                </Link>
              </li>
              <li>
                <Link href="/company#representative" className={linkClass}>
                  {messages.footer.representative}
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
              <li>
                <Link href="/security" className={linkClass}>
                  {messages.common.security}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-sequoia-black/8 pt-6 text-xs text-secondary">
          <p>
            © {year} {messages.common.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
