import { offerings, supportMethod } from '@/data/offerings'

export const aiSolutionPage = {
  meta: {
    title: 'Business Transformation｜AI & Software｜Data & Integration',
    description:
      '暮らしを支える産業の業務変革を、AIとソフトウェアで実装。業務設計、AI・業務システム開発、データ連携まで一つのチームで進めます。',
    ogTitle: 'Technology for Essential Industries.｜株式会社Amber',
  },
  hero: {
    eyebrow: 'What we do',
    headingLines: ['Technology for Essential Industries.'] as const,
    body: '製造・設備・建設・物流など、社会を支える産業の変革をAIとソフトウェアで実装します。業務を理解し、再設計し、現場に組み込みます。',
    primaryCta: 'Talk to Amber',
    secondaryCta: 'Our Work',
    secondaryHref: '/cases',
  },
  challenges: {
    headingLines: ['ツールを入れても、', '業務は自然には変わりません。'] as const,
    items: [
      '何から着手すべきか決められない',
      '現場の業務とシステムが分断されている',
      '汎用ツールだけでは個社業務を完結できない',
      '実装後の運用・改善を担う体制がない',
    ],
  },
  services: {
    headingLines: ['From Operations to Software.'] as const,
    lead: '業務理解から実装・改善まで、一つのチームで進めます。',
    items: offerings,
  },
  environments: {
    heading: '対応できる業務環境',
    lead: '必要に応じて、主要プラットフォームと既存システムへの対応も行います。',
  },
  process: {
    headingLines: ['共通の進め方'] as const,
    lead: '業務理解から実装・展開まで、同じ流れで進めます。',
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
        title: '試作・検証',
        customer: '現場での試行・フィードバック',
        amber: '小さく試し、方向を固める',
      },
      {
        title: '実装・業務組み込み',
        customer: '運用ルールの合意・現場適用',
        amber: 'システム実装と業務フロー設計',
      },
      {
        title: '展開・改善',
        customer: '利用推進・効果の確認',
        amber: '定着と改善・横展開',
      },
    ],
  },
  method: supportMethod,
  faq: [
    {
      q: '何から相談すればよいですか',
      a: '具体的な計画が決まっていなくても構いません。現在の課題や業務の状況を伺い、最初に検討すべきテーマを一緒に整理します。',
    },
    {
      q: '研修だけでも依頼できますか',
      a: '可能です。ただし研修は手段の一つです。実務で使われる状態につながる設計を推奨しています。',
    },
    {
      q: '開発だけでも依頼できますか',
      a: '可能です。一方で、現場で使われ続ける状態まで見据えた業務設計との組み合わせを推奨しています。',
    },
    {
      q: '現場に入って進めるとはどういう意味ですか',
      a: '提案だけで終わらせず、業務理解から実装・改善まで現場に入って進めます。何をつくるべきかから検証しながら伴走します。',
    },
    {
      q: '既存のAIツールやシステムにも対応できますか',
      a: '対応できます。利用中の環境や業務に合わせて、設計・実装・連携を進めます。',
    },
    {
      q: '情報システム部門との調整も支援できますか',
      a: '可能です。既存のIT環境・権限・運用ルールを前提に、現場と情報システム部門の双方が進めやすい形で設計します。',
    },
    {
      q: 'どの程度の期間が必要ですか',
      a: 'テーマにより異なります。小さく試す場合は数週間、システム実装を含む場合は数ヶ月が目安です。ヒアリング後に進め方をご提案します。',
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
    brand: 'Amber',
    heading: 'Essential Industries × Technology.',
    subheading: '暮らしを支える産業に、最新のテクノロジーを。',
    body: '製造・設備・建設・物流など、社会を支える産業の変革を、AIとソフトウェアで実装しています。',
    image: '/images/about-mission-mountain.png',
    imageAlt: '霧に包まれた山並み',
    primaryCta: 'Talk to Amber',
    secondaryCta: 'Our Work',
    secondaryHref: '/cases',
  },
  mission: {
    lead: '暮らしを支える産業を、次の時代へ。',
    paragraphs: [
      '日本の暮らしを支えているのは、製造、建設、設備、物流をはじめとする多くの産業です。',
      'その現場には、高い専門性と長年蓄積された知識がある一方、紙や表計算、分断されたシステム、属人的な業務も数多く残っています。',
      'Amberは、AIとソフトウェアを現場に実装し、これらの産業を次の時代へ進めます。',
    ],
  },
  principles: {
    heading: 'How we work.',
    lead: '提案で終わらせず、現場に入り、実装まで進めます。',
    items: [
      { title: 'Start from the Field.', description: '現場の業務と制約を起点に、使える形へ落とし込みます。' },
      { title: 'Build, Don’t Just Advise.', description: '提案だけで終わらせず、実装まで進めます。' },
      { title: 'Integrate, Don’t Add.', description: 'ツールを増やすのではなく、業務に組み込みます。' },
      { title: 'Learn and Compound.', description: '現場で得た知見を、次の実装の質向上につなげます。' },
    ],
  },
  representative: {
    heading: 'Representative',
    name: '松井 歩武',
    title: '代表取締役',
    photo: '/images/ceo-photo.png',
    bio: [
      '慶應義塾大学商学部卒業。学生時代にベンチャーキャピタルでインターンを経験。',
      '卒業後はYCP Japan（YCP Solidiance）にてコンサルタントとして従事。その後、エンタメ領域のスタートアップで事業責任者を歴任。',
      '2026年、株式会社Amberを創業。製造・設備・現場サービスを中心に、AI・ソフトウェアを活用した企業の業務変革に取り組む。',
    ],
  },
  profile: {
    heading: 'Company',
    rows: [
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
  },
  cta: {
    heading: 'Technology for Essential Industries.',
    body: '業務やシステムの課題からご相談ください。',
    label: 'Talk to Amber',
  },
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
