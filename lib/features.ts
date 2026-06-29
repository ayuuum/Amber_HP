export type FeatureItem = {
  num: string
  title: string
  desc: string
  image: string
  imageAlt: string
}

export const homeFeatures: FeatureItem[] = [
  {
    num: '01',
    title: '現場から設計',
    desc: '提案書の前に現場へ。業務動線を歩き、どこにテクノロジーを組み込むかを一緒に決めます。',
    image: '/images/brand/consulting-split.png',
    imageAlt: '現場観察と業務設計のイメージ',
  },
  {
    num: '02',
    title: '一気通貫で伴走',
    desc: '研修で終わらせない。開発で終わらせない。使える・回る・残るまで、同じチームが担当します。',
    image: '/images/brand/training-split.png',
    imageAlt: '研修と実装をつなぐ伴走のイメージ',
  },
  {
    num: '03',
    title: '個社からSaaSへ',
    desc: '現場支援で見えた共通課題を、出張訪問サービス向けソフトウェア「Pine」として届けています。',
    image: '/images/brand/amber-pine-product.svg',
    imageAlt: 'Pine プロダクトイメージ',
  },
]
