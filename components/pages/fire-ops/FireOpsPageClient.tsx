'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import FadeUp from '@/components/home/FadeUp'
import FaqAccordion from '@/components/ui/FaqAccordion'
import DashboardMock from '@/components/pages/fire-ops/DashboardMock'
import FeatureMock from '@/components/pages/fire-ops/FeatureMock'
import FireOpsDiagnosisForm from '@/components/pages/fire-ops/FireOpsDiagnosisForm'
import FireOpsHeader from '@/components/pages/fire-ops/FireOpsHeader'
import { fireOpsPage } from '@/data/fire-ops'
import { buildContactHref } from '@/lib/contact'
import { trackEvent } from '@/lib/track-event'

const consultationHref = buildContactHref('fire-ops-consultation', 'fire-ops')

export default function FireOpsPageClient() {
  const handlePrimaryCta = (location: string) => {
    trackEvent('fireops_primary_cta_click', { location })
  }

  const handleConsultation = (location: string) => {
    trackEvent('fireops_consultation_click', { location })
  }

  return (
    <>
      <FireOpsHeader />
      <main className="min-h-screen bg-off-white">
        {/* Hero */}
        <section className="border-b border-sequoia-black/8 pt-24 pb-14 md:pt-28 md:pb-20">
          <div className="home-container">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <FadeUp>
                <p className="home-label mb-4 text-brand-green">{fireOpsPage.label}</p>
                <h1 className="home-h2">
                  {fireOpsPage.hero.headline[0]}
                  <br />
                  {fireOpsPage.hero.headline[1]}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
                  {fireOpsPage.hero.lead}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={`#${fireOpsPage.diagnosis.id}`}
                    onClick={() => handlePrimaryCta('hero')}
                    className="btn-pill-primary-solid inline-flex min-h-12 items-center justify-center gap-2 px-6 text-base"
                  >
                    {fireOpsPage.hero.primaryCta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                  <Link
                    href={consultationHref}
                    onClick={() => handleConsultation('hero')}
                    className="btn-pill-outline inline-flex min-h-12 items-center justify-center px-6 text-base"
                  >
                    {fireOpsPage.hero.secondaryCta}
                  </Link>
                </div>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-secondary">{fireOpsPage.hero.note}</p>
              </FadeUp>
              <FadeUp delay={0.06}>
                <DashboardMock />
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Problems — list, not cards */}
        <section className="home-section border-b border-sequoia-black/8 bg-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <h2 className="home-h2">
                {fireOpsPage.problems.headline[0]}
                <br />
                {fireOpsPage.problems.headline[1]}
              </h2>
            </FadeUp>
            <FadeUp>
              <ul className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
                {fireOpsPage.problems.items.map((item, index) => (
                  <li key={item} className="grid grid-cols-[3rem_1fr] gap-4 py-4 md:grid-cols-[4rem_1fr] md:gap-6 md:py-5">
                    <span className="text-sm text-secondary">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-base leading-relaxed text-sequoia-black md:text-lg">{item}</p>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </section>

        {/* Flow */}
        <section id="flow" className="home-section border-b border-sequoia-black/8 bg-off-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <p className="home-label mb-3 text-brand-green">業務フロー</p>
              <h2 className="home-h2">
                {fireOpsPage.flow.headline[0]}
                <br />
                {fireOpsPage.flow.headline[1]}
              </h2>
              <p className="mt-4 max-w-2xl text-base text-secondary">{fireOpsPage.flow.description}</p>
            </FadeUp>

            <FadeUp>
              <ol className="grid gap-px border border-sequoia-black/10 bg-sequoia-black/10 sm:grid-cols-2 lg:grid-cols-4">
                {fireOpsPage.flow.steps.map((step, index) => (
                  <li key={step.label} className="bg-white p-5">
                    <p className="text-xs text-secondary">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-base font-medium text-sequoia-black">{step.label}</h3>
                    <dl className="mt-4 space-y-1 text-xs text-secondary md:text-sm">
                      <div className="flex justify-between gap-2">
                        <dt>担当</dt>
                        <dd className="text-sequoia-black/80">{step.owner}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt>次の対応</dt>
                        <dd className="text-sequoia-black/80">{step.next}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </div>
        </section>

        {/* Features */}
        <section id={fireOpsPage.features.id} className="home-section border-b border-sequoia-black/8 bg-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <p className="home-label mb-3 text-brand-green">{fireOpsPage.features.headline}</p>
              <h2 className="home-h2">点検から請求まで、案件単位で管理できます</h2>
            </FadeUp>
            <div className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
              {fireOpsPage.features.items.map((feature) => (
                <FadeUp key={feature.number}>
                  <article className="grid gap-6 py-8 md:grid-cols-[1fr_14rem] md:items-start md:gap-10 lg:grid-cols-[1fr_16rem]">
                    <div>
                      <p className="text-sm text-secondary">{feature.number}</p>
                      <h3 className="mt-2 text-lg font-medium text-sequoia-black md:text-xl">{feature.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary md:text-base">
                        {feature.description}
                      </p>
                    </div>
                    <FeatureMock type={feature.mock} />
                  </article>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="home-section border-b border-sequoia-black/8 bg-off-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <h2 className="home-h2">{fireOpsPage.beforeAfter.headline}</h2>
            </FadeUp>

            <FadeUp>
              <div className="hidden overflow-x-auto border border-sequoia-black/10 bg-white md:block">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-sequoia-black/10 bg-off-white">
                    <tr>
                      <th className="px-5 py-3.5 font-medium text-sequoia-black">項目</th>
                      <th className="px-5 py-3.5 font-medium text-sequoia-black">現在</th>
                      <th className="px-5 py-3.5 font-medium text-sequoia-black">導入後</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fireOpsPage.beforeAfter.rows.map((row) => (
                      <tr key={row.item} className="border-t border-sequoia-black/8">
                        <th scope="row" className="px-5 py-3.5 font-medium text-sequoia-black">
                          {row.item}
                        </th>
                        <td className="px-5 py-3.5 text-secondary">{row.before}</td>
                        <td className="px-5 py-3.5 text-brand-green">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10 md:hidden">
                {fireOpsPage.beforeAfter.rows.map((row) => (
                  <div key={row.item} className="py-4">
                    <p className="text-sm font-medium text-sequoia-black">{row.item}</p>
                    <dl className="mt-3 space-y-2 text-sm">
                      <div>
                        <dt className="text-xs text-secondary">現在</dt>
                        <dd className="mt-1 text-secondary">{row.before}</dd>
                      </div>
                      <div>
                        <dt className="text-xs text-brand-green">導入後</dt>
                        <dd className="mt-1 text-brand-green">{row.after}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Integration */}
        <section className="home-section border-b border-sequoia-black/8 bg-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <h2 className="home-h2">{fireOpsPage.integration.headline}</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary">
                {fireOpsPage.integration.description}
              </p>
            </FadeUp>

            <FadeUp>
              <div className="border border-sequoia-black/10 bg-off-white p-5 md:p-8">
                <div className="grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
                  <ul className="space-y-0 divide-y divide-sequoia-black/10 border border-sequoia-black/10 bg-white">
                    <li className="px-4 py-3 text-sm text-sequoia-black">現場の点検アプリ</li>
                    <li className="px-4 py-3 text-sm text-sequoia-black">Excel・物件台帳</li>
                  </ul>

                  <div className="border border-brand-green/30 bg-white px-5 py-5 text-center md:min-w-[200px]">
                    <p className="text-sm font-medium text-brand-green">Amber FireOps</p>
                    <p className="mt-1 text-xs text-secondary">案件情報とステータスをつなぐ</p>
                  </div>

                  <ul className="space-y-0 divide-y divide-sequoia-black/10 border border-sequoia-black/10 bg-white">
                    <li className="px-4 py-3 text-sm text-sequoia-black">会計ソフト</li>
                    <li className="px-4 py-3 text-sm text-sequoia-black">カレンダー・メール</li>
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Semi-custom */}
        <section className="home-section border-b border-sequoia-black/8 bg-off-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <p className="home-label mb-3 text-brand-green">セミオーダー型</p>
              <h2 className="home-h2">
                {fireOpsPage.semiCustom.headline[0]}
                <br />
                {fireOpsPage.semiCustom.headline[1]}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary">
                {fireOpsPage.semiCustom.description}
              </p>
            </FadeUp>

            <FadeUp>
              <div className="grid gap-px border border-sequoia-black/10 bg-sequoia-black/10 lg:grid-cols-3">
                {fireOpsPage.semiCustom.layers.map((layer, index) => (
                  <div key={layer.title} className="bg-white p-6">
                    <p className="text-xs text-secondary">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-lg font-medium text-sequoia-black">{layer.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {layer.items.map((item) => (
                        <li key={item} className="text-sm text-secondary">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Approach */}
        <section className="home-section border-b border-sequoia-black/8 bg-white">
          <div className="home-container">
            <FadeUp className="max-w-3xl">
              <h2 className="home-h2">{fireOpsPage.approach.headline}</h2>
              <p className="mt-6 text-base leading-relaxed text-secondary md:text-lg">
                {fireOpsPage.approach.body}
              </p>
            </FadeUp>
          </div>
        </section>

        {/* Process */}
        <section id={fireOpsPage.process.id} className="home-section border-b border-sequoia-black/8 bg-off-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <p className="home-label mb-3 text-brand-green">導入の流れ</p>
              <h2 className="home-h2">{fireOpsPage.process.headline}</h2>
            </FadeUp>
            <FadeUp>
              <ol className="divide-y divide-sequoia-black/10 border-y border-sequoia-black/10 bg-white">
                {fireOpsPage.process.steps.map((step) => (
                  <li
                    key={step.number}
                    className="grid gap-2 px-5 py-5 md:grid-cols-[4rem_12rem_1fr] md:items-baseline md:gap-6 md:px-6"
                  >
                    <p className="text-sm text-secondary">{step.number}</p>
                    <h3 className="text-base font-medium text-sequoia-black md:text-lg">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-secondary md:text-base">{step.description}</p>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </div>
        </section>

        {/* KPIs */}
        <section className="home-section border-b border-sequoia-black/8 bg-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <h2 className="home-h2">
                {fireOpsPage.kpis.headline[0]}
                <br />
                {fireOpsPage.kpis.headline[1]}
              </h2>
              <p className="mt-4 text-sm text-secondary">{fireOpsPage.kpis.sampleLabel}</p>
            </FadeUp>
            <FadeUp>
              <ul className="grid gap-px border border-sequoia-black/10 bg-sequoia-black/10 sm:grid-cols-2 lg:grid-cols-3">
                {fireOpsPage.kpis.items.map((kpi) => (
                  <li key={kpi.label} className="bg-off-white px-5 py-5">
                    <p className="text-sm text-sequoia-black">{kpi.label}</p>
                    <p className="mt-3 text-xs text-secondary">導入後に追う指標</p>
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp className="mt-8">
              <p className="max-w-2xl text-sm leading-relaxed text-secondary md:text-base">{fireOpsPage.kpis.note}</p>
            </FadeUp>
          </div>
        </section>

        <FireOpsDiagnosisForm />

        {/* FAQ */}
        <section id={fireOpsPage.faq.id} className="home-section border-t border-sequoia-black/8 bg-off-white">
          <div className="home-container">
            <FadeUp className="mb-10 max-w-3xl md:mb-12">
              <h2 className="home-h2">よくある質問</h2>
            </FadeUp>
            <FadeUp>
              <FaqAccordion
                items={fireOpsPage.faq.items}
                onItemOpen={(index, question) => {
                  trackEvent('fireops_faq_open', { index, question })
                }}
              />
            </FadeUp>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-sequoia-black/8 bg-dark-green py-16 text-white md:py-20">
          <div className="home-container">
            <FadeUp className="max-w-3xl">
              <h2 className="break-keep text-[clamp(1.6rem,3.2vw,2.5rem)] font-medium leading-tight">
                {fireOpsPage.finalCta.headline[0]}
                <br />
                {fireOpsPage.finalCta.headline[1]}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
                {fireOpsPage.finalCta.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`#${fireOpsPage.diagnosis.id}`}
                  onClick={() => handlePrimaryCta('final')}
                  className="btn-pill inline-flex min-h-12 items-center justify-center gap-2 bg-white px-6 text-base text-dark-green hover:bg-off-white"
                >
                  {fireOpsPage.finalCta.primaryCta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
                <Link
                  href={consultationHref}
                  onClick={() => handleConsultation('final')}
                  className="inline-flex min-h-12 items-center justify-center border border-white/35 px-6 text-base text-white transition-colors hover:bg-white/10"
                >
                  {fireOpsPage.finalCta.secondaryCta}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>
    </>
  )
}
