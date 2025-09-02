import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, Edit, Trash2, Plus } from "lucide-react";
import { get, deleteMethod, getImageUrl, API_CONFIG } from '@/config/api';
import { getStoredAuth } from '@/utils/auth';

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
    return () => {
      window.removeEventListener('focus', revalidate);
      document.removeEventListener('visibilitychange', () => {});
      window.removeEventListener('ij:data-updated' as any, revalidate);
      window.removeEventListener('storage', onStorage);
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
      const data = await get(API_CONFIG.ENDPOINTS.CLASSES_LIVE);
      const sorted = [...data].sort((a: ClassSchedule, b: ClassSchedule) =>
        new Date(a.scheduleTime).getTime() - new Date(b.scheduleTime).getTime()
      );
      setClasses(sorted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (loading) {
    return (
      <section id="classes" className="py-20 bg-muted/30">
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
      <section id="classes" className="py-20 bg-muted/30">
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
      <section id="classes" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-muted/50 p-8 rounded-lg max-w-md mx-auto">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No Classes Scheduled</h3>
              <p className="text-sm text-muted-foreground">
                Check back later for upcoming class schedules.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="classes" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
                         {/* Section Header */}
             <div className="text-center mb-8 md:mb-16">
               <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                 Class Schedules
               </h2>
               <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                 Stay updated with the latest class schedules and live sessions at 
                 Infant Jesus School. Join our interactive learning experiences.
               </p>
             </div>

                         {/* Classes Grid */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {classes.map((cls) => (
                <Card 
                  key={cls.id}
                  className="overflow-hidden hover:shadow-medium transition-all duration-300 hover:scale-105 bg-card-gradient"
                >
                                     {/* Class Header */}
                   <div className="p-4 md:p-6">
                     <div className="flex items-start justify-between mb-3 gap-2">
                       <h3 className="text-lg md:text-xl font-bold text-foreground line-clamp-2 flex-1">
                         {cls.subject}
                       </h3>
                       {cls.isLive && (
                         <Badge variant="destructive" className="animate-pulse text-xs md:text-sm shrink-0">
                           LIVE
                         </Badge>
                       )}
                     </div>
                    
                                         <p className="text-sm md:text-base text-muted-foreground mb-3">
                       <strong>Teacher:</strong> {cls.teacher}
                     </p>
                     
                     {cls.description && (
                       <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
                         {cls.description}
                       </p>
                     )}
                     
                     <div className="flex flex-col sm:flex-row sm:items-center text-xs md:text-sm text-muted-foreground space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(cls.scheduleTime)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {formatTime(cls.scheduleTime)}
                      </span>
                    </div>

                                         {/* Admin Actions */}
                     {isAdmin && (
                       <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-3 border-t">
                         <Button 
                           variant="outline" 
                           size="sm"
                           className="flex-1"
                           onClick={() => {
                             // Navigate to admin dashboard with edit mode
                             window.location.href = `/admin?tab=classes&edit=${cls.id}`;
                           }}
                         >
                           <Edit className="mr-2 h-4 w-4" />
                           Edit
                         </Button>
                         <Button 
                           variant="destructive" 
                           size="sm"
                           className="flex-1"
                           onClick={() => handleDeleteClass(cls.id)}
                         >
                           <Trash2 className="mr-2 h-4 w-4" />
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
                   onClick={() => {
                     window.location.href = '/admin?tab=classes';
                   }}
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
