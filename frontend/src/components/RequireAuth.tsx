import { useEffect, useState } from "react";
import { API_CONFIG, get } from "@/config/api";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallback?: React.ReactNode;
}

const RequireAuth = ({ children, requiredRoles = [], fallback }: RequireAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Validate token with backend
        const data = await get(`/admin/validate`, { 'Authorization': `Bearer ${token}` });
        if (data) {
          setIsAuthenticated(true);
          setUserRole(data.role);
          
          // Check if user has required role
          if (requiredRoles.length > 0 && !requiredRoles.includes(data.role)) {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
          // Clear invalid tokens
          localStorage.removeItem('adminToken');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [requiredRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Checking authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    // Redirect to login if no fallback provided
    navigate('/admin', { replace: true });
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
