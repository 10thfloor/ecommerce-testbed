
import React from 'react';
import { ProductSize } from './types';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize?: ProductSize['name'];
  onSelectSize: (size: ProductSize['name']) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="flex flex-wrap gap-1.5 mb-2">
      {sizes.map((size) => {
        const isSelected = selectedSize === size.name;
        const isOutOfStock = size.inventory === 0;
        
        return (
          <Button
            key={size.name}
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
        );
      })}
    </div>
  );
};

export default SizeSelector;
