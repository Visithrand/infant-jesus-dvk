import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image as ImageIcon, ExternalLink, Edit, Trash2, Plus } from "lucide-react";
import EventDetailsModal from "./EventDetailsModal";
import { get, deleteMethod, getImageUrl, API_CONFIG } from '@/config/api';
import { getStoredAuth } from '@/utils/auth';

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  eventDateTime: string;
  createdAt: string;
}

const EventGallery = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchEvents();
    checkAdminStatus();
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
      const data = await get(API_CONFIG.ENDPOINTS.EVENTS);
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

  const checkAdminStatus = () => {
    try {
      const auth = getStoredAuth();
      setIsAdmin(!!auth?.token);
    } catch {
      setIsAdmin(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const auth = getStoredAuth();
      if (!auth?.token) return;

      await deleteMethod(`${API_CONFIG.ENDPOINTS.EVENTS_ADMIN}/${id}`, { 
        'Authorization': `Bearer ${auth.token}` 
      });
      
      // Update local state
      setEvents(prev => prev.filter(event => event.id !== id));
      
      // Notify other components
      try {
        localStorage.setItem('ij:lastUpdate', String(Date.now()));
        window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'events' } }));
      } catch {}
      
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
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
             <div className="text-center mb-8 md:mb-16">
               <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                 School Events & Activities
               </h2>
               <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                 Stay updated with the latest events, celebrations, and activities happening at 
                 Infant Jesus School. From academic achievements to cultural celebrations.
               </p>
             </div>

                         {/* Events Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {events.map((event) => (
                <Card 
                  key={event.id}
                  className="overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient"
                >
                                     {/* Event Image */}
                   {event.imageUrl ? (
                     <div className="relative h-40 sm:h-48 overflow-hidden">
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
                     <div className="h-40 sm:h-48 bg-muted flex items-center justify-center">
                       <ImageIcon className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground" />
                     </div>
                   )}

                                     {/* Event Content */}
                   <div className="p-4 md:p-6">
                     <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-3">
                       <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                       {formatDate(event.eventDateTime)}
                     </div>
                     
                     <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 line-clamp-2">
                       {event.title}
                     </h3>
                     
                     {event.description && (
                       <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                         {event.description}
                       </p>
                     )}
                    
                                         <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                       <Button 
                         variant="outline" 
                         className="flex-1"
                         onClick={() => {
                           setSelectedEvent(event);
                           setIsModalOpen(true);
                         }}
                       >
                         <ExternalLink className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                         View Details
                       </Button>
                       
                       {isAdmin && (
                         <>
                           <Button 
                             variant="outline" 
                             size="sm"
                             onClick={() => {
                               // Navigate to admin dashboard with edit mode
                               window.location.href = `/admin?tab=events&edit=${event.id}`;
                             }}
                           >
                             <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                           </Button>
                           <Button 
                             variant="destructive" 
                             size="sm"
                             onClick={() => handleDeleteEvent(event.id)}
                           >
                             <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                           </Button>
                         </>
                       )}
                     </div>
                  </div>
                </Card>
              ))}
            </div>

                         {/* Admin Add Button */}
             {isAdmin && (
               <div className="text-center mt-8 md:mt-12">
                 <Button 
                   variant="accent" 
                   size="lg"
                   className="w-full sm:w-auto"
                   onClick={() => {
                     window.location.href = '/admin?tab=events';
                   }}
                 >
                   <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                   Add New Event
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
