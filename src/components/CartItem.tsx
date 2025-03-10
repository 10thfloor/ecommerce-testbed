
import React from 'react';
import { Minus, Plus, Trash2, BookmarkPlus } from 'lucide-react';
import { CartItem as CartItemType } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onSaveForLater?: (id: string | number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onRemove, 
  onUpdateQuantity,
  onSaveForLater 
}) => {
  const productName = useProductName(item.productId);
  
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="card-glass p-4 mb-3 animate-fade-in">
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <div className="bg-primary/10 rounded-lg p-2 mr-3">
            <span className="font-medium text-primary">{item.productId}</span>
          </div>
          <span className="font-medium text-base">{productName}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {formatCurrency(item.price)} × {item.quantity}
          </span>
          
          <div className="flex items-center space-x-2">
            <div className="bg-secondary rounded-md flex items-center">
              <button 
                onClick={handleDecrement}
                className="p-1 hover:bg-muted rounded-l-md transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 font-medium">{item.quantity}</span>
              <button 
                onClick={handleIncrement}
                className="p-1 hover:bg-muted rounded-r-md transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="font-medium w-20 text-right">
              {formatCurrency(item.price * item.quantity)}
            </div>
            
            {onSaveForLater && (
              <button 
                onClick={() => onSaveForLater(item.id)}
                className="p-1.5 text-primary hover:bg-primary/10 rounded-md transition-colors"
                aria-label="Save for later"
              >
                <BookmarkPlus className="h-4 w-4" />
              </button>
            )}
            
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

export default CartItem;
