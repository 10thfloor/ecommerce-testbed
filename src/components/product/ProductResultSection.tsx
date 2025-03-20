
import React from 'react';
import ProductsGrid from './ProductsGrid';
import { Product } from './types';
import { useProductAttributes } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductResultSectionProps {
  filteredProducts: Product[];
  searchQuery: string;
  watchedItems: number[];
  onAddToCart: (productId: number, price: number) => void;
  onWatchItem: (product: Product) => void;
  onSaveForLater: (product: Product) => void;
  isLoading?: boolean;
}

const ProductResultSection = ({
  filteredProducts,
  searchQuery,
  watchedItems,
  onAddToCart,
  onWatchItem,
  onSaveForLater,
  isLoading = false
}: ProductResultSectionProps) => {
  const { data: productAttributes, isLoading: attributesLoading } = useProductAttributes();

  if (isLoading || attributesLoading) {
    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-secondary/30 rounded-lg p-4">
            <Skeleton className="h-48 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

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
        productAttributes={productAttributes}
        onAddToCart={onAddToCart}
        onWatchItem={onWatchItem}
        onSaveForLater={onSaveForLater}
      />
    </div>
  );
};

export default ProductResultSection;
