import { Card } from "@/components/ui/card";
import { CheckCircle, Target, Eye, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Commitment to the highest standards in education and character development."
    },
    {
      icon: Eye,
      title: "Innovation",
      description: "Embracing modern teaching methodologies and technology-driven learning."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Building character and ethical leadership in all our students."
    },
    {
      icon: CheckCircle,
      title: "Community",
      description: "Fostering a supportive environment for holistic growth and development."
    }
  ];

  const achievements = [
    "Govt+ Accredited Institution",
    "Top Matriculation School in Sivagangai , devakottai",
    "100% University Placement Record",
    "State-of-the-art Infrastructure",
    "Award-winning Faculty Team",
    "Industry-Academia Partnerships"
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              About Our Institution
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              For over two decades, Infant Jesus Matric Higher Secondary School has been{" "}
              a beacon of quality education, nurturing minds and shaping futures{" "}
              with our commitment to academic excellence and holistic development.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-8 sm:mb-12 md:mb-16">
            {/* About Text */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Excellence in Education Since 1996
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Located in the serene environment of devakottai,Sivagangai,{" "}
                our institution stands as a testament to quality education and{" "}
                character building. We believe in nurturing not just academic{" "}
                excellence but also the overall personality development of our students.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Our comprehensive approach combines traditional values with{" "}
                modern teaching methodologies, ensuring our students are{" "}
                well-prepared for the challenges of tomorrow's world.
              </p>

              {/* Achievements */}
              <div className="space-y-2 sm:space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground font-medium text-xs sm:text-sm md:text-base">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {values.map((value, index) => (
                <Card 
                  key={index} 
                  className="p-3 sm:p-4 md:p-6 text-center hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient"
                >
                  <div className="bg-primary/10 rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <value.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-foreground mb-2 sm:mb-3">
                    {value.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <Card className="p-4 sm:p-6 md:p-8 bg-card-gradient hover:shadow-medium transition-all duration-300">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center">
                <Target className="h-4 w-5 sm:h-5 sm:w-6 text-primary mr-2 sm:mr-3" />
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                To provide world-class education that empowers students with{" "}
                knowledge, skills, and values necessary to excel in their chosen{" "}
                fields while contributing meaningfully to society.
              </p>
            </Card>

            <Card className="p-4 sm:p-6 md:p-8 bg-card-gradient hover:shadow-medium transition-all duration-300">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 flex items-center">
                <Eye className="h-4 w-5 sm:h-5 sm:w-6 text-accent mr-2 sm:mr-3" />
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">
                To be recognized as a leading educational institution that{" "}
                shapes global leaders, innovators, and responsible citizens{" "}
                who drive positive change in the world.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;