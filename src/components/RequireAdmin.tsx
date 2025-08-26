import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getStoredAuth, isAdminRole } from "@/utils/auth";

type Props = {
  children: ReactNode;
};

const RequireAdmin = ({ children }: Props) => {
  const auth = getStoredAuth();
  // If not authenticated yet, let the admin dashboard render its built-in login UI
  if (!auth) {
    return <>{children}</>;
  }
  // If logged in but not admin, block access
  if (!isAdminRole(auth.role)) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="p-6 rounded-xl border text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Unauthorized</h2>
          <p className="text-muted-foreground">Admin access only. Please log in with an admin account.</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export default RequireAdmin;


