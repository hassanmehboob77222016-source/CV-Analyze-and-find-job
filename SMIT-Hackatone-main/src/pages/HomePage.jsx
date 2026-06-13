import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/home/HeroSection'
import FeatureSection from '../components/home/FeatureSection'
import HowItWorks from '../components/home/HowItWorks'
import BackgroundGrid from '../components/ui/BackgroundGrid'

function HomePage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundGrid />
      <Navbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage

