import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { 
  Calendar,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  Award,
  Music,
  BookOpen,
  Heart,
  Star
} from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      title: "Annual Sports Meet",
      date: "December 15, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "School Ground",
      description: "A day filled with exciting sports competitions, team events, and athletic performances showcasing student talent and sportsmanship.",
      category: "Sports",
      icon: Award
    },
    {
      title: "Cultural Festival",
      date: "January 20, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "School Auditorium",
      description: "Celebration of arts, music, dance, and drama performances highlighting the creative talents of our students.",
      category: "Cultural",
      icon: Music
    },
    {
      title: "Science Exhibition",
      date: "February 10, 2025",
      time: "10:00 AM - 3:00 PM",
      location: "Science Labs",
      description: "Students showcase innovative science projects, experiments, and research work demonstrating scientific thinking and creativity.",
      category: "Academic",
      icon: BookOpen
    },
    {
      title: "Parent-Teacher Meeting",
      date: "March 5, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Classrooms",
      description: "Important meeting for parents to discuss student progress, academic performance, and future goals with teachers.",
      category: "Academic",
      icon: Users
    }
  ];

  const regularActivities = [
    {
      title: "Morning Assembly",
      schedule: "Daily",
      time: "8:00 AM - 8:30 AM",
      description: "Daily morning prayers, announcements, and motivational talks to start the day positively."
    },
    {
      title: "Library Hours",
      schedule: "Monday - Friday",
      time: "8:00 AM - 4:00 PM",
      description: "Students can access the library for reading, research, and study during school hours."
    },
    {
      title: "Sports Practice",
      schedule: "Monday - Saturday",
      time: "4:00 PM - 6:00 PM",
      description: "Regular sports practice sessions for various games and athletic activities."
    },
    {
      title: "Art & Craft Classes",
      schedule: "Wednesday & Friday",
      time: "3:00 PM - 4:00 PM",
      description: "Creative arts and crafts sessions to develop artistic skills and creativity."
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
              School Events & Activities
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the vibrant calendar of events, celebrations, and activities that make learning exciting and memorable
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Mark your calendars for these exciting upcoming events and celebrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-primary"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <event.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {event.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regular Activities */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Regular Activities
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Daily and weekly activities that form the backbone of our educational experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularActivities.map((activity, index) => (
                <Card 
                  key={index}
                  className="p-6 bg-card hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {activity.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Celebrations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Special Celebrations
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Cultural and national celebrations that bring our school community together
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-md transition-all duration-300">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Independence Day</h3>
                <p className="text-sm text-muted-foreground">Patriotic celebrations with flag hoisting and cultural programs</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-md transition-all duration-300">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Teachers' Day</h3>
                <p className="text-sm text-muted-foreground">Special celebrations honoring our dedicated teachers</p>
              </Card>
              
              <Card className="p-6 text-center hover:shadow-md transition-all duration-300">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Annual Day</h3>
                <p className="text-sm text-muted-foreground">Grand celebration of student achievements and talents</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated with Events
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't miss out on any events! Contact us for more information or to participate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Event Details <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="/#admissions"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                Join Our School
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Events;
