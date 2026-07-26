import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'
import { serviceMegaMenu, siteShell } from '@/data/navigation'

export default function Footer() {
  const year = new Date().getFullYear()
  const contactHref = buildContactHref('footer')
  const linkClass =
    'text-sm text-secondary transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 rounded-sm'

  return (
    <footer className="border-t border-sequoia-black/8 bg-off-white">
      <div className="home-container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label="株式会社Amber">
              <span className="font-logo text-[1.75rem] leading-none text-brand-green">Amber</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-secondary">{siteShell.brandTagline}</p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">サービス</p>
            <ul className="space-y-2.5">
              {serviceMegaMenu.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className={linkClass}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">情報</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/cases" className={linkClass}>
                  支援事例
                </Link>
              </li>
              <li>
                <Link href="/company" className={linkClass}>
                  会社情報
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  AI活用の知見
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  よくあるご質問
                </Link>
              </li>
              <li>
                <Link href={contactHref} className={linkClass}>
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-sequoia-black">プロダクト</p>
            <ul className="space-y-2.5">
              <li>
                <a href={siteShell.pineUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Pine
                  <span className="sr-only">（新しいタブで開く）</span>
                </a>
              </li>
            </ul>
            <p className="mb-4 mt-8 text-sm font-medium text-sequoia-black">法務</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className={linkClass}>
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  利用規約
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-sequoia-black/8 pt-6 text-xs text-secondary md:flex-row md:items-center md:justify-between">
          <p>© {year} 株式会社Amber. All rights reserved.</p>
          <Link href={contactHref} className="hover:text-brand-green">
            お問い合わせフォーム
          </Link>
        </div>
      </div>
    </footer>
  )
}
