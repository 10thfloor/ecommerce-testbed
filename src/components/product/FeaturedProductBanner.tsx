
import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';
import { Button } from '@/components/ui/button';
import { Product, ProductSize } from './types';
import SizeSelector from './SizeSelector';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedDescription } from '@/utils/productUtils';

interface FeaturedProductBannerProps {
  products: Product[];
  onAddToCart: (productId: number, price: number, size?: string) => void;
}

const FeaturedProductBanner: React.FC<FeaturedProductBannerProps> = ({ 
  products, 
  onAddToCart 
}) => {
  // Only display up to 2 products in the banner
  const featuredProducts = products
    .filter(product => product.inventory > 0) // Only show in-stock products
    .slice(0, 2);
  
  const [selectedSizes, setSelectedSizes] = useState<Record<number, ProductSize['name'] | undefined>>({});
  const { toast } = useToast();
  const { currency, language, t } = useTranslation();
  
  if (featuredProducts.length === 0) return null;

  const handleSizeSelect = (productId: number, size: ProductSize['name']) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (productId: number, price: number) => {
    const selectedSize = selectedSizes[productId];
    
    if (!selectedSize) {
      toast({
        title: t('product.selectSize'),
        description: t('product.selectSizeDescription'),
        variant: "destructive",
      });
      return;
    }
    
    onAddToCart(productId, price, selectedSize);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 mb-6 animate-fade-in">
      <div className="flex items-center mb-3">
        <div className="bg-yellow-500/20 rounded-full p-1.5 mr-2">
          <Star className="h-4 w-4 text-yellow-500" />
        </div>
        <h3 className="font-medium text-sm text-foreground/90">{t('product.featuredProducts')}</h3>
      </div>
      
      <div className={`grid ${featuredProducts.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {featuredProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-background/50 backdrop-blur-sm rounded-lg p-4 hover:shadow-md transition-all hover-scale"
          >
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h4 className="font-medium text-base">{product.name}</h4>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                  {getLocalizedDescription(product.description, language)}
                </p>
                
                <div className="mb-2">
                  <div className="text-xs font-medium text-muted-foreground mb-1">{t('product.selectSize')}:</div>
                  <SizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSizes[product.id]}
                    onSelectSize={(size) => handleSizeSelect(product.id, size)}
                    showInventory={true}
                  />
                </div>
                
                <div className="mb-3 flex items-center mt-2">
                  <span className="font-bold mr-3">{formatCurrency(product.price, currency)}</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => handleAddToCart(product.id, product.price)}
                  variant="outline"
                  className={`w-full group hover:bg-primary/10 border-primary/20 ${!selectedSizes[product.id] ? 'opacity-70' : ''}`}
                  disabled={!selectedSizes[product.id]}
                >
                  <ShoppingCart className="h-4 w-4 mr-2 group-hover:text-primary" />
                  <span className="group-hover:text-primary">
                    {selectedSizes[product.id] ? t('product.addToCart') : t('product.selectSizeFirst')}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductBanner;
