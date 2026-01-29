import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingBackToTop from "@/components/ui/floating-back-to-top";
import Index from "./pages/Index";
import About from "./pages/About";
import IntegrativeTherapies from "./pages/IntegrativeTherapies";
import Ayurveda from "./pages/Ayurveda";
import Merch from "./pages/Merch";
import Auth from "./pages/Auth";
import Search from "./pages/Search";
import Research from "./pages/Research";
import Compounds from "./pages/Compounds";
import CompoundPage from "./pages/Compound";
import ConditionPage from "./pages/Condition";
import ConditionsPage from "./pages/Conditions";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

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
              <Route path="/integrative-therapies" element={<IntegrativeTherapies />} />
              <Route path="/ayurveda" element={<Ayurveda />} />
              <Route path="/merch" element={<Merch />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/search" element={<Search />} />
              <Route path="/research" element={<Research />} />
              <Route path="/compounds" element={<Compounds />} />
              <Route path="/compound/:id" element={<CompoundPage />} />
              <Route path="/conditions" element={<ConditionsPage />} />
              <Route path="/condition/:id" element={<ConditionPage />} />
              <Route path="/pricing" element={<Pricing />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
