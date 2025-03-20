
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const setupAuth = async () => {
      try {
        setLoading(true);
        console.log('Auth: Setting up auth state listener');
        
        // First set up the auth state change listener
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          console.log('Auth: Auth state changed', { event, user: newSession?.user?.email });
          setSession(newSession);
          setUser(newSession?.user || null);
          setLoading(false);
        });
        
        // Then check for existing session
        const { data } = await supabase.auth.getSession();
        console.log('Auth: Initial session check', { hasSession: !!data.session, user: data.session?.user?.email });
        setSession(data.session);
        setUser(data.session?.user || null);
        setLoading(false);
        
        return () => {
          console.log('Auth: Cleaning up auth listener');
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth setup error:', error);
        setLoading(false);
      }
    };
    
    setupAuth();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Auth: Attempting signup for', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log('Auth: Signup successful', { user: data.user?.email });
      toast({
        title: "Account created",
        description: "Please check your email for the confirmation link."
      });
    } catch (error: any) {
      console.error('Auth: Signup error', error);
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Auth: Attempting signin for', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log('Auth: Signin successful', { user: data.user?.email });
      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in."
      });
    } catch (error: any) {
      console.error('Auth: Signin error', error);
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log('Auth: Attempting signout');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      console.log('Auth: Signout successful');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    } catch (error: any) {
      console.error('Auth: Signout error', error);
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
