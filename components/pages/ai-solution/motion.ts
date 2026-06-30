import { editorialTransition, scrollRevealTransition } from '@/lib/motion-safe'

export const fadeUp = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: editorialTransition(),
}

export const itemMotion = (idx: number) => ({
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: scrollRevealTransition(idx),
})
