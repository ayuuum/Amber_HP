import type { Transition, Variants } from 'framer-motion'

/** v3.0 motion tokens: UI 200–300ms / editorial 550–650ms */
export const MOTION_FAST = 0.2
export const MOTION_BASE = 0.3
/** パネル・ドロワー・オーバーレイ */
export const MOTION_PANEL = 0.35
export const MOTION_HERO = 0.4
/** Hero 右カラム動画 clip-path reveal */
export const MOTION_HERO_VIDEO = 1.4
export const MOTION_HERO_VIDEO_DELAY = 1.05
/** Hero 見出しは動画より先に、ゆっくり登場 */
export const MOTION_HERO_TEXT_DELAY = 0.15
export const STAGGER_HERO_TEXT = 0.18
/** 見出し・スクロール登場・フォームステップなど編集演出向け */
export const MOTION_EDITORIAL = 0.58
export const STAGGER_EDITORIAL = 0.1
export const MOTION_EASE = [0.22, 1, 0.36, 1] as const

export const panelTransition = (): Transition => ({
  duration: MOTION_PANEL,
  ease: MOTION_EASE,
})

export const editorialTransition = (delay = 0): Transition => ({
  duration: MOTION_EDITORIAL,
  delay,
  ease: MOTION_EASE,
})

export const scrollRevealTransition = (idx = 0): Transition => ({
  duration: MOTION_EDITORIAL,
  delay: idx * STAGGER_EDITORIAL,
  ease: MOTION_EASE,
})

export const motionTransition = (
  duration = MOTION_BASE,
  delay = 0,
): Transition => ({
  duration,
  delay,
  ease: MOTION_EASE,
})

/**
 * 親コンテナ用：opacity を触らない（子が opacity:0 のまま固まって白画面になるのを防ぐ）。
 * stagger だけ親に載せ、フェードは子の itemVariants に限定する。
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
}

/** カード列など、ややゆったりした stagger（親は opacity なしのまま） */
export const staggerContainerRelaxed: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const staggerContainerLoose: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
}

/** 子ブロック用の標準フェードイン（親は staggerContainer と組み合わせる） */
export const fadeUpItem: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: MOTION_BASE, ease: MOTION_EASE },
  },
}

/** Hero 見出し・リードなど、編集演出向けフェードイン */
export const fadeUpEditorialItem: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: MOTION_EDITORIAL, ease: MOTION_EASE },
  },
}

export const staggerContainerEditorial: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_EDITORIAL,
      delayChildren: 0.08,
    },
  },
}

export const staggerContainerHero: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_HERO_TEXT,
      delayChildren: MOTION_HERO_TEXT_DELAY,
    },
  },
}

/** prefers-reduced-motion 向け: duration 0 */
export const reducedMotionTransition = (prefersReducedMotion: boolean | null, duration = MOTION_BASE) =>
  prefersReducedMotion ? { duration: 0 } : { duration, ease: MOTION_EASE }
