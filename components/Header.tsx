'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react'

const PINE_HOME_URL = 'https://pine-home.com/'

type MenuChild = {
  label: string
  href: string
  external?: boolean
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
      { label: 'AIシステム開発', href: '/service/consulting' },
      { label: '生成AI活用研修', href: '/service/ai-training' },
      { label: 'Pine（業務管理SaaS）', href: PINE_HOME_URL, external: true },
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setMobileServiceOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-sequoia-black/10 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50 relative" aria-label="株式会社Amber">
            <span className="font-logo text-[2rem] leading-none text-sequoia-black">
              Amber
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
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
                      className="flex cursor-default items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium text-sequoia-black/80 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
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
                            {item.children.map((child, childIndex) =>
                              child.external ? (
                                <a
                                  key={childIndex}
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
                                  key={childIndex}
                                  href={child.href}
                                  className="mx-1 block rounded-sm px-4 py-2.5 text-sm font-medium text-sequoia-black/85 transition-[background-color,color] duration-200 hover:bg-sequoia-green/6 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                                >
                                  {child.label}
                                </Link>
                              ),
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium text-sequoia-black/80 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="relative z-50 rounded-sm p-2 text-sequoia-black transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25 lg:hidden"
            aria-label="メニュー"
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
              <div className="flex flex-col p-6 space-y-6">
                <nav className="flex flex-col space-y-2">
                  {menuItems.map((item, index) => (
                    <div key={index} className="border-b border-sequoia-black/10 pb-2 last:border-0 last:pb-0">
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                            className="flex w-full items-center justify-between rounded-sm py-3 text-left font-medium text-sequoia-black/85 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
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
                                <div className="pl-3 pb-2 flex flex-col space-y-1">
                                  {item.children.map((child, childIndex) =>
                                    child.external ? (
                                      <a
                                        key={childIndex}
                                        href={child.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 rounded-sm py-2 text-sm font-medium text-sequoia-black/70 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                                        onClick={toggleMobileMenu}
                                      >
                                        {child.label}
                                        <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
                                        <span className="sr-only">（新しいタブで開く）</span>
                                      </a>
                                    ) : (
                                      <Link
                                        key={childIndex}
                                        href={child.href}
                                        className="block rounded-sm py-2 text-sm font-medium text-sequoia-black/70 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
                                        onClick={toggleMobileMenu}
                                      >
                                        {child.label}
                                      </Link>
                                    ),
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block rounded-sm py-3 font-medium text-sequoia-black/85 transition-[background-color,color] duration-200 hover:bg-sequoia-black/5 hover:text-sequoia-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sequoia-black/25"
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
    </header>
  )
}
