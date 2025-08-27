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
      const resp = await fetch("http://localhost:8080/api/classes/live");
      if (resp.ok) {
        const data = await resp.json();
        setLiveClasses(Array.isArray(data) ? data : []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 15000);
    return () => clearInterval(interval);
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

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full">
      <Card className="shadow-xl border-red-300/60">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Radio className="h-5 w-5 text-red-600 animate-pulse" />
              <div className="font-semibold text-foreground">Live Class Now</div>
              <Badge variant="destructive">LIVE</Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVisible(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {current && (
            <div>
              <div className="text-lg font-bold text-foreground mb-1">{current.subject}</div>
              <div className="text-sm text-muted-foreground mb-2">Teacher: {current.teacher}</div>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(current.scheduleTime).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(current.scheduleTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
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


