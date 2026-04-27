import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutSection from '@/components/sections/AboutSection'
import BusinessPillarsSection from '@/components/sections/BusinessPillarsSection'
import CompanyProfileSection from '@/components/sections/CompanyProfileSection'
import ContactSection from '@/components/sections/ContactSection'

export default function CompanyPage() {
    return (
        <main className="min-h-screen bg-color-bg">
            <Header />
            <h1 className="sr-only">企業情報・会社概要 | 株式会社Amber</h1>
            <AboutSection />
            <BusinessPillarsSection variant="company" />
            <CompanyProfileSection />
            <ContactSection />
            <Footer />
        </main>
    )
}
