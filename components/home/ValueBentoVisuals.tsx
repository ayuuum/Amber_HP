'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { MOTION_EASE } from '@/lib/motion-safe'
import { cn } from '@/lib/utils'

type VisualProps = {
  featured?: boolean
}

const panelBase =
  'relative h-full w-full overflow-hidden rounded-xl border border-white/60 bg-white/55 p-3 shadow-sm backdrop-blur-[2px] md:rounded-2xl md:p-4'

function panelHeight(featured?: boolean) {
  return cn('min-h-[128px]', featured ? 'lg:min-h-[220px]' : 'lg:min-h-[132px]')
}

export function PriorityMatrixVisual({ featured = false }: VisualProps) {
  const prefersReducedMotion = useReducedMotion()
  const themes = [
    { x: 22, y: 68, size: 'sm' as const, priority: false },
    { x: 38, y: 42, size: 'sm' as const, priority: false },
    { x: 58, y: 58, size: 'sm' as const, priority: false },
    { x: 72, y: 28, size: 'lg' as const, priority: true },
    { x: 48, y: 78, size: 'sm' as const, priority: false },
  ]

  return (
    <div className={cn(panelBase, panelHeight(featured))} aria-hidden>
      <p className="mb-2 text-[10px] font-medium tracking-wide text-secondary md:text-[11px]">AI活用テーマの優先順位</p>
      <div className="relative mx-auto aspect-[5/3] w-full max-w-md">
        <div className="absolute inset-x-6 bottom-5 top-3 border-b border-l border-sequoia-black/15" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] tracking-wide text-secondary md:text-[10px]">
          実現性
        </span>
        <span className="absolute left-0 top-1/2 origin-center -translate-y-1/2 -rotate-90 text-[9px] tracking-wide text-secondary md:text-[10px]">
          期待効果
        </span>

        {themes.map((theme, index) => (
          <motion.span
            key={`${theme.x}-${theme.y}`}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border',
              theme.priority
                ? 'border-brand-green/40 bg-brand-green shadow-sm'
                : 'border-sequoia-black/10 bg-white/90',
              theme.size === 'lg' ? 'h-3.5 w-3.5 md:h-4 md:w-4' : 'h-2 w-2 md:h-2.5 md:w-2.5'
            )}
            style={{ left: `${theme.x}%`, top: `${theme.y}%` }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: theme.priority && !prefersReducedMotion ? [1, 1.12, 1] : 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : theme.priority
                  ? { duration: 2.4, delay: 0.4, repeat: Infinity, repeatDelay: 1.8, ease: MOTION_EASE }
                  : { duration: 0.45, delay: 0.08 * index, ease: MOTION_EASE }
            }
          />
        ))}

        <motion.div
          className="absolute right-[14%] top-[12%] rounded-full border border-brand-green/25 bg-white/90 px-2 py-0.5 text-[9px] font-medium text-brand-green md:text-[10px]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.35, ease: MOTION_EASE }}
        >
          優先テーマ
        </motion.div>
      </div>
    </div>
  )
}

export function EnablementFlowVisual({ featured = false }: VisualProps) {
  const prefersReducedMotion = useReducedMotion()
  const steps = ['学ぶ', '試す', '業務で使う', '定着する']

  return (
    <div className={cn(panelBase, panelHeight(featured))} aria-hidden>
      <p className="mb-3 text-[10px] font-medium tracking-wide text-secondary md:text-[11px]">研修から業務定着まで</p>
      <div className="flex flex-col justify-center gap-2.5 md:gap-3">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-1.5 md:gap-2">
          {steps.map((step, index) => (
            <div key={step} className="flex min-w-0 items-center gap-1.5 sm:flex-1 md:gap-2">
              <motion.div
                className={cn(
                  'min-w-0 flex-1 rounded-lg border px-2 py-2 text-center md:rounded-xl md:px-2 md:py-2.5',
                  index === steps.length - 1
                    ? 'border-brand-green/30 bg-brand-green/10 text-brand-green'
                    : 'border-sequoia-black/8 bg-white/80 text-sequoia-black/75'
                )}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.12 * index, ease: MOTION_EASE }}
              >
                <p className="text-[10px] font-medium leading-tight md:text-[11px]">{step}</p>
              </motion.div>
              {index < steps.length - 1 ? (
                <motion.span
                  className="hidden h-px w-2 shrink-0 bg-brand-green/35 sm:block md:w-3"
                  initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={
                    prefersReducedMotion ? { duration: 0 } : { duration: 0.35, delay: 0.12 * index + 0.1, ease: MOTION_EASE }
                  }
                  style={{ originX: 0 }}
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-sequoia-black/8">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-brand-green/70"
            initial={prefersReducedMotion ? { width: '100%' } : { width: '18%' }}
            animate={{ width: '100%' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.6, delay: 0.2, ease: MOTION_EASE }}
          />
        </div>
        <p className="text-[10px] text-secondary md:text-[11px]">実務適用まで支援</p>
      </div>
    </div>
  )
}

export function AgentLinkVisual({ featured = false }: VisualProps) {
  const prefersReducedMotion = useReducedMotion()
  const nodes = [
    { label: '既存システム', sub: '社内データ' },
    { label: 'AIエージェント', sub: '連携・判断' },
    { label: '業務結果', sub: '確認・検索・文書' },
  ]

  return (
    <div className={cn(panelBase, panelHeight(featured))} aria-hidden>
      <p className="mb-3 text-[10px] font-medium tracking-wide text-secondary md:text-[11px]">業務と連携する実装</p>
      <div className="flex items-center gap-1 md:gap-2">
        {nodes.map((node, index) => (
          <div key={node.label} className="flex min-w-0 flex-1 items-center gap-1 md:gap-2">
            <motion.div
              className={cn(
                'min-w-0 flex-1 rounded-lg border px-1.5 py-2.5 text-center md:rounded-xl md:px-3 md:py-3',
                index === 1 ? 'border-brand-green/30 bg-brand-green/10' : 'border-sequoia-black/8 bg-white/80'
              )}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, delay: 0.15 * index, ease: MOTION_EASE }}
            >
              <p
                className={cn(
                  'text-[10px] font-medium leading-snug md:text-[11px]',
                  index === 1 ? 'text-brand-green' : 'text-sequoia-black'
                )}
              >
                {node.label}
              </p>
              <p className="mt-1 text-[9px] leading-snug text-secondary md:text-[10px]">{node.sub}</p>
            </motion.div>
            {index < nodes.length - 1 ? (
              <motion.div
                className="relative h-px w-1.5 shrink-0 bg-brand-green/35 md:w-4"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.2 + 0.15 * index, ease: MOTION_EASE }
                }
              >
                <span className="absolute -right-0.5 top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-t border-brand-green/40 md:block" />
              </motion.div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
