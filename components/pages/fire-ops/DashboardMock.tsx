import { fireOpsPage } from '@/data/fire-ops'

const statusTone: Record<string, string> = {
  報告書作成中: 'bg-light-blue text-[#1F5F7A]',
  補修見積待ち: 'bg-[#F7F0E4] text-[#8A5A12]',
  社内承認待ち: 'bg-light-green text-brand-green',
  顧客確認中: 'bg-[#EEF2F8] text-[#3D4F6F]',
  補修予定: 'bg-[#E8F3EE] text-dark-green',
  補修完了: 'bg-neutral-100 text-neutral-700',
  請求待ち: 'bg-[#F6EBEA] text-[#8B3A35]',
}

export default function DashboardMock() {
  const { badge, stats, cases } = fireOpsPage.dashboardMock

  return (
    <div className="relative" aria-hidden="true">
      <div className="overflow-hidden rounded-sm border border-sequoia-black/12 bg-white">
        <div className="flex items-center justify-between border-b border-sequoia-black/8 bg-off-white px-4 py-2.5 md:px-5">
          <span className="text-xs font-medium text-sequoia-black/70">案件ダッシュボード</span>
          <span className="border border-sequoia-black/12 bg-white px-2 py-0.5 text-[10px] tracking-wider text-secondary">
            {badge}
          </span>
        </div>

        <div className="grid grid-cols-2 border-b border-sequoia-black/6 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-3 py-3 md:px-4 ${index % 2 === 1 ? 'border-l border-sequoia-black/6' : ''} ${
                index >= 2 ? 'border-t border-sequoia-black/6 sm:border-t-0' : ''
              } ${index >= 1 ? 'sm:border-l sm:border-sequoia-black/6' : ''}`}
            >
              <p className="text-[10px] text-secondary md:text-xs">{stat.label}</p>
              <p className="mt-1 text-base font-medium text-sequoia-black md:text-lg">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[560px] text-left text-xs">
            <thead className="bg-off-white/80 text-secondary">
              <tr>
                <th className="px-4 py-2.5 font-medium">物件名</th>
                <th className="px-3 py-2.5 font-medium">ステータス</th>
                <th className="px-3 py-2.5 font-medium">担当者</th>
                <th className="px-3 py-2.5 font-medium">最終更新</th>
                <th className="px-4 py-2.5 font-medium">次の対応</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((row) => (
                <tr key={row.property} className="border-t border-sequoia-black/6">
                  <td className="px-4 py-2.5 font-medium text-sequoia-black">{row.property}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${
                        statusTone[row.status] ?? 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-secondary">{row.owner}</td>
                  <td className="px-3 py-2.5 text-secondary">{row.updated}</td>
                  <td className="px-4 py-2.5 text-sequoia-black/80">{row.next}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="divide-y divide-sequoia-black/6 md:hidden">
          {cases.slice(0, 4).map((row) => (
            <li key={row.property} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-sequoia-black">{row.property}</p>
                <span
                  className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-medium ${
                    statusTone[row.status] ?? 'bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {row.status}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-secondary">
                {row.owner} · {row.updated} · 次: {row.next}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <p className="sr-only">点検・補修案件管理画面の開発イメージ。架空の物件名・ステータスを表示しています。</p>
    </div>
  )
}
