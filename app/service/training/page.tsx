import TrainingPageClient from '@/components/pages/TrainingPageClient'
import { getAllPosts } from '@/lib/markdown'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TrainingPage() {
    const blogPosts = getAllPosts('training')

    return (
        <>
            <Header />
            <TrainingPageClient blogPosts={blogPosts} />
            <Footer />
        </>
    )
}
