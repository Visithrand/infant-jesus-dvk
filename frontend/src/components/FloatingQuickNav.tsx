import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Info, 
  GraduationCap, 
  UserPlus, 
  Calendar, 
  Building2, 
  MessageCircle, 
  Settings,
  ChevronUp,
  ChevronDown,
  Megaphone
} from "lucide-react";

const FloatingQuickNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const quickLinks = [
    { name: "Home", href: "/", icon: Home, color: "bg-blue-500" },
    { name: "About Us", href: "/#about", icon: Info, color: "bg-green-500" },
    { name: "Academics", href: "/#academics", icon: GraduationCap, color: "bg-purple-500" },
    { name: "Admissions", href: "/#admissions", icon: UserPlus, color: "bg-orange-500" },
    { name: "Events", href: "/#events", icon: Calendar, color: "bg-red-500" },
    { name: "Announcements", href: "/announcements", icon: Megaphone, color: "bg-yellow-500" },
    { name: "Facilities", href: "/#facilities", icon: Building2, color: "bg-indigo-500" },
    { name: "Contact", href: "/contact", icon: MessageCircle, color: "bg-pink-500" },
    { name: "Admin", href: "/admin", icon: Settings, color: "bg-gray-600" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        {isExpanded ? (
          <ChevronDown className="h-6 w-6" />
        ) : (
          <ChevronUp className="h-6 w-6" />
        )}
      </button>

      {/* Expanded Quick Links */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[200px]">
          <div className="text-center mb-3">
            <h3 className="text-sm font-semibold text-gray-800">Quick Navigation</h3>
          </div>
          
          <div className="space-y-2">
            {quickLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`${link.color} p-2 rounded-lg`}>
                  <link.icon className="h-4 w-4 text-white" />
                </div>
                {link.href.startsWith('/#') ? (
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-gray-700 hover:text-primary font-medium text-left flex-1"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="text-sm text-gray-700 hover:text-primary font-medium text-left flex-1"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingQuickNav;
