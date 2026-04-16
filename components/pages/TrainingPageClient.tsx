'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import TopCtaBlock from '@/components/sections/TopCtaBlock'
import {
  placeholders,
  PLACEHOLDER_CAPTION_LONG,
} from '@/lib/placeholder-images'

const targetChallenges = [
  '生成AIを導入したが、社員が使いこなせていない',
  '部署ごとにAI活用のレベルがバラバラ',
  '研修を実施したいが、自社に知見がない',
]

const trainingFeatures = [
  'OFF-JT形式（業務から切り離した集合研修）',
  '全12回・各2時間・計24時間のプログラム',
  '座学＋実習の組み合わせ',
  '人材開発支援助成金（事業展開等リスキリング支援コース）の対象研修',
]

const curriculum = [
  {
    session: '第1回',
    theme: '生成AIの基礎と全体像',
    summary: 'ChatGPT・Claude・Geminiの違い、活用事例',
  },
  {
    session: '第2〜3回',
    theme: 'プロンプトエンジニアリング基礎',
    summary: '効果的な指示の出し方、出力品質の改善',
  },
  {
    session: '第4〜5回',
    theme: '業務別AI活用（文書・メール・資料作成）',
    summary: '実務シーン別の活用演習',
  },
  {
    session: '第6〜7回',
    theme: 'データ分析・情報整理へのAI活用',
    summary: '表・レポート・議事録の自動化',
  },
  {
    session: '第8〜9回',
    theme: '課題解決型ワークショップ①',
    summary: '自社業務の課題をAIで解決する演習',
  },
  {
    session: '第10〜11回',
    theme: '課題解決型ワークショップ②',
    summary: 'チーム単位での実装・発表',
  },
  {
    session: '第12回',
    theme: '振り返りと社内展開計画',
    summary: '学習の定着・社内への横展開設計',
  },
]

export default function TrainingPageClient() {
  return (
    <main className="min-h-screen pt-24 pb-24 px-6 bg-color-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'サービス', href: '/#services' },
              { label: '生成AI研修' },
            ]}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-none aspect-[4/3] w-full max-w-xl mx-auto lg:max-w-none rounded-sm overflow-hidden border border-sequoia-black/10 shadow-md bg-sequoia-black/5"
          >
            <Image
              src={placeholders.workshop}
              alt="集合研修・講義のイメージ（仮の写真）"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(196,154,108,0.08),transparent_55%)] pointer-events-none" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-center lg:text-left order-2 lg:order-none"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-sequoia-black mb-6 leading-tight">
              生成AI研修
            </h1>
            <p className="text-lead mb-8">現場で使える生成AIスキルを、体系的に習得する</p>
            <Link
              href="/company#contact"
              className="btn-primary w-full sm:w-auto sm:max-w-[280px] inline-flex items-center justify-center gap-2"
            >
              お問い合わせ
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
        <p className="text-center text-xs text-sequoia-black/50 mb-16 max-w-3xl mx-auto">
          {PLACEHOLDER_CAPTION_LONG}
        </p>

        <section className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-heading mb-6">こんな企業・チームへ</h2>
            <p className="section-subheading">導入後の定着と現場活用まで見据えた研修です。</p>
          </motion.div>
          <div className="flex flex-col md:flex-row gap-5 justify-center">
            {targetChallenges.map((text) => (
              <div
                key={text}
                className="flex-1 min-w-0 py-5 px-6 rounded-sm border border-sequoia-black/10 bg-color-bg text-sequoia-black/90 text-center md:text-left text-[15px] leading-relaxed"
              >
                {text}
              </div>
            ))}
          </div>
        </section>

        <section className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-heading mb-6">研修の特徴</h2>
            <p className="section-subheading">
              助成金要件を踏まえたOFF-JT形式で、実務に直結するスキル定着を支援します。
            </p>
          </motion.div>
          <div className="relative mb-10 max-w-4xl mx-auto aspect-[21/9] max-h-52 w-full rounded-sm overflow-hidden border border-sequoia-black/10 shadow-sm bg-sequoia-black/5">
            <Image
              src={placeholders.team}
              alt="チームで学ぶ・実習するイメージ（仮の写真）"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {trainingFeatures.map((feature) => (
              <div
                key={feature}
                className="surface-card p-6 text-sequoia-black/90 text-[15px] leading-relaxed"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="section-heading mb-6">カリキュラム概要</h2>
            <p className="section-subheading">全12回（24時間）で基礎から実践・定着まで段階的に学びます。</p>
          </motion.div>
          <div className="relative mb-8 max-w-4xl mx-auto aspect-[2/1] max-h-56 w-full rounded-sm overflow-hidden border border-sequoia-black/10 shadow-sm bg-sequoia-black/5">
            <Image
              src={placeholders.meeting}
              alt="学習・ワークの流れのイメージ（仮の写真）"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
          <div className="surface-card overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-sequoia-black/10 bg-sequoia-white/50">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-sequoia-black">回</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-sequoia-black">テーマ</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-sequoia-black">内容概要</th>
                </tr>
              </thead>
              <tbody>
                {curriculum.map((item) => (
                  <tr key={item.session} className="border-b border-sequoia-black/10 last:border-b-0">
                    <td className="px-4 py-3 text-sm text-sequoia-black/90 whitespace-nowrap">{item.session}</td>
                    <td className="px-4 py-3 text-sm text-sequoia-black/90">{item.theme}</td>
                    <td className="px-4 py-3 text-sm text-sequoia-black/90">{item.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="surface-card-strong p-8 md:p-10"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-sequoia-black mb-6">助成金について</h2>
            <p className="text-sequoia-black/90 leading-relaxed mb-4">
              本研修は人材開発支援助成金（事業展開等リスキリング支援コース）の対象となる場合があります。
            </p>
            <p className="text-sequoia-black/90 leading-relaxed mb-4">
              助成率：経費60%、賃金助成500円/時間（大企業の場合）
            </p>
            <p className="text-sequoia-black/90 leading-relaxed">詳細はお問い合わせください。</p>
          </motion.div>
        </section>

        <TopCtaBlock />
      </div>
    </main>
  )
}
