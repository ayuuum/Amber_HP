/**
 * AIソリューション LP 用アセットパス。
 * 差し替え: 同名ファイルを public 以下に上書きするだけで反映されます。
 */
export const aiSolutionAssets = {
  heroVideo: '/videos/ai-solution-hero.mp4',
  heroPoster: '/images/ai-solution/hero-poster.jpg',
  stages: {
    usable: '/images/ai-solution/stages/stage-01-usable.jpg',
    flow: '/images/ai-solution/stages/stage-02-flow.jpg',
    remain: '/images/ai-solution/stages/stage-03-remain.jpg',
  },
  cases: {
    // NOTE(2026-09-21): swapped from the original case-*.jpg placeholders,
    // which showed content unrelated to the case (a lumber warehouse for
    // "fire equipment inspection", an empty meeting room for "cleaning
    // operations", a generic laptop+coffee desk for "chemical AI rollout").
    // These reuse existing on-brand photos that actually match the work.
    cleaning: '/images/field-cleaning.png',
    fire: '/images/brand/domain-field.jpg',
    chemical: '/images/consulting-meeting.png',
  },
  logos: {
    copilot: '/images/ai-solution/logos/microsoft-copilot.svg',
    chatgpt: '/images/ai-solution/logos/chatgpt.svg',
    gemini: '/images/ai-solution/logos/gemini.svg',
    claude: '/images/ai-solution/logos/claude.svg',
  },
} as const
