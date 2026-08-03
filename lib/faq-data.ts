export type FaqItem = {
  question: string
  answer: string
}

export type FaqCategory = {
  id: string
  title: string
  items: FaqItem[]
}

export const faqCategories: FaqCategory[] = [
  {
    id: 'general',
    title: '支援全般',
    items: [
      {
        question: 'Amberはどのような企業向けのサービスですか？',
        answer:
          '企業の生成AI活用を、導入から業務実装・運用改善まで支援しています。製造・化学、建設・設備・保守など、現場業務を持つ企業を中心に、Copilot・Geminiの活用からAIエージェント・業務システム開発まで対応します。',
      },
      {
        question: '何から相談すればよいですか？',
        answer:
          '具体的な計画が決まっていなくても構いません。現在の課題や取り組み状況を伺い、最初に検討すべきテーマを一緒に整理します。',
      },
      {
        question: '対応エリアはどこですか？',
        answer:
          'オンラインと対面を組み合わせて全国対応しています。現場訪問が必要な場合は、事前にスケジュールを調整します。',
      },
    ],
  },
  {
    id: 'training',
    title: 'AI研修',
    items: [
      {
        question: '研修だけでも依頼できますか？',
        answer:
          '可能です。ただしAmberは実務利用につながる設計を推奨しています。単発のご相談もお気軽にどうぞ。',
      },
      {
        question: 'Microsoft 365 CopilotやGeminiにも対応できますか？',
        answer:
          '対応できます。利用中の環境や業務に合わせて、研修・実装・定着を設計します。',
      },
    ],
  },
  {
    id: 'development',
    title: 'システム開発',
    items: [
      {
        question: '開発だけでも依頼できますか？',
        answer:
          '可能です。一方で、現場で使われ続ける状態まで見据えた業務設計・定着支援との組み合わせを推奨しています。',
      },
      {
        question: '導入までの期間の目安は？',
        answer:
          'プログラム単体であれば数週間、システム構築を含む場合は数ヶ月が目安です。現状ヒアリング後にロードマップをご提案します。',
      },
    ],
  },
  {
    id: 'pricing',
    title: '契約・費用',
    items: [
      {
        question: '費用はどのように決まりますか？',
        answer:
          '内容と支援範囲に応じて個別見積となります。まずは課題と希望範囲を伺い、進め方とあわせてご案内します。',
      },
      {
        question: '人材開発支援助成金は使えますか？',
        answer:
          'Amberの研修プログラムは、要件を満たす場合に人材開発支援助成金の対象となる可能性があります。補助率・補助額は企業規模や訓練内容により異なります。',
      },
      {
        question: '助成金の申請手続きはサポートしてもらえますか？',
        answer:
          '申請手続きは提携社労士をご紹介します。要件確認から申請まで、必要に応じてサポートします。',
      },
    ],
  },
  {
    id: 'security',
    title: 'セキュリティ',
    items: [
      {
        question: '情報システム部門との調整も支援できますか？',
        answer:
          '可能です。既存のIT環境・権限・運用ルールを前提に、現場と情報システム部門の双方が進めやすい形で設計します。',
      },
      {
        question: '機密情報の扱いはどうなりますか？',
        answer:
          '扱う情報の範囲と権限を整理し、既存のルールを前提に安全に使える形で進めます。詳細は個別にご相談ください。',
      },
    ],
  },
  {
    id: 'pine',
    title: 'プロダクト（Pine）',
    items: [
      {
        question: 'Pineとは何ですか？',
        answer:
          '出張訪問サービス向けの予約・顧客管理ソフトウェアです。詳細はPine公式サイト（pine-home.com）をご覧ください。',
      },
      {
        question: 'Pineの詳細はどこで確認できますか？',
        answer:
          'Pine公式サイト（pine-home.com）をご覧ください。導入相談はAmberのお問い合わせフォームからも受け付けています。',
      },
    ],
  },
]
