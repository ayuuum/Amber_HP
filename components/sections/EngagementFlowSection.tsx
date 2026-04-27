const steps = [
  {
    title: '初回相談',
    description: '事業・業務の状況を伺い、AI活用かWebシステム開発か、優先順位を一緒に整理します。',
  },
  {
    title: '業務理解・要件整理',
    description: '現場の運用、既存ツール、手作業の流れを把握し、使われる仕組みに必要な要件へ落とし込みます。',
  },
  {
    title: '小さく試作・実装',
    description: 'PoCやMVPから始め、予約管理・顧客管理・社内ツール・AI連携などを段階的に形にします。',
  },
  {
    title: '定着・改善',
    description: '納品後の運用ルール、研修、改善サイクルまで支援し、現場に根づく状態を目指します。',
  },
]

export default function EngagementFlowSection() {
  return (
    <section
      className="border-t border-sequoia-black/10 bg-color-bg px-6 py-24"
      aria-labelledby="engagement-flow-heading"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center md:mb-16">
          <p className="eyebrow-light mb-3">進め方</p>
          <h2 id="engagement-flow-heading" className="section-heading mb-5">
            小さく始めて、運用に合わせて改善する。
          </h2>
          <p className="section-subheading">
            まずは業務の流れを確認し、優先度の高い部分から着手します。開発後は運用を見ながら調整し、使い続けられる状態を目指します。
          </p>
        </div>

        <ol className="mx-auto max-w-2xl divide-y divide-sequoia-black/10">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5 py-9 first:pt-0 last:pb-0 md:gap-6">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sequoia-green/25 bg-sequoia-green/10 text-sm font-bold tabular-nums text-sequoia-green shadow-sm"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="mb-2 text-lg font-bold text-sequoia-black md:text-xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-sequoia-black/80 md:text-base">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
