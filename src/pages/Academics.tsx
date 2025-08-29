import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Clock, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Academics = () => {
  const programs = [
    {
      title: "Higher Secondary (11th & 12th)",
      level: "Plus Two",
      duration: "2 Years",
      students: "300+ Students",
      highlights: ["Science Stream", "Commerce Stream", "Computer Science", "Mathematics"],
      description: "Comprehensive higher secondary education preparing students for competitive exams and higher education.",
      link: "/higher-secondary-essay",
    },
    {
      title: "Secondary Education (9th & 10th)",
      level: "High School", 
      duration: "2 Years",
      students: "400+ Students",
      highlights: ["CBSE Curriculum", "Science & Math Focus", "Language Arts", "Social Studies"],
      description: "Strong foundation in core subjects with focus on conceptual understanding and skill development.",
      link: "/secondary-essay",
    },
    {
      title: "Middle School (6th to 8th)",
      level: "Upper Primary",
      duration: "3 Years",
      students: "350+ Students", 
      highlights: ["Activity-based Learning", "Language Development", "Basic Sciences", "Creative Arts"],
      description: "Transitional phase focusing on conceptual learning and personality development.",
      link: "/senior-essay",
    },
    {
      title: "Primary School (1st to 5th)",
      level: "Elementary",
      duration: "5 Years",
      students: "500+ Students",
      highlights: ["Foundation Skills", "Reading & Writing", "Basic Math", "Moral Education"],
      description: "Building strong educational foundation with emphasis on core learning skills and values.",
      link: "/primary-essay",
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Academic Excellence
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive curriculum from primary to higher secondary education, 
              designed to provide holistic development and academic excellence.
            </p>
          </div>
        </section>

        {/* Programs Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Academic Programs
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From foundational learning to advanced studies, we offer a complete educational journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-primary"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {program.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {program.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {program.students}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2">Key Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link 
                    to={program.link}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Join Our Academic Community?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the first step towards academic excellence and holistic development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/admissions"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Academics;
