import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Play, 
  MapPin, 
  Camera, 
  Users, 
  BookOpen, 
  Wifi, 
  Car, 
  TreePine,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import heroCampus from "@/assets/hero-campus.png";

interface TourLocation {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  icon: React.ComponentType<any>;
  coordinates: { x: number; y: number };
}

const VirtualTour = () => {
  const [selectedLocation, setSelectedLocation] = useState<TourLocation | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  const tourLocations: TourLocation[] = [
    {
      id: 'main-building',
      name: 'Main Academic Building',
      description: 'Our state-of-the-art main building houses modern classrooms, laboratories, and administrative offices.',
      image: heroCampus,
      features: ['Smart Classrooms', 'Air-Conditioned', 'WiFi Enabled', 'Accessible Design'],
      icon: BookOpen,
      coordinates: { x: 30, y: 40 }
    },
    {
      id: 'library',
      name: 'Digital Library',
      description: 'A comprehensive library with over 50,000 books, digital resources, and quiet study areas.',
      image: '/api/placeholder/600/400',
      features: ['50,000+ Books', 'Digital Resources', 'Study Rooms', 'Research Center'],
      icon: BookOpen,
      coordinates: { x: 60, y: 25 }
    },
    {
      id: 'playground',
      name: 'Sports Complex',
      description: 'Multi-purpose sports facility with basketball court, football field, and indoor games area.',
      image: '/api/placeholder/600/400',
      features: ['Basketball Court', 'Football Field', 'Indoor Games', 'Swimming Pool'],
      icon: Users,
      coordinates: { x: 20, y: 70 }
    },
    {
      id: 'science-lab',
      name: 'Science Laboratories',
      description: 'Fully equipped physics, chemistry, and biology laboratories for hands-on learning.',
      image: '/lab-che.png',
      features: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Computer Lab'],
      icon: Camera,
      coordinates: { x: 70, y: 50 }
    },
    {
      id: 'cafeteria',
      name: 'Cafeteria & Dining',
      description: 'Spacious cafeteria serving nutritious meals with modern dining facilities.',
      image: '/api/placeholder/600/400',
      features: ['Nutritious Meals', 'Modern Kitchen', 'Seating for 500', 'Healthy Options'],
      icon: Users,
      coordinates: { x: 50, y: 80 }
    },
    {
      id: 'garden',
      name: 'Eco Garden',
      description: 'Beautiful eco-friendly garden promoting environmental awareness and sustainability.',
      image: '/api/placeholder/600/400',
      features: ['Organic Garden', 'Solar Panels', 'Rainwater Harvesting', 'Composting'],
      icon: TreePine,
      coordinates: { x: 80, y: 30 }
    }
  ];

  const handleLocationClick = (location: TourLocation) => {
    setSelectedLocation(location);
    const index = tourLocations.findIndex(loc => loc.id === location.id);
    setCurrentLocationIndex(index);
  };

  const nextLocation = () => {
    const nextIndex = (currentLocationIndex + 1) % tourLocations.length;
    setCurrentLocationIndex(nextIndex);
    setSelectedLocation(tourLocations[nextIndex]);
  };

  const prevLocation = () => {
    const prevIndex = currentLocationIndex === 0 ? tourLocations.length - 1 : currentLocationIndex - 1;
    setCurrentLocationIndex(prevIndex);
    setSelectedLocation(tourLocations[prevIndex]);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 scroll-reveal">
              Virtual <span className="gradient-text">Campus Tour</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 scroll-reveal">
              Explore our state-of-the-art facilities and beautiful campus from anywhere in the world
            </p>
            
            <Dialog open={isTourOpen} onOpenChange={setIsTourOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="btn-primary-enhanced px-8 py-4 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Virtual Tour
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
                <DialogHeader className="p-6 pb-0">
                  <DialogTitle className="text-2xl font-bold">Campus Virtual Tour</DialogTitle>
                </DialogHeader>
                
                <div className="flex flex-col lg:flex-row h-[70vh]">
                  {/* Campus Map */}
                  <div className="flex-1 p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="relative w-full h-full bg-white rounded-lg border-2 border-primary/20 overflow-hidden">
                      {/* Map Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                        <div className="absolute inset-0 opacity-20">
                          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23059669%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                        </div>
                      </div>
                      
                      {/* Location Markers */}
                      {tourLocations.map((location) => {
                        const IconComponent = location.icon;
                        return (
                          <button
                            key={location.id}
                            onClick={() => handleLocationClick(location)}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 ${
                              selectedLocation?.id === location.id 
                                ? 'z-10 scale-110' 
                                : 'hover:z-10'
                            }`}
                            style={{
                              left: `${location.coordinates.x}%`,
                              top: `${location.coordinates.y}%`
                            }}
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                              selectedLocation?.id === location.id
                                ? 'bg-primary text-white scale-110'
                                : 'bg-white text-primary hover:bg-primary hover:text-white'
                            }`}>
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg px-3 py-1 shadow-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                              {location.name}
                            </div>
                          </button>
                        );
                      })}
                      
                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                        <h4 className="font-semibold text-sm mb-2">Campus Facilities</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {tourLocations.map((location) => {
                            const IconComponent = location.icon;
                            return (
                              <div key={location.id} className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4 text-primary" />
                                <span>{location.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Details */}
                  {selectedLocation && (
                    <div className="w-full lg:w-96 p-6 bg-white border-l border-gray-200">
                      <div className="h-full flex flex-col">
                        {/* Location Image */}
                        <div className="relative mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={selectedLocation.image} 
                            alt={selectedLocation.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold">{selectedLocation.name}</h3>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-muted-foreground mb-4 flex-1">
                          {selectedLocation.description}
                        </p>
                        
                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">Key Features:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedLocation.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Navigation */}
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={prevLocation}
                            className="flex-1"
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Previous
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={nextLocation}
                            className="flex-1"
                          >
                            Next
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="card-professional p-6 text-center">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">15+</h3>
              <p className="text-muted-foreground text-sm">Campus Buildings</p>
            </Card>
            
            <Card className="card-professional p-6 text-center">
              <Users className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">50+</h3>
              <p className="text-muted-foreground text-sm">Classrooms</p>
            </Card>
            
            <Card className="card-professional p-6 text-center">
              <Camera className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">10+</h3>
              <p className="text-muted-foreground text-sm">Laboratories</p>
            </Card>
            
            <Card className="card-professional p-6 text-center">
              <TreePine className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-foreground mb-1">5+</h3>
              <p className="text-muted-foreground text-sm">Acres Campus</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;
