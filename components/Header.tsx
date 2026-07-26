'use client'

import { useState, useEffect, useId, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { buildContactHref } from '@/lib/contact'
import { serviceMegaMenu } from '@/data/home'
import { panelTransition } from '@/lib/motion-safe'

const DARK_HERO_PATHS = ['/']

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isAiSolutionPage = pathname === '/service/ai-solution'
  const contactHref = isAiSolutionPage ? '#ai-solution-form' : buildContactHref('header')
  const contactCtaHref = isAiSolutionPage ? '#ai-solution-form' : buildContactHref('header-cta')
  const megaId = useId()
  const mobileNavId = useId()
  const megaRef = useRef<HTMLDivElement>(null)

  const isDarkHero = DARK_HERO_PATHS.includes(pathname ?? '')
  const isTransparent = isDarkHero && !scrolled && !isMobileMenuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setServiceOpen(false)
    setMobileServiceOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!serviceOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServiceOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setServiceOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [serviceOpen])

  const headerBg = isTransparent
    ? 'border-transparent bg-transparent'
    : 'border-sequoia-black/8 bg-white/85 shadow-sm backdrop-blur-xl'
  const logoColor = isTransparent ? 'text-white' : 'text-brand-green'
  const navColor = isTransparent
    ? 'text-white/90 hover:bg-white/10 hover:text-white'
    : 'text-sequoia-black/75 hover:bg-sequoia-black/5 hover:text-brand-green'
  const mobileBtnColor = isTransparent
    ? 'text-white hover:bg-white/10'
    : 'text-sequoia-black hover:bg-sequoia-black/5'

  const resolveHref = (href: string) => {
    if (href.startsWith('/#')) {
      return pathname === '/' ? href.slice(1) : href
    }
    return href
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-[400ms] ${headerBg}`}
    >
      <div className="home-container">
        <div className="site-header-toolbar flex h-20 items-center justify-between">
          <Link
            href="/"
            className="relative z-50 shrink-0 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
            aria-label="株式会社Amber"
          >
            <span className={`font-logo text-[1.75rem] leading-none transition-colors duration-[400ms] ${logoColor}`}>
              Amber
            </span>
          </Link>

          <nav className="site-nav-desktop ml-auto mr-3 gap-0.5" aria-label="メインナビゲーション">
            <div className="relative" ref={megaRef}>
              <button
                type="button"
                className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35 ${navColor}`}
                aria-expanded={serviceOpen}
                aria-controls={megaId}
                onClick={() => setServiceOpen((v) => !v)}
                onMouseEnter={() => setServiceOpen(true)}
              >
                サービス
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${serviceOpen ? 'rotate-180' : ''}`} aria-hidden />
              </button>
              <AnimatePresence>
                {serviceOpen && (
                  <motion.div
                    id={megaId}
                    role="menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={panelTransition()}
                    className="absolute left-0 top-full z-50 mt-3 w-[min(92vw,520px)] rounded-2xl border border-sequoia-black/8 bg-white p-3 shadow-lg"
                    onMouseLeave={() => setServiceOpen(false)}
                  >
                    <ul className="grid gap-1 sm:grid-cols-2">
                      {serviceMegaMenu.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={resolveHref(item.href)}
                            role="menuitem"
                            className="block rounded-xl px-4 py-3 transition-colors hover:bg-light-green/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30"
                            onClick={() => setServiceOpen(false)}
                          >
                            <span className="block text-sm font-medium text-sequoia-black">{item.title}</span>
                            <span className="mt-1 block text-xs leading-relaxed text-secondary">{item.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={resolveHref('/#cases')}
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35 ${navColor}`}
            >
              支援事例
            </Link>
            <Link
              href="/company"
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35 ${navColor}`}
            >
              会社情報
            </Link>
            <Link
              href="/blog"
              className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35 ${navColor}`}
            >
              知見
            </Link>
          </nav>

          <Link
            href={contactCtaHref}
            className={`site-nav-desktop ml-2 hidden shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,color] duration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 xl:inline-flex ${
              isTransparent
                ? 'bg-white text-dark-green hover:bg-white/90'
                : 'bg-brand-green text-white hover:bg-dark-green'
            }`}
          >
            AI活用を相談する
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={`site-nav-mobile-toggle relative z-50 rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 ${mobileBtnColor}`}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileNavId}
            aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id={mobileNavId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={panelTransition()}
            className="border-t border-sequoia-black/8 bg-white lg:hidden"
          >
            <nav className="home-container py-4" aria-label="モバイルナビゲーション">
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-medium text-sequoia-black"
                    aria-expanded={mobileServiceOpen}
                    onClick={() => setMobileServiceOpen((v) => !v)}
                  >
                    サービス
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileServiceOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileServiceOpen && (
                    <ul className="mb-2 space-y-1 pl-3">
                      {serviceMegaMenu.map((item) => (
                        <li key={item.title}>
                          <Link
                            href={resolveHref(item.href)}
                            className="block rounded-xl px-3 py-3 text-sm text-sequoia-black/80 hover:bg-light-green/60"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <span className="font-medium text-sequoia-black">{item.title}</span>
                            <span className="mt-0.5 block text-xs text-secondary">{item.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li>
                  <Link
                    href={resolveHref('/#cases')}
                    className="flex min-h-12 items-center rounded-xl px-3 py-3 text-base font-medium text-sequoia-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    支援事例
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company"
                    className="flex min-h-12 items-center rounded-xl px-3 py-3 text-base font-medium text-sequoia-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    会社情報
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="flex min-h-12 items-center rounded-xl px-3 py-3 text-base font-medium text-sequoia-black"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    知見
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href={contactHref}
                    className="btn-pill-primary-solid flex w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    AI活用を相談する
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
