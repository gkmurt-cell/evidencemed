import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ConditionsSection from "@/components/sections/ConditionsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import CompoundsSection from "@/components/sections/CompoundsSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import { RightSidebar } from "@/components/layout/RightSidebar";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EvidenceMed | Research-Based Alternative & Complementary Medicine Platform</title>
        <meta 
          name="description" 
          content="Explore peer-reviewed research on alternative therapies, natural compounds, and investigational treatments. Educational platform for practitioners, researchers, and health-conscious consumers." 
        />
        <meta name="keywords" content="alternative medicine research, complementary therapy, natural compounds, peer-reviewed studies, integrative health, herbal medicine research" />
        <link rel="canonical" href="https://evidencemed.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EvidenceMed | Research-Based Alternative Medicine Platform" />
        <meta property="og:description" content="Explore peer-reviewed research on alternative therapies and natural compounds. Educational content sourced from PubMed, NIH, and leading journals." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "EvidenceMed",
            "description": "Research-based educational platform for alternative and complementary medicine",
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
        <div className="flex-1 flex">
          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <HeroSection />
            <ConditionsSection />
            <ResearchSection />
            <CompoundsSection />
            <PricingSection />
            <CTASection />
            <Footer />
          </main>
          
          {/* Right Sidebar - Hidden on mobile/tablet, visible on large screens */}
          <div className="hidden lg:block">
            <RightSidebar variant="split" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
