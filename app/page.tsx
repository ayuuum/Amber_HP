import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import AIConsultingSection from '@/components/sections/AIConsultingSection'
import AITrainingSection from '@/components/sections/AITrainingSection'
import VerticalSaaSSection from '@/components/sections/VerticalSaaSSection'
import WhyAmberSection from '@/components/sections/WhyAmberSection'
import CustomerVoiceSection from '@/components/sections/CustomerVoiceSection'
import ContactSection from '@/components/sections/ContactSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <AIConsultingSection />
      <AITrainingSection />
      <VerticalSaaSSection />
      <WhyAmberSection />
      <CustomerVoiceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

