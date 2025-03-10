
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
    <div className="card-glass p-3 mb-2 animate-fade-in">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="bg-primary/10 rounded-lg p-2 mr-3">
              <span className="font-medium text-primary">{item.productId}</span>
            </div>
            <span className="font-medium text-base">{productName}</span>
          </div>
          
          <span className="text-xs text-muted-foreground px-2 bg-secondary py-1 rounded-md">
            Qty: {item.quantity}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {formatCurrency(item.price)} × {item.quantity}
          </span>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onMoveToCart(item.id)}
              className="btn-primary text-xs py-1 px-2 flex items-center"
              aria-label="Move to cart"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              <span>Move to Cart</span>
            </button>
            
            <button 
              onClick={() => onRemove(item.id)}
              className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedForLaterItem;
