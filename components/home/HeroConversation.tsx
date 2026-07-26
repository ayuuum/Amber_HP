'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { heroConversation } from '@/data/home'
import { MOTION_EASE } from '@/lib/motion-safe'

type Props = { compact?: boolean }

export default function HeroConversation({ compact = false }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`home-glass w-full max-w-[360px] p-5 text-white ${compact ? 'mx-auto' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : 0.35, ease: MOTION_EASE }}
      aria-hidden
    >
      <div className="mb-4 space-y-3">
        <div>
          <p className="mb-1 text-[11px] font-medium tracking-wide text-white/55">{heroConversation.userLabel}</p>
          <p className="rounded-xl bg-white/10 px-3 py-2.5 text-sm leading-relaxed text-white/90">
            {heroConversation.userMessage}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[11px] font-medium tracking-wide text-white/55">{heroConversation.aiLabel}</p>
          <p className="rounded-xl bg-brand-green/40 px-3 py-2.5 text-sm leading-relaxed text-white">
            {heroConversation.aiMessage}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t border-white/15 pt-4">
        {heroConversation.status.map((item) => (
          <div key={item.label} className="rounded-xl bg-white/8 px-3 py-2.5">
            <p className="text-[11px] text-white/55">{item.label}</p>
            <p className="mt-0.5 text-sm font-medium text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
