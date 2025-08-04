import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Calendar, Clock, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import schoolLogo from "@/assets/school-logo.png";
import { Progress } from "@/components/ui/progress";

const LiveEventPopup = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const currentTimeString = currentTime.toLocaleTimeString("en-IN", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit"
  });

  const liveEvents = [
    {
      title: "Mathematics Revision Class",
      professor: "Prof. Sarah John",
      time: "10:00 AM - 11:30 AM",
      type: "Live Class",
      urgent: true,
      progress: 75 // Added progress
    },
    {
      title: "Parent-Teacher Meeting",
      professor: "All Faculty",
      time: "2:00 PM - 4:00 PM",
      type: "Meeting",
      urgent: false,
      progress: 30 // Added progress
    },
    {
      title: "Science Exhibition Preparation",
      professor: "Prof. Michael David",
      time: "3:30 PM - 5:00 PM",
      type: "Activity",
      urgent: false,
      progress: 0 // Added progress
    }
  ];

  const admissionsImage = "https://infantjesusdvk.org/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-18-at-7.05.45-PM.jpeg";

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white shadow-xl border-2 border-primary">
        {/* Admissions Open Banner */}
        <div className="flex flex-col items-center bg-green-100 p-3 border-b border-green-300">
          <img src={admissionsImage} alt="Admissions Open" className="w-full h-30 max-h-28 object-cover rounded mb-2" />
          <span className="text-lg font-bold text-green-800">Admissions Open!</span>
        </div>
        {/* Header */}
        <div className="bg-hero-gradient text-white p-4 rounded-t-lg relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white hover:bg-white/20"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-3 mb-2">
            <img 
              src={schoolLogo} 
              alt="Infant Jesus School Logo" 
              className="h-10 w-10 object-contain bg-white rounded-full p-1"
            />
            <div>
              <h2 className="text-lg font-bold">Live Updates</h2>
              <p className="text-sm text-white/90">Infant Jesus School</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{currentDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{currentTimeString}</span>
            </div>
          </div>
        </div>

        {/* Live Events */}
        <div className="p-4 max-h-80 overflow-y-auto">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-5 w-5 text-accent animate-pulse" />
            <h3 className="font-semibold text-foreground">Today's Live Events</h3>
          </div>
          
          <div className="space-y-3">
            {liveEvents.map((event, index) => (
              <Card 
                key={index}
                className={cn(
                  "p-3 border-l-4 transition-all duration-300 hover:shadow-md",
                  event.urgent ? "border-l-red-500 bg-red-50/50" : "border-l-primary bg-blue-50/50"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm text-foreground">{event.title}</h4>
                  <span 
                    className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      event.urgent 
                        ? "bg-red-100 text-red-700" 
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {event.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
                  <User className="h-3 w-3" />
                  <span>{event.professor}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>
                 <Progress value={event.progress} className="w-full mt-2" />
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 space-y-2">
            <Button 
              variant="hero" 
              className="w-full text-sm"
              onClick={() => setIsVisible(false)}
            >
              Join Live Classes
            </Button>
            <Button 
              variant="outline" 
              className="w-full text-sm"
              onClick={() => setIsVisible(false)}
            >
              View Full Schedule
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveEventPopup;