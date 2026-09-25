import type { Locale } from './config'

const ja = {
  common: {
    companyName: '株式会社Amber',
    brandTagline: 'Technology for Essential Industries.',
    contact: 'Contact',
    whatWeDo: 'What we do',
    view: 'View',
    allWork: 'All Work',
    legal: 'Legal',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    tokushoho: '特定商取引法に基づく表記',
    security: 'Security',
    products: 'Products',
    contactForm: 'Contact',
    language: 'Language',
    ja: '日本語',
    en: 'English',
  },
  nav: {
    industries: 'Industries',
    work: 'Work',
    company: 'Company',
    services: 'Services',
    blog: 'Blog',
  },
  footer: {
    site: 'Site',
    resources: 'Resources',
    faq: 'FAQ',
    representative: 'Representative',
    fireOps: 'Fire Ops',
  },
  offerings: {
    adoption: {
      shortTitle: '業務変革・業務設計',
      description:
        '現場の業務、システム、データ、課題を整理し、AIとソフトウェアを前提に業務の流れそのものを再設計します。',
    },
    build: {
      shortTitle: 'AI・業務システムの設計開発',
      description:
        'AIエージェントや業務システム、既存システム連携を設計・開発し、現場の業務に組み込みます。',
    },
    operation: {
      shortTitle: 'データ・既存システム連携',
      description: '分断されたデータ・システムを連携し、業務全体がつながる基盤をつくります。',
    },
  },
  home: {
    hero: {
      imageAlt: '霧に包まれた森と山並み',
      heading: '暮らしを支える産業に、最新のテクノロジーを。',
      subheading: 'Technology for Essential Industries.',
      body: '製造・設備・建設・物流など暮らしを支える産業に AIとソフトウェアを実装する会社です。',
      primaryCta: 'Our Work',
      secondaryCta: 'Contact',
    },
    mission: {
      heading: '現場はまだ紙と勘で回っている',
      lead: '製造 建設 設備 物流',
      paragraphs: [
        '専門性は高い。でも日々の仕事は紙や表計算に残り分断され属人化している。',
        'Amberはその現場にAIとソフトウェアを入れ仕組みごと先に進める。',
      ],
    },
    industries: {
      heading: '暮らしを支える産業へ',
      lead: '社会や暮らしを支える産業を中心に取り組んでいます。',
      items: {
        manufacturing: {
          title: '製造・素材・化学',
          description: '技術文書 研究開発 ナレッジ 報告・確認業務など',
        },
        'field-services': {
          title: '設備・保守・点検',
          description: '点検 修繕 報告 スケジュールなど現場のオペレーション',
        },
        construction: {
          title: '建設・施工',
          description: '進捗管理 報告 見積 現場と事務の情報連携',
        },
        infrastructure: {
          title: '物流・社会インフラ',
          description: '分断されたデータと業務をつなぎ運用の基盤をつくる',
        },
      },
    },
    whatWeDo: {
      heading: '業務から仕組みをつくる',
      lead: 'ツール導入だけで終わらせない。業務を理解してから実装し定着までやる。',
      steps: {
        understand: { title: '業務を理解する', body: '現場の業務・システム・データ・課題を整理する' },
        redesign: {
          title: '業務を再設計する',
          body: 'AIとソフトウェアを前提に業務の流れを組み直す',
        },
        build: {
          title: '実装する',
          body: 'AIエージェントや業務システム 既存システム連携を設計・開発する',
        },
        scale: {
          title: '定着・展開する',
          body: '実際の業務に組み込み改善しながら組織へ広げる',
        },
      },
    },
    whatWeBuild: {
      heading: '現場に合わせてつくる',
      lead: '必要な仕組みを現場の仕事に合わせて設計し実装する。',
      items: {
        agents: '業務を実行・支援するAIエージェント',
        apps: '現場に合わせた業務システム',
        knowledge: '社内の知識・情報を活かす仕組み',
        workflow: '複雑な業務プロセスの自動化',
        data: '分断されたデータ・システムの連携',
      },
    },
    cases: {
      heading: '取り組みの一例',
      lead: '守秘のため企業名は出していません。',
      items: {
        chemical: {
          industry: '製造・素材・化学',
          theme: '大規模組織のAI活用基盤を構築',
          challenge: '課題整理からテーマ設計 実装・組織展開まで一気通貫で支援',
        },
        field: {
          industry: '訪問・現場サービス',
          theme: '訪問・現場業務を統合する業務基盤',
          challenge:
            '予約・顧客・現場・店舗の情報が分断され拠点をまたいだ進捗や稼働が見えにくかった',
        },
        fire: {
          industry: '設備・保守・点検',
          theme: '現場オペレーションの業務基盤を再構築',
          challenge: '分断された現場と事務の業務を整理し情報が一本で流れる仕組みへ',
        },
      },
    },
    howWeWork: {
      heading: '現場から実装まで',
      lead: '現場に入り実装までやりきる。',
      principles: {
        field: '現場から始める',
        build: '提案だけで終わらせない',
        integrate: 'ツールを増やさず業務に組み込む',
        learn: '現場で得た知見を次の実装につなげる',
      },
    },
    company: {
      heading: '暮らしを支える産業に、最新のテクノロジーを。',
      subheading: '製造・設備・建設・物流の現場から実装まで伴走します。',
      paragraphs: [
        '日本の暮らしを支えているのは製造 建設 設備 物流をはじめとする多くの産業だ。',
        '現場には高い専門性と蓄積された知識がある。一方で紙や表計算 分断されたシステム 属人的な業務も残っている。',
        'AmberはAIとソフトウェアを現場に実装しこれらの産業を次の段階へ進める。',
      ],
      cta: 'Company',
    },
    finalCta: {
      heading: '一緒に整理します',
      body: '業務やシステムの課題から相談してください。',
      cta: 'Talk to Amber',
    },
  },
} as const

