import type { ReactNode } from 'react'
import type { FireOpsFeatureMock } from '@/data/fire-ops'

type Props = {
  type: FireOpsFeatureMock
}

export default function FeatureMock({ type }: Props) {
  switch (type) {
    case 'cases':
      return (
        <MockShell title="案件一覧">
          <div className="divide-y divide-sequoia-black/8 border border-sequoia-black/8 bg-white">
            {['中央オフィスビル · 顧客確認中', 'みなみ物流センター · 見積待ち', '県央クリニック · 承認待ち'].map(
              (line) => (
                <div key={line} className="px-2.5 py-1.5 text-[10px] text-sequoia-black/80">
                  {line}
                </div>
              ),
            )}
          </div>
        </MockShell>
      )
    case 'mobile':
      return (
        <MockShell title="現場更新">
          <div className="border border-sequoia-black/10 bg-white p-2">
            <div className="bg-brand-green px-2 py-1.5 text-center text-[10px] text-white">補修完了を登録</div>
            <div className="mt-2 space-y-1">
              <div className="h-1 rounded-sm bg-neutral-200" />
              <div className="h-1 w-4/5 rounded-sm bg-neutral-200" />
            </div>
          </div>
        </MockShell>
      )
    case 'alerts':
      return (
        <MockShell title="要対応">
          <ul className="divide-y divide-sequoia-black/8 border border-sequoia-black/8 bg-white text-[10px]">
            <li className="flex items-center justify-between px-2.5 py-1.5 text-[#8B3A35]">
              <span>期限超過</span>
              <span className="font-medium">3</span>
            </li>
            <li className="flex items-center justify-between px-2.5 py-1.5 text-[#8A5A12]">
              <span>顧客回答待ち</span>
              <span className="font-medium">5</span>
            </li>
            <li className="flex items-center justify-between px-2.5 py-1.5 text-[#1F5F7A]">
              <span>請求未処理</span>
              <span className="font-medium">7</span>
            </li>
          </ul>
        </MockShell>
      )
    case 'ledger':
      return (
        <MockShell title="物件台帳">
          <div className="border border-sequoia-black/8 bg-white p-2.5">
            <p className="text-[10px] font-medium text-sequoia-black">松ヶ丘マンション</p>
            <p className="mt-1 text-[10px] text-secondary">点検履歴 4 · 補修 2 · 写真 18</p>
            <div className="mt-2 grid grid-cols-3 gap-1">
              <div className="aspect-square bg-neutral-100" />
              <div className="aspect-square bg-neutral-100" />
              <div className="aspect-square bg-neutral-100" />
            </div>
          </div>
        </MockShell>
      )
    case 'docs':
      return (
        <MockShell title="帳票下書き">
          <div className="divide-y divide-sequoia-black/8 border border-sequoia-black/8 bg-white">
            {['見積書ドラフト', '補修報告書', '請求依頼メモ'].map((doc) => (
              <div key={doc} className="flex items-center justify-between px-2.5 py-1.5 text-[10px]">
                <span>{doc}</span>
                <span className="text-brand-green">作成可</span>
              </div>
            ))}
          </div>
        </MockShell>
      )
    case 'dashboard':
      return (
        <MockShell title="経営ダッシュボード">
          <div className="grid grid-cols-2 border border-sequoia-black/8 bg-white">
            {[
              ['滞留', '8'],
              ['未請求', '7'],
              ['見積', '24'],
              ['受注', '11'],
            ].map(([label, value], index) => (
              <div
                key={label}
                className={`px-2 py-1.5 text-center ${index % 2 === 1 ? 'border-l border-sequoia-black/8' : ''} ${
                  index >= 2 ? 'border-t border-sequoia-black/8' : ''
                }`}
              >
                <p className="text-[9px] text-secondary">{label}</p>
                <p className="text-sm font-medium text-sequoia-black">{value}</p>
              </div>
            ))}
          </div>
          <p className="mt-1.5 text-center text-[9px] text-secondary">開発イメージ</p>
        </MockShell>
      )
    default:
      return null
  }
}

function MockShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-off-white p-3" aria-hidden="true">
      <p className="mb-2 text-[10px] font-medium text-secondary">{title}</p>
      {children}
    </div>
  )
}
