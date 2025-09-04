import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image as ImageIcon } from "lucide-react";
import { ApiService, API_CONFIG } from '@/config/api';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    // Refresh on focus
    const onFocus = () => fetchEvents();
    window.addEventListener('focus', onFocus);
    // Poll every 30s
    const interval = setInterval(fetchEvents, 30000);
    return () => {
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Listen for custom events when new events are created
    const handleEventUpdate = () => {
      fetchEvents();
    };

    // Listen for custom events
    window.addEventListener('eventCreated', handleEventUpdate);
    window.addEventListener('eventDeleted', handleEventUpdate);

    return () => {
      window.removeEventListener('eventCreated', handleEventUpdate);
      window.removeEventListener('eventDeleted', handleEventUpdate);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await ApiService.get(API_CONFIG.ENDPOINTS.EVENTS);
      
      if (Array.isArray(data)) {
        setEvents(data);
        // Also update localStorage for backward compatibility
        localStorage.setItem('schoolEvents', JSON.stringify(data));
      } else {
        console.error('Invalid events data format:', data);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching events');
      
      // Fallback to localStorage if API fails
      try {
        const storedEvents = localStorage.getItem('schoolEvents');
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents);
          setEvents(parsedEvents);
          setError(null); // Clear error if fallback works
        }
      } catch (localStorageError) {
        console.error('Error reading from localStorage:', localStorageError);
      }
    } finally {
      setLoading(false);
    }
  };

  console.log('EventsDisplay rendering with events:', events);
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg mb-4">Error loading events: {error}</p>
        <Button onClick={fetchEvents} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No events scheduled yet.</p>
        <p className="text-gray-400 text-sm mt-2">Check back soon for upcoming events!</p>
        <div className="mt-4">
          <button 
            onClick={() => navigate('/admin/dashboard?tab=events')}
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
          {/* Event Image */}
          {event.imageUrl ? (
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.imageUrl.startsWith('http') || event.imageUrl.startsWith('data:') ? event.imageUrl : `https://via.placeholder.com/400x250?text=${event.title}`}
                alt={event.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
          )}

          {/* Event Content */}
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(event.eventDateTime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {event.title}
            </h3>
            
            {event.description && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {event.description}
              </p>
            )}
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/admin/dashboard?tab=events')}
              >
                View Details
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EventsDisplay;
