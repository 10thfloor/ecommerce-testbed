
import React, { useState, useEffect } from 'react';
import { CartItem as CartItemType, formatCurrency, calculateTotal } from '@/utils/cartUtils';
import CartItem from './CartItem';
import { useToast } from "@/hooks/use-toast";
import CartHeader from './cart/CartHeader';
import CartSummary from './cart/CartSummary';
import CartReservationTimer from './cart/CartReservationTimer';
import { useLayout } from '@/contexts/LayoutContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

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
  onCheckout?: (items: CartItemType[], total: number) => void;
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
  inventory = {},
  onCheckout
}) => {
  const { toast } = useToast();
  const { t, currency } = useTranslation();
  const total = calculateTotal(items, inventory);
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  const { layout } = useLayout();
  
  const availableItems = items.filter(item => 
    inventory[Number(item.productId)] > 0
  );
  
  // Calculate total quantity by summing up quantities of all available items
  const totalQuantity = availableItems.reduce((sum, item) => sum + item.quantity, 0);
  
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
        title: t('cart.no_available_items'),
        description: t('cart.no_available_items_description'),
        variant: "destructive",
      });
      return;
    }
    
    const availableTotal = calculateTotal(availableItems);
    const availableDiscountAmount = appliedDiscount ? availableTotal * 0.1 : 0;
    const availableFinalTotal = availableTotal - availableDiscountAmount;
    
    // Create deep copies of the items to prevent reference issues
    const orderItems = JSON.parse(JSON.stringify(availableItems));
    
    if (onCheckout) {
      onCheckout(orderItems, availableFinalTotal);
    }
    
    toast({
      title: t('cart.order_completed'),
      description: `${t('cart.processed')} ${totalQuantity} ${totalQuantity === 1 ? t('orders.item') : t('orders.items')} ${t('cart.for')} ${formatCurrency(availableFinalTotal, currency)}`,
    });
  };
  
  const discountAmount = appliedDiscount ? total * 0.1 : 0;
  const finalTotal = total - discountAmount;
  
  return (
    <div className={cn(
      "card-glass p-4 mb-6 animate-fade-in h-full",
      layout === 'compact' ? "p-3" : "p-4"
    )}>
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
          {t('cart.empty')}
        </div>
      ) : (
        <>
          <div className={cn(
            "space-y-2",
            layout === 'compact' ? "space-y-1" : "space-y-2"
          )}>
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
            availableItems={totalQuantity}
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
