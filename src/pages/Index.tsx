import Header from "@/components/Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutSlideshow from "@/components/AboutSlideshow";
import LeadershipSection from "@/components/LeadershipSection";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Admissions from "@/components/Admissions";
import ParentPortal from "@/components/ParentPortal";
import Footer from "@/components/Footer";
import EventGallery from "@/components/EventGallery";
import LiveNotification from "@/components/LiveNotification";
import LiveClasses from "@/components/LiveClasses";
import LiveClassesPopup from "@/components/LiveClassesPopup";
import FacilitiesSection from "@/components/FacilitiesSection";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
    const hash = location.hash;
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="space-y-12">
        <Hero />
        <About />
        <AboutSlideshow />
        <Programs />
        <Admissions />
        <EventGallery />
        <LiveClasses />
        <FacilitiesSection />
        <ParentPortal />
        <LeadershipSection />
      </div>
      <Footer />
      <LiveNotification />
      <LiveClassesPopup />
    </div>
  );
};

export default Index;