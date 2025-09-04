import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Calendar, AlertTriangle, Info, CheckCircle, Clock, Edit, Trash2, Plus } from "lucide-react";
import { ApiService, API_CONFIG } from '@/config/api';
import { getStoredAuth } from '@/utils/auth';
import { useNavigate } from "react-router-dom";

interface Announcement {
  id: number;
  title: string;
  message: string;
  isActive: boolean;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

const AnnouncementsDisplay = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnouncements();
    checkAdminStatus();
  }, []);

  useEffect(() => {
    // Listen for custom events when new announcements are created
    const handleAnnouncementUpdate = () => {
      fetchAnnouncements();
    };

    // Listen for custom events
    window.addEventListener('announcementCreated', handleAnnouncementUpdate);
    window.addEventListener('announcementDeleted', handleAnnouncementUpdate);

    const onDataUpdated = (e: Event) => fetchAnnouncements();
    window.addEventListener('ij:data-updated', onDataUpdated as EventListener);

    return () => {
      window.removeEventListener('announcementCreated', handleAnnouncementUpdate);
      window.removeEventListener('announcementDeleted', handleAnnouncementUpdate);
      window.removeEventListener('ij:data-updated', onDataUpdated as EventListener);
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

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await ApiService.get(API_CONFIG.ENDPOINTS.ANNOUNCEMENTS);
      
      if (Array.isArray(data)) {
        const sorted = [...data].sort((a: Announcement, b: Announcement) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAnnouncements(sorted);
        
        // Also update localStorage for backward compatibility
        localStorage.setItem('schoolAnnouncements', JSON.stringify(sorted));
      } else {
        console.error('Invalid announcements data format:', data);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching announcements');
      
      // Fallback to localStorage if API fails
      try {
        const storedAnnouncements = localStorage.getItem('schoolAnnouncements');
        if (storedAnnouncements) {
          const parsedAnnouncements = JSON.parse(storedAnnouncements);
          setAnnouncements(parsedAnnouncements);
          setError(null); // Clear error if fallback works
        }
      } catch (localStorageError) {
        console.error('Error reading from localStorage:', localStorageError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id: number) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      const auth = getStoredAuth();
      if (!auth?.token) return;

      await ApiService.delete(`${API_CONFIG.ENDPOINTS.ANNOUNCEMENTS_ADMIN}/${id}`, { 
        'Authorization': `Bearer ${auth.token}` 
      });
      
      // Update local state
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
      
      // Notify other components
      try {
        localStorage.setItem('ij:lastUpdate', String(Date.now()));
        window.dispatchEvent(new CustomEvent('ij:data-updated', { detail: { type: 'announcements' } }));
      } catch {}
      
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Failed to delete announcement. Please try again.');
    }
  };

  const handleAnnouncementClick = (announcement: Announcement) => {
    // Navigate to admin dashboard with announcement details for editing
    navigate(`/admin/dashboard?tab=announcements&edit=${announcement.id}`);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toUpperCase()) {
      case 'URGENT':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'HIGH':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'NORMAL':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'LOW':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toUpperCase()) {
      case 'URGENT':
        return 'border-red-200 bg-red-50';
      case 'HIGH':
        return 'border-orange-200 bg-orange-50';
      case 'NORMAL':
        return 'border-blue-200 bg-blue-50';
      case 'LOW':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
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
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-500">Loading announcements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg mb-4">Error loading announcements: {error}</p>
        <Button onClick={fetchAnnouncements} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-12">
        <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No announcements yet.</p>
        <p className="text-gray-400 text-sm mt-2">Check back soon for important updates!</p>
        {isAdmin && (
          <div className="mt-4">
            <Button 
              onClick={() => navigate('/admin/dashboard?tab=announcements')}
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Create Your First Announcement
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => (
        <Card 
          key={announcement.id}
          className={`overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${getPriorityColor(announcement.priority)}`}
          onClick={() => handleAnnouncementClick(announcement)}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getPriorityIcon(announcement.priority)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {announcement.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(announcement.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {formatTime(announcement.createdAt)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      announcement.priority === 'URGENT' ? 'bg-red-100 text-red-800' :
                      announcement.priority === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                      announcement.priority === 'NORMAL' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {announcement.priority}
                    </span>
                  </div>
                </div>
              </div>
              
              {!announcement.isActive && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  Inactive
                </span>
              )}
            </div>

            {/* Message */}
            <div className="mb-4">
              <p className="text-gray-700 whitespace-pre-wrap">{announcement.message}</p>
            </div>

            {/* Admin Actions */}
            {isAdmin && (
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/admin/dashboard?tab=announcements&edit=${announcement.id}`);
                  }}
                >
                  <Edit className="h-3 w-3 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAnnouncement(announcement.id);
                  }}
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Card>
      ))}

      {/* Admin Add Button */}
      {isAdmin && (
        <div className="text-center pt-6">
          <Button 
            variant="accent" 
            size="lg"
            onClick={() => navigate('/admin/dashboard?tab=announcements')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Announcement
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsDisplay;


