
import React from 'react';
import { Minus, Plus, Trash2, BookmarkPlus, PackageX, Eye, EyeOff } from 'lucide-react';
import { CartItem as CartItemType } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';
import { useLayout } from '@/contexts/LayoutContext';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onSaveForLater?: (id: string | number) => void;
  onWatchItem?: (productId: number) => void;
  watchedItems?: number[];
  inventory?: Record<number, number>;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onRemove, 
  onUpdateQuantity,
  onSaveForLater,
  onWatchItem,
  watchedItems = [],
  inventory = {}
}) => {
  const productName = useProductName(item.productId);
  const isOutOfStock = inventory[Number(item.productId)] === 0;
  const lowStock = inventory[Number(item.productId)] <= 3 && inventory[Number(item.productId)] > 0;
  const isWatched = watchedItems.includes(Number(item.productId));
  const { layout } = useLayout();
  const { currency } = useTranslation();
  
  const handleIncrement = () => {
    if (isOutOfStock || inventory[Number(item.productId)] <= item.quantity) return;
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className={`p-3 mb-2 animate-fade-in rounded-md ${
      isOutOfStock 
        ? 'bg-amber-500/10 border border-amber-500/30' 
        : lowStock 
          ? 'bg-amber-500/5 border border-amber-500/20'
          : 'card-glass'
    }`}>
      <div className={cn(
        "flex items-center", 
        layout === 'compact' ? "flex-col sm:flex-row" : "justify-between"
      )}>
        <div className={cn(
          "flex items-center", 
          layout === 'compact' ? "w-full justify-between mb-3 sm:mb-0 sm:justify-start" : ""
        )}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className={cn(
                "font-medium", 
                layout === 'compact' ? "text-xs sm:text-sm" : "text-sm"
              )}>{productName}</span>
              {item.size && (
                <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  {item.size}
                </span>
              )}
              {isOutOfStock && (
                <div className="ml-2 flex items-center text-amber-600 dark:text-amber-400">
                  <PackageX className="h-3 w-3" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                {formatCurrency(item.price, currency)} × {item.quantity}
              </span>
              {lowStock && !isOutOfStock && (
                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  Only {inventory[Number(item.productId)]} left
                </span>
              )}
            </div>
          </div>
          
          {layout === 'compact' && (
            <div className="font-medium text-sm ml-auto">
              {formatCurrency(item.price * item.quantity, currency)}
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex items-center", 
          layout === 'compact' ? "w-full justify-between sm:justify-end sm:space-x-2" : "space-x-2"
        )}>
          {layout !== 'compact' && (
            <div className="font-medium text-sm">
              {formatCurrency(item.price * item.quantity, currency)}
            </div>
          )}
          
          <div className={`bg-secondary rounded-md flex items-center h-7 ${isOutOfStock ? 'opacity-50' : ''}`}>
            <button 
              onClick={handleDecrement}
              className="p-1 hover:bg-muted rounded-l-md transition-colors"
              aria-label="Decrease quantity"
              disabled={isOutOfStock}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 font-medium text-xs">{item.quantity}</span>
            <button 
              onClick={handleIncrement}
              className={`p-1 ${!isOutOfStock && item.quantity < inventory[Number(item.productId)] ? 'hover:bg-muted' : ''} rounded-r-md transition-colors`}
              aria-label="Increase quantity"
              disabled={isOutOfStock || item.quantity >= inventory[Number(item.productId)]}
            >
              <Plus className={`h-3 w-3 ${item.quantity >= inventory[Number(item.productId)] ? 'text-muted-foreground' : ''}`} />
            </button>
          </div>
          
          <div className={cn(
            "flex items-center", 
            layout === 'compact' ? "space-x-1" : "space-x-1"
          )}>
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
                  <EyeOff className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
                ) : (
                  <Eye className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
                )}
              </button>
            )}
            
            {onSaveForLater && (
              <button 
                onClick={() => onSaveForLater(item.id)}
                className="p-1 text-primary hover:bg-primary/10 rounded-md transition-colors"
                aria-label="Save for later"
              >
                <BookmarkPlus className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
              </button>
            )}
            
            <button 
              onClick={() => onRemove(item.id)}
              className="p-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
