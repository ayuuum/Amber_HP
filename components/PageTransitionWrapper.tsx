'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
