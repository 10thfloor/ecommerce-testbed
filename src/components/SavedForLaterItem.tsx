
import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';

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
          
          <button 
            onClick={() => onMoveToCart(item.id)}
            className="btn-primary text-xs py-0.5 px-1.5 flex items-center"
            aria-label="Move to cart"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            <span>Add</span>
          </button>
          
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
