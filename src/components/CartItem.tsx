
import React from 'react';
import { CartItem as CartItemType } from '@/utils/cartUtils';
import { formatCurrency } from '@/utils/cartUtils';
import { useProductName } from '@/hooks/useProductName';
import { useLayout } from '@/contexts/LayoutContext';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import CartItemDetails from './cart/CartItemDetails';
import QuantityControls from './cart/QuantityControls';
import CartItemActions from './cart/CartItemActions';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onSaveForLater?: (id: string | number) => void;
  onWatchItem?: (productId: number) => void;
  watchedItems?: number[];
  inventory?: Record<number, number>;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onRemove, 
  onUpdateQuantity,
  onSaveForLater,
  onWatchItem,
  watchedItems = [],
  inventory = {}
}) => {
  const productName = useProductName(item.productId);
  const isOutOfStock = inventory[Number(item.productId)] === 0;
  const lowStock = inventory[Number(item.productId)] <= 3 && inventory[Number(item.productId)] > 0;
  const isWatched = watchedItems.includes(Number(item.productId));
  const { layout } = useLayout();
  const { currency } = useTranslation();
  
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
        : lowStock 
          ? 'bg-amber-500/5 border border-amber-500/20'
          : 'card-glass'
    }`}>
      <div className={cn(
        "flex items-center", 
        layout === 'compact' ? "flex-col sm:flex-row" : "justify-between"
      )}>
        <div className={cn(
          "flex items-center", 
          layout === 'compact' ? "w-full justify-between mb-3 sm:mb-0 sm:justify-start" : ""
        )}>
          <CartItemDetails 
            productName={productName}
            price={item.price}
            quantity={item.quantity}
            size={item.size}
            isOutOfStock={isOutOfStock}
            lowStock={lowStock}
            inventory={inventory[Number(item.productId)]}
            formatCurrency={formatCurrency}
          />
          
          {layout === 'compact' && (
            <div className="font-medium text-sm ml-auto">
              {formatCurrency(item.price * item.quantity, currency)}
            </div>
          )}
        </div>
        
        <div className={cn(
          "flex items-center", 
          layout === 'compact' ? "w-full justify-between sm:justify-end sm:space-x-2" : "space-x-2"
        )}>
          {layout !== 'compact' && (
            <div className="font-medium text-sm">
              {formatCurrency(item.price * item.quantity, currency)}
            </div>
          )}
          
          <QuantityControls 
            quantity={item.quantity}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
            isOutOfStock={isOutOfStock}
            maxQuantity={inventory[Number(item.productId)]}
          />
          
          <CartItemActions 
            onRemove={() => onRemove(item.id)}
            onSaveForLater={onSaveForLater ? () => onSaveForLater(item.id) : undefined}
            onWatchItem={onWatchItem && isOutOfStock ? () => onWatchItem(Number(item.productId)) : undefined}
            isWatched={isWatched}
            isOutOfStock={isOutOfStock}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
