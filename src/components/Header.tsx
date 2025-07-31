import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import schoolLogo from "@/assets/school-logo.png";
import herocampus from "@/assets/hero-campus.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// Define the prop type for clarity (optional but good practice)
interface HeaderProps {
  setActiveSection?: (section: string) => void; // Make setActiveSection optional
}

const Header: React.FC<HeaderProps> = ({ setActiveSection = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const navItems = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Academics", section: "programs" }, // Assuming Academics corresponds to Programs component
    { name: "Admissions", section: "admissions" },
    { name: "Facilities", section: "facilities" },
    { name: "Celebrations", href: "/celebrations" }, // These will still be links to other pages
    { name: "Contact", href: "/contact" }, // These will still be links to other pages
  ];

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false); // Close mobile menu on click
  };

  const handlePageNavClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    setIsMenuOpen(false); // Close mobile menu on click
    navigate(href); // Use the navigate function to go to the specified href
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>8220092495</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@infantjesusschool.ac.in</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 mr-2" />
            <span>DEVAKOTTAI, sivagangai, 630302</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-background shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and School Name */}
            <div className="flex items-center space-x-4">
              <img 
                src={schoolLogo} 
                alt="Infant Jesus School Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  INFANT JESUS MATRIC HIGHER SECONDARY SCHOOL
                </h1>
                <p className="text-sm text-muted-foreground">
                  Excellence in Education
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                item.section ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.section)}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                    onClick={(e) => handlePageNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <Button variant="accent" size="sm">
                Apply Now
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
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
              "lg:hidden mt-4 space-y-4 transition-all duration-300",
              isMenuOpen ? "block" : "hidden"
            )}
          >
            {navItems.map((item) => (
               item.section ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.section)}
                  className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={(e) => handlePageNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              )
            ))}
            <Button variant="accent" size="sm" className="w-full">
              Apply Now
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;