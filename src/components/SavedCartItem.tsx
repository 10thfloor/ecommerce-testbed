
import React from 'react';
import { SavedCart } from '@/utils/cartUtils';
import { getCartItemCount, formatCurrency, calculateTotal, getCartMnemonic } from '@/utils/cartUtils';
import { ShoppingBag, Trash2, Plus } from 'lucide-react';
import ReadOnlyCartItem from './ReadOnlyCartItem';
import ShareMenu from './ShareMenu';

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
        
        <div className="flex items-center space-x-2">
          <ShareMenu 
            items={cart.items} 
            title={`${getCartMnemonic(cart.id)} Cart`}
            date={cart.date}
            inventory={inventory}
          />
          
          {onAddCartItems && (
            <button 
              onClick={handleAddItemsClick}
              className="py-1.5 px-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium rounded-md text-sm transition-colors flex items-center"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Items
            </button>
          )}
          
          <button 
            onClick={handleLoadCartClick}
            className="py-1.5 px-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md text-sm transition-colors"
          >
            Use Cart
          </button>
          
          <button 
            onClick={handleDeleteClick}
            className="p-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-full transition-colors"
            aria-label="Delete cart"
          >
            <Trash2 className="h-4 w-4" />
          </button>
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
