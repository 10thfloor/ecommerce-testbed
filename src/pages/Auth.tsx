
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/products');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-background to-secondary/50">
      {/* Left panel */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full card-glass p-8 rounded-xl backdrop-blur-sm">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">Welcome</h2>
            <div className="h-1 w-16 bg-primary rounded animate-pulse-subtle mb-4"></div>
            <p className="text-muted-foreground">
              Sign in to your account or create a new one to start shopping
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="py-4">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="signup" className="py-4">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right panel with darker gradient background and no text */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#403E43] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Subtle circular patterns */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 mix-blend-overlay"></div>
          <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-accent/5 mix-blend-overlay"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-primary/5 mix-blend-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
