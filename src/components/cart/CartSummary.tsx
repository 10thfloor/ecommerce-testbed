
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CartDiscount from './CartDiscount';
import { useLayout } from '@/contexts/LayoutContext';
import { cn } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  finalTotal: number;
  appliedDiscount: string | null;
  discountAmount: number;
  availableItems: number;
  totalItems: number;
  formatCurrency: (amount: number) => string;
  onApplyDiscount: (code: string) => void;
  onRemoveDiscount: () => void;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  subtotal,
  finalTotal,
  appliedDiscount,
  discountAmount,
  availableItems,
  totalItems,
  formatCurrency,
  onApplyDiscount,
  onRemoveDiscount,
  onCheckout
}) => {
  const hasUnavailableItems = totalItems > availableItems;
  const { layout } = useLayout();
  const isCompact = layout === 'compact';
  
  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
      <div className={cn(
        "flex justify-between items-center mb-3",
        isCompact ? "text-xs" : ""
      )}>
        <span className={cn(
          "text-muted-foreground",
          isCompact ? "text-xs" : "text-sm"
        )}>Subtotal:</span>
        <span className="font-medium">{formatCurrency(subtotal)}</span>
      </div>
      
      <CartDiscount
        appliedDiscount={appliedDiscount}
        onApplyDiscount={onApplyDiscount}
        onRemoveDiscount={onRemoveDiscount}
        discountAmount={discountAmount}
        formatCurrency={formatCurrency}
      />
      
      <div className={cn(
        "flex justify-between items-center mt-4 pt-2 border-t border-gray-200 dark:border-gray-800",
        isCompact ? "text-sm" : ""
      )}>
        <span className="font-medium">Total:</span>
        <div className={cn(
          `bg-primary/5 rounded-lg p-2 font-bold ${
            appliedDiscount ? 'text-green-600 dark:text-green-400' : ''
          }`,
          isCompact ? "text-base" : "text-lg"
        )}>
          {formatCurrency(finalTotal)}
        </div>
      </div>
      
      {totalItems > 0 && hasUnavailableItems && (
        <div className={cn(
          "mt-3 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md border border-amber-100 dark:border-amber-800/30",
          isCompact ? "text-xs" : "text-sm"
        )}>
          <p>
            {totalItems - availableItems} {totalItems - availableItems === 1 ? 'item' : 'items'} in your cart {totalItems - availableItems === 1 ? 'is' : 'are'} out of stock and will not be included in checkout.
          </p>
        </div>
      )}
      
      <Button 
        onClick={onCheckout}
        className={cn(
          "w-full mt-4 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2",
          isCompact ? "text-sm py-1 h-auto" : ""
        )}
        size={isCompact ? "xs" : "lg"}
        disabled={availableItems === 0}
      >
        <CreditCard className={cn("h-5 w-5", isCompact ? "h-4 w-4" : "")} />
        <span className="font-medium">
          Checkout{availableItems > 0 ? ` (${availableItems} ${availableItems === 1 ? 'item' : 'items'})` : ''}
        </span>
      </Button>
    </div>
  );
};

export default CartSummary;
