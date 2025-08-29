import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  ArrowRight,
  Wifi,
  Monitor,
  FlaskConical,
  Car,
  Utensils,
  Heart,
  Camera,
  GraduationCap
} from "lucide-react";

const Facilities = () => {
  const facilities = [
    {
      title: "Modern Science Laboratories",
      description: "State-of-the-art physics, chemistry, and biology labs with latest equipment for hands-on learning.",
      icon: FlaskConical,
      features: ["Latest Equipment", "Safety Standards", "Experiential Learning", "Professional Setup"]
    },
    {
      title: "Computer Labs",
      description: "Fully equipped computer laboratories with modern systems and software for technology education.",
      icon: Monitor,
      features: ["Latest Computers", "Educational Software", "Internet Access", "Programming Tools"]
    },
    {
      title: "Well-stocked Library",
      description: "Extensive collection of books, reference materials, and digital resources for comprehensive learning.",
      icon: BookOpen,
      features: ["Reference Books", "Fiction Collection", "Digital Resources", "Reading Space"]
    },
    {
      title: "Sports Ground & Indoor Games",
      description: "Large playground for outdoor sports and indoor facilities for various games and activities.",
      icon: Award,
      features: ["Cricket Ground", "Football Field", "Indoor Games", "Sports Equipment"]
    },
    {
      title: "Transportation Services",
      description: "Safe and reliable transportation services covering major routes for student convenience.",
      icon: Car,
      features: ["Safe Vehicles", "Experienced Drivers", "Route Coverage", "Timely Service"]
    },
    {
      title: "Cafeteria & Health Monitoring",
      description: "Hygienic food services and regular health check-ups for student well-being.",
      icon: Utensils,
      features: ["Hygienic Food", "Nutritional Meals", "Health Checks", "Clean Environment"]
    },
    {
      title: "Audio-Visual Learning Centers",
      description: "Modern multimedia facilities for enhanced learning through visual and audio content.",
      icon: Camera,
      features: ["Projectors", "Sound Systems", "Interactive Displays", "Digital Content"]
    },
    {
      title: "Career Counseling Cell",
      description: "Professional guidance for students to make informed decisions about their future careers.",
      icon: GraduationCap,
      features: ["Career Guidance", "University Counseling", "Skill Assessment", "Future Planning"]
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
              World-Class Facilities
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience learning in an environment equipped with modern amenities and cutting-edge technology
            </p>
          </div>
        </section>

        {/* Facilities Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Facilities
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From modern laboratories to sports facilities, we provide everything needed for holistic development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-primary"
                >
                  <div className="mb-4">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <facility.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                      {facility.title}
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                      {facility.description}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {facility.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Additional Amenities
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We go beyond basic facilities to provide an exceptional learning environment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Wi-Fi Campus</h3>
                <p className="text-sm text-muted-foreground">High-speed internet access throughout the campus</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Medical Room</h3>
                <p className="text-sm text-muted-foreground">First-aid and basic medical care facilities</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Smart Classrooms</h3>
                <p className="text-sm text-muted-foreground">Interactive learning with modern technology</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Security</h3>
                <p className="text-sm text-muted-foreground">Round-the-clock security for student safety</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Experience Our Facilities Firsthand
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a visit to see our world-class facilities and understand how they enhance learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#admissions"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Schedule Visit <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Facilities;
