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
    title: 'サービス全般',
    items: [
      {
        question: 'Amberはどのような企業向けのサービスですか？',
        answer:
          '暮らしを支える産業（ハウスクリーニング、消防設備点検、素材・化学など）の中小〜中堅企業を主な対象としています。現場の業務を理解した上で、AI導入から定着まで伴走します。',
      },
      {
        question: '研修だけ、開発だけの依頼も可能ですか？',
        answer:
          '可能です。ただしAmberは「使える・回る・残る」の3段階で業務全体を見ることを推奨しています。単発のご相談もお気軽にどうぞ。',
      },
      {
        question: '対応エリアはどこですか？',
        answer:
          'オンラインと対面を組み合わせて全国対応しています。現場訪問が必要な場合は、事前にスケジュールを調整します。',
      },
    ],
  },
  {
    id: 'ai-solution',
    title: 'AIソリューション',
    items: [
      {
        question: 'AIソリューションには何が含まれますか？',
        answer:
          '全社員向けのAI定着プログラム、業務プロセスの再設計・実装、業務システム・AIエージェント構築まで、一気通貫で提供します。詳細はサービスページをご覧ください。',
      },
      {
        question: '導入までの期間の目安は？',
        answer:
          'プログラム単体であれば数週間、システム構築を含む場合は数ヶ月が目安です。現状ヒアリング後にロードマップをご提案します。',
      },
    ],
  },
  {
    id: 'subsidy',
    title: '助成金',
    items: [
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
    id: 'pine',
    title: 'Pine（AI SaaS）',
    items: [
      {
        question: 'Pineとは何ですか？',
        answer:
          '出張訪問サービス向けの予約・顧客管理ソフトウェアです。個社支援で見えた共通課題をSaaSとして提供しています。',
      },
      {
        question: 'Pineの詳細はどこで確認できますか？',
        answer:
          'Pine公式サイト（pine-home.com）をご覧ください。導入相談はAmberのお問い合わせフォームからも受け付けています。',
      },
    ],
  },
]
