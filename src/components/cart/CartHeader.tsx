
import React from 'react';
import { ShoppingCart, SaveAll, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ShareMenu from '@/components/ShareMenu';
import { CartItem } from '@/utils/cartUtils';
import { useLayout } from '@/contexts/LayoutContext';
import { cn } from '@/lib/utils';

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
  const { layout } = useLayout();
  const isCompact = layout === 'compact';
  
  return (
    <div className={cn(
      "flex justify-between items-center mb-4",
      isCompact ? "mb-2" : "mb-4"
    )}>
      <div className="flex items-center">
        <div className="bg-primary/10 rounded-lg p-1 mr-2">
          <ShoppingCart className={cn("text-primary", isCompact ? "h-3.5 w-3.5" : "h-4 w-4")} />
        </div>
        <h3 className={cn("font-medium", isCompact ? "text-base" : "text-lg")}>Your Cart</h3>
        <span className={cn(
          "ml-2 bg-secondary px-1.5 py-0.5 rounded-md",
          isCompact ? "text-[10px]" : "text-xs"
        )}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
        
        {hasHistory && onUndoCart && (
          <button 
            onClick={onUndoCart}
            className={cn(
              "ml-3 flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded-md",
              isCompact ? "text-[10px] py-0.5" : "text-xs py-1"
            )}
            aria-label="Undo last cart change"
          >
            <History className={cn("mr-1", isCompact ? "h-2.5 w-2.5" : "h-3 w-3")} />
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
          size={isCompact ? "xs" : "sm"}
        >
          <SaveAll className={cn(isCompact ? "h-3.5 w-3.5" : "h-4 w-4")} />
          <span className={cn(isCompact ? "text-xs" : "")}>Save</span>
        </Button>
      </div>
    </div>
  );
};

export default CartHeader;
