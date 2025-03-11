
import React, { useState, useEffect } from 'react';
import { ShoppingCart, SaveAll, History, Tag, Check, Clock } from 'lucide-react';
import { CartItem as CartItemType, formatCurrency, calculateTotal } from '@/utils/cartUtils';
import CartItem from './CartItem';
import ShareMenu from './ShareMenu';
import { Button } from "@/components/ui/button";
import { Product } from '@/components/product/types';
import { Input } from '@/components/ui/input';

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
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  
  useEffect(() => {
    // Only start the countdown if there are items in the cart
    if (items.length === 0) {
      setTimeRemaining(30 * 60); // Reset to 30 minutes
      return;
    }
    
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [items.length]);
  
  const formatTimeRemaining = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const handleApplyDiscount = () => {
    if (discountCode.trim() === '') return;
    
    // In a real app, this would validate the code with an API
    // For demo purposes, we'll just apply it immediately
    setAppliedDiscount(discountCode);
    setDiscountCode('');
    // Keep discount input open to show the applied code
  };
  
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
  };
  
  // Calculate a mock 10% discount if code is applied
  const discountAmount = appliedDiscount ? total * 0.1 : 0;
  const finalTotal = total - discountAmount;
  
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
          
          <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Subtotal:</span>
              <span className="font-medium">{formatCurrency(total)}</span>
            </div>
            
            {/* Discount section */}
            {!showDiscountInput && !appliedDiscount && (
              <button
                onClick={() => setShowDiscountInput(true)}
                className="flex items-center gap-2 py-2 px-3 w-full text-sm text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-md transition-colors my-3"
              >
                <Tag className="h-4 w-4" />
                <span>Have a discount code?</span>
              </button>
            )}
            
            {/* Discount input */}
            {showDiscountInput && !appliedDiscount && (
              <div className="flex items-center gap-2 my-4">
                <Input
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  className="h-9 text-sm"
                />
                <Button 
                  onClick={handleApplyDiscount}
                  size="sm"
                  className="whitespace-nowrap"
                  disabled={!discountCode.trim()}
                >
                  Apply
                </Button>
              </div>
            )}
            
            {/* Applied discount */}
            {appliedDiscount && (
              <div className="flex justify-between items-center mb-3 mt-2 py-2 px-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-md">
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <Check className="h-4 w-4 mr-2" />
                  <span className="font-medium">Code applied: {appliedDiscount}</span>
                  <button 
                    onClick={handleRemoveDiscount}
                    className="ml-3 text-xs text-muted-foreground hover:text-foreground underline"
                  >
                    Remove
                  </button>
                </div>
                <span className="font-medium">-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            
            {/* Final total */}
            <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 dark:border-gray-800">
              <span className="font-medium">Total:</span>
              <div className={`bg-primary/5 rounded-lg p-2 font-bold text-lg ${
                appliedDiscount ? 'text-green-600 dark:text-green-400' : ''
              }`}>
                {formatCurrency(finalTotal)}
              </div>
            </div>
            
            {/* Reservation countdown timer */}
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>Items reserved for:</span>
              </div>
              <div className={`font-mono font-medium rounded-md px-3 py-1 ${
                timeRemaining < 300 ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 
                'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
              }`}>
                {formatTimeRemaining(timeRemaining)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
