import HeroSection from '@/components/hero-section';
import { HeroHeader } from '@/components/header';
import Features from '@/components/features';
import CallToAction from '@/components/call-to-action';
import Footer from '@/components/footer';
import FAQsThree from '@/components/faqs-3';
import ContentSection from '@/components/content-7';
import CommunitySection from '@/components/content-6';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession()

  if (session) redirect('/dashboard')

  return (
    <>
      <HeroHeader />
      <HeroSection />
      <Features />
      <ContentSection />
      <FAQsThree />
      <CommunitySection />
      <CallToAction />
      <Footer />
    </>
  )
}