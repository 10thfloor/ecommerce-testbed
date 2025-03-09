
import React from 'react';
import { ShoppingCart, SaveAll } from 'lucide-react';
import { CartItem as CartItemType, formatCurrency, calculateTotal } from '@/utils/cartUtils';
import CartItem from './CartItem';

interface CartProps {
  items: CartItemType[];
  onSaveCart: () => void;
  onRemoveItem: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onSaveCart, onRemoveItem, onUpdateQuantity }) => {
  const total = calculateTotal(items);
  
  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="bg-primary/10 rounded-lg p-1 mr-2">
            <ShoppingCart className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Your Cart</h3>
        </div>
        <button 
          onClick={onSaveCart}
          className="btn-primary flex items-center space-x-1 hover-scale"
          disabled={items.length === 0}
        >
          <SaveAll className="h-4 w-4 mr-1" />
          <span>Save Cart</span>
        </button>
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
