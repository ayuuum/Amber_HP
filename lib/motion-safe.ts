import type { Variants } from 'framer-motion'

/**
 * 親コンテナ用：opacity を触らない（子が opacity:0 のまま固まって白画面になるのを防ぐ）。
 * stagger だけ親に載せ、フェードは子の itemVariants に限定する。
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

/** カード列など、ややゆったりした stagger（親は opacity なしのまま） */
export const staggerContainerRelaxed: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.06,
    },
  },
}

export const staggerContainerLoose: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.06,
    },
  },
}

/** 子ブロック用の標準フェードイン（親は staggerContainer と組み合わせる） */
export const fadeUpItem: Variants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}
