
import { supabase } from '@/integrations/supabase/client';
import { Category } from './types';
import { Tag, Package, TreePine, Gem } from 'lucide-react';

// Helper function to get icon component by name
export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Tag":
      return Tag;
    case "Package":
      return Package;
    case "TreePine":
      return TreePine;
    case "Gem":
      return Gem;
    default:
      return Package;
  }
};

// Function to fetch categories from Supabase
export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon
  }));
};
