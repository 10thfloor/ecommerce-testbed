
import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayout } from '@/contexts/LayoutContext';

interface QuantityControlsProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  isOutOfStock: boolean;
  maxQuantity: number;
}

const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onDecrement,
  onIncrement,
  isOutOfStock,
  maxQuantity,
}) => {
  const { layout } = useLayout();
  const isCompact = layout === 'compact';
  
  return (
    <div className={`bg-secondary rounded-md flex items-center h-7 ${isOutOfStock ? 'opacity-50' : ''}`}>
      <button 
        onClick={onDecrement}
        className="p-1 hover:bg-muted rounded-l-md transition-colors"
        aria-label="Decrease quantity"
        disabled={isOutOfStock}
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="px-2 font-medium text-xs">{quantity}</span>
      <button 
        onClick={onIncrement}
        className={`p-1 ${!isOutOfStock && quantity < maxQuantity ? 'hover:bg-muted' : ''} rounded-r-md transition-colors`}
        aria-label="Increase quantity"
        disabled={isOutOfStock || quantity >= maxQuantity}
      >
        <Plus className={`h-3 w-3 ${quantity >= maxQuantity ? 'text-muted-foreground' : ''}`} />
      </button>
    </div>
  );
};

export default QuantityControls;
