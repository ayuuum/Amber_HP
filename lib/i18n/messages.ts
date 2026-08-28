import type { Locale } from './config'

const ja = {
  common: {
    companyName: '株式会社Amber',
    brandTagline: 'Technology for Essential Industries.',
    contact: 'Contact',
    whatWeDo: 'What we do',
    view: '詳しく見る',
    allWork: '一覧を見る',
    legal: '法務',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    tokushoho: '特定商取引法に基づく表記',
    products: '運営プロダクト',
    contactForm: 'お問い合わせフォーム',
    language: '言語',
    ja: '日本語',
    en: 'English',
  },
  nav: {
    industries: 'Industries',
    work: 'Work',
    company: 'Company',
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
      heading: 'Technology for Essential Industries.',
      subheading: '暮らしを支える産業に、最新のテクノロジーを。',
      body: 'Amberは、製造・設備・建設・物流など、社会を支える産業の変革をAIとソフトウェアで実装します。',
      primaryCta: 'Our Work',
      secondaryCta: 'Contact',
    },
    mission: {
      heading: 'Technology for Essential Industries.',
      lead: '製造、建設、設備、物流。',
      paragraphs: [
        '社会を動かしている産業には、高い専門性と長年蓄積された知識がある一方で、紙や表計算、分断されたシステム、属人的な業務が数多く残っています。',
        'Amberは、AIとソフトウェアを現場に実装し、暮らしを支える産業の仕組みを次の時代へ進めます。',
      ],
    },
    industries: {
      heading: 'Built for Essential Industries.',
      lead: 'Amberは、社会や暮らしを支える産業を中心に取り組んでいます。',
      items: {
        manufacturing: {
          title: '製造・素材・化学',
          description: '技術文書、研究開発、ナレッジ、報告・確認業務など。',
        },
        'field-services': {
          title: '設備・保守・点検',
          description: '点検、修繕、報告、スケジュールなど現場オペレーション。',
        },
        construction: {
          title: '建設・施工',
          description: '進捗管理、報告、見積、現場と事務の情報連携。',
        },
        infrastructure: {
          title: '物流・社会インフラ',
          description: '分断されたデータと業務をつなぎ、運用の基盤をつくる。',
        },
      },
    },
    whatWeDo: {
      heading: 'From Operations to Software.',
      lead: 'Amberは、ツールを導入するだけではなく、業務を理解するところから実装・改善まで一貫して取り組みます。',
      steps: {
        understand: { title: '業務を理解する', body: '現場の業務、システム、データ、課題を整理する。' },
        redesign: {
          title: '業務を再設計する',
          body: 'AIとソフトウェアを前提に、業務の流れそのものを再設計する。',
        },
        build: {
          title: '実装する',
          body: 'AIエージェントや業務システム、既存システム連携を設計・開発する。',
        },
        scale: {
          title: '定着・展開する',
          body: '実際の業務に組み込み、改善しながら組織へ展開する。',
        },
      },
    },
    whatWeBuild: {
      heading: 'Technology built around real operations.',
      lead: '現場の業務に合わせて、必要な仕組みを設計・実装します。',
      items: {
        agents: '業務を実行・支援するAIエージェント',
        apps: '現場に合わせた業務システム',
        knowledge: '社内の知識・情報を活用する仕組み',
        workflow: '複雑な業務プロセスの自動化',
        data: '分断されたデータ・システムの連携',
      },
    },
    cases: {
      heading: 'Transforming Essential Operations.',
      lead: 'どの産業の、どの業務を、どう変えたか。取り組みの一例です。',
      items: {
        chemical: {
          industry: 'Manufacturing & Materials',
          theme: '大規模組織のAI活用基盤を構築',
          challenge: '業務課題の整理からテーマ設計、実装・組織展開まで一貫して支援。',
        },
        field: {
          industry: 'Field Services',
          theme: '訪問・現場業務を統合する業務基盤',
          challenge: '分散していた予約・顧客・現場情報を統合し、業務全体を一つの仕組みへ。',
        },
        fire: {
          industry: 'Facilities & Maintenance',
          theme: '現場オペレーションの業務基盤を再構築',
          challenge: '分断された現場と事務の業務を整理し、一貫して情報が流れる仕組みへ。',
        },
      },
    },
    howWeWork: {
      heading: 'Built with the Field.',
      lead: '現場に入り、実装まで進めます。',
      principles: {
        field: '現場から始める。',
        build: '提案だけで終わらせない。',
        integrate: 'ツールを増やすのではなく、業務に組み込む。',
        learn: '現場で得た知見を、次の実装へつなげる。',
      },
    },
    company: {
      heading: 'Technology for Essential Industries.',
      subheading: '暮らしを支える産業に、最新のテクノロジーを。',
      paragraphs: [
        '日本の暮らしを支えているのは、製造、建設、設備、物流をはじめとする多くの産業です。',
        'その現場には、高い専門性と長年蓄積された知識がある一方、紙や表計算、分断されたシステム、属人的な業務も数多く残っています。',
        'Amberは、AIとソフトウェアを現場に実装し、これらの産業を次の時代へ進めます。',
      ],
      cta: 'Company',
    },
    finalCta: {
      heading: 'Technology for Essential Industries.',
      body: '業務やシステムの課題からご相談ください。',
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
    products: 'Products',
    contactForm: 'Contact form',
    language: 'Language',
    ja: '日本語',
    en: 'English',
  },
  nav: {
    industries: 'Industries',
    work: 'Work',
    company: 'Company',
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
      heading: 'Technology for Essential Industries.',
      subheading: 'Bringing modern technology to the industries that sustain everyday life.',
      body: 'Amber implements AI and software to transform manufacturing, facilities, construction, logistics, and other industries that keep society running.',
      primaryCta: 'Our Work',
      secondaryCta: 'Contact',
    },
    mission: {
      heading: 'Technology for Essential Industries.',
      lead: 'Manufacturing. Construction. Facilities. Logistics.',
      paragraphs: [
        'Essential industries hold deep expertise and accumulated knowledge—yet paper, spreadsheets, fragmented systems, and tribal processes still shape much of daily work.',
        'Amber puts AI and software into the field, advancing the operating foundations of the industries that sustain everyday life.',
      ],
    },
    industries: {
      heading: 'Built for Essential Industries.',
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
      heading: 'From Operations to Software.',
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
      heading: 'Technology built around real operations.',
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
      heading: 'Transforming Essential Operations.',
      lead: 'Which industry. Which operation. What changed. A few examples.',
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
      heading: 'Built with the Field.',
      lead: 'We start in the field and stay through implementation.',
      principles: {
        field: 'Start from the field.',
        build: 'Build—don’t just advise.',
        integrate: 'Integrate into the work. Don’t add another tool.',
        learn: 'Learn in the field and compound into the next build.',
      },
    },
    company: {
      heading: 'Technology for Essential Industries.',
      subheading: 'Bringing modern technology to the industries that sustain everyday life.',
      paragraphs: [
        'Manufacturing, construction, facilities, logistics, and many other industries keep daily life in Japan running.',
        'Those workplaces hold deep expertise and long-accumulated knowledge—yet paper, spreadsheets, fragmented systems, and tribal processes remain common.',
        'Amber implements AI and software in the field to move these industries into the next era.',
      ],
      cta: 'Company',
    },
    finalCta: {
      heading: 'Technology for Essential Industries.',
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
