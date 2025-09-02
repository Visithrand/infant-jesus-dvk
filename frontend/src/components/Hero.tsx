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
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Shaping Tomorrow's{" "}
            <span className="text-accent">Leaders</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90 max-w-3xl mx-auto px-4">
            Infant Jesus Matric Higher Secondary School - Where academic excellence meets{" "}
            innovation, nurturing students to become global leaders and change-makers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4">
            <Button 
              variant="accent" 
              size="lg" 
              className="text-sm md:text-base lg:text-lg px-4 md:px-6 py-2 md:py-3"
              onClick={() => {
                const programsSection = document.getElementById('academics');
                if (programsSection) {
                  programsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Explore Programs
              <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-sm md:text-base lg:text-lg px-4 md:px-6 py-2 md:py-3 bg-white/10 border-white text-white hover:bg-white hover:text-primary"
            >
              Virtual Tour
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-3xl mx-auto px-4">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-2 md:p-3 lg:p-4 mb-3 md:mb-4">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">25+</h3>
              <p className="text-white/90 text-xs sm:text-sm md:text-base">Years of Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-2 md:p-3 lg:p-4 mb-3 md:mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">5000+</h3>
              <p className="text-white/90 text-xs sm:text-sm md:text-base">Alumni Network</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-2 md:p-3 lg:p-4 mb-3 md:mb-4">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-accent" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">50+</h3>
              <p className="text-white/90 text-xs sm:text-sm md:text-base">Programs Offered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ArrowRight className="h-4 w-4 md:h-6 md:w-6 text-white rotate-90" />
        </div>
      </div>
    </section>
  );
};

export default Hero;