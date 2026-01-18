import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AffiliateDisclosure from "@/components/layout/AffiliateDisclosure";
import HeroSection from "@/components/sections/HeroSection";
import ConditionsSection from "@/components/sections/ConditionsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import CompoundsSection from "@/components/sections/CompoundsSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import CommentsSection from "@/components/sections/CommentsSection";
import TrialSignupSection from "@/components/sections/TrialSignupSection";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileBooksSection } from "@/components/layout/MobileBooksSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EvidenceMed | Alternative Medicine & Complementary Therapy Research Platform</title>
        <meta 
          name="description" 
          content="Explore peer-reviewed research on alternative medicine, complementary and alternative medicine therapies, natural compounds, and alternative cancer treatments. Evidence-based alternative therapy education for practitioners and health-conscious consumers." 
        />
        <meta name="keywords" content="alternative medicine, complementary and alternative medicine, alternative therapy, alternative cancer treatments, natural compounds, peer-reviewed studies, integrative health, herbal medicine research" />
        <link rel="canonical" href="https://evidencemed.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EvidenceMed | Alternative Medicine Research Platform" />
        <meta property="og:description" content="Explore peer-reviewed research on alternative medicine and complementary therapies. Evidence-based alternative therapy content sourced from PubMed, NIH, and leading journals." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "EvidenceMed",
            "description": "Research-based educational platform for alternative medicine and complementary and alternative medicine therapies",
            "applicationCategory": "HealthApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section - Full Width */}
          <HeroSection />
          
          {/* Content with Sidebar */}
          <div className="flex">
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Primary: Research-focused content */}
              <ResearchSection />
              <ConditionsSection />
              <CompoundsSection />
              
              {/* Secondary: Social proof & conversion */}
              <SocialProofSection />
              <PricingSection />
              <TrialSignupSection />
              
              {/* Tertiary: Supplementary content */}
              <MobileBooksSection />
              <CommentsSection />
              <CTASection />
              <AffiliateDisclosure />
              <Footer />
            </main>
            
            {/* Right Sidebar - Starts at Conditions section */}
            <div className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
              <RightSidebar variant="split" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
