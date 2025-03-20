
import { supabase } from '@/integrations/supabase/client';
import { Collection, Product } from './types';

// Updated to fetch from Supabase instead of using mock data
export const getCollectionById = async (id: number): Promise<Collection | undefined> => {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching collection by ID:', error);
    return undefined;
  }

  if (!data) return undefined;

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    startDate: data.start_date,
    endDate: data.end_date,
    isActive: data.is_active,
    theme: data.theme_primary && data.theme_secondary 
      ? {
          primary: data.theme_primary,
          secondary: data.theme_secondary
        }
      : undefined
  };
};

// Helper function to check if a collection is active
export const isCollectionActive = (collection: Collection): boolean => {
  const now = new Date();
  const startDate = new Date(collection.startDate);
  const endDate = new Date(collection.endDate);
  
  return now >= startDate && now <= endDate;
};

// Helper function to get remaining time for a collection (in seconds)
export const getCollectionRemainingTime = (collection: Collection): number => {
  const now = new Date();
  const endDate = new Date(collection.endDate);
  
  if (now > endDate) return 0;
  
  return Math.floor((endDate.getTime() - now.getTime()) / 1000);
};
