
import React from 'react';
import { CartItem as CartItemType } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';
import { AlertTriangle } from 'lucide-react';

interface ReadOnlyCartItemProps {
  item: CartItemType;
  inventory?: Record<number, number>;
}

const ReadOnlyCartItem: React.FC<ReadOnlyCartItemProps> = ({ 
  item,
  inventory = {}
}) => {
  const productName = useProductName(item.productId);
  const isOutOfStock = inventory[Number(item.productId)] === 0;
  
  return (
    <div className={`card-glass p-3 mb-2 animate-fade-in ${isOutOfStock ? 'border-l-4 border-amber-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium text-sm">{productName}</span>
              {isOutOfStock && (
                <div className="ml-2 flex items-center text-destructive">
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
          <div className="font-medium text-sm">
            {formatCurrency(item.price * item.quantity)}
          </div>
          
          <div className="bg-secondary/30 rounded-md flex items-center h-7 px-2">
            <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOnlyCartItem;
