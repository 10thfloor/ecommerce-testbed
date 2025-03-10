
import React, { useState } from 'react';
import { SavedCart } from '@/utils/cartUtils';
import { getCartItemCount } from '@/utils/cartUtils';
import { ChevronDown, ChevronUp, CalendarDays, Clock, ShoppingBag, Tag } from 'lucide-react';

interface SavedCartsProps {
  savedCarts: SavedCart[];
  onLoadCart: (cartId: string) => void;
  onDeleteCart: (cartId: string) => void;
}

const SavedCarts: React.FC<SavedCartsProps> = ({ savedCarts, onLoadCart, onDeleteCart }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (savedCarts.length === 0) {
    return null;
  }

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div 
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="bg-primary/10 rounded-lg p-2 mr-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Saved Carts</h3>
        </div>
        <button className="p-1.5 hover:bg-secondary/70 rounded-full transition-colors">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {savedCarts.map((cart) => (
            <div 
              key={cart.id} 
              className="bg-secondary/30 hover:bg-secondary/50 rounded-lg p-4 transition-all hover-scale"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/5 rounded-full p-2">
                    <ShoppingBag className="h-4 w-4 text-primary/70" />
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm mb-0.5">
                      Cart {cart.id.substring(0, 8)}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      <span className="mr-2">{cart.date.split(" at ")[0]}</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{cart.date.split(" at ")[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-1">
                    {getCartItemCount(cart.items)} {getCartItemCount(cart.items) === 1 ? 'item' : 'items'}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoadCart(cart.id);
                    }}
                    className="py-1.5 px-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md text-sm transition-colors"
                  >
                    Load
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCart(cart.id);
                    }}
                    className="py-1.5 px-3 bg-destructive/10 hover:bg-destructive/20 text-destructive font-medium rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCarts;
