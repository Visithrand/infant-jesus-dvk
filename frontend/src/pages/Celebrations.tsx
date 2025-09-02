import { useState } from "react";
import { Calendar, Clock, MapPin, Users, Star, Trophy, Music, Palette, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Celebrations = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Events", icon: Calendar },
    { id: "academic", name: "Academic", icon: BookOpen },
    { id: "cultural", name: "Cultural", icon: Music },
    { id: "sports", name: "Sports", icon: Trophy },
    { id: "arts", name: "Arts", icon: Palette },
  ];

  const events = [
    {
      id: 1,
      title: "Annual Sports Meet",
      category: "sports",
      date: "2024-12-15",
      time: "9:00 AM - 4:00 PM",
      location: "School Ground",
      description: "A day filled with athletic excellence, team spirit, and sportsmanship. Students compete in various track and field events, team sports, and individual competitions.",
      highlights: ["Track Events", "Team Sports", "Medal Ceremony", "Cultural Performances"],
      image: "/api/images/sports-meet.jpg",
      attendees: "500+ Students",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Cultural Festival",
      category: "cultural",
      date: "2024-11-20",
      time: "6:00 PM - 9:00 PM",
      location: "School Auditorium",
      description: "A celebration of diverse cultures, traditions, and artistic expressions. Students showcase their talents in music, dance, drama, and traditional performances.",
      highlights: ["Classical Dance", "Folk Music", "Drama Skits", "Traditional Attire"],
      image: "/api/images/cultural-festival.jpg",
      attendees: "800+ Students & Parents",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Science Exhibition",
      category: "academic",
      date: "2024-10-25",
      time: "10:00 AM - 3:00 PM",
      location: "Science Labs & Classrooms",
      description: "Students present innovative science projects, experiments, and research findings. A platform for young scientists to showcase their creativity and scientific thinking.",
      highlights: ["Project Displays", "Live Experiments", "Science Quiz", "Innovation Awards"],
      image: "/api/images/science-exhibition.jpg",
      attendees: "400+ Students",
      status: "upcoming"
    },
    {
      id: 4,
      title: "Independence Day Celebration",
      category: "cultural",
      date: "2024-08-15",
      time: "8:00 AM - 11:00 AM",
      location: "School Ground",
      description: "A patriotic celebration honoring our nation's freedom. Students participate in flag hoisting, cultural programs, and patriotic songs.",
      highlights: ["Flag Hoisting", "Patriotic Songs", "Cultural Programs", "Speech Competition"],
      image: "/api/images/independence-day.jpg",
      attendees: "1000+ Students & Staff",
      status: "completed"
    },
    {
      id: 5,
      title: "Annual Prize Distribution",
      category: "academic",
      date: "2024-07-20",
      time: "4:00 PM - 7:00 PM",
      location: "School Auditorium",
      description: "Recognition of academic excellence, sports achievements, and overall performance. Students receive awards, certificates, and special recognition for their accomplishments.",
      highlights: ["Academic Awards", "Sports Trophies", "Special Recognition", "Cultural Performances"],
      image: "/api/images/prize-distribution.jpg",
      attendees: "600+ Students & Parents",
      status: "completed"
    },
    {
      id: 6,
      title: "Art & Craft Exhibition",
      category: "arts",
      date: "2024-09-10",
      time: "2:00 PM - 6:00 PM",
      location: "Art Room & Corridors",
      description: "A showcase of students' artistic talents and creative expressions. Various forms of art including paintings, sculptures, crafts, and digital art are displayed.",
      highlights: ["Paintings", "Sculptures", "Crafts", "Digital Art", "Live Demonstrations"],
      image: "/api/images/art-exhibition.jpg",
      attendees: "300+ Students & Visitors",
      status: "upcoming"
    }
  ];

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    return status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
  };

  const getStatusText = (status: string) => {
    return status === 'upcoming' ? 'Upcoming' : 'Completed';
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              School Celebrations
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Experience the vibrant spirit of learning through our diverse celebrations, 
              cultural events, and academic achievements
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-2"
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className="capitalize">
                        {event.category}
                      </Badge>
                      <Badge className={getStatusColor(event.status)}>
                        {getStatusText(event.status)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl md:text-2xl leading-tight">
                      {event.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Event Image Placeholder */}
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-48 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm">Event Image</p>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{event.attendees}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Highlights
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {event.highlights.map((highlight, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      disabled={event.status === 'completed'}
                    >
                      {event.status === 'completed' ? 'Event Completed' : 'Learn More'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Events Message */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
                <p className="text-gray-500">No events match the selected category. Try selecting a different category.</p>
              </div>
            )}

            {/* Upcoming Events Call-to-Action */}
            <div className="mt-16 text-center">
              <Card className="p-8 md:p-12 bg-gradient-to-r from-blue-50 to-purple-50">
                <CardContent>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Stay Updated with Our Events
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Don't miss out on our exciting school events and celebrations. 
                    Follow us for updates and join our vibrant school community.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      View Calendar
                    </Button>
                    <Button variant="outline" size="lg">
                      Contact Us
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Celebrations;
