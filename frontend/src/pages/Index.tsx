import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InstitutionalTrustBanner from "@/components/sections/InstitutionalTrustBanner";
import HeroSection from "@/components/sections/HeroSection";
import ConditionsSection from "@/components/sections/ConditionsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import CompoundsSection from "@/components/sections/CompoundsSection";
import VitaminsSection from "@/components/sections/VitaminsSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EvidenceMed: Integrative & Complementary Therapies Research Archive</title>
        <meta 
          name="description" 
          content="Institutional archive of peer-reviewed research on integrative medicine, complementary therapies, and natural compounds. Evidence-based education for practitioners and researchers." 
        />
        <meta name="keywords" content="integrative medicine, complementary therapies, alternative medicine, natural compounds, peer-reviewed studies, integrative health, herbal medicine research, evidence-based medicine" />
        <link rel="canonical" href="https://integrativeevidence.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EvidenceMed: Integrative & Complementary Therapies Research Archive" />
        <meta property="og:description" content="Institutional archive of peer-reviewed research on integrative medicine and complementary therapies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://integrativeevidence.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "EvidenceMed",
            "alternateName": "Integrative Evidence Archive",
            "url": "https://integrativeevidence.com",
            "description": "Institutional research archive for integrative medicine and complementary therapies",
            "applicationCategory": "HealthApplication"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section - Full Width */}
          <HeroSection />
          <InstitutionalTrustBanner />
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Primary: Research-focused content */}
            <ResearchSection />
            <ConditionsSection />
            <VitaminsSection />
            <CompoundsSection />
          </main>
          
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
