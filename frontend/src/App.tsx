import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingBackToTop from "@/components/ui/floating-back-to-top";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Auth from "@/pages/Auth";
import Search from "@/pages/Search";
import Research from "@/pages/Research";
import Compounds from "@/pages/Compounds";
import CompoundPage from "@/pages/Compound";
import ConditionPage from "@/pages/Condition";
import ConditionsPage from "@/pages/Conditions";
import IntegrativeTherapies from "@/pages/IntegrativeTherapies";
import Ayurveda from "@/pages/Ayurveda";
import TCM from "@/pages/TCM";
import Naturopathy from "@/pages/Naturopathy";
import Homeopathy from "@/pages/Homeopathy";
import FunctionalMedicine from "@/pages/FunctionalMedicine";
import Aromatherapy from "@/pages/Aromatherapy";
import UnaniMedicine from "@/pages/UnaniMedicine";
import EnergyHealing from "@/pages/EnergyHealing";
import MindBodyMedicine from "@/pages/MindBodyMedicine";
import BodyworkTherapies from "@/pages/BodyworkTherapies";
import NutritionalTherapy from "@/pages/NutritionalTherapy";
import SoundTherapy from "@/pages/SoundTherapy";
import Hydrotherapy from "@/pages/Hydrotherapy";
import Resources from "@/pages/Resources";
import EditorialMethodology from "@/pages/EditorialMethodology";
import AdvisoryBoard from "@/pages/AdvisoryBoard";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import MemberResources from "@/pages/MemberResources";
import PractitionerRepository from "@/pages/PractitionerRepository";
import PractitionerDirectory from "@/pages/PractitionerDirectory";
import InstitutionalAccess from "@/pages/InstitutionalAccess";
import InstitutionalPricing from "@/pages/InstitutionalPricing";
import AdminDashboard from "@/pages/AdminDashboard";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

import InstallPrompt from "@/components/pwa/InstallPrompt";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <FloatingBackToTop />
            <InstallPrompt />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/search" element={<Search />} />
              <Route path="/research" element={<Research />} />
              <Route path="/compounds" element={<Compounds />} />
              <Route path="/compound/:id" element={<CompoundPage />} />
              <Route path="/conditions" element={<ConditionsPage />} />
              <Route path="/condition/:id" element={<ConditionPage />} />
              <Route path="/therapies" element={<IntegrativeTherapies />} />
              <Route path="/integrative-therapies" element={<IntegrativeTherapies />} />
              <Route path="/ayurveda" element={<Ayurveda />} />
              <Route path="/tcm" element={<TCM />} />
              <Route path="/chinese-medicine" element={<TCM />} />
              <Route path="/naturopathy" element={<Naturopathy />} />
              <Route path="/naturopathic-medicine" element={<Naturopathy />} />
              <Route path="/homeopathy" element={<Homeopathy />} />
              <Route path="/functional-medicine" element={<FunctionalMedicine />} />
              <Route path="/aromatherapy" element={<Aromatherapy />} />
              <Route path="/unani" element={<UnaniMedicine />} />
              <Route path="/unani-medicine" element={<UnaniMedicine />} />
              <Route path="/energy-healing" element={<EnergyHealing />} />
              <Route path="/mind-body" element={<MindBodyMedicine />} />
              <Route path="/mind-body-medicine" element={<MindBodyMedicine />} />
              <Route path="/bodywork" element={<BodyworkTherapies />} />
              <Route path="/manual-therapy" element={<BodyworkTherapies />} />
              <Route path="/nutrition" element={<NutritionalTherapy />} />
              <Route path="/nutritional-therapy" element={<NutritionalTherapy />} />
              <Route path="/sound-therapy" element={<SoundTherapy />} />
              <Route path="/sound-healing" element={<SoundTherapy />} />
              <Route path="/hydrotherapy" element={<Hydrotherapy />} />
              <Route path="/water-therapy" element={<Hydrotherapy />} />
              <Route path="/methodology" element={<EditorialMethodology />} />
              <Route path="/editorial-methodology" element={<EditorialMethodology />} />
              <Route path="/advisory-board" element={<AdvisoryBoard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/member-resources" element={<MemberResources />} />
              <Route path="/practitioner-repository" element={<PractitionerRepository />} />
              <Route path="/practitioners" element={<PractitionerDirectory />} />
              <Route path="/institutional-access" element={<InstitutionalAccess />} />
              <Route path="/institutional-pricing" element={<InstitutionalPricing />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
