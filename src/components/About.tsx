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
    "NAAC A+ Accredited Institution",
    "Top Matriculation School in Coimbatore",
    "100% University Placement Record",
    "State-of-the-art Infrastructure",
    "Award-winning Faculty Team",
    "Industry-Academia Partnerships"
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Our Institution
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              For over two decades, Infant Jesus Matric Higher Secondary School has been 
              a beacon of quality education, nurturing minds and shaping futures 
              with our commitment to academic excellence and holistic development.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* About Text */}
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                Excellence in Education Since 1996
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Located in the serene environment of Karamadai, Coimbatore, 
                our institution stands as a testament to quality education and 
                character building. We believe in nurturing not just academic 
                excellence but also the overall personality development of our students.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our comprehensive approach combines traditional values with 
                modern teaching methodologies, ensuring our students are 
                well-prepared for the challenges of tomorrow's world.
              </p>

              {/* Achievements */}
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={index} 
                  className="p-6 text-center hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient"
                >
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-3">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card-gradient hover:shadow-medium transition-all duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Target className="h-6 w-6 text-primary mr-3" />
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide world-class education that empowers students with 
                knowledge, skills, and values necessary to excel in their chosen 
                fields while contributing meaningfully to society.
              </p>
            </Card>

            <Card className="p-8 bg-card-gradient hover:shadow-medium transition-all duration-300">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Eye className="h-6 w-6 text-accent mr-3" />
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as a leading educational institution that 
                shapes global leaders, innovators, and responsible citizens 
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