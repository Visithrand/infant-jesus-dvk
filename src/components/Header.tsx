import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import schoolLogo from "@/assets/school-logo.png";
import herocampus from "@/assets/hero-campus.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Admissions", href: "#admissions" },
    { name: "Facilities", href: "#facilities" },
    { name: "Celebrations", href: "/celebrations" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  const handleDownloadForm = () => {
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = '/admission-form.txt';
    link.download = 'Infant-Jesus-School-Admission-Form.txt';
    link.target = '_blank';
    
    // Add a message about Chrome download
    const message = "The admission application form is now downloading. Please check your Chrome downloads folder for the text file. You can print this form, fill it out, and submit it to complete your application.";
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <MapPin className="h-4 w-4" />
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
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ))}
              <Button variant="accent" size="sm" onClick={handleDownloadForm}>
                <Download className="mr-2 h-3 w-3" />
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
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button variant="accent" size="sm" className="w-full" onClick={handleDownloadForm}>
              <Download className="mr-2 h-3 w-3" />
              Apply Now
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;