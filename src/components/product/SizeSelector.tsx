
import React from 'react';
import { ProductSize } from './types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize?: ProductSize['name'];
  onSelectSize: (size: ProductSize['name']) => void;
  showInventory?: boolean;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
  showInventory = false,
}) => {
  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {sizes.map((size) => {
        const isSelected = selectedSize === size.name;
        const isOutOfStock = size.inventory === 0;
        const isLowStock = size.inventory <= 3 && size.inventory > 0;
        
        return (
          <div key={size.name} className="relative">
            <Button
              onClick={() => onSelectSize(size.name)}
              disabled={isOutOfStock}
              variant={isSelected ? "default" : "outline"}
              size="xs"
              className={cn(
                "h-7 w-7 p-0 text-xs font-medium rounded-full transition-all duration-200",
                isSelected && "ring-2 ring-primary/20 transform scale-105",
                isOutOfStock && "opacity-40 line-through",
                !isSelected && !isOutOfStock && "hover:bg-primary/10 hover:text-primary"
              )}
            >
              {size.name}
            </Button>
            
            {showInventory && isLowStock && (
              <span className="absolute -top-2 -right-2 px-1 py-0.5 bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[0.6rem] rounded-full">
                {size.inventory}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SizeSelector;
