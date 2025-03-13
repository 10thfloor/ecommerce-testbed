
export interface ProductSize {
  name: 'SM' | 'MD' | 'LG' | 'XL';
  inventory: number;
}

export interface ProductDescription {
  en: string;
  fr: string;
  ja: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string | ProductDescription;
  image: string;
  inventory: number;
  sizes: ProductSize[];
  categoryId: number; // Add category reference
  collectionId?: number; // Optional reference to a collection
  isLimitedEdition?: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  image?: string;
  theme?: {
    primary: string;
    secondary: string;
  }
}
