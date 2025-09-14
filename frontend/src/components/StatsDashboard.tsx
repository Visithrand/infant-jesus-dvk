import { Card } from "@/components/ui/card";
import { 
  Users, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Trophy, 
  Globe, 
  TrendingUp, 
  Star,
  Clock,
  Target
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface StatItem {
  id: string;
  icon: React.ComponentType<any>;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: StatItem[] = [
    {
      id: 'students',
      icon: Users,
      value: 2500,
      suffix: '+',
      label: 'Active Students',
      description: 'Currently enrolled across all programs',
      color: 'text-blue-600',
      trend: { value: 12, isPositive: true }
    },
    {
      id: 'alumni',
      icon: GraduationCap,
      value: 5000,
      suffix: '+',
      label: 'Alumni Network',
      description: 'Successful graduates worldwide',
      color: 'text-green-600',
      trend: { value: 8, isPositive: true }
    },
    {
      id: 'teachers',
      icon: BookOpen,
      value: 150,
      suffix: '+',
      label: 'Expert Faculty',
      description: 'Qualified and experienced teachers',
      color: 'text-purple-600',
      trend: { value: 5, isPositive: true }
    },
    {
      id: 'programs',
      icon: Target,
      value: 25,
      suffix: '+',
      label: 'Programs Offered',
      description: 'From kindergarten to higher secondary',
      color: 'text-orange-600',
      trend: { value: 3, isPositive: true }
    },
    {
      id: 'awards',
      icon: Trophy,
      value: 50,
      suffix: '+',
      label: 'Awards Won',
      description: 'Recognition and achievements',
      color: 'text-yellow-600',
      trend: { value: 15, isPositive: true }
    },
    {
      id: 'years',
      icon: Clock,
      value: 25,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Serving the community since 1996',
      color: 'text-indigo-600',
      trend: { value: 1, isPositive: true }
    },
    {
      id: 'placement',
      icon: TrendingUp,
      value: 95,
      suffix: '%',
      label: 'Placement Rate',
      description: 'Students placed in top institutions',
      color: 'text-emerald-600',
      trend: { value: 5, isPositive: true }
    },
    {
      id: 'rating',
      icon: Star,
      value: 4.9,
      suffix: '/5',
      label: 'Average Rating',
      description: 'Based on parent and student feedback',
      color: 'text-amber-600',
      trend: { value: 0.2, isPositive: true }
    }
  ];

  // Animate counter
  const animateCounter = (targetValue: number, duration: number = 2000) => {
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
      
      return currentValue;
    };

    return animate;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Animate all counters
          stats.forEach((stat) => {
            const duration = 2000 + Math.random() * 1000; // Stagger animations
            const animate = animateCounter(stat.value, duration);
            
            const startTime = performance.now();
            const animateFrame = (currentTime: number) => {
              const currentValue = animate(currentTime);
              setAnimatedValues(prev => ({
                ...prev,
                [stat.id]: currentValue
              }));
              
              if (currentTime - startTime < duration) {
                requestAnimationFrame(animateFrame);
              } else {
                setAnimatedValues(prev => ({
                  ...prev,
                  [stat.id]: stat.value
                }));
              }
            };
            
            requestAnimationFrame(animateFrame);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible, stats]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 scroll-reveal">
              Our <span className="gradient-text">Achievements</span> in Numbers
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto scroll-reveal">
              Discover the impact we've made in education and the success stories that define our legacy
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              const currentValue = animatedValues[stat.id] || 0;
              
              return (
                <Card 
                  key={stat.id} 
                  className="card-professional p-6 text-center group hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`${stat.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-12 w-12 mx-auto" />
                  </div>
                  
                  {/* Animated Counter */}
                  <div className="mb-2">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">
                      {stat.id === 'rating' ? currentValue.toFixed(1) : currentValue.toLocaleString()}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-primary ml-1">
                      {stat.suffix}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3">
                    {stat.description}
                  </p>
                  
                  {/* Trend Indicator */}
                  {stat.trend && (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.trend.isPositive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      <TrendingUp className={`h-3 w-3 ${stat.trend.isPositive ? 'rotate-0' : 'rotate-180'}`} />
                      <span>+{stat.trend.value}%</span>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <Card className="card-professional p-8 text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Our alumni are making a difference in over 25 countries worldwide
              </p>
            </Card>
            
            <Card className="card-professional p-8 text-center">
              <Award className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Recognition</h3>
              <p className="text-muted-foreground">
                Consistently ranked among the top schools in the region
              </p>
            </Card>
            
            <Card className="card-professional p-8 text-center">
              <Target className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                Committed to providing world-class education and holistic development
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsDashboard;
