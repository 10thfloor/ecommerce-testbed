
import React, { useState } from 'react';
import { SavedCart } from '@/utils/cartUtils';
import { getCartItemCount } from '@/utils/cartUtils';
import { ChevronDown, ChevronUp, CalendarDays, Clock, Trash2, ShoppingBag } from 'lucide-react';

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
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="bg-primary/10 rounded-lg p-1 mr-2">
            <ShoppingBag className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Saved Carts</h3>
        </div>
        <button className="p-1 hover:bg-secondary rounded transition-colors">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {savedCarts.map((cart) => (
            <div 
              key={cart.id} 
              className="bg-secondary/50 rounded-lg p-3 transition-colors hover:bg-secondary"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <CalendarDays className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {cart.date.split(" at ")[0]}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {cart.date.split(" at ")[1]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onLoadCart(cart.id);
                    }}
                    className="btn-success text-xs py-1"
                  >
                    Load
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteCart(cart.id);
                    }}
                    className="btn-danger text-xs py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-xs mt-2">
                <span className="text-muted-foreground mr-1">Items:</span>
                <span className="font-medium">{getCartItemCount(cart.items)}</span>
              </div>
              <div className="text-xs font-mono opacity-70 mt-1 truncate">
                ID: {cart.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCarts;
