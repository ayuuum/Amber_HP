'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'

// ヒーローがダーク基調のページ。スクロール前はヘッダーを透明＋白文字に切り替える。
const DARK_HERO_PATHS = ['/service/development']

const PINE_HOME_URL = 'https://pine-home.com/'

type MenuChild = {
  label: string
  href: string
  external?: boolean
  group?: string
}

type MenuItem = {
  label: string
  href: string
  children?: MenuChild[]
}

const menuItems: MenuItem[] = [
  {
    label: '企業情報',
    href: '/company',
  },
  {
    label: 'サービス',
    href: '#',
    children: [
      { label: 'AIシステム開発', href: '/service/development' },
      { label: '生成AI活用研修（概要）', href: '/service/ai-training' },
      { label: 'Microsoft 365 Copilot 研修', href: '/service/ai-training/copilot', group: 'ツール別' },
      { label: 'ChatGPT 研修', href: '/service/ai-training/chatgpt', group: 'ツール別' },
      { label: 'Gemini for Workspace 研修', href: '/service/ai-training/gemini', group: 'ツール別' },
      { label: 'Claude Code 研修', href: '/service/ai-training/claude-code', group: 'ツール別' },
      { label: 'Pine（出張訪問サービス向けソフトウェア）', href: PINE_HOME_URL, external: true },
    ],
  },
  {
    label: 'ニュース',
    href: '/blog',
  },
  {
    label: 'お問い合わせ',
    href: '/company#contact',
  },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()

  const isDarkHeroPage = DARK_HERO_PATHS.includes(pathname ?? '')
  // モバイルメニュー開いている間は読みやすさのため通常モードに戻す
  const isTransparent = isDarkHeroPage && !scrolled && !isMobileMenuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setMobileServiceOpen(false)
  }

  // テーマに応じた色クラス
  const headerBg = isTransparent
    ? 'border-transparent bg-transparent'
    : 'border-sequoia-black/10 bg-white/90 shadow-sm backdrop-blur-md'
  const logoColor = isTransparent ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]' : 'text-sequoia-black'
  const navItemColor = isTransparent
    ? 'text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:text-white'
    : 'text-sequoia-black/80 hover:bg-sequoia-black/5 hover:text-sequoia-green'
  const mobileBtnColor = isTransparent
    ? 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:bg-white/10'
    : 'text-sequoia-black hover:bg-sequoia-black/5 hover:text-sequoia-green'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="site-header-toolbar flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 flex-shrink-0 no-underline visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-green/40"
            aria-label="株式会社Amber"
          >
            <span className={`font-logo text-[2rem] leading-none transition-colors duration-300 ${logoColor}`}>
              Amber
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-nav-desktop items-center gap-1 xl:gap-2" aria-label="主要ナビゲーション">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.children ? (
                  <>
                    <span
                      className={`flex cursor-default items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25 ${navItemColor}`}
                      aria-haspopup="true"
                      aria-expanded={hoveredIndex === index}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 min-w-[220px] pt-2"
                        >
                          <div className="rounded-sm border border-sequoia-black/10 bg-white/95 py-1.5 shadow-xl backdrop-blur-md">
                            {item.children.map((child, childIndex) => {
                              const prevChild = item.children?.[childIndex - 1]
                              const isNewGroup = child.group && child.group !== prevChild?.group
                              return (
                                <div key={childIndex}>
                                  {isNewGroup && (
                                    <p className="mx-4 mt-2 mb-1 text-[10px] font-bold tracking-[0.12em] text-sequoia-black/40 uppercase">
                                      {child.group}
                                    </p>
                                  )}
                                  {child.external ? (
                                    <a
                                      href={child.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mx-1 flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-sm font-medium text-sequoia-black/85 transition-[background-color,color] duration-200 hover:bg-sequoia-green/6 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                                    >
                                      {child.label}
                                      <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
                                      <span className="sr-only">（新しいタブで開く）</span>
                                    </a>
                                  ) : (
                                    <Link
                                      href={child.href}
                                      className={`mx-1 block rounded-sm px-4 py-2.5 text-sm font-medium transition-[background-color,color] duration-200 hover:bg-sequoia-green/6 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25 ${child.group ? 'pl-6 text-sequoia-black/70' : 'text-sequoia-black/85'}`}
                                    >
                                      {child.label}
                                    </Link>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium no-underline transition-[background-color,color] duration-200 visited:text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25 ${navItemColor}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className={`site-nav-mobile-toggle relative z-50 rounded-sm p-2 transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25 ${mobileBtnColor}`}
            aria-label="メニュー"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation & Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-sequoia-black/25 lg:hidden"
              style={{ top: '80px', height: 'calc(100vh - 80px)' }}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-20 right-0 h-[calc(100vh-80px)] w-full overflow-y-auto border-l border-sequoia-black/10 bg-white/95 shadow-2xl md:w-80 lg:hidden"
            >
              <div className="flex flex-col p-6 pt-8">
                <nav className="flex flex-col gap-0" aria-label="モバイルメニュー">
                  {menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-sequoia-black/10 py-1 last:border-b-0 last:pb-2"
                    >
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                            className="flex min-h-12 w-full items-center justify-between rounded-sm py-3 text-left text-base font-medium text-sequoia-black/85 no-underline transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                            aria-expanded={mobileServiceOpen}
                            aria-haspopup="true"
                          >
                            {item.label}
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${mobileServiceOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileServiceOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-3 pb-2 flex flex-col space-y-0.5">
                                  {item.children.map((child, childIndex) => {
                                    const prevChild = item.children?.[childIndex - 1]
                                    const isNewGroup = child.group && child.group !== prevChild?.group
                                    return (
                                      <div key={childIndex}>
                                        {isNewGroup && (
                                          <p className="px-2 pt-2 pb-0.5 text-[10px] font-bold tracking-[0.12em] text-sequoia-black/40 uppercase">
                                            {child.group}
                                          </p>
                                        )}
                                        {child.external ? (
                                          <a
                                            href={child.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex min-h-10 items-center gap-1.5 rounded-sm py-2 text-sm font-medium text-sequoia-black/70 no-underline visited:text-sequoia-black/70 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                                            onClick={toggleMobileMenu}
                                          >
                                            {child.label}
                                            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
                                            <span className="sr-only">（新しいタブで開く）</span>
                                          </a>
                                        ) : (
                                          <Link
                                            href={child.href}
                                            className={`flex min-h-10 items-center rounded-sm py-2 text-sm font-medium no-underline transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25 ${child.group ? 'pl-2 text-sequoia-black/60 visited:text-sequoia-black/60' : 'text-sequoia-black/70 visited:text-sequoia-black/70'}`}
                                            onClick={toggleMobileMenu}
                                          >
                                            {child.label}
                                          </Link>
                                        )}
                                      </div>
                                    )
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex min-h-12 items-center rounded-sm py-3 text-base font-medium text-sequoia-black/85 no-underline visited:text-sequoia-black/85 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                          onClick={toggleMobileMenu}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* スクロール進行バー */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-sequoia-green"
          style={{ scaleX: scrollYProgress }}
        />
      )}
    </header>
  )
}
