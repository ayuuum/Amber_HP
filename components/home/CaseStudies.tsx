import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { homeCases } from '@/data/home'
import FadeUp from '@/components/home/FadeUp'

export default function CaseStudies() {
  return (
    <section id="cases" className="home-section scroll-mt-24 bg-off-white" aria-labelledby="cases-heading">
      <div className="home-container">
        <FadeUp className="mb-12 max-w-3xl md:mb-16">
          <h2 id="cases-heading" className="home-h2 mb-4">
            現場の変化が、成果を証明する
          </h2>
          <p className="home-body">
            守秘義務により企業名は非公開です。業界と支援内容をもとに、現場で起きた変化をご紹介します。
          </p>
        </FadeUp>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {homeCases.map((item, i) => (
            <FadeUp key={item.industry} delay={0.05 * i}>
              <article className="home-card flex h-full flex-col overflow-hidden border border-sequoia-black/6 bg-white">
                <div className="relative aspect-[16/10] bg-sequoia-black/5">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover brightness-[0.88] saturate-[0.8]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="home-label mb-3 text-brand-green">{item.industry}</p>
                  <h3 className="mb-4 text-lg font-medium leading-snug text-sequoia-black">{item.change}</h3>
                  <dl className="mb-5 space-y-3 text-sm">
                    <div>
                      <dt className="text-secondary">課題</dt>
                      <dd className="mt-0.5 leading-relaxed text-sequoia-black/80">{item.challenge}</dd>
                    </div>
                    <div>
                      <dt className="text-secondary">Amberの支援</dt>
                      <dd className="mt-0.5 leading-relaxed text-sequoia-black/80">{item.support}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-sequoia-black/8 pt-4 text-xs">
                    <div>
                      <p className="mb-1 text-secondary">Before</p>
                      <p className="leading-relaxed text-sequoia-black/80">{item.before}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-secondary">After</p>
                      <p className="leading-relaxed text-sequoia-black/80">{item.after}</p>
                    </div>
                  </div>
                  <Link href={item.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-green hover:underline">
                    詳しく見る
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  )
}
