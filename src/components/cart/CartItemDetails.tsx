
import React from 'react';
import { PackageX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayout } from '@/contexts/LayoutContext';
import { useTranslation } from '@/hooks/useTranslation';

interface CartItemDetailsProps {
  productName: string;
  price: number;
  quantity: number;
  size?: string;
  isOutOfStock: boolean;
  lowStock: boolean;
  inventory: number;
  formatCurrency: (amount: number, currency?: string) => string;
}

const CartItemDetails: React.FC<CartItemDetailsProps> = ({
  productName,
  price,
  quantity,
  size,
  isOutOfStock,
  lowStock,
  inventory,
  formatCurrency,
}) => {
  const { layout } = useLayout();
  const { t, currency } = useTranslation();

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className={cn(
          "font-medium", 
          layout === 'compact' ? "text-xs sm:text-sm" : "text-sm"
        )}>{productName}</span>
        {size && (
          <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
            {size}
          </span>
        )}
        {isOutOfStock && (
          <div className="ml-2 flex items-center text-amber-600 dark:text-amber-400">
            <PackageX className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">
          {formatCurrency(price, currency)} × {quantity}
        </span>
        {lowStock && !isOutOfStock && (
          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            {t('product.only')} {inventory} {t('product.left')}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartItemDetails;
