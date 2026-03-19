'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const storageKey = 'floatingCTA-dismissedAt'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 520 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 520) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    localStorage.setItem(storageKey, Date.now().toString())
  }

  useEffect(() => {
    const dismissedTime = localStorage.getItem(storageKey)
    if (dismissedTime) {
      const timeDiff = Date.now() - parseInt(dismissedTime)
      if (timeDiff < 24 * 60 * 60 * 1000) {
        setIsDismissed(true)
      }
    }
  }, [storageKey])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 z-50"
        >
          <motion.div
            whileHover={{ scale: 1.01, y: -3 }}
            className="overflow-hidden rounded-sm border border-white/20 bg-sequoia-green text-white shadow-xl"
          >
            <div className="flex items-center gap-3 px-5 py-3.5">
              <MessageCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <Link
                href="/company#contact"
                className="rounded-sm text-sm font-bold transition-[opacity] duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:text-base"
              >
                無料で相談する
                <span className="mt-0.5 block text-xs font-normal opacity-90">
                  30分・営業なし
                </span>
              </Link>
              <button
                onClick={handleDismiss}
                className="ml-1 rounded-sm p-1 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="閉じる"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

