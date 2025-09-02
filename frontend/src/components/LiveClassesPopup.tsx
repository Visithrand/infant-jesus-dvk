import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, X, Calendar, Clock, Users } from "lucide-react";

interface LiveClass {
  id: number;
  subject: string;
  teacher: string;
  scheduleTime: string;
  isLive: boolean;
}

const LiveClassesPopup = () => {
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [visible, setVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  const fetchLive = async () => {
    try {
      // Get live classes from localStorage
      const storedClasses = localStorage.getItem('schoolClasses');
      if (storedClasses) {
        const allClasses = JSON.parse(storedClasses);
        const liveClasses = allClasses.filter((cls: LiveClass) => cls.isLive);
        setLiveClasses(liveClasses);
      }
    } catch (error) {
      console.error('Error fetching live classes:', error);
      setLiveClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
    
    // Listen for class updates
    const handleClassUpdate = () => {
      fetchLive();
    };
    
    window.addEventListener('classCreated', handleClassUpdate);
    window.addEventListener('classLiveStatusChanged', handleClassUpdate);
    
    const interval = setInterval(fetchLive, 15000);
    return () => {
      clearInterval(interval);
      window.removeEventListener('classCreated', handleClassUpdate);
      window.removeEventListener('classLiveStatusChanged', handleClassUpdate);
    };
  }, []);

  useEffect(() => {
    if (!liveClasses.length) return;
    const rotator = setInterval(() => {
      setIndex((prev) => (prev + 1) % liveClasses.length);
    }, 5000);
    return () => clearInterval(rotator);
  }, [liveClasses.length]);

  const current = useMemo(() => liveClasses[index], [liveClasses, index]);

  if (loading) return null;
  if (!visible) return null;
  if (!liveClasses.length) return null;

  // Show multiple live classes if available
  if (liveClasses.length === 1) {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-50 max-w-sm sm:max-w-sm w-auto sm:w-full">
        <Card className="shadow-xl border-red-300/60">
          <div className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
                <Radio className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 animate-pulse flex-shrink-0" />
                <div className="font-semibold text-foreground text-sm sm:text-base truncate">Live Class Now</div>
                <Badge variant="destructive" className="text-xs sm:text-sm ml-1 sm:ml-2 flex-shrink-0">LIVE</Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVisible(false)}
                className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0 ml-2"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>

            <div>
              <div className="text-base sm:text-lg font-bold text-foreground mb-1 truncate">{liveClasses[0].subject}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mb-2">Teacher: {liveClasses[0].teacher}</div>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  {new Date(liveClasses[0].scheduleTime).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  {new Date(liveClasses[0].scheduleTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="flex items-center">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  Live
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto z-50 max-w-sm sm:max-w-sm w-auto sm:w-full">
      <Card className="shadow-xl border-red-300/60">
        <div className="p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1 sm:space-x-2 flex-1 min-w-0">
              <Radio className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 animate-pulse flex-shrink-0" />
              <div className="font-semibold text-foreground text-sm sm:text-base truncate">Live Class Now</div>
              <Badge variant="destructive" className="text-xs sm:text-sm ml-1 sm:ml-2 flex-shrink-0">LIVE</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVisible(false)}
              className="h-7 w-7 sm:h-8 sm:w-8 p-0 flex-shrink-0 ml-2"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {current && (
            <div>
              <div className="text-base sm:text-lg font-bold text-foreground mb-1 truncate">{current.subject}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mb-2">Teacher: {current.teacher}</div>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  {new Date(current.scheduleTime).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  {new Date(current.scheduleTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="flex items-center">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                  Live
                </span>
              </div>
            </div>
          )}

          {liveClasses.length > 1 && (
            <div className="mt-3 flex items-center space-x-1">
              {liveClasses.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-red-600' : 'bg-muted'}`}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LiveClassesPopup;


