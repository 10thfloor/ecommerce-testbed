
import React, { useState } from 'react';
import { SavedCart } from '@/utils/cartUtils';
import { getCartItemCount, formatCurrency, calculateTotal } from '@/utils/cartUtils';
import { ChevronDown, ChevronUp, ShoppingBag, Trash2 } from 'lucide-react';
import ReadOnlyCartItem from './ReadOnlyCartItem';
import { useToast } from "@/hooks/use-toast";
import ShareMenu from './ShareMenu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SavedCartsProps {
  savedCarts: SavedCart[];
  onLoadCart: (cartId: string) => void;
  onDeleteCart: (cartId: string) => void;
}

const SavedCarts: React.FC<SavedCartsProps> = ({ savedCarts, onLoadCart, onDeleteCart }) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(true);
  const [cartToLoad, setCartToLoad] = useState<string | null>(null);

  if (savedCarts.length === 0) {
    return null;
  }

  const handleLoadCartClick = (cartId: string) => {
    setCartToLoad(cartId);
  };

  const confirmLoadCart = () => {
    if (cartToLoad) {
      onLoadCart(cartToLoad);
      setCartToLoad(null);
    }
  };

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
        <div className="mt-4 space-y-6">
          {savedCarts.map((cart) => (
            <div 
              key={cart.id} 
              className="bg-secondary/30 rounded-lg p-4 transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/5 rounded-full p-2">
                    <ShoppingBag className="h-4 w-4 text-primary/70" />
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm mb-0.5">
                      Cart {cart.id.substring(0, 8)}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-2">{cart.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-xs font-medium bg-primary/10 text-primary rounded-full px-2 py-1">
                    {getCartItemCount(cart.items)} {getCartItemCount(cart.items) === 1 ? 'item' : 'items'}
                  </div>
                  
                  <ShareMenu 
                    items={cart.items} 
                    title={`Shared Cart (${cart.id.substring(0, 8)})`}
                    date={cart.date}
                  />
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadCartClick(cart.id);
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
                  />
                ))}
                
                <div className="mt-4 flex justify-end">
                  <div className="bg-primary/5 rounded-lg p-3">
                    <span className="text-muted-foreground mr-2">Total:</span>
                    <span className="font-bold text-lg">{formatCurrency(calculateTotal(cart.items))}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={cartToLoad !== null} onOpenChange={(open) => !open && setCartToLoad(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace current cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace your current cart with the saved cart. Your current cart items will be saved in history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLoadCart}>Replace Cart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SavedCarts;
