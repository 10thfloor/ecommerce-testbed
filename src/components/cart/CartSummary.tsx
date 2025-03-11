
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CartDiscount from './CartDiscount';

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
  
  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-muted-foreground">Subtotal:</span>
        <span className="font-medium">{formatCurrency(subtotal)}</span>
      </div>
      
      <CartDiscount
        appliedDiscount={appliedDiscount}
        onApplyDiscount={onApplyDiscount}
        onRemoveDiscount={onRemoveDiscount}
        discountAmount={discountAmount}
        formatCurrency={formatCurrency}
      />
      
      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 dark:border-gray-800">
        <span className="font-medium">Total:</span>
        <div className={`bg-primary/5 rounded-lg p-2 font-bold text-lg ${
          appliedDiscount ? 'text-green-600 dark:text-green-400' : ''
        }`}>
          {formatCurrency(finalTotal)}
        </div>
      </div>
      
      {totalItems > 0 && hasUnavailableItems && (
        <div className="mt-3 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-md border border-amber-100 dark:border-amber-800/30">
          <p>
            {totalItems - availableItems} {totalItems - availableItems === 1 ? 'item' : 'items'} in your cart {totalItems - availableItems === 1 ? 'is' : 'are'} out of stock and will not be included in checkout.
          </p>
        </div>
      )}
      
      <Button 
        onClick={onCheckout}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
        size="lg"
        disabled={availableItems === 0}
      >
        <CreditCard className="h-5 w-5" />
        <span className="font-medium">
          Checkout{availableItems > 0 ? ` (${availableItems} ${availableItems === 1 ? 'unit' : 'units'})` : ''}
        </span>
      </Button>
    </div>
  );
};

export default CartSummary;
