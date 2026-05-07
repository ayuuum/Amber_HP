'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const profile = [
  {
    label: '会社名',
    value: '株式会社Amber',
  },
  {
    label: '代表取締役',
    value: '松井 歩武',
  },
  {
    label: '設立',
    value: '2026年',
  },
  {
    label: '事業内容',
    value:
      'AIソリューション事業（AIシステム開発、生成AI活用研修、AI導入コンサルティング）／AIプロダクト事業（出張訪問サービス向け予約管理システム「Pine」）',
  },
  {
    label: '取引銀行',
    value: 'GMOあおぞらネット銀行、三井住友銀行',
  },
]

export default function CompanyProfileSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="company"
      ref={sectionRef}
      className="bg-color-bg px-6 py-24 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        {/* セクションヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <p className="eyebrow-light mb-4">企業情報</p>
          <h2 className="section-heading mb-6">
            代表プロフィールと<br />会社概要
          </h2>
        </motion.div>

        {/* 代表プロフィール */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 grid gap-12 border-t border-sequoia-black/10 pt-16 md:mb-28 md:grid-cols-[280px_1fr] md:gap-16 md:pt-20"
        >
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-sequoia-green">代表取締役</p>
            <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-sm border border-sequoia-black/10 shadow-[0_24px_60px_-20px_rgba(15,42,30,0.18)]">
              <Image
                src="/images/ceo-photo.png"
                alt="代表取締役 松井歩武の写真"
                fill
                className="object-cover"
                sizes="280px"
              />
            </div>
            <p className="mt-6 text-2xl font-bold tracking-tight text-sequoia-black">松井 歩武</p>
            <p className="mt-1 text-sm text-sequoia-black/70">Ayumu Matsui</p>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-sequoia-green">プロフィール</p>
            <div className="space-y-5 text-sm leading-relaxed text-sequoia-black/85 md:text-base">
              <p>
                慶應義塾大学商学部卒業。学生時代にベンチャーキャピタルでインターンを経験。
              </p>
              <p>
                卒業後はYCP Japan（YCP Solidiance）にてコンサルタントとして従事。その後、エンタメ領域のスタートアップで事業責任者を歴任。
              </p>
              <p>2026年、株式会社Amberを創業、代表取締役CEOに就任。</p>
            </div>
          </div>
        </motion.div>

        {/* 会社概要 + 沿革 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 border-t border-sequoia-black/10 pt-16 md:grid-cols-[1fr_2fr] md:gap-16 md:pt-20"
        >
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-sequoia-green">会社概要</p>
            <h3 className="text-2xl font-bold tracking-tight text-sequoia-black md:text-3xl">
              基本情報・沿革
            </h3>
          </div>

          <div>
            {/* 会社概要 dl */}
            <dl className="mb-12 divide-y divide-sequoia-black/10 border-y border-sequoia-black/10">
              {profile.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 py-5 md:grid-cols-[160px_1fr] md:gap-6"
                >
                  <dt className="text-xs font-bold tracking-wider text-sequoia-black/55 md:text-sm">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-sequoia-black md:text-base">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* 所在地 */}
            <div>
              <p className="mb-5 text-xs font-bold tracking-wider text-sequoia-black/55 md:text-sm">
                所在地
              </p>
              <p className="mb-5 text-sm leading-relaxed text-sequoia-black md:text-base">
                〒105-0001<br />
                東京都港区虎ノ門３丁目１−１ 2階
              </p>
              <div className="aspect-video w-full overflow-hidden rounded-sm border border-sequoia-black/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.272102022718!2d139.74549487532356!3d35.66782333118949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b907611ec51%3A0xc3124847e30773d3!2z44CSMTA1LTAwMDEg5p2x5Lqs6YO95riv5Yy66JmO44OO6ZaA77yT5LiB55uu77yR4oiS77ke!5e0!3m2!1sja!2sjp!4v1714710000000!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="株式会社Amber 所在地"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
