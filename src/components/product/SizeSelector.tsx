
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
    <div className="flex gap-2 mb-3">
      {sizes.map((size) => (
        <Button
          key={size.name}
          onClick={() => onSelectSize(size.name)}
          disabled={size.inventory === 0}
          variant="outline"
          size="sm"
          className={cn(
            "h-8 w-12",
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
