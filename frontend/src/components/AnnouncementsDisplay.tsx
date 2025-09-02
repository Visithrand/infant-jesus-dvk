import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Megaphone } from "lucide-react";

type Announcement = {
  id: number;
  title: string;
  message: string;
  createdAt: string;
};

const AnnouncementsDisplay = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const load = () => {
      const raw = localStorage.getItem("schoolAnnouncements");
      if (raw) {
        try {
          setAnnouncements(JSON.parse(raw));
        } catch {
          setAnnouncements([]);
        }
      } else {
        setAnnouncements([]);
      }
    };
    load();
    const handler = () => load();
    window.addEventListener("announcementCreated", handler);
    window.addEventListener("announcementDeleted", handler);
    return () => {
      window.removeEventListener("announcementCreated", handler);
      window.removeEventListener("announcementDeleted", handler);
    };
  }, []);

  if (announcements.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">No announcements yet.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {announcements.map((a) => (
        <Card key={a.id} className="p-4 border-l-4 border-l-blue-600">
          <div className="flex items-start gap-3">
            <Megaphone className="h-5 w-5 text-blue-600 mt-1" />
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-1 text-gray-900">{a.title}</h4>
              <p className="text-sm text-gray-700 mb-2 whitespace-pre-wrap leading-relaxed">{a.message}</p>
              <p className="text-xs text-gray-400">{new Date(a.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AnnouncementsDisplay;


