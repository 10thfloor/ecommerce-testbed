
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
      
      {/* Right panel with purple gradient background similar to product drops */}
      <div className="hidden md:block w-1/2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute transform rotate-45 -left-1/4 -top-24 w-full h-full border-4 border-purple-300 rounded-full"></div>
          <div className="absolute transform rotate-12 left-1/2 -top-12 w-full h-full border-4 border-indigo-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
