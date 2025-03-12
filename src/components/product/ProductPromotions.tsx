
import React from 'react';
import { Product } from './types';
import ProductDropBanner from './ProductDropBanner';
import FeaturedProductBanner from './FeaturedProductBanner';

interface ProductPromotionsProps {
  limitedEditionProducts: Product[];
  featuredProducts: Product[];
  onAddToCart: (productId: number, price: number) => void;
}

const ProductPromotions = ({
  limitedEditionProducts,
  featuredProducts,
  onAddToCart
}: ProductPromotionsProps) => {
  return (
    <>
      {/* Limited edition products banner */}
      {limitedEditionProducts.length > 0 && (
        <div className="mb-6">
          <ProductDropBanner 
            products={limitedEditionProducts} 
            onAddToCart={onAddToCart} 
          />
        </div>
      )}
      
      {/* Featured products banner (non-limited edition) */}
      {featuredProducts.length > 0 && (
        <div className="mb-6">
          <FeaturedProductBanner 
            products={featuredProducts} 
            onAddToCart={onAddToCart} 
          />
        </div>
      )}
    </>
  );
};

export default ProductPromotions;
