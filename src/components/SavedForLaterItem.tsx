
import React from 'react';
import { Plus, Trash2, PackageX, Eye, EyeOff } from 'lucide-react';
import { CartItem } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface SavedForLaterItemProps {
  item: CartItem;
  onMoveToCart: (id: string | number) => void;
  onRemove: (id: string | number) => void;
  onWatchItem?: (productId: number) => void;
  watchedItems?: number[];
  inventory?: Record<number, number>;
}

const SavedForLaterItem: React.FC<SavedForLaterItemProps> = ({ 
  item, 
  onMoveToCart, 
  onRemove,
  onWatchItem,
  watchedItems = [],
  inventory = {}
}) => {
  const productName = useProductName(item.productId);
  const isOutOfStock = inventory[Number(item.productId)] === 0;
  const lowStock = inventory[Number(item.productId)] <= 3 && inventory[Number(item.productId)] > 0;
  const isWatched = watchedItems.includes(Number(item.productId));
  const { t, currency } = useTranslation();
  
  return (
    <div className={`p-2.5 mb-2 animate-fade-in rounded-md ${
      isOutOfStock 
        ? 'bg-amber-500/10 border border-amber-500/30' 
        : lowStock 
          ? 'bg-amber-500/5 border border-amber-500/20'
          : 'card-glass'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium text-sm">{productName}</span>
              {item.size && (
                <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  {item.size}
                </span>
              )}
              {isOutOfStock && (
                <div className="ml-2 flex items-center text-amber-600 dark:text-amber-400">
                  <PackageX className="h-3 w-3 mr-0.5" />
                  <span className="text-xs font-medium">Out of Stock</span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                {formatCurrency(item.price, currency)}
              </span>
              {lowStock && !isOutOfStock && (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {t('product.only')} {inventory[Number(item.productId)]} {t('product.left')}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Removed quantity indicator since all saved items have quantity 1 */}
          
          <Button
            variant="outline"
            size="sm"
            className={`h-7 w-7 p-0 rounded-full ${isOutOfStock ? 'bg-muted text-muted-foreground cursor-not-allowed' : lowStock ? 'border-amber-500/70 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20' : 'bg-primary/10 hover:bg-primary/20'}`}
            onClick={() => !isOutOfStock && onMoveToCart(item.id)}
            aria-label="Move to cart"
            disabled={isOutOfStock}
          >
            <Plus className={`h-3.5 w-3.5 ${isOutOfStock ? 'text-muted-foreground' : lowStock ? 'text-amber-700' : 'text-primary'}`} />
          </Button>
          
          {isOutOfStock && onWatchItem && (
            <button 
              onClick={() => onWatchItem(Number(item.productId))}
              className={`p-1 rounded-md transition-colors ${
                isWatched 
                  ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400 animate-pulse-subtle' 
                  : 'text-primary hover:bg-primary/10'
              }`}
              aria-label={isWatched ? "Remove from watch list" : "Add to watch list"}
            >
              {isWatched ? (
                <EyeOff className="h-3.5 w-3.5" />
              ) : (
                <Eye className="h-3.5 w-3.5" />
              )}
            </button>
          )}
          
          <button 
            onClick={() => onRemove(item.id)}
            className="p-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedForLaterItem;
