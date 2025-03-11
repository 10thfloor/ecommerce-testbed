
import React from 'react';
import { Plus, Eye } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';
import { Button } from '../ui/button';
import { Product } from '@/components/product/types';

interface ProductCardProps {
  product: Product;
  isWatched: boolean;
  onAddToCart: (productId: number, price: number) => void;
  onWatchItem?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWatched, 
  onAddToCart, 
  onWatchItem 
}) => {
  const handleNotifyMe = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWatchItem) {
      onWatchItem(product);
    }
  };

  return (
    <div 
      key={product.id}
      className={`${product.inventory > 0 ? 'bg-secondary/30 hover:bg-secondary/50' : 'bg-amber-500/10 border border-amber-500/30'} 
        rounded-lg p-4 transition-all ${product.inventory > 0 ? 'hover-scale cursor-pointer' : ''} relative`}
      onClick={() => product.inventory > 0 && onAddToCart(product.id, product.price)}
    >
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <h4 className="font-medium text-base mb-1">{product.name}</h4>
          {(product.inventory <= 3 && product.inventory > 0) && (
            <div className="text-xs font-medium rounded-full px-2 py-0.5 inline-block mb-2 bg-amber-500/20 text-amber-700 dark:text-amber-400">
              Only {product.inventory} left
            </div>
          )}
          {product.inventory === 0 && (
            <div className="text-xs font-medium rounded-full px-2 py-0.5 inline-block mb-2 bg-amber-500/20 text-amber-700 dark:text-amber-400">
              Out of stock
            </div>
          )}
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="font-bold text-sm">{formatCurrency(product.price)}</span>
          {product.inventory > 0 && (
            <button 
              className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.id, product.price);
              }}
              aria-label="Add to cart"
            >
              <Plus className="h-4 w-4 text-primary" />
            </button>
          )}
          
          {product.inventory === 0 && (
            <Button
              variant="outline"
              size="sm"
              className={`h-7 w-7 p-0 rounded-full transition-all ${
                isWatched
                  ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400 animate-pulse-subtle' 
                  : 'bg-secondary/70 hover:bg-secondary'
              }`}
              onClick={handleNotifyMe}
              aria-label={isWatched ? "Watching stock" : "Watch for stock updates"}
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
