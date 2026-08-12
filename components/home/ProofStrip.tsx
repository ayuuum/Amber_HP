import { proofItems } from '@/data/home'

export default function ProofStrip() {
  return (
    <section className="border-b border-sequoia-black/6 bg-white py-12 md:py-16" aria-labelledby="proof-heading">
      <div className="home-container">
        <h2 id="proof-heading" className="sr-only">
          実績・信頼情報
        </h2>
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0">
          {proofItems.map((item, index) => (
            <li
              key={item.label}
              className={
                index > 0
                  ? 'min-w-0 sm:border-l sm:border-sequoia-black/10 sm:pl-8 md:pl-10'
                  : 'min-w-0'
              }
            >
              <p className="mb-2 text-2xl font-medium tracking-tight text-brand-green md:text-3xl">
                {item.value}
              </p>
              <p className="text-sm leading-relaxed text-secondary">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
