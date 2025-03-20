
import { User } from '@supabase/supabase-js';

export const isUserAuthenticated = (user: User | null): boolean => {
  return !!user;
};

export const getDefaultUserId = (): string => {
  return 'guest-user';
};
