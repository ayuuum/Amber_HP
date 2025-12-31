import ConsultingPageClient from '@/components/pages/ConsultingPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConsultingPage() {
    const blogPosts = getAllPosts('consulting')

    return (
        <>
            <Header />
            <ConsultingPageClient blogPosts={blogPosts} />
            <Footer />
        </>
    )
}
