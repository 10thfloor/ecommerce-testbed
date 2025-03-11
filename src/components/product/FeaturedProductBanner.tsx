
import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';
import { Button } from '@/components/ui/button';
import { Product } from './types';

interface FeaturedProductBannerProps {
  products: Product[];
  onAddToCart: (productId: number, price: number) => void;
}

const FeaturedProductBanner: React.FC<FeaturedProductBannerProps> = ({ 
  products, 
  onAddToCart 
}) => {
  // Only display up to 2 products in the banner
  const featuredProducts = products
    .filter(product => product.inventory > 0) // Only show in-stock products
    .slice(0, 2);
  
  if (featuredProducts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 mb-6 animate-fade-in">
      <div className="flex items-center mb-3">
        <div className="bg-yellow-500/20 rounded-full p-1.5 mr-2">
          <Star className="h-4 w-4 text-yellow-500" />
        </div>
        <h3 className="font-medium text-sm text-foreground/90">Featured Products</h3>
      </div>
      
      <div className={`grid ${featuredProducts.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {featuredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-background/50 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-all hover-scale"
          >
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h4 className="font-medium text-base">{product.name}</h4>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>
                
                <div className="mb-3 flex items-center">
                  <span className="font-bold mr-3">{formatCurrency(product.price)}</span>
                  {product.inventory <= 3 && (
                    <div className="text-xs font-medium rounded-full px-2 py-0.5 bg-amber-500/20 text-amber-700 dark:text-amber-400">
                      Only {product.inventory} left
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => onAddToCart(product.id, product.price)}
                  className="w-full group"
                >
                  Add to Cart
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductBanner;
