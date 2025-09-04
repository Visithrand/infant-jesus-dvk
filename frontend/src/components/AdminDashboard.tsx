import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Remove complex API imports for now
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
  EyeOff
} from "lucide-react";
import AdminLogin from "./AdminLogin";
import { API_CONFIG, ApiService } from "@/config/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuperAdminNav from "@/components/SuperAdminNav";
import { getStoredAuth } from "@/utils/auth";
import { useLocation, useNavigate } from "react-router-dom";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  eventDateTime: string;
  createdAt: string;
}

interface ClassSchedule {
  id: number;
  subject: string;
  teacher: string;
  description: string;
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
  console.log('🔄 AdminDashboard component rendering...');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [showAuthForm, setShowAuthForm] = useState<'login'>('login');

  // Utility function to get base URL with fallback
  const getBaseUrl = () => API_CONFIG.BASE_URL;

  // Image state to store file objects
  const [imageFiles, setImageFiles] = useState<Map<string, File>>(new Map());

  // Function to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Normalize date to yyyy-MM-ddTHH:mm:ss (no milliseconds, no timezone)
  const formatToSecondPrecision = (value: string | Date): string => {
    const d = typeof value === 'string' ? new Date(value) : value;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // Function to get image URL - handles both URLs and local files
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a base64 data URL, return as is
    if (imagePath.startsWith('data:')) {
      return imagePath;
    }
    
    // Check if we have the file in our imageFiles map
    const file = imageFiles.get(imagePath);
    if (file) {
      return URL.createObjectURL(file);
    }
    
    // Build from API base if it's a server path
    try {
      return ApiService.getImageUrl(imagePath);
    } catch {
      return `https://via.placeholder.com/300x200?text=${imagePath}`;
    }
  };

  // Data states
  const [events, setEvents] = useState<Event[]>([]);
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [announcements, setAnnouncements] = useState<{ id: number; title: string; message: string; createdAt: string; }[]>([]);

  // Form states
  const [eventForm, setEventForm] = useState({ 
    title: "", 
    description: "", 
    eventDateTime: "", 
    imageUrl: "" 
  });
  const [classForm, setClassForm] = useState({ 
    subject: "", 
    teacher: "", 
    description: "", 
    scheduleTime: "", 
    isLive: false 
  });
  const [facilityForm, setFacilityForm] = useState({ name: "", description: "", image: null as File | null });
  const [announcementForm, setAnnouncementForm] = useState({ title: "", message: "" });
  const [isCreatingClass, setIsCreatingClass] = useState(false);

