import Link from 'next/link'
import { buildContactHref } from '@/lib/contact'

export default function Footer() {
  const year = new Date().getFullYear()
  const footerLinkClass =
    'rounded-sm text-on-dark-muted transition-[color,background-color] duration-brand hover:bg-white/8 hover:text-[color:var(--color-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35'

  return (
    <footer className="border-t border-white/15 bg-sequoia-black text-[color:var(--color-cream)]">
      <div className="section-pad mx-auto max-w-6xl !py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center" aria-label="株式会社Amber">
              <span className="font-logo text-[2rem] leading-none text-[color:var(--color-cream)]">Amber</span>
            </Link>
            <p className="text-body mt-3 text-on-dark-muted">
              暮らしを支える産業に、テクノロジーを。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            <div className="space-y-3">
              <p className="font-semibold text-[color:var(--color-cream)]">サービス</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/service/ai-solution" className={footerLinkClass}>
                    AIソリューション
                  </Link>
                </li>
                <li>
                  <a
                    href="https://pine-home.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    AI SaaS（Pine）
                    <span className="sr-only">（新しいタブで開く）</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="font-semibold text-[color:var(--color-cream)]">情報</p>
              <ul className="space-y-2">
                <li>
                  <Link href="/company" className={footerLinkClass}>
                    企業情報
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className={footerLinkClass}>
                    ニュース
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className={footerLinkClass}>
                    よくある質問
                  </Link>
                </li>
                <li>
                  <Link href={buildContactHref('footer')} className={footerLinkClass}>
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={footerLinkClass}>
                    プライバシー
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={footerLinkClass}>
                    利用規約
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 text-caption text-on-dark-subtle md:flex-row md:items-center md:justify-between">
          <p>© {year} 株式会社Amber. All rights reserved.</p>
          <a
            href="mailto:ayumu.matsui@amber-inc.com"
            className="transition-colors duration-brand hover:text-[color:var(--color-cream)]"
          >
            ayumu.matsui@amber-inc.com
          </a>
        </div>
      </div>
    </footer>
  )
}
