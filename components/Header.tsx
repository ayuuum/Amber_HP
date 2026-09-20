'use client'

import { useState, useEffect, useId } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { buildContactHref } from '@/lib/contact'
import { panelTransition } from '@/lib/motion-safe'
import { useMessages } from '@/components/i18n/LocaleProvider'
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher'

const DARK_HERO_PATHS = [
  '/',
  '/company',
  '/service/ai-training/chatgpt',
  '/service/ai-training/gemini',
  '/service/ai-training/copilot',
  '/service/ai-training/claude-code',
]

const navItems = [
  { key: 'services' as const, href: '/service/ai-solution', labelFallback: 'Services' },
  { key: 'work' as const, href: '/cases', labelFallback: 'Work' },
  { key: 'blog' as const, href: '/blog', labelFallback: 'Blog' },
  { key: 'company' as const, href: '/company', labelFallback: 'Company' },
]

export default function Header() {
  const messages = useMessages()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isAiSolutionPage = pathname === '/service/ai-solution'
  const contactHref = isAiSolutionPage ? '#ai-solution-form' : buildContactHref('header')
  const contactCtaHref = isAiSolutionPage ? '#ai-solution-form' : buildContactHref('header-cta')
  const mobileNavId = useId()

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
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isMobileMenuOpen])

  const headerBg = isTransparent
    ? 'border-transparent bg-transparent'
    : 'border-sequoia-black/8 bg-white/85 shadow-sm backdrop-blur-xl'
  const logoColor = isTransparent ? 'text-white' : 'text-brand-green'
  const navColor = isTransparent
    ? 'text-white/90 hover:bg-white/10 hover:text-white'
    : 'text-sequoia-black/75 hover:bg-sequoia-black/5 hover:text-brand-green'
  const mobileBtnColor = isTransparent ? 'text-white hover:bg-white/10' : 'text-sequoia-black hover:bg-sequoia-black/5'

  const navLabel = (key: (typeof navItems)[number]['key'], fallback: string) => {
    const nav = messages.nav as Record<string, string>
    return nav[key] ?? fallback
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-[400ms] ${headerBg}`}>
      <div className="home-container">
        <div className="site-header-toolbar flex h-20 items-center justify-between">
          <Link
            href="/"
            className="relative z-50 shrink-0 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40"
            aria-label={messages.common.companyName}
          >
            <span className={`font-logo text-[1.75rem] leading-none transition-colors duration-[400ms] ${logoColor}`}>Amber</span>
          </Link>

          <nav className="site-nav-desktop ml-auto mr-3 gap-0.5" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/35 ${navColor}`}
              >
                {navLabel(item.key, item.labelFallback)}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher
            className="site-nav-desktop mr-1 hidden lg:inline-flex"
            tone={isTransparent ? 'dark' : 'light'}
          />

          <Link
            href={contactCtaHref}
            className={`site-nav-desktop ml-1 hidden shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-[background-color,color] duration-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 lg:inline-flex ${
              isTransparent ? 'bg-white text-dark-green hover:bg-white/90' : 'bg-brand-green text-white hover:bg-dark-green'
            }`}
          >
            {messages.common.contact}
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={`site-nav-mobile-toggle relative z-50 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/40 ${mobileBtnColor}`}
            aria-expanded={isMobileMenuOpen}
            aria-controls={mobileNavId}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
            <nav className="home-container py-4" aria-label="Mobile">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-12 items-center rounded-xl px-3 py-3 text-base font-medium text-sequoia-black"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {navLabel(item.key, item.labelFallback)}
                    </Link>
                  </li>
                ))}
                <li className="flex items-center justify-between px-3 py-3">
                  <span className="text-sm text-secondary">{messages.common.language}</span>
                  <LanguageSwitcher />
                </li>
                <li className="pt-2">
                  <Link href={contactHref} className="btn-pill-primary-solid flex w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    {messages.common.contact}
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
