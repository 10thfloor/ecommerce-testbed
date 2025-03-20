
import { supabase } from './client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

// Types for user profile
export interface UserProfile {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// Hook to fetch the user's profile
export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        setProfile(data as UserProfile);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading, error };
};

// Function to ensure a profile exists for the user
export const ensureProfile = async (userId: string, email: string): Promise<UserProfile | null> => {
  try {
    // Check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is 'not found', which we expect if the profile doesn't exist
      console.error('Error checking for existing profile:', fetchError);
      return null;
    }

    if (existingProfile) {
      return existingProfile as UserProfile;
    }

    // Create profile if it doesn't exist
    const { data: newProfile, error: insertError } = await supabase
      .from('profiles')
      .insert({ id: userId, email })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating profile:', insertError);
      return null;
    }

    return newProfile as UserProfile;
  } catch (error) {
    console.error('Error in ensureProfile:', error);
    return null;
  }
};
