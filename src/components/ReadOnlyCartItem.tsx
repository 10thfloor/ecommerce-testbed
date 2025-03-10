
import React from 'react';
import { CartItem as CartItemType } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';

interface ReadOnlyCartItemProps {
  item: CartItemType;
}

const ReadOnlyCartItem: React.FC<ReadOnlyCartItemProps> = ({ item }) => {
  const productName = useProductName(item.productId);
  
  return (
    <div className="card-glass p-3 mb-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-primary/10 rounded-lg p-1.5 mr-2">
            <span className="font-medium text-primary text-sm">{item.productId}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{productName}</span>
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
