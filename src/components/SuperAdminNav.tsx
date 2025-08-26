import { Button } from "@/components/ui/button";
import { Shield, UserPlus, Settings } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  onCreateAdminClick?: () => void;
  rightSlot?: ReactNode;
};

const SuperAdminNav = ({ onCreateAdminClick, rightSlot }: Props) => {
  return (
    <div className="mb-6 rounded-xl border bg-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="font-semibold">Super Admin</div>
          <div className="text-xs text-muted-foreground">Full privileges • Manage admins</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onCreateAdminClick}>
          <UserPlus className="h-4 w-4 mr-2" />
          Create Admin
        </Button>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        {rightSlot}
      </div>
    </div>
  );
};

export default SuperAdminNav;


