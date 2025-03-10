
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
        <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {savedCarts.map((cart) => (
            <div 
              key={cart.id} 
              className="bg-secondary/30 hover:bg-secondary/50 rounded-lg p-4 transition-all hover-scale"
            >
              <div className="flex flex-col h-full">
                <div className="mb-3">
                  <div className="flex items-center text-sm mb-2">
                    <Tag className="h-4 w-4 mr-1.5 text-primary" />
                    <span className="font-medium truncate">
                      Cart {cart.id.substring(0, 8)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-1">
                    <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                    <span>{cart.date.split(" at ")[0]}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                    <span>{cart.date.split(" at ")[1]}</span>
                  </div>
                </div>
                
                <div className="text-sm mt-auto mb-3">
                  <span className="text-muted-foreground">Items: </span>
                  <span className="font-medium">{getCartItemCount(cart.items)}</span>
                </div>
                
                <div className="flex items-center space-x-2 mt-auto">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoadCart(cart.id);
                    }}
                    className="flex-1 py-1.5 px-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md text-sm transition-colors"
                  >
                    Load
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCart(cart.id);
                    }}
                    className="flex-1 py-1.5 px-3 bg-destructive/10 hover:bg-destructive/20 text-destructive font-medium rounded-md text-sm transition-colors"
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
