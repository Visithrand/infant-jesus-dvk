import Header from "@/components/Header";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AboutSlideshow from "@/components/AboutSlideshow";
import LeadershipSection from "@/components/LeadershipSection";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Admissions from "@/components/Admissions";
import Footer from "@/components/Footer";
import LiveClassesPopup from "@/components/LiveClassesPopup";
import AnnouncementsDisplay from "@/components/AnnouncementsDisplay";
import DeveloperCard from "@/components/DeveloperCard";
import EventsDisplay from "@/components/EventsDisplay";
import FloatingQuickNav from "@/components/FloatingQuickNav";
import BackToTop from "@/components/BackToTop";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import StatsDashboard from "@/components/StatsDashboard";
import VirtualTour from "@/components/VirtualTour";
import EnhancedContact from "@/components/EnhancedContact";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      <div className="space-y-8 md:space-y-12 lg:space-y-16">
        <Hero />
        <div id="about">
          <About />
        </div>
        <AboutSlideshow />
        <div id="academics">
          <Programs />
          {/* Class and Event View Buttons */}
          <div className="text-center py-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/admin?tab=events')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                View All Events
              </button>
              <button 
                onClick={() => navigate('/admin?tab=classes')}
                className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                View All Classes
              </button>
            </div>
          </div>
        </div>
        <div id="announcements" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Announcements</h2>
              <p className="text-gray-600">Important updates from the school</p>
            </div>
            <AnnouncementsDisplay />
          </div>
        </div>
        <div id="admissions">
          <Admissions />
        </div>
        
        {/* Statistics Dashboard */}
        <div id="statistics">
          <StatsDashboard />
        </div>
        
        {/* Virtual Tour Section */}
        <div id="virtual-tour">
          <VirtualTour />
        </div>
        
        {/* Events Section */}
        <div id="events" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay updated with our latest school events, activities, and important dates
              </p>
            </div>
            
            {/* Section Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                About Us
              </button>
              <button 
                onClick={() => document.getElementById('academics')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors text-sm font-medium"
              >
                Academics
              </button>
              <button 
                onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors text-sm font-medium"
              >
                Admissions
              </button>
            </div>
            
            <EventsDisplay />
            <div className="text-center mt-8 space-y-4">
              <button 
                onClick={() => navigate('/admin?tab=events')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors mr-4"
              >
                View All Events
              </button>
              <button 
                onClick={() => navigate('/admin?tab=events')}
                className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Create New Event
              </button>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div id="contact">
          <EnhancedContact />
        </div>
        
        <LeadershipSection />
        <DeveloperCard />
      </div>
      <Footer />
      <LiveClassesPopup />
      <AnnouncementPopup />
      <FloatingQuickNav />
      <BackToTop />
    </div>
  );
};

export default Index;