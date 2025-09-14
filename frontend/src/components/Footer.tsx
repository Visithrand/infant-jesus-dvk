import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Academic Programs", href: "/#academics" },
    { name: "Admissions", href: "/#admissions" },
    { name: "Events", href: "/#events" },
    { name: "Announcements", href: "/announcements" },
    { name: "Facilities", href: "/#facilities" },
    { name: "Contact", href: "/contact" },
    { name: "Admin Dashboard", href: "/admin" }
  ];

  const programs = [
    { name: "Business Administration", href: "#" },
    { name: "Computer Science", href: "#" },
    { name: "Commerce & Accounting", href: "#" },
    { name: "Mass Communication", href: "#" },
    { name: "Engineering", href: "#" },
    { name: "Arts & Sciences", href: "#" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground relative">
      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent hover:bg-accent/90 rounded-full p-3"
        size="sm"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Institution Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img 
                src={schoolLogo} 
                alt="Infant Jesus School Logo" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h3 className="text-xl font-bold">Infant Jesus School</h3>
                <p className="text-sm text-primary-foreground/80">Excellence in Education</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Nurturing minds, shaping futures. Infant Jesus Matric Higher Secondary School 
              has been a beacon of quality education for over two decades.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-white/10">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* School Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">School Services</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/#events"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  to="/#facilities"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  Campus Facilities
                </Link>
              </li>
              <li>
                <Link
                  to="/admin?tab=classes"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  Live Classes
                </Link>
              </li>
              <li>
                <Link
                  to="/admin?tab=events"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  Event Management
                </Link>
              </li>
              <li>
                <Link
                  to="/admin?tab=facilities"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                >
                  Facility Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary-foreground/80">
                    Infant Jesus Matric Higher Secondary School<br />
                    DEVAKOTTAI, sivagangai<br />
                    630302
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">8220092495</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-primary-foreground/80">info@infantjesusschool.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/80 text-sm">
              © 2024 Infant Jesus Matric Higher Secondary School. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;