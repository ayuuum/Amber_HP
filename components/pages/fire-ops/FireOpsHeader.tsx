'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { fireOpsPage } from '@/data/fire-ops'
import { trackEvent } from '@/lib/track-event'

export default function FireOpsHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const handlePrimaryCta = () => {
    trackEvent('fireops_primary_cta_click', { location: 'header' })
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-brand ${
        scrolled || mobileOpen
          ? 'border-sequoia-black/8 bg-white'
          : 'border-transparent bg-off-white'
      }`}
    >
      <div className="home-container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="shrink-0" aria-label="株式会社Amber 公式サイト">
          <span className="font-logo text-[1.5rem] leading-none text-brand-green md:text-[1.75rem]">Amber</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="ページ内ナビ">
          {fireOpsPage.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-sm text-sm text-secondary transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`#${fireOpsPage.diagnosis.id}`}
            onClick={handlePrimaryCta}
            className="btn-pill-primary-solid inline-flex min-h-11 px-4 text-sm sm:px-5"
          >
            3分診断
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-sequoia-black lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? 'メニューを閉じる' : 'メニューを開く'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div id={menuId} className="border-t border-sequoia-black/8 bg-white lg:hidden">
          <nav className="home-container flex flex-col gap-1 py-4" aria-label="モバイルナビ">
            {fireOpsPage.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-sm px-2 py-3 text-base text-sequoia-black hover:bg-off-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`#${fireOpsPage.diagnosis.id}`}
              onClick={handlePrimaryCta}
              className="btn-pill-primary-solid mt-2 inline-flex min-h-12 justify-center text-sm"
            >
              3分診断
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
