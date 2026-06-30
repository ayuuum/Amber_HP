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
    cleaning: '/images/ai-solution/cases/case-cleaning.jpg',
    fire: '/images/ai-solution/cases/case-fire.jpg',
    chemical: '/images/ai-solution/cases/case-chemical.jpg',
  },
  logos: {
    copilot: '/images/ai-solution/logos/microsoft-copilot.svg',
    chatgpt: '/images/ai-solution/logos/chatgpt.svg',
    gemini: '/images/ai-solution/logos/gemini.svg',
    claude: '/images/ai-solution/logos/claude.svg',
  },
} as const
