
import React, { useState } from 'react';
import { Product, ProductSize } from '@/components/product/types';
import SizeSelector from './SizeSelector';
import { useToast } from '@/hooks/use-toast';
import { categories } from './categoryData';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedDescription } from '@/utils/productUtils';
import { getProductBadge } from './utils/productBadgeUtils';
import ProductBadge from './ProductBadge';
import ProductHeader from './ProductHeader';
import ProductActions from './ProductActions';

interface ProductCardProps {
  product: Product;
  isWatched: boolean;
  onAddToCart: (productId: number, price: number, size?: string) => void;
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWatched, 
  onAddToCart, 
  onWatchItem,
  onSaveForLater
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize['name'] | undefined>();
  const { toast } = useToast();
  const { language, t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize) {
      toast({
        title: t('product.selectSizeFirst'),
        description: t('product.selectSizeDescription'),
        variant: "destructive",
      });
      return;
    }
    onAddToCart(product.id, product.price, selectedSize);
  };

  const handleSizeSelect = (size: ProductSize['name']) => {
    setSelectedSize(size);
  };

  // Only show product badges for products with ID 1, 3, 7 (to showcase the feature without overwhelming the UI)
  const showBadge = [1, 3, 7].includes(product.id);
  const badge = showBadge ? getProductBadge(product.id) : null;

  // Get category name
  const category = categories.find(c => c.id === product.categoryId);
  
  // Calculate if any size has inventory
  const hasSizeInStock = product.sizes.some(size => size.inventory > 0);

  // Get localized description
  const localizedDescription = getLocalizedDescription(product.description, language);

  // Determine if we should add the pulsing border
  // Using CSS variables to animate only the border opacity
  const borderClass = badge ? `border-2 ${badge.borderColor}` : '';
  const animationClass = badge ? 'product-card-pulse' : '';

  return (
    <div 
      key={product.id}
      className={`${hasSizeInStock ? 'bg-secondary/30 hover:bg-secondary/50' : 'bg-amber-500/10 border border-amber-500/30'} 
        rounded-lg p-4 transition-all relative ${borderClass} ${animationClass} ${product.isLimitedEdition ? 'border-purple-500/50 bg-purple-500/5' : ''}`}
      style={badge ? {
        '--pulse-color': `var(--${badge.borderColor.replace('border-', '')})`,
      } as React.CSSProperties : undefined}
    >
      <div className="flex flex-col h-full">
        <ProductHeader 
          name={product.name}
          description={localizedDescription}
          category={category}
          isLimitedEdition={product.isLimitedEdition}
        />
        
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={handleSizeSelect}
          showInventory={true}
          isLimitedEdition={product.isLimitedEdition}
        />
        
        {!hasSizeInStock && (
          <div className="text-xs font-medium rounded-full px-2 py-0.5 inline-block mb-2 bg-amber-500/20 text-amber-700 dark:text-amber-400">
            {t('product.outOfStock')}
          </div>
        )}
        
        <ProductActions
          product={product}
          isWatched={isWatched}
          selectedSize={selectedSize}
          hasSizeInStock={hasSizeInStock}
          onAddToCart={handleAddToCart}
          onWatchItem={onWatchItem}
          onSaveForLater={onSaveForLater}
        />
        
        {badge && <ProductBadge badge={badge} />}
      </div>
    </div>
  );
};

export default ProductCard;
