import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone } from "lucide-react";

type Announcement = {
  id: number;
  title: string;
  message: string;
  createdAt: string;
};

const AnnouncementPopup = () => {
  const [visible, setVisible] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    const handleCreated = () => {
      const raw = localStorage.getItem("schoolAnnouncements");
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as Announcement[];
        if (parsed.length > 0) {
          setAnnouncement(parsed[0]);
          setVisible(true);
        }
      } catch {}
    };

    window.addEventListener("announcementCreated", handleCreated);
    return () => window.removeEventListener("announcementCreated", handleCreated);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || !announcement) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <Card className="w-full sm:max-w-md max-w-lg mx-2 rounded-xl sm:rounded-2xl shadow-2xl border border-blue-100/60 bg-white">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-lg sm:rounded-xl bg-blue-50 p-2.5 sm:p-3 ring-1 ring-blue-200">
                <Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 line-clamp-2">{announcement.title}</h4>
                <p className="mt-2 text-sm sm:text-base text-gray-700 whitespace-pre-wrap leading-relaxed max-h-48 overflow-auto">
                  {announcement.message}
                </p>
                <p className="mt-3 text-[11px] sm:text-xs text-gray-400">{new Date(announcement.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              <Button
                variant="secondary"
                onClick={() => setVisible(false)}
                className="w-full sm:w-auto h-10 sm:h-9 border border-gray-200 hover:bg-gray-100"
              >
                Dismiss
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById('announcements');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setVisible(false);
                }}
                className="w-full sm:w-auto h-10 sm:h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
              >
                View Announcements
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnnouncementPopup;


