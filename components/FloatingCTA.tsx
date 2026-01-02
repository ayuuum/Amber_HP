'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 300pxスクロールしたら表示
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 300) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    // 24時間は非表示にする
    localStorage.setItem('floatingCTA dismissed', Date.now().toString())
  }

  useEffect(() => {
    // 24時間以内に閉じられた場合は表示しない
    const dismissedTime = localStorage.getItem('floatingCTA dismissed')
    if (dismissedTime) {
      const timeDiff = Date.now() - parseInt(dismissedTime)
      if (timeDiff < 24 * 60 * 60 * 1000) {
        setIsDismissed(true)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-deep-forest-green text-white rounded-sm shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="flex items-center gap-3 px-6 py-4">
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              <Link
                href="#contact"
                className="font-bold text-sm md:text-base hover:text-white transition-colors"
              >
                無料で相談する
                <span className="block text-xs font-normal opacity-90 mt-0.5">
                  30分・営業なし
                </span>
              </Link>
              <button
                onClick={handleDismiss}
                className="ml-2 p-1 hover:bg-deep-forest-green/20 rounded-sm transition-colors"
                aria-label="閉じる"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

