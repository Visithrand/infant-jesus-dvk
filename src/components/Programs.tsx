import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock, Award, ArrowRight } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      title: "Business Administration",
      level: "Undergraduate & Graduate",
      duration: "3-4 Years",
      students: "500+ Students",
      highlights: ["Marketing", "Finance", "HR Management", "International Business"],
      description: "Comprehensive business education preparing students for leadership roles in the corporate world."
    },
    {
      title: "Computer Science",
      level: "Undergraduate & Graduate", 
      duration: "3-4 Years",
      students: "400+ Students",
      highlights: ["AI & ML", "Software Development", "Cybersecurity", "Data Science"],
      description: "Cutting-edge technology programs designed for the digital future."
    },
    {
      title: "Commerce & Accounting",
      level: "Undergraduate",
      duration: "3 Years",
      students: "300+ Students", 
      highlights: ["Financial Accounting", "Taxation", "Auditing", "Banking"],
      description: "Strong foundation in commerce and accounting principles for financial careers."
    },
    {
      title: "Mass Communication",
      level: "Undergraduate",
      duration: "3 Years",
      students: "200+ Students",
      highlights: ["Journalism", "Digital Media", "Public Relations", "Film Studies"],
      description: "Creative programs for the media and communication industry."
    }
  ];

  return (
    <section id="academics" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Academic Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our comprehensive range of undergraduate and graduate programs 
              designed to prepare you for success in today's competitive world.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {programs.map((program, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient border-l-4 border-l-primary"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {program.title}
                  </h3>
                  <p className="text-accent font-semibold">{program.level}</p>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {program.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {program.students}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  {program.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Key Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {program.highlights.map((highlight, idx) => (
                      <span 
                        key={idx}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full group">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-card-gradient">
              <Award className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Industry Partnerships
              </h3>
              <p className="text-muted-foreground">
                Strong ties with leading companies for internships and placements
              </p>
            </Card>

            <Card className="p-6 text-center bg-card-gradient">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Expert Faculty
              </h3>
              <p className="text-muted-foreground">
                Experienced professors with industry and research backgrounds
              </p>
            </Card>

            <Card className="p-6 text-center bg-card-gradient">
              <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Modern Curriculum
              </h3>
              <p className="text-muted-foreground">
                Updated syllabus aligned with current industry requirements
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;