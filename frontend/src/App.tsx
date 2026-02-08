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
import EditorialMethodology from "@/pages/EditorialMethodology";
import AdvisoryBoard from "@/pages/AdvisoryBoard";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import MemberResources from "@/pages/MemberResources";
import PractitionerRepository from "@/pages/PractitionerRepository";
import InstitutionalAccess from "@/pages/InstitutionalAccess";
import InstitutionalPricing from "@/pages/InstitutionalPricing";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

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
              <Route path="/methodology" element={<EditorialMethodology />} />
              <Route path="/editorial-methodology" element={<EditorialMethodology />} />
              <Route path="/advisory-board" element={<AdvisoryBoard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/member-resources" element={<MemberResources />} />
              <Route path="/practitioner-repository" element={<PractitionerRepository />} />
              <Route path="/institutional-access" element={<InstitutionalAccess />} />
              <Route path="/institutional-pricing" element={<InstitutionalPricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
