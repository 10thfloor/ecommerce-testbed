
import React from 'react';
import { Minus, Plus, Trash2, BookmarkPlus, AlertTriangle } from 'lucide-react';
import { CartItem as CartItemType } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onSaveForLater?: (id: string | number) => void;
  inventory?: Record<number, number>;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onRemove, 
  onUpdateQuantity,
  onSaveForLater,
  inventory = {}
}) => {
  const productName = useProductName(item.productId);
  const isOutOfStock = inventory[Number(item.productId)] === 0;
  const lowStock = inventory[Number(item.productId)] > 0 && inventory[Number(item.productId)] < 3;
  
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
              {lowStock && !isOutOfStock && (
                <span className="ml-2 text-amber-500 text-xs font-medium">
                  Only {inventory[Number(item.productId)]} left
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatCurrency(item.price)} × {item.quantity}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="font-medium text-sm">
            {formatCurrency(item.price * item.quantity)}
          </div>
          
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
          
          <div className="flex items-center space-x-1">
            {onSaveForLater && (
              <button 
                onClick={() => onSaveForLater(item.id)}
                className="p-1 text-primary hover:bg-primary/10 rounded-md transition-colors"
                aria-label="Save for later"
              >
                <BookmarkPlus className="h-3.5 w-3.5" />
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
    </div>
  );
};

export default CartItem;
