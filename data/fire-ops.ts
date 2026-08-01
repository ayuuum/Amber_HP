export const fireOpsPage = {
  meta: {
    title: '消防設備会社向け 点検・補修案件管理システム',
    description:
      '消防設備点検から補修見積、承認、顧客確認、補修工事、請求依頼までを一元管理。紙・Excel・既存システムを残しながら、消防設備会社の業務に合わせて段階的に導入します。',
    ogTitle: '消防設備会社向け 点検・補修案件管理システム｜株式会社Amber',
    productName: 'Amber FireOps',
    path: '/fire-ops',
  },
  label: '消防設備会社のための点検・補修案件管理システム',
  hero: {
    headline: ['点検から修繕・請求まで、', 'ひとつの案件でつなぐ。'],
    lead: '紙の回付、Excelへの転記、修繕決定の共有漏れ、請求の遅れ。点検後に部門をまたいで止まる仕事を、御社の運用に合わせて一本化します。',
    primaryCta: '3分で業務の詰まりを診断する',
    secondaryCta: '30分相談する',
    note: '現在の点検アプリや会計ソフトを残したまま、必要な範囲から導入できます。',
  },
  nav: [
    { label: 'できること', href: '#features' },
    { label: '導入後の流れ', href: '#flow' },
    { label: '導入方法', href: '#process' },
    { label: 'よくある質問', href: '#faq' },
  ] as const,
  problems: {
    headline: ['点検が終わっても、', '仕事は終わっていません。'],
    items: [
      '不備内容を紙で営業部へ回している',
      '修繕が決まっても関係部署へ共有されない',
      '見積や顧客回答の進捗が担当者しか分からない',
      '未処理案件を毎朝、目視で確認している',
      '点検から請求まで1〜2か月以上かかる',
      '同じ情報を複数のシステムへ入力している',
    ],
  },
  flow: {
    headline: ['点検から請求までを、', 'ひとつの案件として管理。'],
    description: '各工程の状態、担当者、期限、次の対応を一画面で把握できます。',
    steps: [
      { label: '点検・不備登録', owner: '点検担当', next: '不備内容を共有' },
      { label: '補修見積', owner: '営業', next: '見積作成' },
      { label: '社内承認', owner: '管理者', next: '承認確認' },
      { label: '顧客確認', owner: '営業', next: '回答待ち' },
      { label: '補修工事', owner: '工事担当', next: '日程調整' },
      { label: '完了報告', owner: '工事担当', next: '報告書作成' },
      { label: '請求依頼', owner: '経理連携', next: '請求データ作成' },
      { label: '会計処理済み', owner: '経理', next: '完了' },
    ],
  },
  features: {
    id: 'features',
    headline: 'できること',
    items: [
      {
        number: '01',
        title: '点検・補修案件を一元管理',
        description:
          '点検結果、不備、見積、承認、補修、請求状況を、物件・案件単位でまとめて管理します。',
        mock: 'cases' as const,
      },
      {
        number: '02',
        title: 'スマートフォンから状況を更新',
        description: '外出先から修繕決定、顧客回答、補修完了などを登録。社内への電話や伝言を減らします。',
        mock: 'mobile' as const,
      },
      {
        number: '03',
        title: '止まっている案件を自動で通知',
        description:
          '期限超過、担当者未設定、顧客回答待ち、請求未処理など、対応が必要な案件を一覧化します。',
        mock: 'alerts' as const,
      },
      {
        number: '04',
        title: '物件台帳と履歴を蓄積',
        description: '物件情報、過去の点検、不備、補修、見積、写真、報告書を一つの台帳から確認できます。',
        mock: 'ledger' as const,
      },
      {
        number: '05',
        title: '帳票作成と転記を削減',
        description: '案件データをもとに、見積書、補修報告書、請求依頼などの下書きを作成します。',
        mock: 'docs' as const,
      },
      {
        number: '06',
        title: '経営状況を見える化',
        description: '滞留案件、未請求案件、補修見積、受注状況、担当者別の進捗をダッシュボードで確認できます。',
        mock: 'dashboard' as const,
      },
    ],
  },
  beforeAfter: {
    headline: '毎日の仕事は、こう変わります。',
    rows: [
      { item: '案件管理', before: '紙・Excel・複数システムに分散', after: '1つの案件画面へ集約' },
      { item: '修繕決定', before: '電話・口頭・紙で共有', after: 'スマホで更新し関係者へ共有' },
      { item: '進捗確認', before: '担当者へ聞かないと分からない', after: '状態・担当者・期限を一覧表示' },
      { item: '未処理確認', before: '毎朝、人が目視で確認', after: '滞留案件を自動表示' },
      { item: '帳票作成', before: '同じ情報を繰り返し入力', after: '案件データから下書き作成' },
      { item: '請求依頼', before: '紙を経理へ回付', after: '補修完了から請求依頼へ接続' },
      { item: '経営管理', before: '全体状況が分からない', after: '未請求・滞留・受注状況を可視化' },
    ],
  },
  integration: {
    headline: 'すべてを一度に捨てる必要はありません。',
    description:
      '既存の点検アプリや会計ソフトを残しながら、情報が分断されている工程から順に接続できます。最初から全面刷新せず、効果の大きい範囲から段階的に導入します。',
    nodes: [
      { id: 'inspection', label: '現場の点検アプリ' },
      { id: 'excel', label: 'Excel・物件台帳' },
      { id: 'fireops', label: 'Amber FireOps', center: true },
      { id: 'accounting', label: '会計ソフト' },
      { id: 'calendar', label: 'カレンダー・メール' },
    ],
  },
  semiCustom: {
    headline: ['パッケージに業務を合わせるのではなく、', '御社の仕事に合わせて組み立てます。'],
    description:
      '消防設備会社ごとに、点検の進め方、帳票、承認、担当部門、既存システムは異なります。共通機能をベースに、必要な画面、項目、権限、通知、帳票、外部連携を組み合わせて導入します。',
    layers: [
      {
        title: '共通機能',
        items: ['案件', '物件', '担当者', 'ステータス', '通知', '履歴'],
      },
      {
        title: '個社設定',
        items: ['業務フロー', '権限', '帳票', '承認ルール'],
      },
      {
        title: '個別連携',
        items: ['既存システム', '会計', 'カレンダー', 'メール'],
      },
    ],
  },
  approach: {
    headline: '消防設備会社の実際の業務をもとに設計しています。',
    body: 'Amberでは、消防設備会社への業務ヒアリングを通じて、点検後の紙回付、複数システムへの二重入力、修繕決定の共有漏れ、請求の遅れを整理しています。システムを先に押し付けるのではなく、現在の業務と帳票を確認し、何を残し、どこを変えるかから設計します。',
  },
  process: {
    id: 'process',
    headline: '小さく始め、現場で確かめながら広げます。',
    steps: [
      {
        number: '01',
        title: '相談',
        description: '現在の業務、利用ツール、困っている工程を確認します。',
      },
      {
        number: '02',
        title: '業務を見せてもらう',
        description: '実際の帳票、Excel、システム、紙の流れを見ながら、詰まりを整理します。',
      },
      {
        number: '03',
        title: '最初の範囲を決める',
        description: '効果が大きく、導入しやすい工程を一つ選びます。',
      },
      {
        number: '04',
        title: '設計・開発',
        description: '現在の業務を止めない方法で、最小構成を実装します。',
      },
      {
        number: '05',
        title: '現場検証・拡張',
        description: '実際に使用し、分かったことを修正しながら対象を広げます。',
      },
    ],
  },
  kpis: {
    headline: ['削減時間だけでなく、', '売上と請求まで確認します。'],
    note: '業務診断時に現在の数値を確認し、導入後に追う指標を一緒に決めます。',
    sampleLabel: '開発イメージ（サンプル）',
    items: [
      { label: '点検から請求依頼までの日数', sample: '—' },
      { label: '未処理・滞留案件数', sample: '—' },
      { label: '二重入力・転記回数', sample: '—' },
      { label: '補修見積の提出件数', sample: '—' },
      { label: '未請求案件数', sample: '—' },
      { label: '補修見積から受注への転換率', sample: '—' },
    ],
  },
  diagnosis: {
    id: 'diagnosis',
    headline: ['点検から請求まで、', 'どこで仕事が止まっているか診断します。'],
    description:
      '現在の件数と管理方法をもとに、最初に見直すべき工程を整理し、3営業日以内にメールでお返しします。',
    submitLabel: '無料で業務診断を依頼する',
    successTitle: 'ご依頼ありがとうございます。',
    successBody:
      '入力内容を確認し、3営業日以内に診断結果または確認事項をメールでご連絡します。',
    monthlyVolume: [
      { value: 'under-20', label: '〜20件' },
      { value: '21-100', label: '21〜100件' },
      { value: '101-300', label: '101〜300件' },
      { value: '301-plus', label: '301件以上' },
      { value: 'unknown', label: '分からない' },
    ],
    managementMethods: [
      { value: 'paper', label: '紙' },
      { value: 'excel', label: 'Excel' },
      { value: 'inspection-app', label: '点検アプリ' },
      { value: 'onprem', label: 'オンプレミスシステム' },
      { value: 'cloud', label: 'クラウドシステム' },
      { value: 'verbal', label: '口頭・電話' },
      { value: 'other', label: 'その他' },
    ],
    bottleneckSteps: [
      { value: 'schedule', label: '点検予定・担当者調整' },
      { value: 'report', label: '点検結果・報告書作成' },
      { value: 'estimate', label: '不備・補修見積' },
      { value: 'approval', label: '社内承認' },
      { value: 'customer', label: '顧客確認' },
      { value: 'repair', label: '補修工事' },
      { value: 'completion', label: '完了報告' },
      { value: 'billing', label: '請求依頼' },
      { value: 'overview', label: '全体の進捗確認' },
    ],
    cycleTime: [
      { value: 'within-1w', label: '1週間以内' },
      { value: 'within-2w', label: '2週間以内' },
      { value: 'within-1m', label: '1か月以内' },
      { value: 'over-1m', label: '1か月以上' },
      { value: 'unknown', label: '把握できていない' },
    ],
  },
  faq: {
    id: 'faq',
    items: [
      {
        question: '紙とExcel中心でも導入できますか？',
        answer:
          'はい。すべてを一度に置き換えず、現在の運用を確認したうえで、変更しやすい工程から導入できます。',
      },
      {
        question: '現在使っている点検アプリは廃止する必要がありますか？',
        answer:
          '必ずしも必要ありません。既存の点検アプリを残し、点検後の見積、承認、補修、請求管理から接続する方法も検討できます。',
      },
      {
        question: 'オンプレミスシステムの刷新も相談できますか？',
        answer:
          '相談できます。既存システム、データ、ソースコード、帳票、利用環境を確認し、段階移行と全面再構築を比較します。',
      },
      {
        question: '費用はどのくらいですか？',
        answer:
          '対象業務、利用人数、データ移行、外部連携、必要な帳票によって変わります。業務診断後に、対象範囲を分けてお見積りします。',
      },
      {
        question: '導入までどのくらいかかりますか？',
        answer:
          '対象範囲によって異なります。最初から全面刷新せず、効果を確認しやすい最小範囲から開始します。',
      },
      {
        question: '仕様書がなくても相談できますか？',
        answer: 'はい。現在の帳票や業務を見ながら、何をつくるべきかから一緒に整理します。',
      },
    ],
  },
  finalCta: {
    headline: ['点検後に止まっている仕事を、', '一緒に整理しませんか。'],
    body: '完成した要件書は必要ありません。現在使っている帳票やExcelを見ながら、最初に改善する工程を整理します。',
    primaryCta: '3分で業務の詰まりを診断する',
    secondaryCta: '30分相談する',
  },
  dashboardMock: {
    badge: '開発イメージ',
    stats: [
      { label: '未処理案件', value: '12件' },
      { label: '請求待ち', value: '7件' },
      { label: '期限超過', value: '3件' },
      { label: '今月の補修見積', value: '24件' },
    ],
    cases: [
      {
        property: '中央オフィスビル',
        status: '報告書作成中',
        owner: '佐藤',
        updated: '今日 09:14',
        next: '報告書提出',
      },
      {
        property: 'みなみ物流センター',
        status: '補修見積待ち',
        owner: '田中',
        updated: '昨日 16:40',
        next: '見積作成',
      },
      {
        property: '県央クリニック',
        status: '社内承認待ち',
        owner: '鈴木',
        updated: '昨日 11:20',
        next: '承認確認',
      },
      {
        property: '松ヶ丘マンション',
        status: '顧客確認中',
        owner: '高橋',
        updated: '2日前',
        next: '顧客回答待ち',
      },
      {
        property: '駅前商業施設A棟',
        status: '補修予定',
        owner: '伊藤',
        updated: '3日前',
        next: '工事日程確定',
      },
      {
        property: '緑ヶ丘倉庫',
        status: '請求待ち',
        owner: '渡辺',
        updated: '4日前',
        next: '請求依頼作成',
      },
    ],
  },
} as const

export type FireOpsFeatureMock = (typeof fireOpsPage.features.items)[number]['mock']
