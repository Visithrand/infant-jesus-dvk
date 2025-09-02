import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { 
  Building2, 
  BookOpen, 
  Monitor, 
  Bus, 
  Utensils, 
  Shield, 
  Wifi, 
  Camera,
  Music,
  Palette,
  Trophy,
  Users,
  Plus
} from "lucide-react";

const FacilitiesSection = () => {
  const [dynamicFacilities, setDynamicFacilities] = useState<any[]>([]);

  useEffect(() => {
    // Load dynamic facilities from localStorage
    const loadDynamicFacilities = () => {
      const stored = localStorage.getItem('schoolFacilities');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setDynamicFacilities(parsed);
        } catch (error) {
          console.error('Error parsing facilities:', error);
        }
      }
    };

    // Initial load
    loadDynamicFacilities();

    // Listen for facility updates
    const handleFacilityUpdate = () => {
      loadDynamicFacilities();
    };

    window.addEventListener('facilityCreated', handleFacilityUpdate);
    window.addEventListener('facilityDeleted', handleFacilityUpdate);

    return () => {
      window.removeEventListener('facilityCreated', handleFacilityUpdate);
      window.removeEventListener('facilityDeleted', handleFacilityUpdate);
    };
  }, []);

  const facilities = [
    {
      id: 1,
      title: "Modern Classrooms",
      icon: Building2,
      description: "Spacious, well-ventilated classrooms equipped with modern teaching aids, comfortable seating, and interactive whiteboards for enhanced learning experiences.",
      features: ["Air Conditioning", "Interactive Whiteboards", "Comfortable Seating", "Natural Lighting"],
      category: "academic",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Well-Stocked Library",
      icon: BookOpen,
      description: "A comprehensive library with thousands of books, reference materials, digital resources, and a quiet study environment for students.",
      features: ["10,000+ Books", "Digital Resources", "Study Areas", "Librarian Support"],
      category: "academic",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Computer Labs",
      icon: Monitor,
      description: "State-of-the-art computer laboratories with latest hardware and software, providing hands-on experience in technology and digital literacy.",
      features: ["Latest Computers", "Educational Software", "Internet Access", "IT Support"],
      category: "technology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Science Laboratories",
      icon: BookOpen,
      description: "Fully equipped physics, chemistry, and biology laboratories for practical learning and scientific experiments.",
      features: ["Modern Equipment", "Safety Gear", "Experienced Staff", "Practical Sessions"],
      category: "academic",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "Transportation",
      icon: Bus,
      description: "Safe and reliable transportation services covering major routes with GPS tracking and trained drivers for student safety.",
      features: ["GPS Tracking", "Trained Drivers", "Multiple Routes", "Safety Standards"],
      category: "transport",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Cafeteria & Canteen",
      icon: Utensils,
      description: "Hygienic food service with nutritious meals, snacks, and beverages prepared under strict quality standards.",
      features: ["Hygienic Kitchen", "Nutritious Meals", "Vegetarian Options", "Quality Control"],
      category: "food",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 7,
      title: "Security System",
      icon: Shield,
      description: "24/7 security with CCTV surveillance, trained security personnel, and controlled access to ensure student safety.",
      features: ["CCTV Cameras", "Security Personnel", "Controlled Access", "Emergency Response"],
      category: "security",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 8,
      title: "Wi-Fi Campus",
      icon: Wifi,
      description: "High-speed internet connectivity throughout the campus for research, online learning, and digital resources access.",
      features: ["High-Speed Internet", "Campus Coverage", "Filtered Content", "IT Support"],
      category: "technology",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 9,
      title: "Sports Facilities",
      icon: Trophy,
      description: "Comprehensive sports infrastructure including playgrounds, indoor games, and equipment for physical development.",
      features: ["Large Playground", "Indoor Games", "Sports Equipment", "Coaching Staff"],
      category: "sports",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 10,
      title: "Music Room",
      icon: Music,
      description: "Dedicated space for music education with various instruments and practice areas for vocal and instrumental training.",
      features: ["Musical Instruments", "Practice Areas", "Music Teacher", "Performance Space"],
      category: "arts",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 11,
      title: "Art & Craft Studio",
      icon: Palette,
      description: "Creative space for artistic expression with art supplies, craft materials, and display areas for student artwork.",
      features: ["Art Supplies", "Craft Materials", "Display Areas", "Art Teacher"],
      category: "arts",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 12,
      title: "Medical Room",
      icon: Shield,
      description: "On-campus medical facility with first-aid equipment and trained staff for immediate health care support.",
      features: ["First-Aid Kit", "Medical Staff", "Health Records", "Emergency Care"],
      category: "health",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center"
    }
  ];

  const categories = [
    { id: "all", name: "All Facilities", color: "bg-gray-100 text-gray-800" },
    { id: "academic", name: "Academic", color: "bg-blue-100 text-blue-800" },
    { id: "technology", name: "Technology", color: "bg-green-100 text-green-800" },
    { id: "sports", name: "Sports", color: "bg-orange-100 text-orange-800" },
    { id: "arts", name: "Arts", color: "bg-purple-100 text-purple-800" },
    { id: "security", name: "Security", color: "bg-red-100 text-red-800" },
    { id: "transport", name: "Transport", color: "bg-yellow-100 text-yellow-800" },
    { id: "food", name: "Food", color: "bg-pink-100 text-pink-800" },
    { id: "health", name: "Health", color: "bg-indigo-100 text-indigo-800" }
  ];

  return (
    <section id="facilities" className="py-16 sm:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              World-Class Facilities
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our state-of-the-art infrastructure provides students with the perfect environment 
              for learning, growth, and development. From modern classrooms to advanced technology, 
              we ensure every facility supports excellence in education.
            </p>
          </div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {facilities.map((facility) => (
              <Card key={facility.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <facility.icon className="h-8 w-8 text-primary" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className="capitalize"
                      style={{ 
                        backgroundColor: categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-blue-100' ? '#dbeafe' : 
                                   categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-green-100' ? '#dcfce7' :
                                   categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-orange-100' ? '#fed7aa' :
                                   categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-purple-100' ? '#e9d5ff' :
                                   categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-red-100' ? '#fee2e2' :
                                   categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-yellow-100' ? '#fef3c7' :
                                   categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-pink-100' ? '#fce7f3' :
                                   categories.find(cat => cat.id === facility.category)?.color.split(' ')[0] === 'bg-indigo-100' ? '#e0e7ff' : '#f3f4f6',
                        color: categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-blue-800' ? '#1e40af' :
                               categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-green-800' ? '#166534' :
                               categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-orange-800' ? '#9a3412' :
                               categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-purple-800' ? '#6b21a8' :
                               categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-red-800' ? '#991b1b' :
                               categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-yellow-800' ? '#92400e' :
                               categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-pink-800' ? '#9d174d' :
                               categories.find(cat => cat.id === facility.category)?.color.split(' ')[1] === 'text-indigo-800' ? '#3730a3' : '#374151'
                      }}
                    >
                      {facility.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl md:text-2xl leading-tight">
                    {facility.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Facility Image */}
                  <div className="relative overflow-hidden rounded-lg h-48 group">
                    <img 
                      src={facility.image} 
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {facility.description}
                  </p>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dynamic Facilities Section */}
          {dynamicFacilities.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Recently Added Facilities
                </h3>
                <p className="text-lg text-muted-foreground">
                  New facilities added by our administration team
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {dynamicFacilities.map((facility) => (
                  <Card key={facility.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105 group border-2 border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          New
                        </Badge>
                      </div>
                      <CardTitle className="text-xl md:text-2xl leading-tight">
                        {facility.name}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Facility Image */}
                      {facility.imageUrl && (
                        <div className="relative overflow-hidden rounded-lg h-48 group">
                          <img 
                            src={facility.imageUrl.startsWith('http') || facility.imageUrl.startsWith('data:') ? facility.imageUrl : `https://via.placeholder.com/400x250?text=${facility.name}`}
                            alt={facility.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {facility.description}
                      </p>

                      {/* Created Date */}
                      <div className="text-xs text-gray-500">
                        Added: {new Date(facility.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Experience Our Facilities Firsthand
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Schedule a campus tour to see our world-class facilities in person. 
                  Our team will guide you through every aspect of our infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Badge variant="outline" className="text-lg px-6 py-3">
                    🏫 Modern Infrastructure
                  </Badge>
                  <Badge variant="outline" className="text-lg px-6 py-3">
                    🔒 Safety First
                  </Badge>
                  <Badge variant="outline" className="text-lg px-6 py-3">
                    💻 Technology Enabled
                  </Badge>
                  <Badge variant="outline" className="text-lg px-6 py-3">
                    🎨 Creative Spaces
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
