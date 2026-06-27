'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { MOTION_EDITORIAL } from '@/lib/motion-safe'

interface AnimatedTextCycleProps {
  words: string[]
  interval?: number
  className?: string
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = '',
}: AnimatedTextCycleProps) {
  const reducedMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null)
  const [allowWidthAnim, setAllowWidthAnim] = useState(false)
  const measureRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setAllowWidthAnim(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const staticMode = !ready || reducedMotion === true

  useLayoutEffect(() => {
    if (staticMode || !allowWidthAnim || words.length === 0) return
    const root = measureRef.current
    if (!root) return
    const els = root.children
    if (els.length <= currentIndex) return
    const w = els[currentIndex].getBoundingClientRect().width
    if (w > 0) {
      setMeasuredWidth(Math.ceil(w))
    }
  }, [staticMode, allowWidthAnim, currentIndex, words.length])

  useEffect(() => {
    if (staticMode || words.length === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(timer)
  }, [interval, words.length, staticMode])

  if (words.length === 0) {
    return null
  }

  if (staticMode) {
    return (
      <span className={`inline font-bold ${className}`}>{words[0]}</span>
    )
  }

  const widthStyle =
    allowWidthAnim && measuredWidth != null ? (`${measuredWidth}px` as const) : 'auto'

  const containerVariants = {
    hidden: {
      y: -6,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: MOTION_EDITORIAL,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      y: 6,
      opacity: 0,
      transition: {
        duration: MOTION_EDITORIAL,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <span className="relative inline align-baseline" aria-live="polite" aria-atomic="true">
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 opacity-0"
        style={{ visibility: 'hidden' }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className={`block w-max whitespace-nowrap font-bold ${className}`}
          >
            {word}
          </span>
        ))}
      </div>

      <motion.span
        className="relative inline align-baseline"
        animate={{
          width: widthStyle,
          transition: allowWidthAnim
            ? {
                type: 'spring',
                stiffness: 150,
                damping: 15,
                mass: 1.2,
              }
            : { duration: 0 },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  )
}
