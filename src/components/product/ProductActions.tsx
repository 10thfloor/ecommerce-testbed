
import React from 'react';
import { Plus, BookmarkPlus, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Product } from './types';
import { formatCurrency } from '@/utils/cartUtils';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductActionsProps {
  product: Product;
  isWatched: boolean;
  selectedSize?: string;
  hasSizeInStock: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  isWatched,
  selectedSize,
  hasSizeInStock,
  onAddToCart,
  onWatchItem,
  onSaveForLater
}) => {
  const { currency, t } = useTranslation();

  return (
    <div className="mt-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-sm">{formatCurrency(product.price, currency)}</span>
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
              onClick={onAddToCart}
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
    </div>
  );
};

export default ProductActions;
