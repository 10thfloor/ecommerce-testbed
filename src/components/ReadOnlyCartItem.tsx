
import React from 'react';
import { CartItem as CartItemType } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';
import { useTranslation } from '@/hooks/useTranslation';
import { PackageX, Eye, EyeOff } from 'lucide-react';

interface ReadOnlyCartItemProps {
  item: CartItemType;
  inventory?: Record<number, number>;
  onWatchItem?: (productId: number) => void;
  watchedItems?: number[];
}

const ReadOnlyCartItem: React.FC<ReadOnlyCartItemProps> = ({ 
  item,
  inventory = {},
  onWatchItem,
  watchedItems = []
}) => {
  const productName = useProductName(item.productId);
  const { t, currency } = useTranslation();
  const isOutOfStock = inventory[Number(item.productId)] === 0;
  const lowStock = inventory[Number(item.productId)] <= 3 && inventory[Number(item.productId)] > 0;
  const isWatched = watchedItems.includes(Number(item.productId));
  
  return (
    <div className={`p-3 mb-2 animate-fade-in rounded-md ${
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
                {formatCurrency(item.price, currency)} × {item.quantity}
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
          <div className="font-medium text-sm">
            {formatCurrency(item.price * item.quantity, currency)}
          </div>
          
          <div className="text-xs bg-secondary px-1.5 py-0.5 rounded-md">
            {t('product.qty')}: {item.quantity}
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyCartItem;
