
import React from 'react';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { CartItem } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';
import { Button } from './ui/button';

interface SavedForLaterItemProps {
  item: CartItem;
  onMoveToCart: (id: string | number) => void;
  onRemove: (id: string | number) => void;
  inventory?: Record<number, number>;
}

const SavedForLaterItem: React.FC<SavedForLaterItemProps> = ({ 
  item, 
  onMoveToCart, 
  onRemove,
  inventory = {}
}) => {
  const productName = useProductName(item.productId);
  const isOutOfStock = inventory[Number(item.productId)] === 0;
  
  return (
    <div className={`p-2.5 mb-2 animate-fade-in rounded-md ${
      isOutOfStock 
        ? 'bg-amber-500/10 border border-amber-500/30' 
        : 'card-glass'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium text-sm">{productName}</span>
              {isOutOfStock && (
                <div className="ml-2 flex items-center text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span className="text-xs font-medium">Out of stock</span>
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatCurrency(item.price)} × {item.quantity}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground bg-secondary py-0.5 px-1.5 rounded-md">
            Qty: {item.quantity}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            className={`h-7 w-7 p-0 rounded-full ${isOutOfStock ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary/10 hover:bg-primary/20'}`}
            onClick={() => !isOutOfStock && onMoveToCart(item.id)}
            aria-label="Move to cart"
            disabled={isOutOfStock}
          >
            <Plus className={`h-3.5 w-3.5 ${isOutOfStock ? 'text-muted-foreground' : 'text-primary'}`} />
          </Button>
          
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
