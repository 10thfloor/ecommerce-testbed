
import React, { useState } from 'react';
import { User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AuthModal from './auth/AuthModal';

interface UserProfileProps {
  userId: string;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, className }) => {
  const { user, signOut, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  
  const handleOpenLogin = () => {
    setAuthModalTab('login');
    setAuthModalOpen(true);
  };
  
  const handleOpenSignup = () => {
    setAuthModalTab('signup');
    setAuthModalOpen(true);
  };

  return (
    <>
      <div className={cn("card-glass p-4 flex items-center space-x-3", className)}>
        <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">
          <User className="h-5 w-5 text-primary" />
        </div>
        
        <div className="flex flex-col">
          {loading ? (
            <span className="text-sm text-muted-foreground">Loading...</span>
          ) : user ? (
            <>
              <span className="text-xs text-muted-foreground">Welcome</span>
              <span className="font-medium">{user.email}</span>
            </>
          ) : (
            <span className="font-medium">Guest</span>
          )}
        </div>
        
        <div className="ml-auto">
          {loading ? null : user ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => signOut()}
              className="h-8 px-2"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          ) : (
            <div className="flex space-x-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleOpenLogin}
                className="h-8 px-2"
              >
                <LogIn className="h-4 w-4 mr-1" />
                <span>Login</span>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleOpenSignup}
                className="h-8 px-2"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                <span>Sign Up</span>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </>
  );
};

export default UserProfile;
