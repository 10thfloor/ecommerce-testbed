
import React from 'react';
import { ProductSize } from './types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useLayout } from '@/contexts/LayoutContext';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize?: ProductSize['name'];
  onSelectSize: (size: ProductSize['name']) => void;
  showInventory?: boolean;
  isLimitedEdition?: boolean;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
  showInventory = false,
  isLimitedEdition = false,
}) => {
  const { layout } = useLayout();
  const isCompact = layout === 'compact';
  
  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {sizes.map((size) => {
        const isSelected = selectedSize === size.name;
        const isOutOfStock = size.inventory === 0;
        // Only mark as limited stock if inventory is exactly 1, to reduce the number of items showing limited stock
        const isLimitedStock = size.inventory === 1;
        
        return (
          <div key={size.name} className="relative">
            <Button
              onClick={() => onSelectSize(size.name)}
              disabled={isOutOfStock}
              variant={isSelected ? "default" : "outline"}
              size="xs"
              className={cn(
                isCompact ? "h-5 w-5 p-0 text-[10px]" : "h-7 w-7 p-0 text-xs",
                "font-medium rounded-full transition-all duration-200",
                isSelected && "ring-2 ring-primary/20 transform scale-105",
                isOutOfStock && "opacity-40 line-through",
                isLimitedEdition && !isOutOfStock && "border-purple-500/70 ring-purple-500/30",
                isLimitedStock && !isSelected && "border-amber-500/70 bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 hover:text-amber-800 dark:hover:text-amber-300",
                !isSelected && !isOutOfStock && !isLimitedStock && "hover:bg-primary/10 hover:text-primary"
              )}
            >
              {size.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default SizeSelector;
