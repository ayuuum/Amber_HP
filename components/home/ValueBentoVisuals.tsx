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
  // 旧値から約15〜20%縮小（128→108 / 220→180）
  return cn('min-h-[108px]', featured ? 'lg:min-h-[180px]' : 'lg:min-h-[112px]')
}

export function PriorityMatrixVisual({ featured = false }: VisualProps) {
  const prefersReducedMotion = useReducedMotion()
  const themes = [
    { x: 28, y: 62, label: '社内検索', priority: false },
    { x: 48, y: 72, label: '集計支援', priority: false },
    { x: 74, y: 30, label: '文書確認', priority: true },
  ]

  return (
    <div className={cn(panelBase, panelHeight(featured))} aria-hidden>
      <p className="mb-1.5 text-[10px] font-medium tracking-wide text-secondary md:mb-2 md:text-[11px]">
        AI活用テーマの優先順位
      </p>
      <div className={cn('relative mx-auto w-full max-w-md', featured ? 'aspect-[2/1] lg:aspect-[2.15/1]' : 'aspect-[2.1/1]')}>
        <div className="absolute inset-x-7 bottom-6 top-2 border-b border-l border-sequoia-black/20 md:inset-x-8 md:bottom-7 md:top-3" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-wide text-sequoia-black/55 md:text-[11px]">
          実現性
        </span>
        <span className="absolute left-0 top-[48%] origin-center -translate-y-1/2 -rotate-90 text-[10px] font-medium tracking-wide text-sequoia-black/55 md:text-[11px]">
          期待効果
        </span>

        {themes.map((theme, index) => (
          <motion.div
            key={theme.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${theme.x}%`, top: `${theme.y}%` }}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: theme.priority && !prefersReducedMotion ? [1, 1.06, 1] : 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : theme.priority
                  ? { duration: 2.4, delay: 0.35, repeat: Infinity, repeatDelay: 1.8, ease: MOTION_EASE }
                  : { duration: 0.4, delay: 0.08 * index, ease: MOTION_EASE }
            }
          >
            <div className="flex flex-col items-center gap-1">
              {theme.priority ? (
                <span className="whitespace-nowrap rounded-full border border-brand-green/30 bg-white/95 px-2 py-0.5 text-[9px] font-medium text-brand-green md:text-[10px]">
                  優先テーマ
                </span>
              ) : null}
              <span
                className={cn(
                  'rounded-full border',
                  theme.priority
                    ? 'h-3 w-3 border-brand-green/45 bg-brand-green shadow-sm md:h-3.5 md:w-3.5'
                    : 'h-2.5 w-2.5 border-sequoia-black/25 bg-sequoia-black/35 md:h-3 md:w-3'
                )}
              />
              <span
                className={cn(
                  'whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[9px] font-medium md:text-[10px]',
                  theme.priority
                    ? 'border-brand-green/25 bg-white/95 text-brand-green'
                    : 'border-sequoia-black/12 bg-white/90 text-sequoia-black/70'
                )}
              >
                {theme.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function EnablementFlowVisual({ featured = false }: VisualProps) {
  const prefersReducedMotion = useReducedMotion()
  const steps = ['学ぶ', '試す', '実務活用', '定着']

  return (
    <div className={cn(panelBase, panelHeight(featured))} aria-hidden>
      <p className="mb-2.5 text-[10px] font-medium tracking-wide text-secondary md:mb-3 md:text-[11px]">
        研修から業務定着まで
      </p>
      <div className="flex flex-col justify-center gap-2.5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-1.5 md:gap-2">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              className={cn(
                'rounded-lg border px-2 py-2 text-center md:rounded-xl md:px-2.5 md:py-2.5',
                index === steps.length - 1
                  ? 'border-brand-green/30 bg-brand-green/10 text-brand-green'
                  : 'border-sequoia-black/10 bg-white/85 text-sequoia-black/80'
              )}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.1 * index, ease: MOTION_EASE }}
            >
              <p className="whitespace-nowrap break-keep text-[11px] font-medium leading-none tracking-tight md:text-[12px]">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="relative h-1.5 overflow-hidden rounded-full bg-sequoia-black/10">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-brand-green/70"
            initial={prefersReducedMotion ? { width: '100%' } : { width: '18%' }}
            animate={{ width: '100%' }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.5, delay: 0.15, ease: MOTION_EASE }}
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
    { label: '既存システム', sub: '社内データ', accent: false },
    { label: 'AI', sub: '連携・判断', accent: true },
    { label: '業務結果', sub: '確認・検索・文書', accent: false },
  ]

  return (
    <div className={cn(panelBase, panelHeight(featured))} aria-hidden>
      <p className="mb-2.5 text-[10px] font-medium tracking-wide text-secondary md:mb-3 md:text-[11px]">
        業務と連携する実装
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-1.5 md:gap-2">
        {nodes.map((node, index) => (
          <div key={node.label} className="flex min-w-0 flex-1 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <motion.div
              className={cn(
                'min-w-0 flex-1 rounded-lg border px-2.5 py-2.5 text-center md:rounded-xl md:px-3 md:py-3',
                node.accent ? 'border-brand-green/30 bg-brand-green/10' : 'border-sequoia-black/10 bg-white/85'
              )}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.12 * index, ease: MOTION_EASE }}
            >
              <p
                className={cn(
                  'whitespace-nowrap break-keep text-[11px] font-medium leading-none md:text-[12px]',
                  node.accent ? 'text-brand-green' : 'text-sequoia-black'
                )}
              >
                {node.label}
              </p>
              <p className="mt-1.5 break-keep text-[10px] leading-snug text-secondary md:text-[11px]">
                {node.sub}
              </p>
            </motion.div>
            {index < nodes.length - 1 ? (
              <motion.div
                className="mx-auto h-3 w-px shrink-0 bg-brand-green/30 sm:mx-0 sm:h-px sm:w-3 md:w-4"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { duration: 0.35, delay: 0.18 + 0.12 * index, ease: MOTION_EASE }
                }
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
