import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, GraduationCap, Briefcase, Award } from "lucide-react";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  graduationYear: string;
  achievement: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Senior Software Engineer",
      company: "Microsoft India",
      image: "/api/placeholder/80/80",
      content: "Infant Jesus School provided me with the perfect foundation for my career. The teachers' dedication and the school's focus on holistic development shaped me into the person I am today.",
      rating: 5,
      graduationYear: "2010",
      achievement: "Gold Medalist - Computer Science"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Medical Doctor",
      company: "Apollo Hospitals",
      image: "/api/placeholder/80/80",
      content: "The values instilled in me at Infant Jesus School - integrity, compassion, and excellence - continue to guide me in my medical practice. I'm grateful for the strong foundation.",
      rating: 5,
      graduationYear: "2008",
      achievement: "MBBS with Distinction"
    },
    {
      id: 3,
      name: "Sneha Patel",
      role: "Investment Banker",
      company: "Goldman Sachs",
      image: "/api/placeholder/80/80",
      content: "The analytical thinking and problem-solving skills I developed at school have been invaluable in my finance career. The teachers truly cared about our success.",
      rating: 5,
      graduationYear: "2012",
      achievement: "Top 1% in State Board"
    },
    {
      id: 4,
      name: "Arjun Menon",
      role: "Research Scientist",
      company: "ISRO",
      image: "/api/placeholder/80/80",
      content: "The school's emphasis on scientific thinking and innovation sparked my passion for research. I'm proud to contribute to India's space program.",
      rating: 5,
      graduationYear: "2009",
      achievement: "PhD in Aerospace Engineering"
    },
    {
      id: 5,
      name: "Meera Iyer",
      role: "Social Entrepreneur",
      company: "Education for All Foundation",
      image: "/api/placeholder/80/80",
      content: "Infant Jesus School taught me that education is a tool for social change. I'm now working to provide quality education to underprivileged children.",
      rating: 5,
      graduationYear: "2011",
      achievement: "Social Impact Award Winner"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-br from-secondary/30 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 scroll-reveal">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto scroll-reveal">
              Hear from our accomplished alumni who are making a difference in various fields around the world
            </p>
          </div>

          {/* Main Testimonial Card */}
          <div className="relative mb-12">
            <Card className="card-professional p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar and Info */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <Avatar className="w-20 h-20 md:w-24 md:h-24 mx-auto md:mx-0 mb-4 ring-4 ring-primary/20">
                    <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                    <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-primary font-semibold mb-1">
                    {currentTestimonial.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-3">
                    {currentTestimonial.company}
                  </p>
                  
                  {/* Achievement Badge */}
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                    <Award className="h-4 w-4" />
                    {currentTestimonial.achievement}
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="flex-1">
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                    <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 italic">
                      "{currentTestimonial.content}"
                    </blockquote>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  {/* Graduation Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Class of {currentTestimonial.graduationYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Alumni</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Alumni Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center scroll-reveal">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">5000+</h3>
              <p className="text-muted-foreground">Alumni Worldwide</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">95%</h3>
              <p className="text-muted-foreground">Employment Rate</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">200+</h3>
              <p className="text-muted-foreground">Award Winners</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">4.9/5</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
