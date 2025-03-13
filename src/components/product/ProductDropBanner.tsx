
import React, { useState } from 'react';
import { Product, ProductSize } from './types';
import { Diamond, ShoppingCart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/cartUtils';
import SizeSelector from './SizeSelector';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedDescription } from '@/utils/productUtils';

interface ProductDropBannerProps {
  products: Product[];
  onAddToCart: (productId: number, price: number, size?: string) => void;
}

const ProductDropBanner: React.FC<ProductDropBannerProps> = ({ products, onAddToCart }) => {
  const { toast } = useToast();
  const { currency, language, t } = useTranslation();
  const [selectedSizes, setSelectedSizes] = useState<Record<number, ProductSize['name'] | undefined>>({});
  
  // Only get products that are part of the BEAMS collection (collectionId: 1)
  const beamsCollectionProducts = products.filter(p => p.collectionId === 1);
  
  if (beamsCollectionProducts.length === 0) {
    return null;
  }
  
  // Get collection name from the first product
  const collectionName = "BEAMS Collection";
  
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
    
    toast({
      title: t('product.limitedEditionAdded'),
      description: t('product.limitedEditionAddedDescription'),
    });
  };
  
  // Format a date X days from now
  const formatFutureDate = (daysFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute transform rotate-45 -left-1/4 -top-24 w-full h-full border-4 border-purple-300 rounded-full"></div>
        <div className="absolute transform rotate-12 left-1/2 -top-12 w-full h-full border-4 border-indigo-300 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="bg-purple-500/30 rounded-full p-1.5 mr-2">
              <Diamond className="h-4 w-4 text-purple-500" />
            </div>
            <h3 className="font-bold text-purple-800 dark:text-purple-300">
              {collectionName} {t('product.drop')}
            </h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-3.5 w-3.5 text-purple-600 dark:text-purple-300" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
              {t('product.ends')} {formatFutureDate(7)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {beamsCollectionProducts.map(product => (
            <div 
              key={product.id}
              className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-purple-500/20 hover:border-purple-500/50 transition-all"
            >
              <div className="flex flex-col h-full">
                <Badge className="self-start mb-2 bg-purple-500/70 hover:bg-purple-500/80 font-normal">
                  <Diamond className="h-3 w-3 mr-1" />
                  {t('product.limitedEdition')}
                </Badge>
                
                <h4 className="font-medium text-sm mb-1">{product.name}</h4>
                <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                  {getLocalizedDescription(product.description, language)}
                </p>
                
                <div className="mb-2">
                  <SizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSizes[product.id]}
                    onSelectSize={(size) => handleSizeSelect(product.id, size)}
                    isLimitedEdition={true}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-sm">{formatCurrency(product.price, currency)}</span>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className={`bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 ${!selectedSizes[product.id] ? 'opacity-70' : ''}`}
                    onClick={() => handleAddToCart(product.id, product.price)}
                    disabled={!selectedSizes[product.id]}
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                    {t('product.add')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDropBanner;
