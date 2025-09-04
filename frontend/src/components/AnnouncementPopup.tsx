import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, AlertTriangle } from "lucide-react";
import { ApiService, API_CONFIG } from "@/config/api";

type Announcement = {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  priority?: string;
  isActive?: boolean;
};

const AnnouncementPopup = () => {
  const [visible, setVisible] = useState(false);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    const chooseAnnouncement = (list: Announcement[]) => {
      const priorityRank = (p?: string) => {
        const up = (p || 'NORMAL').toUpperCase();
        if (up === 'URGENT') return 3;
        if (up === 'HIGH') return 2;
        if (up === 'NORMAL') return 1;
        return 0;
      };
      const active = list.filter(a => a.isActive !== false);
      active.sort((a, b) => {
        const pr = priorityRank(b.priority) - priorityRank(a.priority);
        if (pr !== 0) return pr;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      return active[0];
    };

    const fetchAndShow = async () => {
      try {
        const data = await ApiService.get(API_CONFIG.ENDPOINTS.ANNOUNCEMENTS);
        if (Array.isArray(data) && data.length > 0) {
          const chosen = chooseAnnouncement(data as Announcement[]);
          if (chosen) {
            const lastSeenId = sessionStorage.getItem('ij:lastSeenAnnouncementId');
            if (String(chosen.id) !== lastSeenId) {
              setAnnouncement(chosen);
              setVisible(true);
            }
          }
        }
      } catch {
        // fallback to localStorage cache
        const raw = localStorage.getItem('schoolAnnouncements');
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as Announcement[];
            const chosen = chooseAnnouncement(parsed);
            if (chosen) {
              const lastSeenId = sessionStorage.getItem('ij:lastSeenAnnouncementId');
              if (String(chosen.id) !== lastSeenId) {
                setAnnouncement(chosen);
                setVisible(true);
              }
            }
          } catch {}
        }
      }
    };

    // initial fetch
    fetchAndShow();

    // show on newly created announcements
    const handleCreated = () => fetchAndShow();
    window.addEventListener('announcementCreated', handleCreated);
    // refresh on focus
    const onFocus = () => fetchAndShow();
    window.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('announcementCreated', handleCreated);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    if (!visible || !announcement) return;
    const pri = (announcement.priority || 'NORMAL').toUpperCase();
    // URGENT/HIGH stays until dismissed; NORMAL auto-dismiss after 6s
    if (pri === 'URGENT' || pri === 'HIGH') return;
    const timer = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(timer);
  }, [visible, announcement]);

  if (!visible || !announcement) return null;

  const priority = (announcement.priority || 'NORMAL').toUpperCase();
  const gradient = priority === 'URGENT'
    ? 'from-red-600 via-rose-500 to-orange-500'
    : priority === 'HIGH'
      ? 'from-orange-500 via-amber-500 to-yellow-500'
      : 'from-blue-500 via-indigo-500 to-purple-500';
  const icon = priority === 'URGENT' || priority === 'HIGH' ? (
    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
  ) : (
    <Megaphone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
  );

  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex items-start justify-center p-2 sm:p-4 pt-[max(0.5rem,env(safe-area-inset-top))]">
      <Card className="w-full sm:max-w-lg max-w-2xl mx-2 rounded-xl sm:rounded-2xl shadow-2xl border bg-white">
        <div className="relative overflow-hidden rounded-2xl">
          <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 rounded-lg sm:rounded-xl bg-red-50 p-2.5 sm:p-3 ring-1 ring-red-200">
                {icon}
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
                onClick={() => {
                  sessionStorage.setItem('ij:lastSeenAnnouncementId', String(announcement.id));
                  setVisible(false);
                }}
                className="w-full sm:w-auto h-10 sm:h-9 border border-gray-200 hover:bg-gray-100"
              >
                Dismiss
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById('announcements');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  sessionStorage.setItem('ij:lastSeenAnnouncementId', String(announcement.id));
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


