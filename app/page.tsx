import HeroSection from '@/components/hero-section';
import { HeroHeader } from '@/components/header';
import Features from '@/components/features';
import CallToAction from '@/components/call-to-action';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <Features />
      <CallToAction />
      <Footer />
    </>
  )
}