import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Radio } from "lucide-react";

interface LiveClass {
  id: number;
  subject: string;
  teacher: string;
  scheduleTime: string;
  isLive: boolean;
}

const LiveClasses = () => {
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLive = async () => {
    try {
      const resp = await fetch("http://localhost:8080/api/classes/live");
      if (resp.ok) {
        const data = await resp.json();
        setLiveClasses(Array.isArray(data) ? data : []);
      }
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
    <section className="py-10 bg-background" id="live-classes">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-foreground flex items-center">
            <Radio className="h-5 w-5 text-red-500 mr-2 animate-pulse" />
            Live Classes
          </h3>
          <Badge variant="destructive">LIVE</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {liveClasses.map((cls) => (
            <Card key={cls.id} className="p-4 border-red-200">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground">{cls.subject}</h4>
                {cls.isLive && (
                  <span className="text-xs text-red-600 font-semibold">LIVE</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">Teacher: {cls.teacher}</p>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(cls.scheduleTime).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
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


