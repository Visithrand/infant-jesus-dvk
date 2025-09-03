import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Edit, Trash2, Plus } from "lucide-react";
import { get, deleteMethod, API_CONFIG } from '@/config/api';
import { getStoredAuth } from '@/utils/auth';
import { useNavigate } from "react-router-dom";

interface ClassSchedule {
  id: number;
  subject: string;
  teacher: string;
  description: string;
  scheduleTime: string;
  isLive: boolean;
  createdAt: string;
}

const ClassesSection = () => {
  const [classes, setClasses] = useState<ClassSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
    checkAdminStatus();
  }, []);

  useEffect(() => {
    const revalidate = () => fetchClasses();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'ij:lastUpdate') fetchClasses();
    };
    window.addEventListener('focus', revalidate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') fetchClasses();
    });
    window.addEventListener('ij:data-updated' as any, revalidate);
    window.addEventListener('storage', onStorage);
    
    // Listen for custom events
    window.addEventListener('classCreated', revalidate);
    window.addEventListener('classDeleted', revalidate);
    window.addEventListener('classLiveStatusChanged', revalidate);
    
    return () => {
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('ij:data-updated' as any, revalidate);
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('classCreated', revalidate);
      window.removeEventListener('classDeleted', revalidate);
      window.removeEventListener('classLiveStatusChanged', revalidate);
    };
  }, []);

  const checkAdminStatus = () => {
    try {
      const auth = getStoredAuth();
      setIsAdmin(!!auth?.token);
    } catch {
      setIsAdmin(false);
    }
  };

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await get(API_CONFIG.ENDPOINTS.CLASSES_LIVE);
      
      if (Array.isArray(data)) {
        const sorted = [...data].sort((a: ClassSchedule, b: ClassSchedule) =>
          new Date(a.scheduleTime).getTime() - new Date(b.scheduleTime).getTime()
        );
        setClasses(sorted);
        
        // Also update localStorage for backward compatibility
        localStorage.setItem('schoolClasses', JSON.stringify(sorted));
      } else {
        console.error('Invalid classes data format:', data);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching classes');
      
      // Fallback to localStorage if API fails
      try {
        const storedClasses = localStorage.getItem('schoolClasses');
        if (storedClasses) {
          const parsedClasses = JSON.parse(storedClasses);
          setClasses(parsedClasses);
          setError(null); // Clear error if fallback works
        }
      } catch (localStorageError) {
        console.error('Error reading from localStorage:', localStorageError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async (id: number) => {
    if (!confirm('Are you sure you want to delete this class?')) return;
    
    try {
      const auth = getStoredAuth();
      if (!auth?.token) return;

      await deleteMethod(`${API_CONFIG.ENDPOINTS.CLASSES_ADMIN}/${id}`, { 
        'Authorization': `Bearer ${auth.token}` 
      });
      
      // Update local state
      setClasses(prev => prev.filter(cls => cls.id !== id));
      
      // Notify other components
      try {
        localStorage.setItem('ij:lastUpdate', String(Date.now()));
        window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'classes' } }));
      } catch {}
      
    } catch (error) {
      console.error('Error deleting class:', error);
      alert('Failed to delete class. Please try again.');
    }
  };

  const handleClassClick = (classItem: ClassSchedule) => {
    // Navigate to admin dashboard with class details for editing
    navigate(`/admin/dashboard?tab=classes&edit=${classItem.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <section id="classes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading classes...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="classes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg max-w-md mx-auto">
              <p className="font-medium">Error loading classes</p>
              <p className="text-sm mt-2">{error}</p>
              <Button 
                onClick={fetchClasses} 
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

  if (classes.length === 0) {
    return (
      <section id="classes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-muted/50 p-8 rounded-lg max-w-md mx-auto">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Classes Scheduled</h3>
              <p className="text-sm text-muted-foreground">
                Check back later for upcoming classes and schedules.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="classes" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                Live Classes & Schedules
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Join our interactive live classes and stay updated with the latest schedules. 
                Experience real-time learning with our experienced teachers.
              </p>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {classes.map((cls) => (
                <Card 
                  key={cls.id}
                  className="overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient cursor-pointer"
                  onClick={() => handleClassClick(cls)}
                >
                  {/* Class Header */}
                  <div className="p-4 md:p-6 border-b border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-2">
                        {cls.subject}
                      </h3>
                      {cls.isLive && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          LIVE
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      {cls.teacher}
                    </div>
                  </div>

                  {/* Class Content */}
                  <div className="p-4 md:p-6">
                    {cls.description && (
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                        {cls.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        {formatDate(cls.scheduleTime)}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        {formatTime(cls.scheduleTime)}
                      </div>
                    </div>
                    
                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="flex flex-col space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/dashboard?tab=classes&edit=${cls.id}`);
                          }}
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClass(cls.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          Delete
                        </Button>
                      </div>
                    )}
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
                  onClick={() => navigate('/admin/dashboard?tab=classes')}
                >
                  <Plus className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Add New Class
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassesSection;
