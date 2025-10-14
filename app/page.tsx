import HeroSection from "@/components/home/hero-section";
import DemoSection from "@/components/home/demo-section";
import HowItWorks from "@/components/home/how-it-works";
import PricingSection from "@/components/home/pricing-section";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <DemoSection />
      <HowItWorks />
      <PricingSection />
      <CTASection />
    </div>
  )
}