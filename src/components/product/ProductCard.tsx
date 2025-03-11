
import React, { useState } from 'react';
import { Plus, Eye, BookmarkPlus, Star, Award, Flame, Gem, Zap } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';
import { Button } from '../ui/button';
import { Product, ProductSize } from '@/components/product/types';
import SizeSelector from './SizeSelector';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  isWatched: boolean;
  onAddToCart: (productId: number, price: number, size?: string) => void;
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

// Helper function to get a random badge for a product
const getProductBadge = (productId: number) => {
  // Use product ID to deterministically assign a badge type
  const badges = [
    { icon: Star, text: "Top Rated", color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
    { icon: Award, text: "Best Seller", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { icon: Flame, text: "Hot Item", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { icon: Gem, text: "Premium", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { icon: Zap, text: "Flash Deal", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
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
  const [selectedSize, setSelectedSize] = useState<ProductSize['name'] | undefined>();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize) {
      toast({
        title: "Select a Size",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    onAddToCart(product.id, product.price, selectedSize);
  };

  const handleSizeSelect = (size: ProductSize['name']) => {
    setSelectedSize(size);
  };

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

  // Calculate if any size has inventory
  const hasSizeInStock = product.sizes.some(size => size.inventory > 0);

  return (
    <div 
      key={product.id}
      className={`${hasSizeInStock ? 'bg-secondary/30 hover:bg-secondary/50' : 'bg-amber-500/10 border border-amber-500/30'} 
        rounded-lg p-4 transition-all relative`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <h4 className="font-medium text-base mb-1">{product.name}</h4>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={handleSizeSelect}
            showInventory={true}
          />
          
          {!hasSizeInStock && (
            <div className="text-xs font-medium rounded-full px-2 py-0.5 inline-block mb-2 bg-amber-500/20 text-amber-700 dark:text-amber-400">
              Out of stock
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm">{formatCurrency(product.price)}</span>
            <div className="flex space-x-2">
              {onSaveForLater && (
                <button 
                  className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveForLater(product);
                  }}
                  aria-label="Save for later"
                >
                  <BookmarkPlus className="h-4 w-4 text-blue-500" />
                </button>
              )}
              
              {hasSizeInStock && (
                <button 
                  className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                  onClick={handleAddToCart}
                  aria-label="Add to cart"
                  disabled={!selectedSize}
                >
                  <Plus className={`h-4 w-4 ${selectedSize ? 'text-primary' : 'text-primary/50'}`} />
                </button>
              )}
              
              {!hasSizeInStock && onWatchItem && (
                <Button
                  variant="outline"
                  size="sm"
                  className={`h-7 w-7 p-0 rounded-full transition-all ${
                    isWatched
                      ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400 animate-pulse-subtle' 
                      : 'bg-secondary/70 hover:bg-secondary'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatchItem(product);
                  }}
                  aria-label={isWatched ? "Watching stock" : "Watch for stock updates"}
                >
                  <Eye className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>
          
          {badge && (
            <div className={`${badge.bg} ${badge.color} rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-semibold w-fit`}>
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
