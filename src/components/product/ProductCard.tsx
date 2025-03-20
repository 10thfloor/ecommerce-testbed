
import React, { useState, useEffect } from 'react';
import { Product, ProductSize, Category } from '@/components/product/types';
import SizeSelector from './SizeSelector';
import { useToast } from '@/hooks/use-toast';
import { fetchCategories } from './categoryData';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedDescription } from '@/utils/productUtils';
import { getProductBadge } from './utils/productBadgeUtils';
import ProductBadge from './ProductBadge';
import ProductHeader from './ProductHeader';
import ProductActions from './ProductActions';

interface ProductCardProps {
  product: Product;
  isWatched: boolean;
  productAttributes?: Record<number, any[]>;
  onAddToCart: (productId: number, price: number, size?: string) => void;
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWatched, 
  productAttributes,
  onAddToCart, 
  onWatchItem,
  onSaveForLater
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize['name'] | undefined>();
  const [category, setCategory] = useState<Category | undefined>();
  const { toast } = useToast();
  const { language, t } = useTranslation();

  // Fetch category information for this product
  useEffect(() => {
    const loadCategory = async () => {
      const categories = await fetchCategories();
      const foundCategory = categories.find(c => c.id === product.categoryId);
      setCategory(foundCategory);
    };
    
    loadCategory();
  }, [product.categoryId]);

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

  // Get badge from product attributes in the database
  const badge = getProductBadge(product.id, productAttributes);
  
  // Calculate if any size has inventory
  const hasSizeInStock = product.sizes.some(size => size.inventory > 0);

  // Get localized description
  const localizedDescription = getLocalizedDescription(product.description, language);

  // Determine if we should add the pulsing border
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
          isOutOfStock={!hasSizeInStock}
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
