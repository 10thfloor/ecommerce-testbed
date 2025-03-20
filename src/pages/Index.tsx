
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-4xl font-bold">Welcome to Our Shopping App</h1>
        <p className="text-xl text-muted-foreground">
          Explore our premium products and enjoy a seamless shopping experience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {user ? (
            <>
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Products
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="lg">
                Sign In / Register
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
