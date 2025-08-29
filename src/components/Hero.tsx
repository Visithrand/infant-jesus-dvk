import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, BookOpen } from "lucide-react";
import heroCampus from "@/assets/hero-campus.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroCampus}
          alt="Campus View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Shaping Tomorrow's{" "}
            <span className="text-accent">Leaders</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Infant Jesus Matric Higher Secondary School - Where academic excellence meets{" "}
            innovation, nurturing students to become global leaders and change-makers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="accent" 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8"
              onClick={() => {
                const programsSection = document.getElementById('academics');
                if (programsSection) {
                  programsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Explore Programs
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base sm:text-lg px-6 sm:px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
            >
              Virtual Tour
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 sm:p-4 mb-4">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">25+</h3>
              <p className="text-white/90 text-sm sm:text-base">Years of Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 sm:p-4 mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">5000+</h3>
              <p className="text-white/90 text-sm sm:text-base">Alumni Network</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 sm:p-4 mb-4">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">50+</h3>
              <p className="text-white/90 text-sm sm:text-base">Programs Offered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ArrowRight className="h-6 w-6 text-white rotate-90" />
        </div>
      </div>
    </section>
  );
};

export default Hero;