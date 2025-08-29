import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Celebrations from "./pages/Celebrations";
import AdminDashboard from "./components/AdminDashboard";
import KindergartenSection from "./pages/KindergartenSection";
import KindergartenEssay from "./pages/KindergartenEssay";
import MatricSection from "./pages/MatricSection";
import MatricEssay from "./pages/MatricEssay";
import PrimaryEssay from "./pages/PrimaryEssay";
import SeniorEssay from "./pages/SeniorEssay";
import SecondaryEssay from "./pages/SecondaryEssay";
import HigherSecondaryEssay from "./pages/HigherSecondaryEssay";
import AuthenticationPage from "./components/AuthenticationPage";
import ApiTest from "./components/ApiTest";
import AuthDebug from "./components/AuthDebug";
import Academics from "./pages/Academics";
import Facilities from "./pages/Facilities";
import Events from "./pages/Events";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/celebrations" element={<Celebrations />} />
          <Route path="/kindergarten" element={<KindergartenSection />} />
          <Route path="/kindergarten-essay" element={<KindergartenEssay />} />
          <Route path="/matric" element={<MatricSection />} />
          <Route path="/matric-essay" element={<MatricEssay />} />
          <Route path="/primary-essay" element={<PrimaryEssay />} />
          <Route path="/senior-essay" element={<SeniorEssay />} />
          <Route path="/secondary-essay" element={<SecondaryEssay />} />
          <Route path="/higher-secondary-essay" element={<HigherSecondaryEssay />} />
          <Route path="/admin" element={<AuthenticationPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="/auth-debug" element={<AuthDebug />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/events" element={<Events />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
