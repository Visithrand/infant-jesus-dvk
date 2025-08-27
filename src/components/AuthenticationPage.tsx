import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, User, Shield, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLogin from "./AdminLogin";
import AdminRegistration from "./AdminRegistration";
import UserRegistration from "./UserRegistration";

interface AuthenticationPageProps {
  defaultTab?: 'admin-login' | 'admin-register' | 'user-register';
}

const AuthenticationPage = ({ defaultTab = 'admin-login' }: AuthenticationPageProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const navigate = useNavigate();

  const handleAdminLoginSuccess = (token: string, username: string) => {
    // Store admin authentication
    localStorage.setItem('adminToken', token);
    localStorage.setItem('auth', JSON.stringify({
      token,
      username,
      role: 'ADMIN' // Will be updated by the backend response
    }));
    
    // Redirect to admin dashboard
    navigate('/admin/dashboard');
  };

  const handleAdminRegistrationSuccess = () => {
    setActiveTab('admin-login');
  };

  const handleUserRegistrationSuccess = () => {
    setActiveTab('admin-login');
  };

  return (
    <>
      <Header />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Authentication Portal</h2>
              <p className="text-muted-foreground">Access the school management system</p>
            </div>

            {/* Authentication Tabs */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Choose Your Access Level</CardTitle>
                <CardDescription className="text-center">
                  Different access levels for different user types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="admin-login" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Admin Login
                    </TabsTrigger>
                    <TabsTrigger value="admin-register" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Admin Register
                    </TabsTrigger>
                    <TabsTrigger value="user-register" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      User Register
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="admin-login" className="mt-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Administrator Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Login with admin credentials to access the management dashboard
                      </p>
                    </div>
                    <AdminLogin
                      onSwitchToRegistration={() => setActiveTab('admin-register')}
                      onLoginSuccess={handleAdminLoginSuccess}
                    />
                  </TabsContent>

                  <TabsContent value="admin-register" className="mt-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Create Admin Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Only SUPER_ADMIN can create new admin accounts
                      </p>
                    </div>
                    <AdminRegistration
                      onSwitchToLogin={() => setActiveTab('admin-login')}
                      onRegistrationSuccess={handleAdminRegistrationSuccess}
                    />
                  </TabsContent>

                  <TabsContent value="user-register" className="mt-6">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold">Create User Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Regular user accounts for accessing school information
                      </p>
                    </div>
                    <UserRegistration
                      onSwitchToLogin={() => setActiveTab('admin-login')}
                      onRegistrationSuccess={handleUserRegistrationSuccess}
                    />
                  </TabsContent>
                </Tabs>

                {/* Information Section */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Access Level Information:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-primary">SUPER_ADMIN</h5>
                      <p className="text-muted-foreground">
                        Full system access, can manage all admins and content
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-primary">ADMIN</h5>
                      <p className="text-muted-foreground">
                        Content management access, can manage events, classes, facilities
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-primary">USER</h5>
                      <p className="text-muted-foreground">
                        View-only access to school information and events
                      </p>
                    </div>
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

export default AuthenticationPage;
