import { useState, useEffect } from "react";
import { ChevronUp, Home, Info, GraduationCap, UserPlus, Calendar, Building2 } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSections, setShowSections] = useState(false);

  const sections = [
    { id: "about", name: "About Us", icon: Info, color: "bg-blue-500" },
    { id: "academics", name: "Academics", icon: GraduationCap, color: "bg-green-500" },
    { id: "admissions", name: "Admissions", icon: UserPlus, color: "bg-purple-500" },
    { id: "events", name: "Events", icon: Calendar, color: "bg-red-500" },
    { id: "facilities", name: "Facilities", icon: Building2, color: "bg-orange-500" },
  ];

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowSections(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed left-4 bottom-4 z-50">
      {/* Section Navigation */}
      {showSections && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[180px] mb-2">
          <div className="text-center mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Quick Sections</h3>
          </div>
          
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className={`${section.color} p-2 rounded-lg`}>
                  <section.icon className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-gray-700 font-medium">{section.name}</span>
              </button>
            ))}
          </div>

          {/* Close Button */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={() => setShowSections(false)}
              className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Main Buttons */}
      <div className="flex flex-col space-y-2">
        {/* Section Navigation Toggle */}
        <button
          onClick={() => setShowSections(!showSections)}
          className="bg-secondary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title="Quick Sections"
        >
          <Home className="h-5 w-5" />
        </button>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title="Back to Top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default BackToTop;
