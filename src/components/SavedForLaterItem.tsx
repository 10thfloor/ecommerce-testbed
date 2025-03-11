
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';
import { Button } from './ui/button';

interface SavedForLaterItemProps {
  item: CartItem;
  onMoveToCart: (id: string | number) => void;
  onRemove: (id: string | number) => void;
}

const SavedForLaterItem: React.FC<SavedForLaterItemProps> = ({ 
  item, 
  onMoveToCart, 
  onRemove 
}) => {
  const productName = useProductName(item.productId);
  
  return (
    <div className="card-glass p-2.5 mb-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="font-medium text-sm">{productName}</span>
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
            className="h-7 w-7 p-0 rounded-full bg-primary/10 hover:bg-primary/20"
            onClick={() => onMoveToCart(item.id)}
            aria-label="Move to cart"
          >
            <Plus className="h-3.5 w-3.5 text-primary" />
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
