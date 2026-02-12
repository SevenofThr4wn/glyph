import FeaturesSection from "@/components/pages/home/features-section";
import Header from "@/components/pages/home/header";
import StatsSection from "@/components/pages/home/stats-section";
import TestimonialsSection from "@/components/pages/home/testimonials-section";
import CTASection from "@/components/pages/home/cta-section";
import Footer from "@/components/pages/home/footer";

export default function Home() {
  return (
    <>
      <Header />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
