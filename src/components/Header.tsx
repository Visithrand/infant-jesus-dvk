import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, Download, GraduationCap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import schoolLogo from "@/assets/school-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Academics", href: "/#academics" },
    { name: "Admissions", href: "/#admissions" },
    { name: "Facilities", href: "/#facilities" },
    { name: "Events", href: "/#events" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadForm = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/admission-form.html';
    link.download = 'Infant-Jesus-School-Admission-Form.html';
    link.target = '_blank';
    
    // Add a message about Chrome download
    const message = "✅ Admission form downloaded successfully!\n\n📁 Check your Chrome downloads folder for: 'Infant-Jesus-School-Admission-Form.html'\n\n📝 Open the HTML file in your browser, fill it out, and print it to complete your application.\n\n💡 Tip: You can also save as PDF from the browser's print menu.\n\n📞 Contact us if you need any assistance!";
    
    // Show download message
    alert(message);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-3 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto flex flex-wrap items-center justify-between text-sm relative z-10">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="font-medium">+91 82200 92495</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
              <Mail className="h-4 w-4" />
              <span className="font-medium">info@infantjesusschool.ac.in</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Devakottai, Sivagangai - 630302</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <Clock className="h-3 w-3" />
              <span className="text-xs font-medium">Admissions Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
          : "bg-white shadow-soft"
      )}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and School Name */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={schoolLogo} 
                  alt="Infant Jesus School Logo" 
                  className="h-14 w-14 object-contain shadow-lg rounded-lg"
                />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  INFANT JESUS MATRIC
                  <br />
                  <span className="text-blue-600">HIGHER SECONDARY SCHOOL</span>
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Excellence in Education • Love • Service • Discipline
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              ))}
              <div className="ml-4">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleDownloadForm}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Apply Now
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "lg:hidden mt-4 space-y-2 transition-all duration-300 overflow-hidden",
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-4 py-3 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg" 
                onClick={handleDownloadForm}
              >
                <Download className="mr-2 h-4 w-4" />
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;