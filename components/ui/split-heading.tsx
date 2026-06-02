'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface SplitHeadingProps {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
  id?: string
}

/**
 * テキストを行（改行 or スペース区切り）に分割し、1行ずつ下から立ち上げる。
 * "プロが作った" と感じさせるタイポグラフィモーション。
 */
export default function SplitHeading({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
  id,
}: SplitHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  // 「、」「。」「，」を区切りに行分割
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
              duration: 0.75,
              delay: delay + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
