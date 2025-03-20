import { supabase } from "@/integrations/supabase/client";
import { Product, ProductSize, Category, Collection } from "@/components/product/types";

export async function fetchProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_sizes(*)
    `);
  
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return products.map(product => ({
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
}

export async function fetchProductAttributes() {
  const { data, error } = await supabase
    .from('product_attributes')
    .select('*');
  
  if (error) {
    console.error('Error fetching product attributes:', error);
    throw error;
  }
  
  // Organize attributes by product_id for easier lookup
  const attributesByProduct = data.reduce((acc: Record<number, any[]>, item) => {
    if (!acc[item.product_id]) {
      acc[item.product_id] = [];
    }
    acc[item.product_id].push({
      type: item.attribute_type,
      value: item.attribute_value
    });
    return acc;
  }, {});
  
  return attributesByProduct;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  return categories.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon
  }));
}

export async function fetchCollections(): Promise<Collection[]> {
  const { data: collections, error } = await supabase
    .from('collections')
    .select('*');
  
  if (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }

  return collections.map(collection => ({
    id: collection.id,
    name: collection.name,
    description: collection.description,
    startDate: collection.start_date,
    endDate: collection.end_date,
    isActive: collection.is_active,
    image: collection.image,
    theme: collection.theme_primary && collection.theme_secondary 
      ? {
          primary: collection.theme_primary,
          secondary: collection.theme_secondary
        }
      : undefined
  }));
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_sizes(*)
    `)
    .eq('category_id', categoryId);
  
  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return products.map(product => ({
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
}

export async function getLimitedEditionProducts(): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_sizes(*)
    `)
    .eq('is_limited_edition', true);
  
  if (error) {
    console.error('Error fetching limited edition products:', error);
    throw error;
  }

  return products.map(product => ({
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
}

export async function getProductsByCollection(collectionId: number): Promise<Product[]> {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      product_sizes(*)
    `)
    .eq('collection_id', collectionId);
  
  if (error) {
    console.error('Error fetching products by collection:', error);
    throw error;
  }

  return products.map(product => ({
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
}
