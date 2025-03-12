
import React from 'react';
import { SavedCart } from '@/utils/cartUtils';
import { getCartItemCount, formatCurrency, calculateTotal, getCartMnemonic } from '@/utils/cartUtils';
import { ShoppingBag, Trash2, Plus, ShoppingCart } from 'lucide-react';
import ReadOnlyCartItem from './ReadOnlyCartItem';
import ShareMenu from './ShareMenu';
import { Button } from "@/components/ui/button";

interface SavedCartItemProps {
  cart: SavedCart;
  inventory: Record<number, number>;
  onLoadCart: (cartId: string) => void;
  onDeleteCart: (cartId: string) => void;
  onAddCartItems?: (cartId: string) => void;
}

const SavedCartItem: React.FC<SavedCartItemProps> = ({
  cart,
  inventory,
  onLoadCart,
  onDeleteCart,
  onAddCartItems,
}) => {
  const handleLoadCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLoadCart(cart.id);
  };

  const handleAddItemsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddCartItems) {
      onAddCartItems(cart.id);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteCart(cart.id);
  };
  
  return (
    <div className="bg-secondary/30 rounded-lg p-4 transition-all">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/5 rounded-full p-2">
            <ShoppingBag className="h-4 w-4 text-primary/70" />
          </div>
          
          <div>
            <div className="font-medium text-sm mb-0.5">
              {getCartMnemonic(cart.id)}
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="mr-2">{cart.date}</span>
              <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-md">
                {getCartItemCount(cart.items)} {getCartItemCount(cart.items) === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1.5">
          <ShareMenu 
            items={cart.items} 
            title={`${getCartMnemonic(cart.id)} Cart`}
            date={cart.date}
            inventory={inventory}
          />
          
          {onAddCartItems && (
            <Button 
              onClick={handleAddItemsClick}
              variant="secondary"
              size="xs"
              className="text-blue-500 hover:text-blue-600 hover:bg-blue-100/50 dark:hover:bg-blue-900/20 h-7 w-7"
              title="Add items to current cart"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          )}
          
          <Button 
            onClick={handleLoadCartClick}
            variant="secondary"
            size="xs"
            className="text-primary hover:text-primary/80 hover:bg-primary/10 h-7 w-7"
            title="Use this cart"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </Button>
          
          <Button 
            onClick={handleDeleteClick}
            variant="secondary"
            size="xs"
            className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 h-7 w-7"
            title="Delete cart"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <div className="mt-3 space-y-2 border-t pt-3 border-secondary">
        {cart.items.map((item) => (
          <ReadOnlyCartItem 
            key={item.id}
            item={item}
            inventory={inventory}
          />
        ))}
        
        <div className="mt-4 flex justify-end">
          <div className="bg-primary/5 rounded-lg p-3">
            <span className="text-muted-foreground mr-2">Total:</span>
            <span className="font-bold text-lg">{formatCurrency(calculateTotal(cart.items, inventory))}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedCartItem;
