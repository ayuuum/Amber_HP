'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

type MenuItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const menuItems: MenuItem[] = [
  {
    label: '私たちについて',
    href: '/#about',
  },
  {
    label: 'サービス',
    href: '/service/consulting',
    children: [
      { label: 'AI導入支援', href: '/service/consulting' },
      { label: '法人向け生成AI研修', href: '/service/training' },
      { label: 'ホームサービス向け業務システム', href: '/service/saas' },
    ],
  },
  {
    label: 'ニュース',
    href: '/blog',
  },
  {
    label: '会社情報',
    href: '/company',
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-forest-green/95 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-50 relative" aria-label="株式会社Amber">
            <span className="text-2xl font-bold font-serif text-white tracking-wide">
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
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-white transition-colors rounded-sm cursor-default"
                      aria-haspopup="true"
                      aria-expanded={hoveredIndex === index}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </span>
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-1 min-w-[200px]"
                        >
                          <div className="bg-deep-forest-green border border-white/20 rounded-sm shadow-xl py-1">
                            {item.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.href}
                                className="block px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-white transition-colors rounded-sm"
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
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-sm transition-colors z-50 relative"
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
              className="fixed inset-0 bg-black/50 lg:hidden"
              style={{ top: '80px', height: 'calc(100vh - 80px)' }}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-20 right-0 w-full md:w-80 h-[calc(100vh-80px)] bg-deep-forest-green border-l border-white/20 overflow-y-auto lg:hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 space-y-6">
                <nav className="flex flex-col space-y-2">
                  {menuItems.map((item, index) => (
                    <div key={index} className="border-b border-white/20 last:border-0 pb-2 last:pb-0">
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                            className="flex items-center justify-between w-full py-3 text-white font-medium hover:text-white"
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
                                  {item.children.map((child, childIndex) => (
                                    <Link
                                      key={childIndex}
                                      href={child.href}
                                      className="block py-2 text-white/90 font-medium hover:text-white text-sm"
                                      onClick={toggleMobileMenu}
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-3 text-white font-medium hover:text-white"
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
