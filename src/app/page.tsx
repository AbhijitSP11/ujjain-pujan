import Hero from '@/sections/Hero'
import TrustBar from '@/sections/TrustBar'
import WhyUjjain from '@/sections/WhyUjjain'
import PoojaCategories from '@/sections/PoojaCategories'
import SacredPrep from '@/sections/SacredPrep'
import HowItWorks from '@/sections/HowItWorks'
import Pandits from '@/sections/Pandits'
import Testimonials from '@/sections/Testimonials'
import FAQ from '@/sections/FAQ'
import BookingCTA from '@/sections/BookingCTA'
import Footer from '@/sections/Footer'
import WhatsAppBottomBar from '@/components/WhatsAppBottomBar'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyUjjain />
      <PoojaCategories />
      <SacredPrep />
      <HowItWorks />
      <Pandits />
      <Testimonials />
      <FAQ />
      <BookingCTA />
      <Footer />
      <WhatsAppBottomBar />
    </>
  )
}
