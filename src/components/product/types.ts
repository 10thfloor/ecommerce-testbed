
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
}

