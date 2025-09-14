import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Image as ImageIcon, Edit, Trash2, Plus } from "lucide-react";
import { ApiService, API_CONFIG } from '@/config/api';
import { getStoredAuth } from '@/utils/auth';

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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    checkAdminStatus();
    // Refresh on focus
    const onFocus = () => {
      fetchEvents();
      checkAdminStatus(); // Re-check admin status on focus
    };
    window.addEventListener('focus', onFocus);
    // Poll every 30s
    const interval = setInterval(() => {
      fetchEvents();
      checkAdminStatus(); // Re-check admin status periodically
    }, 30000);
    // Cross-tab/data update listener
    const onDataUpdated = (e: Event) => {
      fetchEvents();
      checkAdminStatus(); // Re-check admin status on data updates
    };
    window.addEventListener('ij:data-updated', onDataUpdated as EventListener);
    return () => {
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
      window.removeEventListener('ij:data-updated', onDataUpdated as EventListener);
    };
  }, []);

  const checkAdminStatus = async () => {
    // Always start with false for security
    setIsAdmin(false);
    
    try {
      const auth = getStoredAuth();
      console.log('🔐 EventsDisplay - Auth data:', auth);
      
      // Strict checks - must have token AND correct role
      if (!auth) {
        console.log('🔐 EventsDisplay - No auth data');
        return;
      }
      
      if (!auth.token) {
        console.log('🔐 EventsDisplay - No token');
        return;
      }
      
      if (!auth.role) {
        console.log('🔐 EventsDisplay - No role');
        return;
      }
      
      // Only allow SUPER_ADMIN role
      const isSuperAdmin = auth.role === 'SUPER_ADMIN';
      console.log('🔐 EventsDisplay - Role check:', { 
        role: auth.role, 
        isSuperAdmin,
        finalDecision: isSuperAdmin
      });
      
      if (isSuperAdmin) {
        setIsAdmin(true);
        console.log('🔐 EventsDisplay - ADMIN ACCESS GRANTED');
      } else {
        console.log('🔐 EventsDisplay - ADMIN ACCESS DENIED');
      }
    } catch (error) {
      console.log('🔐 EventsDisplay - Admin check error:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Listen for custom events when new events are created
    const handleEventUpdate = () => {
      fetchEvents();
    };

    // Listen for authentication changes
    const handleAuthChange = () => {
      checkAdminStatus();
    };

    // Listen for custom events
    window.addEventListener('eventCreated', handleEventUpdate);
    window.addEventListener('eventDeleted', handleEventUpdate);
    window.addEventListener('authChanged', handleAuthChange);
    window.addEventListener('adminLogin', handleAuthChange);

    return () => {
      window.removeEventListener('eventCreated', handleEventUpdate);
      window.removeEventListener('eventDeleted', handleEventUpdate);
      window.removeEventListener('authChanged', handleAuthChange);
      window.removeEventListener('adminLogin', handleAuthChange);
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

  const handleDeleteEvent = async (id: number) => {
    // Double-check admin status before allowing delete
    const auth = getStoredAuth();
    if (!auth?.token || auth.role !== 'SUPER_ADMIN') {
      alert('Access denied. Only super admins can delete events.');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await ApiService.delete(`${API_CONFIG.ENDPOINTS.EVENTS_ADMIN}/${id}`, { 
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

  console.log('EventsDisplay rendering with events:', events);
  console.log('🔐 EventsDisplay - isAdmin state:', isAdmin);
  
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
        {isAdmin === true && (
          <div className="mt-4">
            <Button 
              onClick={() => navigate('/admin?tab=events')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Event
            </Button>
          </div>
        )}
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
                src={
                  event.imageUrl.startsWith('http') || event.imageUrl.startsWith('data:')
                    ? event.imageUrl
                    : ApiService.getImageUrl(event.imageUrl)
                }
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
                onClick={() => navigate('/admin?tab=events')}
              >
                View Details
              </Button>
              
              {/* Admin Controls - Only show if user is actually an admin */}
              {isAdmin === true && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin?tab=events&edit=${event.id}`);
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteEvent(event.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
      
      {/* Admin Add Button - Only show if user is actually an admin */}
      {isAdmin === true && (
        <div className="col-span-full text-center pt-6">
          <Button 
            variant="accent" 
            size="lg"
            onClick={() => navigate('/admin?tab=events')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Event
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsDisplay;
