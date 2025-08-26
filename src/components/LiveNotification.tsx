import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Clock, 
  User, 
  X, 
  Bell, 
  Video,
  Zap
} from "lucide-react";

interface LiveClass {
  id: number;
  subject: string;
  teacher: string;
  scheduleTime: string;
  isLive: boolean;
  createdAt: string;
}

const LiveNotification = () => {
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchLiveClasses();
    
    // Set up polling every 10 seconds
    const interval = setInterval(fetchLiveClasses, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchLiveClasses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/classes/live');
      if (!response.ok) {
        throw new Error('Failed to fetch live classes');
      }
      const data = await response.json();
      setLiveClasses(data);
      
      // Show notification if there are live classes and it wasn't visible before
      if (data.length > 0 && !isVisible) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Error fetching live classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleJoinClass = (classId: number) => {
    // In a real application, this would redirect to the live class
    console.log(`Joining class ${classId}`);
    // You could implement video call integration here
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || liveClasses.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full">
      <Card className="bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg border-0">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse">
                <Zap className="h-5 w-5 text-yellow-300" />
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                LIVE NOW
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Live Classes List */}
          <div className="space-y-3">
            {liveClasses.map((liveClass) => (
              <div key={liveClass.id} className="bg-white/10 rounded-lg p-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">
                      {liveClass.subject}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-white/80">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {liveClass.teacher}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(liveClass.scheduleTime)}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleJoinClass(liveClass.id)}
                    className="bg-white text-red-500 hover:bg-white/90 h-8 px-3 text-xs font-medium"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/80">
                {liveClasses.length} live class{liveClasses.length > 1 ? 'es' : ''} available
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-6 px-2 text-xs"
                onClick={fetchLiveClasses}
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-white"></div>
                ) : (
                  <Bell className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveNotification;
