import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  X, 
  Bell, 
  Phone,
  Mail,
  ExternalLink,
  Star,
  Users,
  BookOpen,
  Download
} from "lucide-react";

interface AdmissionInfo {
  id: number;
  gradeLevel: string;
  description: string;
  features: string[];
  isOpen: boolean;
}

const LiveNotification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAdmissionIndex, setCurrentAdmissionIndex] = useState(0);

  // Admission information for different grade levels
  const admissionInfo: AdmissionInfo[] = [
    {
      id: 1,
      gradeLevel: "LKG to 5th Grade",
      description: "Early childhood and primary education with focus on foundational skills and character development",
      features: [
        "Talent development activities",
        "Yoga, Chess, Skating, Dance",
        "Music and Martial Arts",
        "Computer-aided education",
        "Individual attention"
      ],
      isOpen: true
    },
    {
      id: 2,
      gradeLevel: "6th to 12th Grade",
      description: "Secondary and higher secondary education with specialized subjects and career guidance",
      features: [
        "Modern research labs",
        "NEET coaching for doctors",
        "Daily English workshops",
        "Excellence in sports",
        "Career guidance"
      ],
      isOpen: true
    }
  ];

  useEffect(() => {
    // Auto-rotate admission info every 8 seconds
    const interval = setInterval(() => {
      setCurrentAdmissionIndex((prev) => (prev + 1) % admissionInfo.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const handleApplyNow = () => {
    // Scroll to admissions section
    const admissionsSection = document.getElementById('admissions');
    if (admissionsSection) {
      admissionsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsVisible(false);
    
    // Trigger download after a short delay to allow scroll
    setTimeout(() => {
      handleDownloadForm();
    }, 1000);
  };

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

  const handleContact = () => {
    // Open contact information or phone number
    window.open('tel:+91-1234567890', '_self');
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const currentAdmission = admissionInfo[currentAdmissionIndex];

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl border-0 overflow-hidden">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse">
                <GraduationCap className="h-5 w-5 text-yellow-300" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ADMISSIONS OPEN
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* School Logo/Image */}
          <div className="mb-3">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xs font-semibold mb-1">INFANT JESUS MATRIC HR. SEC. SCHOOL</div>
              <div className="text-xs text-white/80">E.B. Road Extn., Devakottai</div>
              <div className="text-xs text-yellow-300 mt-1">LOVE • SERVICE • DISCIPLINE</div>
            </div>
          </div>

          {/* Current Admission Info */}
          <div className="bg-white/10 rounded-lg p-3 mb-3">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1 text-yellow-300">
                  {currentAdmission.gradeLevel}
                </h4>
                <p className="text-xs text-white/90 mb-2">
                  {currentAdmission.description}
                </p>
                <div className="flex items-center text-xs text-white/80 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Academic Year 2024-25</span>
                </div>
                
                {/* Features */}
                <div className="space-y-1">
                  {currentAdmission.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-white/80">
                      <Star className="h-2 w-2 mr-1 text-yellow-300" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              size="sm"
              onClick={handleApplyNow}
              className="bg-white text-blue-600 hover:bg-white/90 h-8 px-3 text-xs font-medium w-full"
            >
              <Download className="h-3 w-3 mr-1" />
              Apply Now & Download Form
            </Button>
            <p className="text-xs text-white/70 text-center">
              📥 HTML form will download - open in browser to fill & print
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleContact}
              className="border-white/30 text-white hover:bg-white/20 h-8 px-3 text-xs w-full"
            >
              <Phone className="h-3 w-3 mr-1" />
              Contact Us
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80">
                {currentAdmissionIndex + 1} of {admissionInfo.length}
              </span>
              <div className="flex space-x-1">
                {admissionInfo.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full ${
                      index === currentAdmissionIndex ? 'bg-yellow-300' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveNotification;
