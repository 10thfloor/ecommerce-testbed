
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
  
  // Determine if we can increment (need to have stock available)
  const canIncrement = !isOutOfStock && maxQuantity > 0 && quantity < maxQuantity;
  
  return (
    <div className={`bg-secondary rounded-md flex items-center h-7 ${isOutOfStock ? 'opacity-50' : ''}`}>
      <button 
        onClick={onDecrement}
        className="p-1 hover:bg-muted rounded-l-md transition-colors"
        aria-label="Decrease quantity"
        disabled={isOutOfStock || quantity <= 1}
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="px-2 font-medium text-xs">{quantity}</span>
      <button 
        onClick={onIncrement}
        className={`p-1 ${canIncrement ? 'hover:bg-muted' : ''} rounded-r-md transition-colors`}
        aria-label="Increase quantity"
        disabled={!canIncrement}
      >
        <Plus className={`h-3 w-3 ${!canIncrement ? 'text-muted-foreground' : ''}`} />
      </button>
    </div>
  );
};

export default QuantityControls;
