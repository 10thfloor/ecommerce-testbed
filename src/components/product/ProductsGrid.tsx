
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from './types';

interface ProductsGridProps {
  products: Product[];
  watchedItems: number[];
  productAttributes?: Record<number, any[]>;
  onAddToCart: (productId: number, price: number, size?: string) => void;
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  watchedItems, 
  productAttributes,
  onAddToCart, 
  onWatchItem,
  onSaveForLater
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWatched={watchedItems.includes(product.id)}
          productAttributes={productAttributes}
          onAddToCart={onAddToCart}
          onWatchItem={onWatchItem}
          onSaveForLater={onSaveForLater}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