const en = {
  common: {
    companyName: 'Amber Inc.',
    brandTagline: 'Technology for Essential Industries.',
    contact: 'Contact',
    whatWeDo: 'What we do',
    view: 'View',
    allWork: 'All Work',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    tokushoho: 'Specified Commercial Transactions Act',
    security: 'Security',
    products: 'Products',
    contactForm: 'Contact',
    language: 'Language',
    ja: '日本語',
    en: 'English',
  },
  nav: {
    industries: 'Industries',
    work: 'Work',
    company: 'Company',
    services: 'Services',
    blog: 'Blog',
  },
  footer: {
    site: 'Site',
    resources: 'Resources',
    faq: 'FAQ',
    representative: 'Representative',
    fireOps: 'Fire Ops',
  },
  offerings: {
    adoption: {
      shortTitle: 'Business design & transformation',
      description:
        'We map operations, systems, data, and challenges—then redesign workflows around AI and software.',
    },
    build: {
      shortTitle: 'AI & business software',
      description:
        'We design and build AI agents, business applications, and system integrations for real operations.',
    },
    operation: {
      shortTitle: 'Data & system integration',
      description:
        'We connect fragmented data and systems so work flows across the organization as one foundation.',
    },
  },
  home: {
    hero: {
      imageAlt: 'Mist over a forested mountain landscape',
      heading: 'Bringing modern technology to the industries that sustain everyday life.',
      subheading: 'Technology for Essential Industries.',
      body: 'Amber implements AI and software to transform manufacturing, facilities, construction, logistics, and other industries that keep society running.',
      primaryCta: 'Our Work',
      secondaryCta: 'Contact',
    },
    mission: {
      heading: 'Much of the work still runs on paper and know-how stuck in people’s heads.',
      lead: 'Manufacturing. Construction. Facilities. Logistics.',
      paragraphs: [
        'Essential industries hold deep expertise and accumulated knowledge—yet paper, spreadsheets, fragmented systems, and know-how locked in individuals still shape much of daily work.',
        'Amber puts AI and software into the field, advancing the operating foundations of the industries that sustain everyday life.',
      ],
    },
    industries: {
      heading: 'Built for the industries that keep daily life running.',
      lead: 'Amber focuses on the industries that keep society and daily life running.',
      items: {
        manufacturing: {
          title: 'Manufacturing, materials & chemicals',
          description: 'Technical documents, R&D, knowledge, reporting, and review work.',
        },
        'field-services': {
          title: 'Facilities, maintenance & inspection',
          description: 'Inspection, repair, reporting, scheduling, and field operations.',
        },
        construction: {
          title: 'Construction & project delivery',
          description: 'Progress management, reporting, estimating, and field–office coordination.',
        },
        infrastructure: {
          title: 'Logistics & infrastructure',
          description: 'Connecting fragmented data and workflows into durable operating foundations.',
        },
      },
    },
    whatWeDo: {
      heading: 'From understanding the work to building the system.',
      lead: 'Amber does more than deploy tools. We work from understanding operations through implementation and improvement.',
      steps: {
        understand: {
          title: 'Understand the work',
          body: 'Map field operations, systems, data, and challenges.',
        },
        redesign: {
          title: 'Redesign the workflow',
          body: 'Rebuild processes with AI and software as the default foundation.',
        },
        build: {
          title: 'Build what is needed',
          body: 'Design and develop AI agents, business systems, and integrations.',
        },
        scale: {
          title: 'Embed and scale',
          body: 'Put solutions into daily work, improve them, and expand across the organization.',
        },
      },
    },
    whatWeBuild: {
      heading: 'Technology shaped around real field work.',
      lead: 'We design and implement the systems real operations actually need.',
      items: {
        agents: 'AI agents that execute and support operational work',
        apps: 'Business applications shaped to the field',
        knowledge: 'Systems that put institutional knowledge to work',
        workflow: 'Automation for complex operational processes',
        data: 'Integration across fragmented data and systems',
      },
    },
    cases: {
      heading: 'Which industry. Which operation. What changed.',
      lead: 'Company names are withheld for confidentiality. A few examples.',
      items: {
        chemical: {
          industry: 'Manufacturing & Materials',
          theme: 'Building an AI operating foundation for a large organization',
          challenge:
            'From mapping operational challenges through theme design, implementation, and organization-wide rollout.',
        },
        field: {
          industry: 'Field Services',
          theme: 'Unifying field-service operations into one platform',
          challenge:
            'We brought together booking, customers, and field work so the whole operation runs as one system.',
        },
        fire: {
          industry: 'Facilities & Maintenance',
          theme: 'Rebuilding field operating foundations',
          challenge:
            'We reorganized fragmented field and office workflows so information flows as one connected system.',
        },
      },
    },
    howWeWork: {
      heading: 'Start in the field. Stay through implementation.',
      lead: 'We start in the field and stay through implementation.',
      principles: {
        field: 'Start from the field.',
        build: 'Build—don’t just advise.',
        integrate: 'Integrate into the work. Don’t add another tool.',
        learn: 'Learn in the field and compound into the next build.',
      },
    },
    company: {
      heading: 'Technology for the industries that sustain everyday life.',
      subheading: 'From the field through implementation—in manufacturing, facilities, construction, and logistics.',
      paragraphs: [
        'Manufacturing, construction, facilities, logistics, and many other industries keep daily life in Japan running.',
        'Those workplaces hold deep expertise and long-accumulated knowledge—yet paper, spreadsheets, fragmented systems, and know-how locked in individuals remain common.',
        'Amber implements AI and software in the field to move these industries into the next era.',
      ],
      cta: 'Company',
    },
    finalCta: {
      heading: 'Let’s sort it out together.',
      body: 'Start with an operational or systems challenge. We’ll help you shape the next step.',
      cta: 'Talk to Amber',
    },
  },
} as const

export type Messages = typeof ja

export const messagesByLocale: Record<Locale, Messages> = {
  ja,
  en: en as unknown as Messages,
}
