
import React, { useState } from 'react';
import { Tag, Check } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CartDiscountProps {
  appliedDiscount: string | null;
  onApplyDiscount: (code: string) => void;
  onRemoveDiscount: () => void;
  discountAmount: number;
  formatCurrency: (amount: number) => string;
}

const CartDiscount: React.FC<CartDiscountProps> = ({ 
  appliedDiscount,
  onApplyDiscount,
  onRemoveDiscount,
  discountAmount,
  formatCurrency
}) => {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  
  const handleApplyDiscount = () => {
    if (discountCode.trim() === '') return;
    onApplyDiscount(discountCode);
    setDiscountCode('');
  };
  
  if (appliedDiscount) {
    return (
      <div className="flex justify-between items-center mb-3 mt-2 py-2 px-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-md">
        <div className="flex items-center text-sm text-green-600 dark:text-green-400">
          <Check className="h-4 w-4 mr-2" />
          <span className="font-medium">Code applied: {appliedDiscount}</span>
          <button 
            onClick={onRemoveDiscount}
            className="ml-3 text-xs text-muted-foreground hover:text-foreground underline"
          >
            Remove
          </button>
        </div>
        <span className="font-medium">-{formatCurrency(discountAmount)}</span>
      </div>
    );
  }
  
  if (showDiscountInput) {
    return (
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
    );
  }
  
  return (
    <button
      onClick={() => setShowDiscountInput(true)}
      className="flex items-center gap-2 py-2 px-3 w-full text-sm text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-md transition-colors my-3"
    >
      <Tag className="h-4 w-4" />
      <span>Have a discount code?</span>
    </button>
  );
};

export default CartDiscount;
