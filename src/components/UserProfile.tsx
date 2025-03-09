
import React from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfileProps {
  userId: string;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, className }) => {
  return (
    <div className={cn("card-glass p-4 flex items-center space-x-3", className)}>
      <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
        <User className="h-5 w-5 text-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">User Details</span>
        <span className="font-medium">User ID: {userId}</span>
      </div>
    </div>
  );
};

export default UserProfile;
