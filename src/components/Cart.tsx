
import React from 'react';
import { ShoppingCart, SaveAll, History } from 'lucide-react';
import { CartItem as CartItemType, formatCurrency, calculateTotal } from '@/utils/cartUtils';
import CartItem from './CartItem';
import ShareMenu from './ShareMenu';
import { Button } from "@/components/ui/button";
import { Product } from '@/components/ProductInventory';

interface CartProps {
  items: CartItemType[];
  onSaveCart: () => void;
  onRemoveItem: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onSaveForLater: (id: string | number) => void;
  onEmailCart: () => void;
  onUndoCart?: () => void;
  hasHistory?: boolean;
  onWatchItem?: (productId: number) => void;
  watchedItems?: number[];
  inventory?: Record<number, number>;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  onSaveCart, 
  onRemoveItem, 
  onUpdateQuantity,
  onSaveForLater,
  onEmailCart,
  onUndoCart,
  hasHistory = false,
  onWatchItem,
  watchedItems = [],
  inventory = {}
}) => {
  const total = calculateTotal(items, inventory);
  
  return (
    <div className="card-glass p-4 mb-6 animate-fade-in h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-primary/10 rounded-lg p-1 mr-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Your Cart</h3>
          <span className="ml-2 text-sm text-muted-foreground">
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
          
          {hasHistory && onUndoCart && (
            <button 
              onClick={onUndoCart}
              className="ml-3 flex items-center space-x-1 text-xs text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-md"
              aria-label="Undo last cart change"
            >
              <History className="h-3 w-3 mr-1" />
              <span>Undo</span>
            </button>
          )}
        </div>
        <div className="flex space-x-2">
          <ShareMenu 
            items={items} 
            title="My Shopping Cart" 
          />
          <Button 
            onClick={onSaveCart}
            className="hover-scale flex items-center gap-1"
            disabled={items.length === 0}
            variant="default"
            size="sm"
          >
            <SaveAll className="h-4 w-4" />
            <span>Save</span>
          </Button>
        </div>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Your cart is empty. Add some items to get started.
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {items.map((item) => (
              <CartItem 
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
                onUpdateQuantity={onUpdateQuantity}
                onSaveForLater={onSaveForLater}
                onWatchItem={onWatchItem}
                watchedItems={watchedItems}
                inventory={inventory}
              />
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <div className="bg-primary/5 rounded-lg p-3">
              <span className="text-muted-foreground mr-2">Total:</span>
              <span className="font-bold text-lg">{formatCurrency(total)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
