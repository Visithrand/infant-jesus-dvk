import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lock, 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Calendar,
  Clock,
  Building2,
  Image as ImageIcon,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import AdminLogin from "./AdminLogin";
import AdminRegistration from "./AdminRegistration";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuperAdminNav from "@/components/SuperAdminNav";
import { getStoredAuth } from "@/utils/auth";
import { useLocation } from "react-router-dom";
import { springApiFetch, getImageUrl } from "@/lib/api";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

interface ClassSchedule {
  id: number;
  subject: string;
  teacher: string;
  scheduleTime: string;
  isLive: boolean;
  createdAt: string;
}

interface Facility {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [showAuthForm, setShowAuthForm] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [authError, setAuthError] = useState<string | null>(null); // Add auth error state

  // Data states
  const [events, setEvents] = useState<Event[]>([]);
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // Form states
  const [eventForm, setEventForm] = useState({ title: "", description: "", image: null as File | null });
  const [classForm, setClassForm] = useState({ subject: "", teacher: "", scheduleTime: "", isLive: false });
  const [facilityForm, setFacilityForm] = useState({ name: "", description: "", image: null as File | null });
  const [isCreatingClass, setIsCreatingClass] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isCreatingFacility, setIsCreatingFacility] = useState(false);

  // Edit states
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingClass, setEditingClass] = useState<ClassSchedule | null>(null);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  
  // Notification states
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const location = useLocation();

  // Notification helper function
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch all data function
  const fetchAllData = async () => {
    if (!token) return;
    
    try {
      // Fetch events from admin endpoint
      const eventsResponse = await springApiFetch('/events/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        console.log('🔍 Admin Events Response:', eventsData);
        setEvents(eventsData);
      } else {
        console.error('❌ Admin Events Failed:', eventsResponse.status, eventsResponse.statusText);
      }

      // Also try to fetch from public endpoint to compare
      try {
        const publicEventsResponse = await springApiFetch('/events', { cache: 'no-store' });
        if (publicEventsResponse.ok) {
          const publicEventsData = await publicEventsResponse.json();
          console.log('🔍 Public Events Response:', publicEventsData);
          console.log('📊 Events Comparison:', {
            adminEvents: events.length,
            publicEvents: publicEventsData.length,
            adminEndpoint: '/events/admin',
            publicEndpoint: '/events'
          });
        }
      } catch (publicError) {
        console.log('Could not fetch public events for comparison:', publicError);
      }

      // Fetch classes
      const classesResponse = await springApiFetch('/classes/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (classesResponse.ok) {
        const classesData = await classesResponse.json();
        setClasses(classesData);
      }

      // Fetch facilities
      const facilitiesResponse = await springApiFetch('/facilities/admin', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (facilitiesResponse.ok) {
        const facilitiesData = await facilitiesResponse.json();
        setFacilities(facilitiesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('error', 'Failed to fetch data. Please refresh the page.');
    }
  };

  // Fetch all events from both endpoints
  const fetchAllEvents = async () => {
    if (!token) return;
    
    try {
      let allEvents: Event[] = [];
      
      // Fetch from admin endpoint
      try {
        const adminResponse = await springApiFetch('/events/admin', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (adminResponse.ok) {
          const adminData = await adminResponse.json();
          allEvents = [...allEvents, ...adminData];
          console.log('✅ Admin events loaded:', adminData.length);
        }
      } catch (error) {
        console.log('Could not fetch admin events:', error);
      }
      
      // Fetch from public endpoint
      try {
        const publicResponse = await springApiFetch('/events', { cache: 'no-store' });
        if (publicResponse.ok) {
          const publicData = await publicResponse.json();
          // Filter out duplicates by ID
          const existingIds = new Set(allEvents.map(e => e.id));
          const uniquePublicEvents = publicData.filter((e: Event) => !existingIds.has(e.id));
          allEvents = [...allEvents, ...uniquePublicEvents];
          console.log('✅ Public events loaded:', publicData.length, 'unique:', uniquePublicEvents.length);
        }
      } catch (error) {
        console.log('Could not fetch public events:', error);
      }
      
      // Sort by creation date (newest first)
      allEvents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setEvents(allEvents);
      showNotification('success', `Loaded ${allEvents.length} total events`);
      console.log('📊 All Events Combined:', allEvents);
      
    } catch (error) {
      console.error('Error fetching all events:', error);
      showNotification('error', 'Failed to fetch all events');
    }
  };

  useEffect(() => {
    // Get authentication from localStorage (set by AuthenticationPage)
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        setAuthError(null);
        
        // Check multiple possible storage locations
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        const adminToken = localStorage.getItem('adminToken');
        const token = localStorage.getItem('token');
        
        // Use the first available token
        const validToken = auth.token || adminToken || token;
        
        if (validToken) {
          // Validate the token with the backend
          const isValid = await validateToken(validToken);
          if (isValid) {
            setToken(validToken);
            setUsername(auth.username || '');
            setRole(auth.role || '');
            setIsLoggedIn(true);
            
            // Fetch initial data
            await fetchAllData();
          } else {
            // Token is invalid, clear storage and show login
            clearAuthStorage();
            setIsLoggedIn(false);
            setAuthError('Session expired. Please login again.');
          }
        } else {
          // No token found, show login
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthError('Authentication error. Please try again.');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Clear all authentication storage
  const clearAuthStorage = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
  };

  // Validate token with backend
  const validateToken = async (tokenToValidate: string): Promise<boolean> => {
    try {
      const response = await springApiFetch('/admin/validate', {
        headers: { 'Authorization': `Bearer ${tokenToValidate}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update stored auth info with fresh data from backend
        try {
          localStorage.setItem('auth', JSON.stringify({
            token: tokenToValidate,
            username: data.username,
            role: data.role,
            email: data.email
          }));
        } catch {}
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      
      // Fallback: if validation endpoint doesn't exist, try a simple API call
      try {
        const testResponse = await springApiFetch('/events/admin', {
          headers: { 'Authorization': `Bearer ${tokenToValidate}` }
        });
        if (testResponse.status === 401) {
          return false; // Unauthorized
        }
        // If we get any response (even 403), the token is valid
        return true;
      } catch (fallbackError) {
        console.error('Fallback validation failed:', fallbackError);
        return false;
      }
    }
  };

  // Fetch data when token changes
  useEffect(() => {
    if (token && isLoggedIn) {
      fetchAllData();
    }
  }, [token, isLoggedIn]);

  useEffect(() => {
    // If SUPER_ADMIN clicked Create Admin from ribbon, open registration tab
    if (role === 'SUPER_ADMIN') {
      const params = new URLSearchParams(location.search);
      if (params.get('action') === 'create-admin') {
        setShowAuthForm('register');
      }
    }
  }, [location.search, role]);

  const handleLoginSuccess = async (token: string, username: string) => {
    try {
      // Validate the token immediately
      const isValid = await validateToken(token);
      if (isValid) {
        setToken(token);
        setUsername(username);
        try {
          const stored = getStoredAuth();
          if (stored?.role) setRole(stored.role);
        } catch {}
        setIsLoggedIn(true);
        setAuthError(null);
        // Data will be fetched by the useEffect above
      } else {
        setAuthError('Login failed. Please try again.');
        clearAuthStorage();
      }
    } catch (error) {
      console.error('Login success error:', error);
      setAuthError('Login error. Please try again.');
      clearAuthStorage();
    }
  };

  const handleRegistrationSuccess = () => {
    setShowAuthForm('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUsername("");
    setRole(null);
    setEvents([]);
    setClasses([]);
    setFacilities([]);
    
    // Clear all authentication storage
    clearAuthStorage();
    
    // Redirect back to auth page
    window.location.href = '/admin';
  };

  // Event handlers
  const handleCreateEvent = async () => {
    if (!token || isCreatingEvent) return;
    
    // Validation
    if (!eventForm.title.trim() || !eventForm.description.trim()) {
      showNotification('error', 'Please fill in all required fields.');
      return;
    }

    // Image validation
    if (eventForm.image) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (eventForm.image.size > maxSize) {
        showNotification('error', 'Image size must be less than 5MB.');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(eventForm.image.type)) {
        showNotification('error', 'Please upload a valid image file (JPG, PNG, or GIF).');
        return;
      }
    }
    
    setIsCreatingEvent(true);
    
    // Store image reference before clearing form
    const imageFile = eventForm.image;
    
    // Optimistic UI: add a temporary event to the list for snappier UX
    const tempId = Date.now();
    const optimisticEvent: Event = {
      id: tempId,
      title: eventForm.title,
      description: eventForm.description,
      imageUrl: null, // Will be updated when server responds
      createdAt: new Date().toISOString(),
    };

    // Immediately add to UI
    setEvents(prev => [optimisticEvent, ...prev]);
    
    // Clear form immediately for better UX
    setEventForm({ title: "", description: "", image: null });
    
    const formData = new FormData();
    formData.append('title', optimisticEvent.title);
    formData.append('description', optimisticEvent.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await springApiFetch('/events/admin', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

             if (response.ok) {
         const createdEvent = await response.json();
         // Replace optimistic item with server item
         setEvents(prev => [createdEvent, ...prev.filter(e => e.id !== tempId)]);
         
         // Show success notification
         showNotification('success', 'Event created successfully!');
         
         // Update localStorage and dispatch event
         try {
           localStorage.setItem('ij:lastUpdate', String(Date.now()));
           window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'events' } }));
         } catch {}
              } else {
         // Revert optimistic addition on failure
         setEvents(prev => prev.filter(e => e.id !== tempId));
         // Restore form data
         setEventForm({ title: optimisticEvent.title, description: optimisticEvent.description, image: null });
         // Show error notification
         showNotification('error', 'Failed to create event. Please try again.');
       }
         } catch (error) {
       console.error('Error creating event:', error);
       // Revert optimistic addition on error
       setEvents(prev => prev.filter(e => e.id !== tempId));
       // Restore form data
       setEventForm({ title: optimisticEvent.title, description: optimisticEvent.description, image: null });
       // Show error notification
       showNotification('error', 'Network error. Please check your connection and try again.');
     } finally {
      setIsCreatingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!token) return;
    
    // Optimistic UI: remove from list immediately
    setEvents(prev => prev.filter(e => e.id !== id));
    
    try {
      const response = await springApiFetch(`/events/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Success - item already removed from UI
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'events' } }));
        } catch {}
      } else {
        // Revert optimistic removal on failure
        fetchAllData();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      // Revert optimistic removal on error
      fetchAllData();
    }
  };

  // Class handlers
  const handleCreateClass = async () => {
    if (!token || isCreatingClass) return;
    
    // Validation
    if (!classForm.subject.trim() || !classForm.teacher.trim() || !classForm.scheduleTime) {
      showNotification('error', 'Please fill in all required fields.');
      return;
    }

    // Check if schedule time is in the future
    const selectedTime = new Date(classForm.scheduleTime);
    const now = new Date();
    if (selectedTime <= now) {
      showNotification('error', 'Schedule time must be in the future.');
      return;
    }
    
    setIsCreatingClass(true);
    
    // Optimistic UI: add a temporary class to the list for snappier UX
    const tempId = Date.now();
    const optimisticClass: ClassSchedule = {
      id: tempId,
      subject: classForm.subject,
      teacher: classForm.teacher,
      scheduleTime: new Date(classForm.scheduleTime).toISOString(),
      isLive: classForm.isLive,
      createdAt: new Date().toISOString(),
    };

    // Immediately add to UI
    setClasses(prev => [optimisticClass, ...prev]);
    
    // Clear form immediately for better UX
    setClassForm({ subject: "", teacher: "", scheduleTime: "", isLive: false });

    try {
      const response = await springApiFetch('/classes/admin', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...classForm,
          scheduleTime: new Date(classForm.scheduleTime).toISOString()
        })
      });

      if (response.ok) {
        const created = await response.json();
        // Replace optimistic item with server item
        setClasses(prev => [created, ...prev.filter(c => c.id !== tempId)]);
        
        // Show success notification
        showNotification('success', 'Class created successfully!');
        
        // Update localStorage and dispatch event for real-time updates
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'classes' } }));
        } catch {}
      } else {
        // Get error details from response
        let errorMessage = 'Failed to create class. Please try again.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {}
        
        // Revert optimistic addition on failure
        setClasses(prev => prev.filter(c => c.id !== tempId));
        // Restore form data
        setClassForm({ subject: optimisticClass.subject, teacher: optimisticClass.teacher, scheduleTime: classForm.scheduleTime, isLive: optimisticClass.isLive });
        // Show error notification
        showNotification('error', errorMessage);
        console.error('Class creation failed:', response.status, response.statusText);
      }
         } catch (error) {
       console.error('Error creating class:', error);
       // Revert optimistic addition on error
       setClasses(prev => prev.filter(c => c.id !== tempId));
       // Restore form data
       setClassForm({ subject: optimisticClass.subject, teacher: optimisticClass.teacher, scheduleTime: classForm.scheduleTime, isLive: optimisticClass.isLive });
       // Show error notification
       showNotification('error', 'Network error. Please check your connection and try again.');
     } finally {
      setIsCreatingClass(false);
    }
  };

  const handleToggleLiveStatus = async (id: number) => {
    if (!token) return;
    
    // Optimistic UI: toggle the live status immediately
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, isLive: !cls.isLive } : cls
    ));
    
    try {
      const response = await springApiFetch(`/classes/admin/${id}/toggle-live`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        // Success - status already updated in UI
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'classes' } }));
        } catch {}
      } else {
        // Revert optimistic update on failure
        setClasses(prev => prev.map(cls => 
          cls.id === id ? { ...cls, isLive: !cls.isLive } : cls
        ));
      }
    } catch (error) {
      console.error('Error toggling live status:', error);
      // Revert optimistic update on error
      setClasses(prev => prev.map(cls => 
        cls.id === id ? { ...cls, isLive: !cls.isLive } : cls
      ));
    }
  };

  // Facility handlers
  const handleCreateFacility = async () => {
    if (!token || isCreatingFacility) return;
    
    // Validation
    if (!facilityForm.name.trim() || !facilityForm.description.trim()) {
      showNotification('error', 'Please fill in all required fields.');
      return;
    }

    // Image validation
    if (facilityForm.image) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (facilityForm.image.size > maxSize) {
        showNotification('error', 'Image size must be less than 5MB.');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(facilityForm.image.type)) {
        showNotification('error', 'Please upload a valid image file (JPG, PNG, or GIF).');
        return;
      }
    }
    
    setIsCreatingFacility(true);
    
    // Store image reference before clearing form
    const imageFile = facilityForm.image;
    
    // Optimistic UI: add a temporary facility to the list for snappier UX
    const tempId = Date.now();
    const optimisticFacility: Facility = {
      id: tempId,
      name: facilityForm.name,
      description: facilityForm.description,
      imageUrl: null, // Will be updated when server responds
      createdAt: new Date().toISOString(),
    };

    // Immediately add to UI
    setFacilities(prev => [optimisticFacility, ...prev]);
    
    // Clear form immediately for better UX
    setFacilityForm({ name: "", description: "", image: null });
    
    const formData = new FormData();
    formData.append('name', optimisticFacility.name);
    formData.append('description', optimisticFacility.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await springApiFetch('/facilities/admin', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

             if (response.ok) {
         const createdFacility = await response.json();
         // Replace optimistic item with server item
         setFacilities(prev => [createdFacility, ...prev.filter(f => f.id !== tempId)]);
         
         // Show success notification
         showNotification('success', 'Facility created successfully!');
         
         try {
           localStorage.setItem('ij:lastUpdate', String(Date.now()));
           window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'facilities' } }));
         } catch {}
              } else {
         // Get error details from response
         let errorMessage = 'Failed to create facility. Please try again.';
         try {
           const errorData = await response.json();
           errorMessage = errorData.message || errorData.error || errorMessage;
         } catch {}
         
         // Revert optimistic addition on failure
         setFacilities(prev => prev.filter(f => f.id !== tempId));
         // Restore form data
         setFacilityForm({ name: optimisticFacility.name, description: optimisticFacility.description, image: null });
         // Show error notification
         showNotification('error', errorMessage);
         console.error('Facility creation failed:', response.status, response.statusText);
       }
         } catch (error) {
       console.error('Error creating facility:', error);
       // Revert optimistic addition on error
       setFacilities(prev => prev.filter(f => f.id !== tempId));
       // Restore form data
       setFacilityForm({ name: optimisticFacility.name, description: optimisticFacility.description, image: null });
       // Show error notification
       showNotification('error', 'Network error. Please check your connection and try again.');
     } finally {
      setIsCreatingFacility(false);
    }
  };

  const handleDeleteFacility = async (id: number) => {
    if (!token) return;
    
    // Optimistic UI: remove from list immediately
    setFacilities(prev => prev.filter(f => f.id !== id));
    
    try {
      const response = await springApiFetch(`/facilities/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        // Success - item already removed from UI
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'facilities' } }));
        } catch {}
      } else {
        // Revert optimistic removal on failure
        fetchAllData();
      }
    } catch (error) {
      console.error('Error deleting facility:', error);
      // Revert optimistic removal on error
      fetchAllData();
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {isLoading ? (
                // Loading state
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Loading...</h2>
                  <p className="text-muted-foreground">Checking authentication...</p>
                </div>
              ) : (
                // Authentication forms
                <>
                  <div className="text-center mb-8">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Admin Authentication</h2>
                    <p className="text-muted-foreground">Access the school management dashboard</p>
                  </div>

                  {/* Show auth error if any */}
                  {authError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-700">{authError}</span>
                      </div>
                    </div>
                  )}

                  {showAuthForm === 'login' ? (
                    <AdminLogin
                      onSwitchToRegistration={() => setShowAuthForm('register')}
                      onLoginSuccess={handleLoginSuccess}
                    />
                  ) : (
                    <AdminRegistration
                      onSwitchToLogin={() => setShowAuthForm('login')}
                      onRegistrationSuccess={handleRegistrationSuccess}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
                     {/* Header */}
           <div className="flex items-center justify-between mb-8">
             <div>
               <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
               <p className="text-muted-foreground">Welcome back, {username}</p>
             </div>
             <Button variant="outline" onClick={handleLogout}>
               <LogOut className="mr-2 h-4 w-4" />
               Logout
             </Button>
           </div>

                       {/* Success/Error Notifications */}
            {notification && (
              <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
                notification.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>{notification.message}</span>
              </div>
            )}

            {/* Loading State for Data */}
            {isLoading && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  <span className="text-blue-700">Loading dashboard data...</span>
                </div>
              </div>
            )}

            {/* Debug Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">🔧 Debug & Testing</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchAllData}
                  className="text-blue-600 hover:text-blue-700"
                >
                  🔄 Refresh All Data
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    console.log('🔧 Current State:', {
                      token: token ? 'Present' : 'Missing',
                      events: events.length,
                      classes: classes.length,
                      facilities: facilities.length
                    });
                    showNotification('success', 'Check console for debug info');
                  }}
                  className="text-purple-600 hover:text-purple-700"
                >
                  📊 Debug State
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={async () => {
                    try {
                      // Fetch from public endpoint
                      const publicResponse = await springApiFetch('/events', { cache: 'no-store' });
                      if (publicResponse.ok) {
                        const publicData = await publicResponse.json();
                        console.log('🔍 Public Events:', publicData);
                        showNotification('success', `Found ${publicData.length} public events. Check console.`);
                      } else {
                        console.error('Public events failed:', publicResponse.status);
                        showNotification('error', 'Public events fetch failed');
                      }
                    } catch (error) {
                      console.error('Error fetching public events:', error);
                      showNotification('error', 'Error fetching public events');
                    }
                  }}
                  className="text-green-600 hover:text-green-700"
                >
                  🔍 Check Public Events
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchAllEvents}
                  className="text-orange-600 hover:text-orange-700"
                >
                  📋 Load All Events
                </Button>
              </div>
            </div>

          {role === 'SUPER_ADMIN' && (
            <SuperAdminNav onCreateAdminClick={() => setShowAuthForm('register')} />
          )}

          {/* Dashboard Tabs */}
          <Tabs defaultValue="events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="facilities">Facilities</TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Create New Event</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event-title">Title</Label>
                    <Input
                      id="event-title"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      placeholder="Event title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-image">Image</Label>
                    <Input
                      id="event-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEventForm({ ...eventForm, image: e.target.files?.[0] || null })}
                    />
                    {eventForm.image && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>📁 File: {eventForm.image.name}</p>
                        <p>📏 Size: {(eventForm.image.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p>🎨 Type: {eventForm.image.type}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea
                    id="event-description"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Event description"
                    rows={3}
                  />
                </div>
                                 <Button onClick={handleCreateEvent} className="mt-4" disabled={isCreatingEvent}>
                   <Plus className="mr-2 h-4 w-4" />
                   {isCreatingEvent ? 'Creating...' : 'Create Event'}
                 </Button>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <Card key={event.id} className="p-4">
                    {event.imageUrl && (
                      <img
                        src={getImageUrl(event.imageUrl)}
                        alt={event.title}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h4 className="font-semibold mb-2">{event.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Create New Class</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class-subject">Subject</Label>
                    <Input
                      id="class-subject"
                      value={classForm.subject}
                      onChange={(e) => setClassForm({ ...classForm, subject: e.target.value })}
                      placeholder="Subject name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="class-teacher">Teacher</Label>
                    <Input
                      id="class-teacher"
                      value={classForm.teacher}
                      onChange={(e) => setClassForm({ ...classForm, teacher: e.target.value })}
                      placeholder="Teacher name"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="class-time">Schedule Time</Label>
                    <Input
                      id="class-time"
                      type="datetime-local"
                      value={classForm.scheduleTime}
                      onChange={(e) => setClassForm({ ...classForm, scheduleTime: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-6">
                    <input
                      type="checkbox"
                      id="class-live"
                      checked={classForm.isLive}
                      onChange={(e) => setClassForm({ ...classForm, isLive: e.target.checked })}
                    />
                    <Label htmlFor="class-live">Live Class</Label>
                  </div>
                </div>
                                 <Button onClick={handleCreateClass} className="mt-4" disabled={isCreatingClass}>
                   <Plus className="mr-2 h-4 w-4" />
                   {isCreatingClass ? 'Creating...' : 'Create Class'}
                 </Button>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classes.map((cls) => (
                  <Card key={cls.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{cls.subject}</h4>
                      {cls.isLive && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">LIVE</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Teacher: {cls.teacher}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Time: {new Date(cls.scheduleTime).toLocaleString()}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleLiveStatus(cls.id)}
                    >
                      {cls.isLive ? "Stop Live" : "Go Live"}
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Facilities Tab */}
            <TabsContent value="facilities" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Create New Facility</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facility-name">Name</Label>
                    <Input
                      id="facility-name"
                      value={facilityForm.name}
                      onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
                      placeholder="Facility name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facility-image">Image</Label>
                    <Input
                      id="facility-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFacilityForm({ ...facilityForm, image: e.target.files?.[0] || null })}
                    />
                    {facilityForm.image && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>📁 File: {facilityForm.image.name}</p>
                        <p>📏 Size: {(facilityForm.image.size / 1024 / 1024).toFixed(2)} MB</p>
                        <p>🎨 Type: {facilityForm.image.type}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="facility-description">Description</Label>
                  <Textarea
                    id="facility-description"
                    value={facilityForm.description}
                    onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
                    placeholder="Facility description"
                    rows={3}
                  />
                </div>
                                 <Button onClick={handleCreateFacility} className="mt-4" disabled={isCreatingFacility}>
                   <Plus className="mr-2 h-4 w-4" />
                   {isCreatingFacility ? 'Creating...' : 'Create Facility'}
                 </Button>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facilities.map((facility) => (
                  <Card key={facility.id} className="p-4">
                    {facility.imageUrl && (
                      <img
                        src={getImageUrl(facility.imageUrl)}
                        alt={facility.name}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h4 className="font-semibold mb-2">{facility.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {facility.description}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteFacility(facility.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminDashboard;
