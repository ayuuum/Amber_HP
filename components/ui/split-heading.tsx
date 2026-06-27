'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { MOTION_EDITORIAL, STAGGER_EDITORIAL, MOTION_EASE } from '@/lib/motion-safe'

interface SplitHeadingProps {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  id?: string
}

export default function SplitHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  id,
}: SplitHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const lines = children.split(/(?<=。|、|，|\n)/).filter(Boolean)

  return (
    <Tag ref={ref} id={id} className={cn('overflow-hidden', className)} aria-label={children}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            aria-hidden
            className="block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: MOTION_EDITORIAL,
              delay: delay + i * STAGGER_EDITORIAL,
              ease: MOTION_EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
