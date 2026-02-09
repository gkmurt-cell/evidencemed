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
          content="Comprehensive institutional archive of peer-reviewed research on integrative medicine, complementary therapies, and natural compounds. 198+ compounds, 14 healing modalities, evidence-based education for practitioners and researchers." 
        />
        <meta name="keywords" content="integrative medicine, complementary therapies, alternative medicine, natural compounds, peer-reviewed studies, integrative health, herbal medicine research, evidence-based medicine, ayurveda, TCM, naturopathy, functional medicine" />
        <link rel="canonical" href="https://evidencemed.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EvidenceMed: Integrative & Complementary Therapies Research Archive" />
        <meta property="og:description" content="Comprehensive archive of peer-reviewed research on integrative medicine. 198+ compounds, 14 healing modalities, evidence-based resources." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://evidencemed.com" />
        <meta property="og:site_name" content="EvidenceMed" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EvidenceMed: Integrative Medicine Research Archive" />
        <meta name="twitter:description" content="Evidence-based resource for integrative and complementary therapies research." />
        
        {/* Structured Data - Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EvidenceMed",
            "alternateName": "Integrative Evidence Archive",
            "url": "https://evidencemed.com",
            "description": "Institutional research archive for integrative medicine and complementary therapies",
            "logo": "https://evidencemed.com/logo.png",
            "sameAs": []
          })}
        </script>
        
        {/* Structured Data - Website */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EvidenceMed",
            "url": "https://evidencemed.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://evidencemed.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Structured Data - Medical Web Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "EvidenceMed - Integrative Medicine Research",
            "description": "Evidence-based research archive covering integrative medicine, natural compounds, and complementary therapies",
            "audience": {
              "@type": "MedicalAudience",
              "audienceType": "Healthcare professionals, researchers, patients"
            },
            "specialty": ["Integrative Medicine", "Complementary and Alternative Medicine", "Naturopathy"],
            "about": [
              {"@type": "MedicalSpecialty", "name": "Integrative Medicine"},
              {"@type": "MedicalSpecialty", "name": "Naturopathy"},
              {"@type": "MedicalSpecialty", "name": "Traditional Chinese Medicine"},
              {"@type": "MedicalSpecialty", "name": "Ayurveda"}
            ]
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
