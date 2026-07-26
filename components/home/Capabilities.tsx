import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { capabilities } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function Capabilities() {
  return (
    <section id="capabilities" className="home-section scroll-mt-24 bg-white" aria-labelledby="capabilities-heading">
      <div className="home-container">
        <FadeUp className="mb-12 md:mb-16">
          <h2 id="capabilities-heading" className="home-h2">
            Amberが提供する支援
          </h2>
        </FadeUp>

        <ul className="grid gap-4 md:grid-cols-2">
          {capabilities.map((item, i) => (
            <FadeUp key={item.id} delay={0.05 * i}>
              <li>
                <Link
                  href={item.href}
                  className="home-card group flex h-full flex-col border border-sequoia-black/8 bg-off-white p-6 transition-colors hover:border-brand-green/25 hover:bg-light-green/40 md:p-8"
                >
                  <h3 className="home-h3 mb-3">{item.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-secondary md:text-base">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-green">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  )
}
