import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Radio } from "lucide-react";
import { get, API_CONFIG } from '@/config/api';

interface LiveClass {
  id: number;
  subject: string;
  teacher: string;
  description: string;
  scheduleTime: string;
  isLive: boolean;
}

const LiveClasses = () => {
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLive = async () => {
    try {
      const data = await get(API_CONFIG.ENDPOINTS.CLASSES_LIVE);
      setLiveClasses(Array.isArray(data) ? data : []);
    } catch {
      // ignore network errors for this lightweight widget
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null;
  if (!liveClasses.length) return null;

  return (
         <section className="py-8 md:py-10 bg-background" id="live-classes">
       <div className="container mx-auto px-4">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
           <h3 className="text-xl sm:text-2xl font-bold text-foreground flex items-center">
             <Radio className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mr-2 animate-pulse" />
             Live Classes
           </h3>
           <Badge variant="destructive" className="text-xs sm:text-sm">LIVE</Badge>
         </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
           {liveClasses.map((cls) => (
             <Card key={cls.id} className="p-3 md:p-4 border-red-200">
               <div className="flex items-start justify-between mb-1 gap-2">
                 <h4 className="font-semibold text-foreground text-sm sm:text-base">{cls.subject}</h4>
                 {cls.isLive && (
                   <span className="text-xs text-red-600 font-semibold shrink-0">LIVE</span>
                 )}
               </div>
               <p className="text-xs sm:text-sm text-muted-foreground mb-2">Teacher: {cls.teacher}</p>
               {cls.description && (
                 <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
                   {cls.description}
                 </p>
               )}
               <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-0 sm:space-x-4">
                                 <span className="flex items-center">
                   <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                   {new Date(cls.scheduleTime).toLocaleDateString()}
                 </span>
                 <span className="flex items-center">
                   <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                   {new Date(cls.scheduleTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveClasses;


