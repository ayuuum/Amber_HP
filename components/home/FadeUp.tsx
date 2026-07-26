'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MOTION_EDITORIAL, MOTION_EASE } from '@/lib/motion-safe'

type FadeUpProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export default function FadeUp({ children, className = '', delay = 0 }: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: MOTION_EDITORIAL, delay, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  )
}
