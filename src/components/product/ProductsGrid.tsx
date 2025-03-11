
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from './types';

interface ProductsGridProps {
  products: Product[];
  watchedItems: number[];
  onAddToCart: (productId: number, price: number) => void;
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  watchedItems, 
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
          onAddToCart={onAddToCart}
          onWatchItem={onWatchItem}
          onSaveForLater={onSaveForLater}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
