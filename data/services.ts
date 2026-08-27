import { offerings, supportMethod } from '@/data/offerings'

export const aiSolutionPage = {
  meta: {
    title: '生成AI導入・活用支援｜AIエージェント・業務システム開発',
    description:
      '企業の生成AI活用を、導入から業務実装・運用改善まで。Copilot・Gemini対応、AIエージェント・業務システム開発、定着支援まで一つのチームで進めます。',
    ogTitle: '生成AIの導入から、業務実装、運用改善まで｜株式会社Amber',
  },
  hero: {
    eyebrow: 'AI & Software',
    headingLines: ['Technology for Essential Industries.'] as const,
    body: '製造・設備・建設・物流など、社会を支える産業の変革をAIとソフトウェアで実装します。',
    primaryCta: '相談する',
    secondaryCta: 'Workを見る',
    secondaryHref: '/cases',
  },
  challenges: {
    headingLines: ['AIを導入しても、', '業務は自然には変わりません。'] as const,
    items: [
      '何から着手すべきか決められない',
      '研修を実施しても実務利用につながらない',
      '汎用AIだけでは個社業務を完結できない',
      '開発後の運用・改善を担う人がいない',
    ],
  },
  services: {
    headingLines: ['導入から実装〜定着まで'] as const,
    lead: '活用テーマの発掘から実装・改善まで、一つのチームで進めます。',
    items: offerings,
  },
  environments: {
    heading: '対応できる業務環境',
    lead: 'Copilot、Gemini、独自AIに対応します。',
  },
  process: {
    headingLines: ['共通の進め方'] as const,
    lead: '業務理解から定着まで、同じ流れで進めます。',
    stages: [
      {
        title: '現状理解',
        customer: '課題・現状の共有',
        amber: '業務ヒアリングと整理',
      },
      {
        title: '優先テーマ決定',
        customer: '意思決定・優先順位の確認',
        amber: 'テーマ選定と進め方の提示',
      },
      {
        title: '研修・プロトタイプ',
        customer: '現場での試行・フィードバック',
        amber: '研修設計と試作の伴走',
      },
      {
        title: '実装・業務組み込み',
        customer: '運用ルールの合意・現場適用',
        amber: 'システム実装と業務フロー設計',
      },
      {
        title: '定着・横展開',
        customer: '利用推進・効果の確認',
        amber: '定着支援と改善・展開',
      },
    ],
  },
  method: supportMethod,
  faq: [
    {
      q: '何から相談すればよいですか',
      a: '具体的な計画が決まっていなくても構いません。現在の課題や取り組み状況を伺い、最初に検討すべきテーマを一緒に整理します。',
    },
    {
      q: '研修だけでも依頼できますか',
      a: '可能です。実務利用につながる設計を推奨しています。研修後の活用テーマ整理まで含めたご相談も受け付けています。',
    },
    {
      q: '開発だけでも依頼できますか',
      a: '可能です。一方で、現場で使われ続ける状態まで見据えた業務設計・定着支援との組み合わせを推奨しています。',
    },
    {
      q: '現場伴走型支援（FDE）とは何ですか',
      a: '独立したサービスではなく、導入・開発・定着の各フェーズに横断して入る支援の進め方です。現場に入り、何をつくるべきかから検証しながら進めます。',
    },
    {
      q: 'Microsoft 365 CopilotやGeminiにも対応できますか',
      a: '対応できます。利用中の環境や業務に合わせて、導入・活用、実装、定着を設計します。',
    },
    {
      q: '情報システム部門との調整も支援できますか',
      a: '可能です。既存のIT環境・権限・運用ルールを前提に、現場と情報システム部門の双方が進めやすい形で設計します。',
    },
    {
      q: 'どの程度の期間が必要ですか',
      a: 'テーマにより異なります。研修中心なら数週間、システム実装を含む場合は数ヶ月が目安です。ヒアリング後に進め方をご提案します。',
    },
    {
      q: '費用はどのように決まりますか',
      a: '内容と支援範囲に応じて個別見積となります。まずは課題と希望範囲を伺い、進め方とあわせてご案内します。',
    },
    {
      q: '小規模な実証から開始できますか',
      a: '可能です。小さく試し、成果が見えた領域から広げる進め方を基本としています。',
    },
    {
      q: '人材開発支援助成金は使えますか',
      a: '研修プログラムは、要件を満たす場合に人材開発支援助成金の対象となる可能性があります。補助率・補助額は企業規模や訓練内容により異なります。詳細はお問い合わせください。',
    },
  ],
  finalCta: {
    headingLines: ['Technology for Essential Industries.'] as const,
    body: '業務やシステムの課題からご相談ください。',
    cta: 'Talk to Amber',
  },
} as const

