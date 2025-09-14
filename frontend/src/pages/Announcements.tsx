import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementsDisplay from "@/components/AnnouncementsDisplay";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getStoredAuth } from "@/utils/auth";
import { useEffect, useState } from "react";

const Announcements = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = getStoredAuth();
    setIsAdmin(!!auth?.token);
  }, []);

  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Megaphone className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                School Announcements
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay updated with the latest news, events, and important information from Infant Jesus School
              </p>
            </div>

            {/* Admin Actions */}
            {isAdmin && (
              <div className="flex justify-center mb-8">
                <Button
                  onClick={() => navigate('/admin?tab=announcements')}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Announcement
                </Button>
              </div>
            )}

            {/* Announcements Display */}
            <AnnouncementsDisplay />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Announcements;
