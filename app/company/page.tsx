import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AboutSection from '@/components/sections/AboutSection'
import WhyAmberSection from '@/components/sections/WhyAmberSection'
import CompanyProfileSection from '@/components/sections/CompanyProfileSection'
import ContactSection from '@/components/sections/ContactSection'

export default function CompanyPage() {
    return (
        <main className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
            <Header />
            <div className="pt-20 flex flex-col gap-16">
                <AboutSection />
                <WhyAmberSection />
                <CompanyProfileSection />
                <ContactSection />
            </div>
            <Footer />
        </main>
    )
}
