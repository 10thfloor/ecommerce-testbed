
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
    <div className="card-glass p-4 mb-3 animate-fade-in flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 rounded-lg p-2.5 min-w-12 flex items-center justify-center">
          <span className="font-medium text-primary">{item.productId}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-base whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px] md:max-w-[250px]">
            {productName}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            {formatCurrency(item.price)} × {item.quantity}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={() => onMoveToCart(item.id)}
          className="btn-primary text-xs py-1.5 px-3 flex items-center"
          aria-label="Move to cart"
        >
          <ShoppingCart className="h-3 w-3 mr-1.5" />
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
  );
};

export default SavedForLaterItem;
