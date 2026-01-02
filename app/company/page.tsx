import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CompanyProfileSection from '@/components/sections/CompanyProfileSection'
import ContactSection from '@/components/sections/ContactSection'

export default function CompanyPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="pt-20"> {/* Add padding for fixed header */}
                <CompanyProfileSection />
                <ContactSection />
            </div>
            <Footer />
        </main>
    )
}
