import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock, Award, ArrowRight } from "lucide-react";

const Programs = () => {
  const programs = [
    {
      title: "Higher Secondary (11th & 12th)",
      level: "Plus Two",
      duration: "2 Years",
      students: "300+ Students",
      highlights: ["Science Stream", "Commerce Stream", "Computer Science", "Mathematics"],
      description: "Comprehensive higher secondary education preparing students for competitive exams and higher education."
    },
    {
      title: "Secondary Education (9th & 10th)",
      level: "High School", 
      duration: "2 Years",
      students: "400+ Students",
      highlights: ["CBSE Curriculum", "Science & Math Focus", "Language Arts", "Social Studies"],
      description: "Strong foundation in core subjects with focus on conceptual understanding and skill development."
    },
    {
      title: "Middle School (6th to 8th)",
      level: "Upper Primary",
      duration: "3 Years",
      students: "350+ Students", 
      highlights: ["Activity-based Learning", "Language Development", "Basic Sciences", "Creative Arts"],
      description: "Transitional phase focusing on conceptual learning and personality development."
    },
    {
      title: "Primary School (1st to 5th)",
      level: "Elementary",
      duration: "5 Years",
      students: "500+ Students",
      highlights: ["Foundation Skills", "Reading & Writing", "Basic Math", "Moral Education"],
      description: "Building strong educational foundation with emphasis on core learning skills and values."
    }
  ];

  const courses = [
    "Biology",
    "Botany",
    "Zoology",
    "Commerce",
    "Arts",
    "History",
    "Computer Science"
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
              Discover our comprehensive curriculum from primary to higher secondary education 
              designed to provide holistic development and academic excellence.
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

          {/* Courses Section */}
          <div className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Available Courses
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {courses.map((course, index) => (
                <span
                  key={index}
                  className="text-lg font-semibold text-accent hover:text-primary transition-colors duration-300"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="p-6 text-center bg-card-gradient">
              <Award className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                School Partnerships
              </h3>
              <p className="text-muted-foreground">
                Strong ties with educational institutions for academic excellence and growth
              </p>
            </Card>

            <Card className="p-6 text-center bg-card-gradient">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Expert Faculty
              </h3>
              <p className="text-muted-foreground">
                Experienced teachers with advanced qualifications and teaching expertise
              </p>
            </Card>

            <Card className="p-6 text-center bg-card-gradient">
              <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">
                Modern Curriculum
              </h3>
              <p className="text-muted-foreground">
                Updated syllabus aligned with current educational standards and requirements
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;