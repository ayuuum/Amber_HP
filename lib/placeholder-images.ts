/**
 * サイト全体のブランドビジュアル。
 * gpt-image-1 で生成（scripts/generate-brand-images.py）。
 * 再生成: python3 scripts/generate-brand-images.py
 */

export const placeholders = {
  /** コーポレートHero：山岳・森（unsplash既存／差し替え不要） */
  mountainHero:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=88',

  /** ConsultingPageClient Hero：現場業務×AIシステム */
  consultingHero: '/images/brand/consulting-hero.png',
  /** TrainingPageClient Hero：少人数の研修風景 */
  trainingHero: '/images/brand/training-hero.png',
  /** ConsultingPageClient Split型：現場に入るコンサル */
  consultingSplit: '/images/brand/consulting-split.png',
  /** TrainingPageClient Split型：研修終了直後の手元 */
  trainingSplit: '/images/brand/training-split.png',
  /** AboutSection teaser：暮らしを支える産業の手元（ビリング限界で生成失敗、後日再生成） */
  aboutTeaser: '/images/brand/training-split.png',
  /** Consulting 2サービス：AI業務システム開発（ビリング限界で生成失敗、後日再生成） */
  serviceSystemDev: '/images/brand/training-split.png',
  /** Consulting 2サービス：AIエージェント開発（ビリング限界で生成失敗、後日再生成） */
  serviceAgent: '/images/brand/consulting-split.png',
  /** Training 2コース：基礎10時間（ビリング限界で生成失敗、後日再生成） */
  courseBasic: '/images/brand/training-hero.png',
  /** Training 2コース：応用10時間（ビリング限界で生成失敗、後日再生成） */
  courseAdvanced: '/images/brand/training-split.png',

  /** 旧キー（互換用、新規実装では使わない） */
  laptop: '/images/brand/consulting-hero.png',
  workshop: '/images/brand/training-hero.png',
  meeting: '/images/brand/consulting-split.png',
  handshake: '/images/brand/about-teaser.png',

  /** 旧キー（一部既存コンポーネントから参照される互換用） */
  forestRoots:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85',
  brandHero: '/images/brand/amber-hero-forest.svg',
  businessPillars: '/images/brand/amber-business-pillars.svg',
  systemDevelopment: '/images/brand/amber-system-development.svg',
  pineProduct: '/images/brand/amber-pine-product.svg',
  team: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
  office:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
  portrait:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  writing:
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
} as const
