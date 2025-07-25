import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Admissions from "@/components/Admissions";
import ParentPortal from "@/components/ParentPortal";
import Footer from "@/components/Footer";
import LiveEventPopup from "@/components/LiveEventPopup";

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
      <Hero />
      <About />
      <Programs />
      <Admissions />
      <ParentPortal />
      <Footer />
      {showPopup && <LiveEventPopup />}
    </div>
  );
};

export default Index;