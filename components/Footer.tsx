import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-deep-forest-green/95 text-white backdrop-blur-sm border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center" aria-label="株式会社Amber">
              <span className="text-2xl font-bold font-serif text-white tracking-wide">Amber</span>
            </Link>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">
              暮らしを支える人に、最新のテクノロジーを。
            </p>
          </div>

          <nav aria-label="フッターナビゲーション" className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
            <div className="space-y-3">
              <p className="text-white/90 font-semibold">サービス</p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="/service/consulting" className="hover:text-white transition-colors">
                    AI導入支援
                  </Link>
                </li>
                <li>
                  <Link href="/service/training" className="hover:text-white transition-colors">
                    法人向け生成AI研修
                  </Link>
                </li>
                <li>
                  <Link href="/service/saas" className="hover:text-white transition-colors">
                    ホームサービス向け業務システム
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-white/90 font-semibold">情報</p>
              <ul className="space-y-2 text-white/80">
                <li>
                  <Link href="/company" className="hover:text-white transition-colors">
                    会社情報
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-white transition-colors">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    プライバシー
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    利用規約
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-white/70">
          <p>© {year} 株式会社Amber. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
