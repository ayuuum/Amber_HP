/**
 * サイト全体の仮置き画像。
 * next.config.mjs の images: images.unsplash.com を利用。
 */

export const placeholders = {
  /** 集合研修・講義 */
  workshop:
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80',
  /** チーム・協働 */
  team: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
  /** ミーティング・学習 */
  meeting:
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80',
  /** オフィス・職場 */
  office:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80',
  /** PC・業務・データ */
  laptop:
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  /** 握手・パートナー */
  handshake:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80',
  /** 代表写真の代替（仮） */
  portrait:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  /** 記事・執筆イメージ */
  writing:
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
} as const
