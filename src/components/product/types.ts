
export interface ProductSize {
  name: 'SM' | 'MD' | 'LG' | 'XL';
  inventory: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  inventory: number;
  sizes: ProductSize[];
  categoryId: number; // Add category reference
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string; // Lucide icon name
}


