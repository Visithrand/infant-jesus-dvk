import { useState } from "react";
import { getStoredAuth } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ApiService, API_CONFIG } from '@/config/api';

interface AdminLoginProps {
  onSwitchToRegistration: () => void;
  onLoginSuccess: (token: string, username: string) => void;
}

const AdminLogin = ({ onSwitchToRegistration, onLoginSuccess }: AdminLoginProps) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.username.trim()) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    try {
      console.log('🔐 Attempting login with:', { username: formData.username.trim() });
      
      const data = await ApiService.post(API_CONFIG.ENDPOINTS.ADMIN_LOGIN, {
        username: formData.username.trim(),
        password: formData.password
      }, {
        'Content-Type': 'application/json'
      });

      console.log('📥 Login response received:', data);
      console.log('✅ data.success value:', data.success);
      console.log('✅ data.role value:', data.role);
      console.log('✅ data.message value:', data.message);
      console.log('✅ data.token value:', data.token ? 'EXISTS' : 'MISSING');
      console.log('✅ data.email value:', data.email);

      if (data.success) {
        console.log('🎉 SUCCESS PATH: data.success is true, proceeding with login');
        // Store token and role so RequireAdmin/AdminDashboard can gate correctly
        localStorage.setItem('adminToken', data.token);
        try {
          localStorage.setItem('auth', JSON.stringify({
            token: data.token,
            role: data.role,
            email: data.email,
            username: data.username,
          }));
          localStorage.setItem('role', data.role);
          localStorage.setItem('email', data.email);
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', data.token);
        } catch {}
        // Call success callback
        onLoginSuccess(data.token, data.username);
      } else {
        console.log('❌ FAILURE PATH: data.success is false');
        console.log('❌ Error message:', data.message);
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error details:', error);
      
      // Show more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('HTTP error! status: 403')) {
          setError("Access denied. Please check your credentials.");
        } else if (error.message.includes('HTTP error! status: 401')) {
          setError("Invalid username or password.");
        } else if (error.message.includes('Failed to fetch')) {
          setError("Cannot connect to server. Please check if backend is running.");
        } else {
          setError(`Login failed: ${error.message}`);
        }
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
        <CardDescription className="text-center">
          Sign in to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        
      </CardContent>
    </Card>
  );
};

export default AdminLogin;
