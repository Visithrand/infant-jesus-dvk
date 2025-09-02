import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  eventDateTime: string;
  createdAt: string;
}

const EventsDisplay = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Listen for custom events when new events are created
    const handleEventUpdate = () => {
      const storedEvents = localStorage.getItem('schoolEvents');
      console.log('Raw stored events:', storedEvents);
      if (storedEvents) {
        try {
          const parsedEvents = JSON.parse(storedEvents);
          console.log('Events parsed successfully:', parsedEvents);
          console.log('Event images:', parsedEvents.map(e => ({ title: e.title, imageUrl: e.imageUrl ? e.imageUrl.substring(0, 50) + '...' : 'null' })));
          setEvents(parsedEvents);
        } catch (error) {
          console.error('Error parsing events:', error);
        }
      } else {
        console.log('No events found in localStorage');
        setEvents([]);
      }
    };

    // Initial load
    handleEventUpdate();

    // Listen for custom events
    window.addEventListener('eventCreated', handleEventUpdate);
    window.addEventListener('eventDeleted', handleEventUpdate);

    return () => {
      window.removeEventListener('eventCreated', handleEventUpdate);
      window.removeEventListener('eventDeleted', handleEventUpdate);
    };
  }, []);

  console.log('EventsDisplay rendering with events:', events);
  
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No events scheduled yet.</p>
        <p className="text-gray-400 text-sm mt-2">Check back soon for upcoming events!</p>
        <div className="mt-4">
          <button 
            onClick={() => window.location.href = '/admin/dashboard?tab=events'}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Create Your First Event
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          {event.imageUrl && (
            <div className="relative">
              <img
                src={event.imageUrl.startsWith('http') || event.imageUrl.startsWith('data:') ? event.imageUrl : `https://via.placeholder.com/400x250?text=${event.title}`}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                New
              </div>
            </div>
          )}
          {!event.imageUrl && (
            <div className="relative">
              <img
                src={`https://via.placeholder.com/400x250?text=${event.title}`}
                alt={event.title}
                className="w-full h-48 object-cover bg-gray-100"
              />
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                New
              </div>
            </div>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(event.eventDateTime).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                {new Date(event.eventDateTime).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = '/admin/dashboard?tab=events'}
            >
              Learn More
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EventsDisplay;
