import SaaSPageClient from '@/components/pages/SaaSPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SaaSPage() {
    const blogPosts = getAllPosts('saas')

    return (
        <>
            <Header />
            <SaaSPageClient blogPosts={blogPosts} />
            <Footer />
        </>
    )
}
