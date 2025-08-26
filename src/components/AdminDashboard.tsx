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
  EyeOff
} from "lucide-react";
import AdminLogin from "./AdminLogin";
import AdminRegistration from "./AdminRegistration";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SuperAdminNav from "@/components/SuperAdminNav";
import { getStoredAuth } from "@/utils/auth";

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

  // Data states
  const [events, setEvents] = useState<Event[]>([]);
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // Form states
  const [eventForm, setEventForm] = useState({ title: "", description: "", image: null as File | null });
  const [classForm, setClassForm] = useState({ subject: "", teacher: "", scheduleTime: "", isLive: false });
  const [facilityForm, setFacilityForm] = useState({ name: "", description: "", image: null as File | null });

  // Edit states
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingClass, setEditingClass] = useState<ClassSchedule | null>(null);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      validateToken(savedToken);
    }
  }, []);

  const validateToken = async (tokenToValidate: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/validate', {
        headers: { 'Authorization': `Bearer ${tokenToValidate}` }
      });
      if (response.ok) {
        const data = await response.json();
        setToken(tokenToValidate);
        setUsername(data.username);
        setRole(data.role || null);
        setIsLoggedIn(true);
        fetchAllData();
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
    }
  };

  const handleLoginSuccess = (token: string, username: string) => {
    setToken(token);
    setUsername(username);
    try {
      const stored = getStoredAuth();
      if (stored?.role) setRole(stored.role);
    } catch {}
    setIsLoggedIn(true);
    fetchAllData();
  };

  const handleRegistrationSuccess = () => {
    setShowAuthForm('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setUsername("");
    localStorage.removeItem('adminToken');
  };

  const fetchAllData = async () => {
    if (!token) return;
    
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      
      // Fetch events
      const eventsResponse = await fetch('http://localhost:8080/api/events', { headers });
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      }

      // Fetch classes
      const classesResponse = await fetch('http://localhost:8080/api/classes/admin', { headers });
      if (classesResponse.ok) {
        const classesData = await classesResponse.json();
        setClasses(classesData);
      }

      // Fetch facilities
      const facilitiesResponse = await fetch('http://localhost:8080/api/facilities', { headers });
      if (facilitiesResponse.ok) {
        const facilitiesData = await facilitiesResponse.json();
        setFacilities(facilitiesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Event handlers
  const handleCreateEvent = async () => {
    if (!token) return;
    
    const formData = new FormData();
    formData.append('title', eventForm.title);
    formData.append('description', eventForm.description);
    if (eventForm.image) {
      formData.append('image', eventForm.image);
    }

    try {
      const response = await fetch('http://localhost:8080/api/events/admin', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setEventForm({ title: "", description: "", image: null });
        fetchAllData();
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'events' } }));
        } catch {}
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/events/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchAllData();
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'events' } }));
        } catch {}
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Class handlers
  const handleCreateClass = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:8080/api/classes/admin', {
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
        setClassForm({ subject: "", teacher: "", scheduleTime: "", isLive: false });
        fetchAllData();
      }
    } catch (error) {
      console.error('Error creating class:', error);
    }
  };

  const handleToggleLiveStatus = async (id: number) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/classes/admin/${id}/toggle-live`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchAllData();
      }
    } catch (error) {
      console.error('Error toggling live status:', error);
    }
  };

  // Facility handlers
  const handleCreateFacility = async () => {
    if (!token) return;
    
    const formData = new FormData();
    formData.append('name', facilityForm.name);
    formData.append('description', facilityForm.description);
    if (facilityForm.image) {
      formData.append('image', facilityForm.image);
    }

    try {
      const response = await fetch('http://localhost:8080/api/facilities/admin', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        setFacilityForm({ name: "", description: "", image: null });
        fetchAllData();
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'facilities' } }));
        } catch {}
      }
    } catch (error) {
      console.error('Error creating facility:', error);
    }
  };

  const handleDeleteFacility = async (id: number) => {
    if (!token) return;
    try {
      const response = await fetch(`http://localhost:8080/api/facilities/admin/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        fetchAllData();
        try {
          localStorage.setItem('ij:lastUpdate', String(Date.now()));
          window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'facilities' } }));
        } catch {}
      }
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };

  if (!isLoggedIn) {
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
                <Button onClick={handleCreateEvent} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Event
                </Button>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <Card key={event.id} className="p-4">
                    {event.imageUrl && (
                      <img
                        src={`http://localhost:8080${event.imageUrl}`}
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
                <Button onClick={handleCreateClass} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Class
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
                <Button onClick={handleCreateFacility} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Facility
                </Button>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facilities.map((facility) => (
                  <Card key={facility.id} className="p-4">
                    {facility.imageUrl && (
                      <img
                        src={`http://localhost:8080${facility.imageUrl}`}
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
