import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Image as ImageIcon, X } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
}

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal = ({ event, isOpen, onClose }: EventDetailsModalProps) => {
  if (!event) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              Event Details
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Image */}
          {event.imageUrl ? (
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img
                src={`http://localhost:8080${event.imageUrl}`}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-64 bg-muted flex items-center justify-center rounded-lg">
              <ImageIcon className="h-20 w-20 text-muted-foreground" />
            </div>
          )}

          {/* Event Title */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {event.title}
            </h2>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(event.createdAt)}</span>
            </div>
          </div>

          {/* Event Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Description
            </h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
