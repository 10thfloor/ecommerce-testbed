
import React from 'react';
import ProductsGrid from './ProductsGrid';
import { Product } from './types';
import { useProductAttributes } from '@/hooks/useProducts';

interface ProductResultSectionProps {
  filteredProducts: Product[];
  searchQuery: string;
  watchedItems: number[];
  onAddToCart: (productId: number, price: number) => void;
  onWatchItem: (product: Product) => void;
  onSaveForLater: (product: Product) => void;
}

const ProductResultSection = ({
  filteredProducts,
  searchQuery,
  watchedItems,
  onAddToCart,
  onWatchItem,
  onSaveForLater
}: ProductResultSectionProps) => {
  if (filteredProducts.length === 0) {
    return (
      <div className="bg-secondary/20 text-center py-8 rounded-lg text-muted-foreground mt-4">
        <p>No products found {searchQuery ? `matching "${searchQuery}"` : "in selected categories"}</p>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <ProductsGrid 
        products={filteredProducts}
        watchedItems={watchedItems}
        onAddToCart={onAddToCart}
        onWatchItem={onWatchItem}
        onSaveForLater={onSaveForLater}
      />
    </div>
  );
};

export default ProductResultSection;
