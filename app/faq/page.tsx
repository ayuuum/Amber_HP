import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQSection from '@/components/sections/FAQSection'
import JsonLd from '@/components/JsonLd'
import { topFaqs } from '@/lib/faqs'

export const metadata: Metadata = {
    title: 'よくある質問 | 株式会社Amber',
    description: '株式会社Amberのサービスに関するよくある質問を掲載しています。',
}

export default function FAQPage() {
    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: topFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }

    return (
        <>
            <JsonLd id="jsonld-faq" data={faqJsonLd} />
            <main className="min-h-screen bg-white">
                <Header />
                <div className="pt-20">
                    <FAQSection />
                </div>
                <Footer />
            </main>
        </>
    )
}
