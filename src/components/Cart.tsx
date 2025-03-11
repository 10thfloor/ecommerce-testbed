
import React, { useState, useEffect } from 'react';
import { CartItem as CartItemType, formatCurrency, calculateTotal } from '@/utils/cartUtils';
import CartItem from './CartItem';
import { useToast } from "@/hooks/use-toast";
import CartHeader from './cart/CartHeader';
import CartSummary from './cart/CartSummary';
import CartReservationTimer from './cart/CartReservationTimer';

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
  const { toast } = useToast();
  const total = calculateTotal(items, inventory);
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  
  const availableItems = items.filter(item => 
    inventory[Number(item.productId)] > 0
  );
  
  useEffect(() => {
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
  
  const handleApplyDiscount = (code: string) => {
    setAppliedDiscount(code);
  };
  
  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
  };
  
  const handleCheckout = () => {
    if (availableItems.length === 0) {
      toast({
        title: "No Available Items",
        description: "Your cart only contains out-of-stock items. Please add available items before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    const availableTotal = calculateTotal(availableItems);
    const availableDiscountAmount = appliedDiscount ? availableTotal * 0.1 : 0;
    const availableFinalTotal = availableTotal - availableDiscountAmount;
    
    toast({
      title: "Checkout Initiated",
      description: `Processing ${availableItems.length} ${availableItems.length === 1 ? 'item' : 'items'} for ${formatCurrency(availableFinalTotal)}`,
    });
  };
  
  const discountAmount = appliedDiscount ? total * 0.1 : 0;
  const finalTotal = total - discountAmount;
  
  return (
    <div className="card-glass p-4 mb-6 animate-fade-in h-full">
      <CartHeader 
        itemCount={items.length}
        onSaveCart={onSaveCart}
        onUndoCart={onUndoCart}
        hasHistory={hasHistory}
        isEmpty={items.length === 0}
        cartItems={items}
      />
      
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
          
          <CartSummary 
            subtotal={total}
            finalTotal={finalTotal}
            appliedDiscount={appliedDiscount}
            discountAmount={discountAmount}
            availableItems={availableItems.length}
            totalItems={items.length}
            formatCurrency={formatCurrency}
            onApplyDiscount={handleApplyDiscount}
            onRemoveDiscount={handleRemoveDiscount}
            onCheckout={handleCheckout}
          />
          
          <CartReservationTimer 
            timeRemaining={timeRemaining}
            formatTimeRemaining={formatTimeRemaining}
          />
        </>
      )}
    </div>
  );
};

export default Cart;
