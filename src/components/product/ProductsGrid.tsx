
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
  // Sort products: first limited edition, then in-stock, then out-of-stock
  const sortedProducts = [...products].sort((a, b) => {
    // First priority: Limited edition items first
    if (a.isLimitedEdition && !b.isLimitedEdition) return -1;
    if (!a.isLimitedEdition && b.isLimitedEdition) return 1;
    
    // Second priority: In-stock items over out-of-stock
    const aHasStock = a.sizes.some(size => size.inventory > 0);
    const bHasStock = b.sizes.some(size => size.inventory > 0);
    
    if (aHasStock && !bHasStock) return -1;
    if (!aHasStock && bHasStock) return 1;
    
    // Third priority: Items with badges
    const aHasBadge = productAttributes?.[a.id]?.some(attr => attr.type === 'badge');
    const bHasBadge = productAttributes?.[b.id]?.some(attr => attr.type === 'badge');
    
    if (aHasBadge && !bHasBadge) return -1;
    if (!aHasBadge && bHasBadge) return 1;
    
    // Default sort by id
    return a.id - b.id;
  });
  
  if (sortedProducts.length === 0) {
    return (
      <div className="bg-secondary/20 text-center py-8 rounded-lg text-muted-foreground">
        <p>No products found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {sortedProducts.map((product) => (
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
