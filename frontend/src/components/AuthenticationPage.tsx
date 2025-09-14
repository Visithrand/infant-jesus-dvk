import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLogin from "./AdminLogin";

interface AuthenticationPageProps {}

const AuthenticationPage = ({}: AuthenticationPageProps) => {
  const navigate = useNavigate();

  const handleAdminLoginSuccess = (token: string, username: string) => {
    // Store admin authentication
    localStorage.setItem('adminToken', token);
    localStorage.setItem('auth', JSON.stringify({ token, username, role: 'SUPER_ADMIN' }));
    
    // Redirect to admin dashboard
    navigate('/admin');
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

            {/* Authentication */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">SUPER_ADMIN Access</CardTitle>
                <CardDescription className="text-center">Only SUPER_ADMIN can access the dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">Login</h3>
                    <p className="text-sm text-muted-foreground">Only SUPER_ADMIN credentials are accepted</p>
                  </div>
                  <AdminLogin onSwitchToRegistration={() => {}} onLoginSuccess={handleAdminLoginSuccess} />
                </div>

                {/* Information Section */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Access Level Information:</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-primary">SUPER_ADMIN</h5>
                      <p className="text-muted-foreground">
                        Full system access, can manage content and events
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
