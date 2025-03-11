
import React from 'react';
import { Plus, Eye, BookmarkPlus, Star, Award, Flame, Gem, Zap } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';
import { Button } from '../ui/button';
import { Product } from '@/components/product/types';

interface ProductCardProps {
  product: Product;
  isWatched: boolean;
  onAddToCart: (productId: number, price: number) => void;
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

// Helper function to get a random badge for a product
const getProductBadge = (productId: number) => {
  // Use product ID to deterministically assign a badge type
  const badges = [
    { icon: Star, text: "Top Rated", color: "text-white/80", bg: "bg-primary/20" },
    { icon: Award, text: "Best Seller", color: "text-white/80", bg: "bg-primary/20" },
    { icon: Flame, text: "Hot Item", color: "text-white/80", bg: "bg-primary/20" },
    { icon: Gem, text: "Premium", color: "text-white/80", bg: "bg-primary/20" },
    { icon: Zap, text: "Flash Deal", color: "text-white/80", bg: "bg-primary/20" },
  ];
  
  // Use product ID to consistently select the same badge for a product
  const badgeIndex = productId % badges.length;
  return badges[badgeIndex];
};

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWatched, 
  onAddToCart, 
  onWatchItem,
  onSaveForLater
}) => {
  const handleNotifyMe = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onWatchItem) {
      onWatchItem(product);
    }
  };

  const handleSaveForLater = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSaveForLater) {
      onSaveForLater(product);
    }
  };

  // Only show product badges for products with ID 1, 3, 7 (to showcase the feature without overwhelming the UI)
  const showBadge = [1, 3, 7].includes(product.id);
  const badge = showBadge ? getProductBadge(product.id) : null;

  return (
    <div 
      key={product.id}
      className={`${product.inventory > 0 ? 'bg-card/70 hover:bg-card' : 'bg-amber-500/5 border border-amber-500/20'} 
        rounded-sm p-4 transition-all ${product.inventory > 0 ? 'hover-scale cursor-pointer' : ''} relative`}
      onClick={() => product.inventory > 0 && onAddToCart(product.id, product.price)}
    >
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <h4 className="font-light text-base mb-1 tracking-wide uppercase">{product.name}</h4>
          {(product.inventory <= 3 && product.inventory > 0) && (
            <div className="text-xs font-medium rounded-sm px-2 py-0.5 inline-block mb-2 bg-amber-500/10 text-amber-400">
              Only {product.inventory} left
            </div>
          )}
          {product.inventory === 0 && (
            <div className="text-xs font-medium rounded-sm px-2 py-0.5 inline-block mb-2 bg-amber-500/10 text-amber-400">
              Out of stock
            </div>
          )}
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-light text-sm">{formatCurrency(product.price)}</span>
            <div className="flex space-x-2">
              {onSaveForLater && (
                <button 
                  className="p-1.5 bg-secondary/80 hover:bg-secondary rounded-sm transition-colors"
                  onClick={handleSaveForLater}
                  aria-label="Save for later"
                >
                  <BookmarkPlus className="h-4 w-4 text-secondary-foreground/70" />
                </button>
              )}
              
              {product.inventory > 0 && (
                <button 
                  className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded-sm transition-colors"
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
                  className={`h-7 w-7 p-0 rounded-sm transition-all ${
                    isWatched
                      ? 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 animate-pulse-subtle' 
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
          
          {/* Product badge now placed below the price */}
          {badge && (
            <div className={`${badge.bg} ${badge.color} rounded-sm px-2.5 py-1 flex items-center gap-1 text-xs font-light w-fit uppercase tracking-wide`}>
              <badge.icon className="h-3.5 w-3.5" />
              {badge.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
