import { Helmet } from "react-helmet-async";
import { Sparkles, BookOpen, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InstitutionalTrustBanner from "@/components/sections/InstitutionalTrustBanner";
import HeroSection from "@/components/sections/HeroSection";
import ConditionsSection from "@/components/sections/ConditionsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import CompoundsSection from "@/components/sections/CompoundsSection";
import VitaminsSection from "@/components/sections/VitaminsSection";
import PricingSection from "@/components/sections/PricingSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import CommentsSection from "@/components/sections/CommentsSection";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileBooksSection } from "@/components/layout/MobileBooksSection";
import { MobileVideoSection } from "@/components/layout/MobileVideoSection";
import { MobileStickyBottomBar } from "@/components/mobile/MobileStickyBottomBar";
import { MobileResourceDrawer } from "@/components/mobile/MobileResourceDrawer";
import { InlinePromoCard } from "@/components/mobile/InlinePromoCard";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EvidenceMed: Integrative & Complementary Therapies Research</title>
        <meta 
          name="description" 
          content="Explore peer-reviewed research on integrative medicine, complementary therapies, natural compounds, and alternative treatments. Evidence-based education for practitioners and health-conscious individuals." 
        />
        <meta name="keywords" content="integrative medicine, complementary therapies, alternative medicine, natural compounds, peer-reviewed studies, integrative health, herbal medicine research, evidence-based medicine" />
        <link rel="canonical" href="https://integrativeevidence.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EvidenceMed: Integrative & Complementary Therapies Research" />
        <meta property="og:description" content="Explore peer-reviewed research on integrative medicine and complementary therapies. Evidence-based content sourced from PubMed, NIH, and leading journals." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://integrativeevidence.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "EvidenceMed",
            "alternateName": "Integrative Evidence",
            "url": "https://integrativeevidence.com",
            "description": "Research-based educational platform for integrative medicine and complementary therapies",
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
        {/* Mobile monetization components */}
        <MobileStickyBottomBar />
        <MobileResourceDrawer />
        <div className="pt-16 lg:pt-20">
          {/* Hero Section - Full Width */}
          <HeroSection />
          <InstitutionalTrustBanner />
          
          {/* Content with Sidebar */}
          <div className="flex">
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Primary: Research-focused content */}
              <ResearchSection />
              
              {/* Inline Promo: Trial signup */}
              <InlinePromoCard
                icon={Sparkles}
                title="Start Your Free Trial"
                description="Get full access to research insights, compound profiles, and practitioner tools for 7 days."
                ctaText="Start Free Trial"
                ctaLink="/pricing"
                variant="primary"
              />
              
              <ConditionsSection />
              <VitaminsSection />
              <CompoundsSection />
              
              {/* Inline Promo: Shop resources */}
              <InlinePromoCard
                icon={BookOpen}
                title="Recommended Reading"
                description="Curated books and resources from leading integrative medicine experts."
                ctaText="Browse Books"
                ctaLink="/merch"
                variant="accent"
              />
              
              {/* Secondary: Social proof & conversion */}
              <SocialProofSection />
              <PricingSection />
              
              {/* Inline Promo: Shop */}
              <InlinePromoCard
                icon={ShoppingBag}
                title="Support Our Mission"
                description="Browse our merch and curated products. Every purchase helps fund more research curation."
                ctaText="Visit Shop"
                ctaLink="/merch"
                variant="muted"
              />
              
              {/* Tertiary: Supplementary content */}
              <MobileBooksSection />
              <MobileVideoSection />
              <CommentsSection />
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
