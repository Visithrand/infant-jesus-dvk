import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, Users, GraduationCap, ArrowRight, CheckCircle, Download } from "lucide-react";

const Admissions = () => {
  const admissionSteps = [
    {
      step: "01",
      title: "Application Form",
      description: "Submit your completed application form with required documents",
      icon: FileText
    },
    {
      step: "02", 
      title: "Document Verification",
      description: "Verification of submitted documents and academic records",
      icon: Users
    },
    {
      step: "03",
      title: "Merit List",
      description: "Check your name in the published merit list based on academic performance",
      icon: CheckCircle
    },
    {
      step: "04",
      title: "Admission Confirmation",
      description: "Complete the admission process and secure your seat",
      icon: GraduationCap
    }
  ];

  const requirements = [
    "Completed previous grade with minimum 60% marks",
    "Transfer Certificate from previous school (if applicable)",
    "Academic records and mark sheets",
    "Medical fitness certificate",
    "Character certificate from previous institution",
    "Birth certificate (original and photocopy)",
    "Caste certificate (if applicable)"
  ];

  const importantDates = [
    { event: "Application Start Date", date: "March 1, 2024" },
    { event: "Application Deadline", date: "May 31, 2024" },
    { event: "Document Verification", date: "June 5-10, 2024" },
    { event: "Merit List Publication", date: "June 15, 2024" },
    { event: "Admission Process", date: "June 20-30, 2024" },
    { event: "Classes Commence", date: "July 1, 2024" }
  ];

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
    <section id="admissions" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Admissions Open
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Begin your journey towards excellence. Join our community of learners 
              and unlock your potential with our comprehensive admission process.
            </p>
            
            {/* Grade Level Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">LKG to 5th Grade</h3>
                  <p className="text-blue-700 mb-4">Early childhood and primary education with focus on foundational skills</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="bg-blue-200 text-blue-800">Yoga & Chess</Badge>
                    <Badge variant="secondary" className="bg-blue-200 text-blue-800">Music & Dance</Badge>
                    <Badge variant="secondary" className="bg-blue-200 text-blue-800">Computer Education</Badge>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">6th to 12th Grade</h3>
                  <p className="text-purple-700 mb-4">Secondary education with specialized subjects and career guidance</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary" className="bg-purple-200 text-purple-800">NEET Coaching</Badge>
                    <Badge variant="secondary" className="bg-purple-200 text-purple-800">Research Labs</Badge>
                    <Badge variant="secondary" className="bg-purple-200 text-purple-800">Sports Excellence</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Admission Process */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-foreground text-center mb-12">
              Admission Process
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {admissionSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <Card className="p-6 h-full bg-card-gradient hover:shadow-medium transition-all duration-300 hover:scale-105">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {step.step}
                    </div>
                    <step.icon className="h-8 w-8 text-accent mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-foreground mb-3">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </Card>
                  {index < admissionSteps.length - 1 && (
                    <div className="hidden md:block">
                      <ArrowRight className="h-6 w-6 text-accent mx-auto mt-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Eligibility Requirements */}
            <Card className="p-8 bg-card-gradient">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                Eligibility Requirements
              </h3>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="accent" 
                className="w-full mt-6"
                onClick={handleDownloadForm}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Application Form
              </Button>
                             <p className="text-xs text-muted-foreground mt-2 text-center">
                 HTML form will download - open in browser to fill & print
               </p>
            </Card>

            {/* Important Dates */}
            <Card className="p-8 bg-card-gradient">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <CalendarDays className="h-6 w-6 text-accent mr-3" />
                Important Dates
              </h3>
              <div className="space-y-4">
                {importantDates.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-border pb-3">
                    <span className="text-foreground font-medium">{item.event}</span>
                    <span className="text-accent font-semibold">{item.date}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="hero" 
                className="w-full mt-6"
                onClick={handleDownloadForm}
              >
                <Download className="mr-2 h-4 w-4" />
                Download & Apply Now
              </Button>
                             <p className="text-xs text-muted-foreground mt-2 text-center">
                 Open HTML file in browser, fill it out, and print to apply
               </p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <Card className="p-8 bg-hero-gradient text-white">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl mb-6 text-white/90">
                Join thousands of successful alumni who have built their careers with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="accent" 
                  size="lg"
                  onClick={handleDownloadForm}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download & Apply Online
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Schedule Campus Visit
                </Button>
              </div>
                             <p className="text-sm text-white/80 mt-4 max-w-2xl mx-auto">
                 Download the HTML admission form to your Chrome downloads folder. Open it in your browser, fill it out completely, and print it along with all required documents to complete your application.
               </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;