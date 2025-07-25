import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Admissions from "@/components/Admissions";
import ParentPortal from "@/components/ParentPortal";
import Footer from "@/components/Footer";
import LiveEventPopup from "@/components/LiveEventPopup";
import Facilities from "@/components/Facilities";

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // 'home', 'about', 'programs', 'admissions', 'facilities', 'parentportal'

  useEffect(() => {
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-12">
            <Hero />
            <About />
            <Programs />
            <Admissions />
            <Facilities />
            <ParentPortal />
          </div>
        );
      case 'about':
        return <About />;
      case 'programs':
        return <Programs />;
      case 'admissions':
        return <Admissions />;
      case 'facilities':
        return <Facilities />;
      case 'parentportal':
        return <ParentPortal />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header setActiveSection={setActiveSection} />
      {renderSection()}
      <Footer />
      {showPopup && <LiveEventPopup />}
    </div>
  );
};

export default Index;