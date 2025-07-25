import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, Users, GraduationCap, ArrowRight, CheckCircle } from "lucide-react";

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
      title: "Entrance Test",
      description: "Appear for our entrance examination and personal interview",
      icon: Users
    },
    {
      step: "03",
      title: "Merit List",
      description: "Check your name in the published merit list",
      icon: CheckCircle
    },
    {
      step: "04",
      title: "Admission",
      description: "Complete the admission process and join our institution",
      icon: GraduationCap
    }
  ];

  const requirements = [
    "Completed Higher Secondary Education (12th Grade)",
    "Minimum 60% aggregate marks in qualifying examination",
    "Valid entrance test score",
    "Medical fitness certificate",
    "Character certificate from previous institution",
    "Caste certificate (if applicable)"
  ];

  const importantDates = [
    { event: "Application Start Date", date: "March 1, 2024" },
    { event: "Application Deadline", date: "May 31, 2024" },
    { event: "Entrance Examination", date: "June 15, 2024" },
    { event: "Merit List Publication", date: "June 30, 2024" },
    { event: "Admission Process", date: "July 1-15, 2024" },
    { event: "Classes Commence", date: "August 1, 2024" }
  ];

  return (
    <section id="admissions" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Admissions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Begin your journey towards excellence. Join our community of learners 
              and unlock your potential with our comprehensive admission process.
            </p>
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
              <Button variant="accent" className="w-full mt-6">
                Download Application Form
              </Button>
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
              <Button variant="hero" className="w-full mt-6">
                Apply Now
              </Button>
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
                <Button variant="accent" size="lg">
                  Apply Online
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Schedule Campus Visit
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admissions;