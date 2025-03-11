
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
    <div className="flex flex-wrap gap-1 mb-2">
      {sizes.map((size) => (
        <Button
          key={size.name}
          onClick={() => onSelectSize(size.name)}
          disabled={size.inventory === 0}
          variant="outline"
          size="xs"
          className={cn(
            "h-6 w-6 p-0 text-xs font-medium",
            selectedSize === size.name && "bg-primary text-primary-foreground hover:bg-primary/90",
            size.inventory === 0 && "opacity-50 cursor-not-allowed"
          )}
        >
          {size.name}
        </Button>
      ))}
    </div>
  );
};

export default SizeSelector;