  // Edit states
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingClass, setEditingClass] = useState<ClassSchedule | null>(null);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔄 AdminDashboard useEffect running...');
    initializeAdmin();
    // Auto-refresh on window focus
    const onFocus = () => fetchAllData();
    window.addEventListener('focus', onFocus);
    // Poll every 30s for updates
    const interval = setInterval(fetchAllData, 30000);
    return () => {
      imageFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        URL.revokeObjectURL(url);
      });
      window.removeEventListener('focus', onFocus);
      clearInterval(interval);
    };
  }, []);

  const initializeAdmin = async () => {
    console.log('🔄 initializeAdmin function called...');
    const stored = localStorage.getItem('auth');
    const storedToken = localStorage.getItem('adminToken') || (stored ? JSON.parse(stored).token : null);
    if (!storedToken) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const data = await ApiService.get(`/admin/validate`, { Authorization: `Bearer ${storedToken}` });
      setToken(storedToken);
      setUsername(data.username || 'Admin');
      setRole(data.role || 'ADMIN');
      setIsLoggedIn(true);
      fetchAllData();
    } catch (e) {
      setIsLoggedIn(false);
      setToken(null);
      setUsername('');
      setRole(null);
      localStorage.removeItem('adminToken');
      localStorage.removeItem('auth');
    }
  };

  // Registration flow removed

  const validateToken = async (tokenToValidate: string) => {
    try {
      // Simple validation - just check if token exists
      if (tokenToValidate) {
        setToken(tokenToValidate);
        setUsername('Admin User'); // Default username
        setRole('ADMIN'); // Default role
        setIsLoggedIn(true);
        fetchAllData();
      }
    } catch (error) {
      console.error('Token validation error:', error);
    }
  };

  const handleLoginSuccess = (token: string, username: string) => {
    setToken(token);
    setUsername(username || 'Admin User');
    setRole('ADMIN'); // Default to admin role
    setIsLoggedIn(true);
    fetchAllData();
  };

  // Registration flow removed

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUsername("");
    localStorage.removeItem('adminToken');
    localStorage.removeItem('auth');
    // Redirect back to auth page
    navigate('/admin');
  };

  const fetchAllData = async () => {
    try {
      console.log('🔄 fetchAllData function called...');
      
      // Fetch events from backend API
      try {
        const apiEvents = await ApiService.get(API_CONFIG.ENDPOINTS.EVENTS);
        if (Array.isArray(apiEvents)) {
          setEvents(apiEvents);
          // Also update localStorage for backward compatibility
          localStorage.setItem('schoolEvents', JSON.stringify(apiEvents));
          console.log('✅ Events loaded from API:', apiEvents.length);
        }
      } catch (error) {
        console.error('❌ Error fetching events from API:', error);
        // Fallback to localStorage
        const storedEvents = localStorage.getItem('schoolEvents');
        if (storedEvents) {
          try {
            const parsedEvents = JSON.parse(storedEvents);
            setEvents(parsedEvents);
            console.log('✅ Events loaded from localStorage fallback:', parsedEvents.length);
          } catch (error) {
            console.error('❌ Error parsing events from localStorage:', error);
            setEvents([]);
          }
        } else {
          setEvents([]);
        }
      }
      
      // Fetch classes from backend API
      try {
        const apiClasses = await ApiService.get(API_CONFIG.ENDPOINTS.CLASSES_LIVE);
        if (Array.isArray(apiClasses)) {
          setClasses(apiClasses);
          // Also update localStorage for backward compatibility
          localStorage.setItem('schoolClasses', JSON.stringify(apiClasses));
          console.log('✅ Classes loaded from API:', apiClasses.length);
        }
      } catch (error) {
        console.error('❌ Error fetching classes from API:', error);
        // Fallback to localStorage
        const storedClasses = localStorage.getItem('schoolClasses');
        if (storedClasses) {
          try {
            const parsedClasses = JSON.parse(storedClasses);
            setClasses(parsedClasses);
            console.log('✅ Classes loaded from localStorage fallback:', parsedClasses.length);
          } catch (error) {
            console.error('❌ Error parsing classes:', error);
            setClasses([]);
          }
        } else {
          setClasses([]);
        }
      }
      
      // Fetch announcements from backend API
      try {
        const apiAnnouncements = await ApiService.get(API_CONFIG.ENDPOINTS.ANNOUNCEMENTS);
        if (Array.isArray(apiAnnouncements)) {
          setAnnouncements(apiAnnouncements);
          // Also update localStorage for backward compatibility
          localStorage.setItem('schoolAnnouncements', JSON.stringify(apiAnnouncements));
          console.log('✅ Announcements loaded from API:', apiAnnouncements.length);
        }
      } catch (error) {
        console.error('❌ Error fetching announcements from API:', error);
        // Fallback to localStorage
        const storedAnnouncements = localStorage.getItem('schoolAnnouncements');
        if (storedAnnouncements) {
          try {
            const parsedAnnouncements = JSON.parse(storedAnnouncements);
            setAnnouncements(parsedAnnouncements);
            console.log('✅ Announcements loaded from localStorage fallback:', parsedAnnouncements.length);
          } catch (error) {
            console.error('❌ Error parsing announcements from localStorage:', error);
            setAnnouncements([]);
          }
        } else {
          setAnnouncements([]);
        }
      }
      
      // Load data from localStorage for other entities
      const storedFacilities = localStorage.getItem('schoolFacilities');
      
      if (storedFacilities) {
        try {
          const parsedFacilities = JSON.parse(storedFacilities);
          setFacilities(parsedFacilities);
          console.log('✅ Facilities loaded from localStorage:', parsedFacilities.length);
        } catch (error) {
          console.error('❌ Error parsing facilities:', error);
          setFacilities([]);
        }
      } else {
        setFacilities([]);
      }
      
      console.log('✅ Data loaded from API and localStorage');
    } catch (error) {
      console.error('❌ Error in fetchAllData:', error);
      // Set empty arrays as fallback
      setEvents([]);
      setClasses([]);
      setFacilities([]);
      setAnnouncements([]);
    }
  };

  // Event handlers
  const handleCreateEvent = async () => {
    console.log('Creating event with data:', eventForm);
    console.log('Image files in state:', imageFiles);
    
    try {
      const selectedFiles = Array.from(imageFiles.values());
      const hasFile = selectedFiles.length > 0;

      let createdEvent: any;

      if (hasFile) {
        // Use multipart/form-data when an image is present
        const formData = new FormData();
        formData.append('title', eventForm.title);
        formData.append('description', eventForm.description);
        formData.append('eventDateTime', formatToSecondPrecision(eventForm.eventDateTime || new Date()));
        formData.append('image', selectedFiles[0]);

        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENTS}/upload`;
        const resp = await fetch(url, { method: 'POST', body: formData });
        if (!resp.ok) {
          const t = await resp.text();
          throw new Error(`HTTP error! status: ${resp.status} - ${t}`);
        }
        createdEvent = await resp.json();
      } else {
        // Fallback to JSON when there is no image
        const eventData = {
          title: eventForm.title,
          description: eventForm.description,
          imageUrl: null,
          eventDateTime: eventForm.eventDateTime
            ? formatToSecondPrecision(eventForm.eventDateTime)
            : formatToSecondPrecision(new Date())
        };
        createdEvent = await ApiService.post(API_CONFIG.ENDPOINTS.EVENTS, eventData);
      }

      if (createdEvent && createdEvent.id) {
        // Add to local state
        setEvents(prev => [createdEvent, ...prev]);
        
        // Update localStorage for backward compatibility
        const updatedEvents = [createdEvent, ...events];
        localStorage.setItem('schoolEvents', JSON.stringify(updatedEvents));
        
        // Notify other components
        window.dispatchEvent(new CustomEvent('eventCreated'));
        
        // Reset form
        setEventForm({ title: "", description: "", eventDateTime: "", imageUrl: "" });
        setImageFiles(new Map());
        
        alert('Event created successfully and saved to database!');
      } else {
        throw new Error('Failed to create event - no ID returned');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event: ' + (error as Error).message);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      // Call backend API to delete event
      await ApiService.delete(`${API_CONFIG.ENDPOINTS.EVENTS_ADMIN}/${id}`, { 
        'Authorization': `Bearer ${token}` 
      });
      
      // Remove from local state
      setEvents(prev => prev.filter(e => e.id !== id));
      
      // Update localStorage
      const updatedEvents = events.filter(e => e.id !== id);
      localStorage.setItem('schoolEvents', JSON.stringify(updatedEvents));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('eventDeleted', { detail: { id } }));
      
      alert('Event deleted successfully from database!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + (error as Error).message);
    }
  };

  // Class handlers
  const handleCreateClass = async () => {
    if (isCreatingClass) return;

    console.log('Creating class with data:', classForm);

    setIsCreatingClass(true);

    try {
      // Create class data for API
      const classData = {
        subject: classForm.subject,
        teacher: classForm.teacher,
        description: classForm.description,
        scheduleTime: classForm.scheduleTime || new Date().toISOString(),
        isLive: classForm.isLive
      };

      // Call backend API to create class
      const createdClass = await ApiService.post(API_CONFIG.ENDPOINTS.CLASSES, classData);
      
      if (createdClass && createdClass.id) {
        // Add to local state
        setClasses(prev => [createdClass, ...prev]);
        
        // Store in localStorage for other components to access
        const updatedClasses = [createdClass, ...classes];
        localStorage.setItem('schoolClasses', JSON.stringify(updatedClasses));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('classCreated', { detail: createdClass }));
        
        setClassForm({ subject: "", teacher: "", description: "", scheduleTime: "", isLive: false });
        
        // Show success message
        alert('Class created successfully and saved to database!');
      } else {
        throw new Error('Failed to create class - no ID returned');
      }
      
    } catch (error) {
      console.error('Error creating class:', error);
      alert('Error creating class: ' + (error as Error).message);
    }
    setIsCreatingClass(false);
  };

  const handleToggleLiveStatus = async (id: number) => {
    try {
      // Call backend API to toggle live status
      await ApiService.put(`${API_CONFIG.ENDPOINTS.CLASSES_ADMIN}/${id}/toggle-live`, {});
      
      // Toggle in local state
      setClasses(prev => prev.map(cls => 
        cls.id === id ? { ...cls, isLive: !cls.isLive } : cls
      ));
      
      // Update localStorage
      const updatedClasses = classes.map(cls => 
        cls.id === id ? { ...cls, isLive: !cls.isLive } : cls
      );
      localStorage.setItem('schoolClasses', JSON.stringify(updatedClasses));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('classLiveStatusChanged', { detail: { id, isLive: !classes.find(c => c.id === id)?.isLive } }));
      
      alert('Class live status updated successfully in database!');
    } catch (error) {
      console.error('Error toggling live status:', error);
      alert('Error updating class live status: ' + (error as Error).message);
    }
  };

  const handleDeleteClass = async (id: number) => {
    try {
      // Call backend API to delete class
      await ApiService.delete(`${API_CONFIG.ENDPOINTS.CLASSES_ADMIN}/${id}`, { 
        'Authorization': `Bearer ${token}` 
      });
      
      // Remove from local state
      setClasses(prev => prev.filter(cls => cls.id !== id));
      
      // Update localStorage
      const updatedClasses = classes.filter(cls => cls.id !== id);
      localStorage.setItem('schoolClasses', JSON.stringify(updatedClasses));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('classDeleted', { detail: { id } }));
      
      alert('Class deleted successfully from database!');
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Error deleting class: ' + (error as Error).message);
    }
  };

  // Facility handlers
  const handleCreateFacility = async () => {
    try {
      // Convert image file to base64 for storage
      let imageData = null;
      if (facilityForm.image) {
        imageData = await convertFileToBase64(facilityForm.image);
      }
      
      // For now, just add to local state without API call
      const newFacility = {
        id: Date.now(),
        name: facilityForm.name,
        description: facilityForm.description,
        imageUrl: imageData,
        createdAt: new Date().toISOString()
      };
      
      setFacilities(prev => [newFacility, ...prev]);
      
      // Store in localStorage for other components to access
      const updatedFacilities = [newFacility, ...facilities];
      localStorage.setItem('schoolFacilities', JSON.stringify(updatedFacilities));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('facilityCreated', { detail: newFacility }));
      
      setFacilityForm({ name: "", description: "", image: null });
      
      // Show success message
      alert('Facility created successfully! It will appear on the homepage.');
      
    } catch (error) {
      console.error('Error creating facility:', error);
      alert('Error creating facility: ' + error.message);
    }
  };

  const handleDeleteFacility = async (id: number) => {
    try {
      // For now, just remove from local state
      setFacilities(prev => prev.filter(f => f.id !== id));
      alert('Facility deleted successfully!');
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };

  // Announcement handlers
  const handleCreateAnnouncement = async () => {
    if (!announcementForm.title.trim() || !announcementForm.message.trim()) {
      alert('Please fill in both title and message');
      return;
    }

    try {
      // Create announcement data for API
      const announcementData = {
        title: announcementForm.title,
        message: announcementForm.message,
        priority: 'NORMAL',
        isActive: true
      };

      // Call backend API to create announcement
      const createdAnnouncement = await ApiService.post(API_CONFIG.ENDPOINTS.ANNOUNCEMENTS, announcementData);
      
      if (createdAnnouncement && createdAnnouncement.id) {
        // Add to local state
        setAnnouncements(prev => [createdAnnouncement, ...prev]);
        
        // Update localStorage
        const updatedAnnouncements = [createdAnnouncement, ...announcements];
        localStorage.setItem('schoolAnnouncements', JSON.stringify(updatedAnnouncements));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('announcementCreated', { detail: createdAnnouncement }));
        
        setAnnouncementForm({ title: "", message: "" });
        
        alert('Announcement created successfully and saved to database!');
      } else {
        throw new Error('Failed to create announcement - no ID returned');
      }
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Error creating announcement: ' + (error as Error).message);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    try {
      // Call backend API to delete announcement
      await ApiService.delete(`${API_CONFIG.ENDPOINTS.ANNOUNCEMENTS_ADMIN}/${id}`, { 
        'Authorization': `Bearer ${token}` 
      });
      
      // Remove from local state
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
      
      // Update localStorage
      const updatedAnnouncements = announcements.filter(ann => ann.id !== id);
      localStorage.setItem('schoolAnnouncements', JSON.stringify(updatedAnnouncements));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('announcementDeleted', { detail: { id } }));
      
      alert('Announcement deleted successfully from database!');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Error deleting announcement: ' + (error as Error).message);
    }
  };

  console.log('🔄 Render logic - isLoggedIn:', isLoggedIn);
  
  if (!isLoggedIn) {
    console.log('🔒 Showing authentication form...');
    return (
      <>
        <Header />
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Admin Authentication</h2>
              <p className="text-muted-foreground">Access the school management dashboard</p>
            </div>

              <AdminLogin onSwitchToRegistration={() => {}} onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  console.log('🎯 Rendering main dashboard...');
  
  return (
    <>
      <Header />
             <section className="py-8 sm:py-20 bg-background">
         <div className="container mx-auto px-4">
           <div className="max-w-6xl mx-auto">
                      {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 md:mb-8 gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Welcome back, {username}</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>

          {/* SuperAdminNav features retained; no registration action */}
          {role === 'SUPER_ADMIN' && <SuperAdminNav onCreateAdminClick={() => undefined} />}

                     {/* Dashboard Tabs */}
                                               <Tabs defaultValue={new URLSearchParams(location.search).get('tab') || "events"} className="space-y-4 sm:space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="events" className="text-xs sm:text-sm px-2 sm:px-3">Events</TabsTrigger>
                <TabsTrigger value="announcements" className="text-xs sm:text-sm px-2 sm:px-3">Announcements</TabsTrigger>
                <TabsTrigger value="classes" className="text-xs sm:text-sm px-2 sm:px-3">Classes</TabsTrigger>
              </TabsList>

                                                   {/* Events Tab */}
              <TabsContent value="events" className="space-y-4 sm:space-y-6">
                <Card className="p-3 sm:p-4 md:p-6">
                                   <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Create New Event</h3>
                 <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="event-title" className="text-sm sm:text-base">Title</Label>
                    <Input
                      id="event-title"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      placeholder="Event title"
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="event-datetime" className="text-sm sm:text-base">Event Date & Time</Label>
                    <Input
                      id="event-datetime"
                      type="datetime-local"
                      value={eventForm.eventDateTime}
                      onChange={(e) => setEventForm({ ...eventForm, eventDateTime: e.target.value })}
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
                                 <div className="mt-4">
                   <div>
                     <Label htmlFor="event-image" className="text-sm sm:text-base">Event Images</Label>
                                           <Input
                        id="event-image"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files ? Array.from(e.target.files) : [];
                          const nextMap = new Map(imageFiles);
                          files.forEach((f) => nextMap.set(f.name, f));
                          setImageFiles(nextMap);
                          if (files[0]) setEventForm({ ...eventForm, imageUrl: files[0].name });
                        }}
                        className="cursor-pointer text-sm sm:text-base"
                      />
                                           <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Choose one or more image files
                      </p>
                      {imageFiles.size > 0 && (
                        <div className="mt-2 grid grid-cols-4 gap-2">
                          {Array.from(imageFiles.values()).slice(0, 8).map((file) => (
                            <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} className="w-16 h-16 object-cover rounded border" />
                          ))}
                        </div>
                      )}
                   </div>
                 </div>
                <div className="mt-4">
                  <Label htmlFor="event-description" className="text-sm sm:text-base">Description</Label>
                  <Textarea
                    id="event-description"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Event description"
                    rows={3}
                    className="text-sm sm:text-base"
                  />
                </div>
                                 <Button onClick={handleCreateEvent} className="mt-4 w-full sm:w-auto">
                   <Plus className="mr-2 h-4 w-4" />
                   Create Event
                 </Button>
               </Card>

                                                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 {events.map((event) => (
                   <Card key={event.id} className="p-3 sm:p-4">
                                         {event.imageUrl && (
                       <img
                         src={event.imageUrl.startsWith('data:') ? event.imageUrl : getImageUrl(event.imageUrl)}
                         alt={event.title}
                         className="w-full h-24 sm:h-32 object-cover rounded mb-3"
                       />
                     )}
                                          <h4 className="font-semibold mb-2 text-sm sm:text-base">{event.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                        Date: {new Date(event.eventDateTime).toLocaleString()}
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setEditingEvent(event)}
                        >
                          <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Delete
                        </Button>
                      </div>
                   </Card>
                 ))}
               </div>
            </TabsContent>

              {/* Announcements Tab */}
              <TabsContent value="announcements" className="space-y-4 sm:space-y-6">
                <Card className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Post Announcement</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="a-title" className="text-sm sm:text-base">Title</Label>
                      <Input id="a-title" value={announcementForm.title} onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })} placeholder="Announcement title" />
                    </div>
                    <div>
                      <Label htmlFor="a-message" className="text-sm sm:text-base">Message</Label>
                      <Textarea id="a-message" value={announcementForm.message} onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })} placeholder="Write announcement details" rows={4} />
                    </div>
                  </div>
                  <Button onClick={handleCreateAnnouncement} className="mt-4 w-full sm:w-auto">Post Announcement</Button>
                </Card>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {announcements.map((a) => (
                    <Card key={a.id} className="p-3 sm:p-4">
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">{a.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 whitespace-pre-wrap">{a.message}</p>
                      <p className="text-xs text-gray-500 mb-2">{new Date(a.createdAt).toLocaleString()}</p>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteAnnouncement(a.id)}>Delete</Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Classes Tab */}
              <TabsContent value="classes" className="space-y-4 sm:space-y-6">
                <Card className="p-3 sm:p-4 md:p-6">
                                   <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Create New Class</h3>
                 <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="class-subject" className="text-sm sm:text-base">Subject</Label>
                    <Input
                      id="class-subject"
                      value={classForm.subject}
                      onChange={(e) => setClassForm({ ...classForm, subject: e.target.value })}
                      placeholder="Subject name"
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="class-teacher" className="text-sm sm:text-base">Teacher</Label>
                    <Input
                      id="class-teacher"
                      value={classForm.teacher}
                      onChange={(e) => setClassForm({ ...classForm, teacher: e.target.value })}
                      placeholder="Teacher name"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="class-description" className="text-sm sm:text-base">Description</Label>
                  <Textarea
                    id="class-description"
                    value={classForm.description}
                    onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                    placeholder="Class description"
                    rows={3}
                    className="text-sm sm:text-base"
                  />
                </div>
                                                                   <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="class-time" className="text-sm sm:text-base">Schedule Time</Label>
                      <Input
                        id="class-time"
                        type="datetime-local"
                        value={classForm.scheduleTime}
                        onChange={(e) => setClassForm({ ...classForm, scheduleTime: e.target.value })}
                        className="text-sm sm:text-base"
                      />
                    </div>
                    
                  </div>
                                  <Button onClick={handleCreateClass} className="mt-4 w-full sm:w-auto" disabled={isCreatingClass}>
                    <Plus className="mr-2 h-4 w-4" />
                    {isCreatingClass ? 'Creating…' : 'Create Class'}
                  </Button>
               </Card>

                                                           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 {classes.map((cls) => (
                   <Card key={cls.id} className="p-3 sm:p-4">
                                          <div className="flex items-start justify-between mb-2 gap-2">
                        <h4 className="font-semibold text-sm sm:text-base">{cls.subject}</h4>
                        {cls.isLive && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded shrink-0">LIVE</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">Teacher: {cls.teacher}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                        {cls.description}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                        Time: {new Date(cls.scheduleTime).toLocaleString()}
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setEditingClass(cls)}
                        >
                          <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleToggleLiveStatus(cls.id)}
                        >
                          {cls.isLive ? "Stop Live" : "Go Live"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => handleDeleteClass(cls.id)}
                        >
                          <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Delete
                        </Button>
                      </div>
                   </Card>
                 ))}
               </div>
            </TabsContent>

                                                   {/* Facilities Tab */}
              <TabsContent value="facilities" className="space-y-4 sm:space-y-6">
                <Card className="p-3 sm:p-4 md:p-6">
                                   <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4">Create New Facility</h3>
                                   <div className="grid grid-cols-1 gap-4">
                   <div>
                     <Label htmlFor="facility-name" className="text-sm sm:text-base">Name</Label>
                     <Input
                       id="facility-name"
                       value={facilityForm.name}
                       onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
                       placeholder="Facility name"
                       className="text-sm sm:text-base"
                     />
                   </div>
                   <div>
                     <Label htmlFor="facility-image" className="text-sm sm:text-base">Image</Label>
                     <Input
                       id="facility-image"
                       type="file"
                       accept="image/*"
                                                                       onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                             // Store the file object in our imageFiles map
                             setImageFiles(prev => new Map(prev).set(file.name, file));
                           }
                           setFacilityForm({ ...facilityForm, image: file || null });
                         }}
                       className="text-sm sm:text-base"
                       />
                       {facilityForm.image && (
                         <div className="mt-2">
                           <p className="text-xs sm:text-sm text-muted-foreground mb-1">Selected: {facilityForm.image.name}</p>
                           <img 
                             src={URL.createObjectURL(facilityForm.image)} 
                             alt="Preview" 
                             className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded border"
                           />
                         </div>
                       )}
                     </div>
                   </div>
                                     <div className="mt-4">
                   <Label htmlFor="facility-description" className="text-sm sm:text-base">Description</Label>
                   <Textarea
                     id="facility-description"
                     value={facilityForm.description}
                     onChange={(e) => setFacilityForm({ ...facilityForm, description: e.target.value })}
                     placeholder="Facility description"
                     rows={3}
                     className="text-sm sm:text-base"
                   />
                 </div>
                                  <Button onClick={handleCreateFacility} className="mt-4 w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Facility
                  </Button>
               </Card>

                                                           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 {facilities.map((facility) => (
                   <Card key={facility.id} className="p-3 sm:p-4">
                                         {facility.imageUrl && (
                       <img
                         src={facility.imageUrl.startsWith('data:') ? facility.imageUrl : getImageUrl(facility.imageUrl)}
                         alt={facility.name}
                         className="w-full h-24 sm:h-32 object-cover rounded mb-3"
                       />
                     )}
                                          <h4 className="font-semibold mb-2 text-sm sm:text-base">{facility.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                        {facility.description}
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setEditingFacility(facility)}
                        >
                          <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => handleDeleteFacility(facility.id)}
                        >
                          <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Delete
                        </Button>
                      </div>
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
