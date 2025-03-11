
import React from 'react';
import { ShoppingCart, SaveAll, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ShareMenu from '@/components/ShareMenu';
import { CartItem } from '@/utils/cartUtils';

interface CartHeaderProps {
  itemCount: number;
  onSaveCart: () => void;
  onUndoCart?: () => void;
  hasHistory?: boolean;
  isEmpty: boolean;
  cartItems?: CartItem[];
}

const CartHeader: React.FC<CartHeaderProps> = ({ 
  itemCount, 
  onSaveCart, 
  onUndoCart, 
  hasHistory = false,
  isEmpty,
  cartItems = []
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <div className="bg-primary/10 rounded-lg p-1 mr-2">
          <ShoppingCart className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Your Cart</h3>
        <span className="ml-2 text-sm text-muted-foreground">
          ({itemCount} {itemCount === 1 ? 'item' : 'items'})
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
          items={cartItems} 
          title="My Shopping Cart" 
        />
        <Button 
          onClick={onSaveCart}
          className="hover-scale flex items-center gap-1"
          disabled={isEmpty}
          variant="default"
          size="sm"
        >
          <SaveAll className="h-4 w-4" />
          <span>Save</span>
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;
