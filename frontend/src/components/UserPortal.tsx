import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Calendar, Building2, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UserPortalProps {
  username: string;
  role: string;
  onLogout: () => void;
}

const UserPortal = ({ username, role, onLogout }: UserPortalProps) => {
  const [userData, setUserData] = useState({
    username: username,
    role: role,
    joinDate: new Date().toLocaleDateString()
  });

  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">User Portal</h2>
                <p className="text-muted-foreground">Welcome back, {username}</p>
                <Badge variant="secondary" className="mt-2">
                  Role: {role}
                </Badge>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>

            {/* User Dashboard */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile</CardTitle>
                  <User className="h-4 w-4 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{username}</div>
                  <p className="text-xs text-muted-foreground">
                    Member since {userData.joinDate}
                  </p>
                </CardContent>
              </Card>

              {/* Events Access */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Events</CardTitle>
                  <Calendar className="h-4 w-4 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">View</div>
                  <p className="text-xs text-muted-foreground">
                    Access school events and updates
                  </p>
                </CardContent>
              </Card>

              {/* Facilities Access */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Facilities</CardTitle>
                  <Building2 className="h-4 w-4 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Explore</div>
                  <p className="text-xs text-muted-foreground">
                    Discover school facilities
                  </p>
                </CardContent>
              </Card>

              {/* Programs Access */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Programs</CardTitle>
                  <BookOpen className="h-4 w-4 ml-auto" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Learn</div>
                  <p className="text-xs text-muted-foreground">
                    Access educational programs
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Information Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Welcome to Infant Jesus School</CardTitle>
                <CardDescription>
                  As a registered user, you have access to view school information, events, and programs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">What you can do:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>View school events and announcements</li>
                      <li>Access information about school facilities</li>
                      <li>Learn about educational programs</li>
                      <li>Stay updated with school news</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Need admin access?</h4>
                    <p className="text-sm text-muted-foreground">
                      If you need administrative privileges, please contact the school administration.
                      Regular user accounts cannot be upgraded to admin accounts through this portal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UserPortal;
