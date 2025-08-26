import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Admissions from "@/components/Admissions";
import ParentPortal from "@/components/ParentPortal";
import Footer from "@/components/Footer";
import LiveEventPopup from "@/components/LiveEventPopup";
import EventGallery from "@/components/EventGallery";
import LiveNotification from "@/components/LiveNotification";
import FacilitiesSection from "@/components/FacilitiesSection";

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="space-y-12">
        <Hero />
        <About />
        <Programs />
        <Admissions />
        <EventGallery />
        <FacilitiesSection />
        <ParentPortal />
      </div>
      <Footer />
      {showPopup && <LiveEventPopup />}
      <LiveNotification />
    </div>
  );
};

export default Index;