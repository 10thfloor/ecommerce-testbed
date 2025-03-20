
import { supabase } from '@/integrations/supabase/client';
import { Product } from './types';

// We no longer need these mock data functions as we're fetching everything from Supabase
// Instead, we'll just export utility functions that the app still relies on,
// but their implementation will use Supabase

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_sizes(*)
    `)
    .eq('category_id', categoryId);
  
  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: {
      en: product.description_en,
      fr: product.description_fr,
      ja: product.description_ja
    },
    image: product.image,
    inventory: product.inventory,
    categoryId: product.category_id,
    collectionId: product.collection_id || undefined,
    isLimitedEdition: product.is_limited_edition || false,
    sizes: product.product_sizes.map((size: any) => ({
      name: size.name as 'SM' | 'MD' | 'LG' | 'XL',
      inventory: size.inventory
    }))
  }));
};

export const getUniqueCategories = async (): Promise<number[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('id');
  
  if (error) {
    console.error('Error fetching unique categories:', error);
    return [];
  }

  return data.map(category => category.id);
};

export const getLimitedEditionProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_sizes(*)
    `)
    .eq('is_limited_edition', true);
  
  if (error) {
    console.error('Error fetching limited edition products:', error);
    return [];
  }

  return data.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: {
      en: product.description_en,
      fr: product.description_fr,
      ja: product.description_ja
    },
    image: product.image,
    inventory: product.inventory,
    categoryId: product.category_id,
    collectionId: product.collection_id || undefined,
    isLimitedEdition: product.is_limited_edition || false,
    sizes: product.product_sizes.map((size: any) => ({
      name: size.name as 'SM' | 'MD' | 'LG' | 'XL',
      inventory: size.inventory
    }))
  }));
};

export const getProductsByCollection = async (collectionId: number): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_sizes(*)
    `)
    .eq('collection_id', collectionId);
  
  if (error) {
    console.error('Error fetching products by collection:', error);
    return [];
  }

  return data.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: {
      en: product.description_en,
      fr: product.description_fr,
      ja: product.description_ja
    },
    image: product.image,
    inventory: product.inventory,
    categoryId: product.category_id,
    collectionId: product.collection_id || undefined,
    isLimitedEdition: product.is_limited_edition || false,
    sizes: product.product_sizes.map((size: any) => ({
      name: size.name as 'SM' | 'MD' | 'LG' | 'XL',
      inventory: size.inventory
    }))
  }));
};
