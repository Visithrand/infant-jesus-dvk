import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image as ImageIcon, ExternalLink } from "lucide-react";
import EventDetailsModal from "./EventDetailsModal";
import { springApiFetch, getImageUrl } from "@/lib/api";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

const EventGallery = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const revalidate = () => fetchEvents();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'ij:lastUpdate') fetchEvents();
    };
    window.addEventListener('focus', revalidate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') fetchEvents();
    });
    window.addEventListener('ij:data-updated' as any, revalidate);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('ij:data-updated' as any, revalidate);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await springApiFetch('/events', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      const sorted = [...data].sort((a: Event, b: Event) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setEvents(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="events" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg max-w-md mx-auto">
              <p className="font-medium">Error loading events</p>
              <p className="text-sm mt-2">{error}</p>
              <Button 
                onClick={fetchEvents} 
                variant="outline" 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section id="events" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-muted/50 p-8 rounded-lg max-w-md mx-auto">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Events Yet</h3>
              <p className="text-sm text-muted-foreground">
                Check back later for upcoming school events and activities.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="events" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                School Events & Activities
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay updated with the latest events, celebrations, and activities happening at 
                Infant Jesus School. From academic achievements to cultural celebrations.
              </p>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Card 
                  key={event.id}
                  className="overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient"
                >
                  {/* Event Image */}
                  {event.imageUrl ? (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getImageUrl(event.imageUrl)}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(event.createdAt)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                      {event.title}
                    </h3>
                    
                    {event.description && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {event.description}
                      </p>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {events.length >= 6 && (
              <div className="text-center mt-12">
                <Button variant="accent" size="lg">
                  Load More Events
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </>
  );
};

export default EventGallery;
