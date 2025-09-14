import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Celebrations from "./pages/Celebrations";
import Announcements from "./pages/Announcements";
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

const queryClient = new QueryClient();
console.log('VITE_NODE_SERVER_URL =', import.meta.env.VITE_NODE_SERVER_URL);
console.log('__BACKEND_URL__ =', (globalThis as any).__BACKEND_URL__);
console.log('API_CONFIG.BASE_URL =', (globalThis as any).__BACKEND_URL__ || import.meta.env.VITE_BACKEND_URL || 'NOT SET');

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/celebrations" element={<Celebrations />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/academics" element={<Index />} />
            <Route path="/kindergarten" element={<KindergartenSection />} />
            <Route path="/kindergarten-essay" element={<KindergartenEssay />} />
            <Route path="/matric" element={<MatricSection />} />
            <Route path="/matric-essay" element={<MatricEssay />} />
            <Route path="/primary-essay" element={<PrimaryEssay />} />
            <Route path="/senior-essay" element={<SeniorEssay />} />
            <Route path="/secondary-essay" element={<SecondaryEssay />} />
            <Route path="/higher-secondary-essay" element={<HigherSecondaryEssay />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AuthenticationPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