export const companyPage = {
  hero: {
    headingLines: ['Technology for Essential Industries.'] as const,
    body: '暮らしを支える産業に、最新のテクノロジーを。',
  },
  mission: {
    headingLines: ['Technology for Essential Industries.'] as const,
    paragraphs: [
      '日本の暮らしを支えているのは、製造、建設、設備、物流をはじめとする多くの産業です。',
      'その現場には、高い専門性と長年蓄積された知識がある一方、紙や表計算、分断されたシステム、属人的な業務も数多く残っています。',
      'Amberは、AIとソフトウェアを現場に実装し、これらの産業を次の時代へ進めます。',
    ],
  },
  principles: [
    { title: 'Start from the Field.', description: '現場の業務と制約を起点に、使える形へ落とし込みます。' },
    { title: 'Build, Don’t Just Advise.', description: '提案だけで終わらせず、実装まで進めます。' },
    { title: 'Integrate, Don’t Add.', description: 'ツールを増やすのではなく、業務に組み込みます。' },
    { title: 'Learn and Compound.', description: '現場で得た知見を、次の実装の質向上につなげます。' },
  ],
  representative: {
    name: '松井 歩武',
    title: '代表取締役',
    photo: '/images/ceo-photo.png',
    bio: [
      '慶應義塾大学商学部卒業。学生時代にベンチャーキャピタルでインターンを経験。',
      '卒業後はYCP Japan（YCP Solidiance）にてコンサルタントとして従事。その後、エンタメ領域のスタートアップで事業責任者を歴任。',
      '2026年、株式会社Amberを創業。製造・設備・現場サービスを中心に、AI・ソフトウェアを活用した企業の業務変革に取り組む。',
    ],
  },
  profile: [
    { label: '会社名', value: '株式会社Amber' },
    { label: '代表取締役', value: '松井 歩武' },
    { label: '設立', value: '2026年' },
    {
      label: '事業内容',
      value:
        'Essential Industries向けの業務変革、AI・業務システムの設計開発、データ・既存システム連携／プロダクト事業（訪問サービス向け業務管理「Pine」）',
    },
    { label: '取引銀行', value: 'GMOあおぞらネット銀行、三井住友銀行' },
    { label: '所在地', value: '〒105-0001 東京都港区虎ノ門３丁目１−１ 2階' },
  ],
} as const

export const contactPage = {
  hero: {
    headingLines: ['一緒に整理します。'] as const,
    body: '内容が固まっていなくても構いません。業務やシステムの課題からご相談ください。',
  },
  topics: [
    '業務変革・業務設計',
    'AI・業務システムの設計開発',
    'データ・既存システム連携',
    '消防設備・点検業務基盤',
    '協業・紹介',
  ],
  steps: [
    { title: 'フォーム送信', description: '相談内容を送る' },
    { title: 'Amberから連絡', description: '内容を確認して返信' },
    { title: 'ヒアリング', description: '課題と現状を伺う' },
    { title: '進め方の提案', description: '着手テーマを整理' },
  ],
} as const
