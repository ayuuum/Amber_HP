import { missionSection } from '@/data/home'

export default function MissionSection() {
  return (
    <section id="mission" className="home-section scroll-mt-24 bg-white" aria-labelledby="mission-heading">
      <div className="home-container">
        <div className="max-w-3xl">
          <h2 id="mission-heading" className="home-h2 mb-6">
            {missionSection.heading}
          </h2>
          <p className="mb-6 text-lg font-medium text-sequoia-black md:text-xl">{missionSection.lead}</p>
          <div className="space-y-5">
            {missionSection.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="home-body max-w-2xl">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
