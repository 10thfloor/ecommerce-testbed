
import React, { useState } from 'react';
import { formatCurrency } from '@/utils/cartUtils';
import { Button } from '@/components/ui/button';
import { Product, ProductSize, Collection } from './types';
import SizeSelector from './SizeSelector';
import { useToast } from '@/hooks/use-toast';
import { Gem, Clock, ShoppingBag, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductDropBannerProps {
  collection: Collection;
  products: Product[];
  onAddToCart: (productId: number, price: number, size?: string) => void;
  remainingTime?: number; // in seconds
}

const ProductDropBanner: React.FC<ProductDropBannerProps> = ({ 
  collection,
  products,
  onAddToCart,
  remainingTime
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<number, ProductSize['name'] | undefined>>({});
  const { toast } = useToast();
  
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

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
        title: "Select a Size",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    onAddToCart(productId, price, selectedSize);
    
    toast({
      title: "Added to Cart",
      description: "This limited edition item is reserved for 10 minutes.",
    });
  };

  const remainingStock = products.reduce((total, product) => {
    return total + product.sizes.reduce((sizeTotal, size) => sizeTotal + size.inventory, 0);
  }, 0);

  return (
    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden mb-8 animate-fade-in">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-purple-500/20 rounded-full p-1.5">
              <Gem className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{collection.name} Collection</h3>
              <p className="text-sm text-muted-foreground">{collection.description}</p>
            </div>
          </div>
          
          {remainingTime && remainingTime > 0 && (
            <div className="flex items-center gap-1.5 bg-background/80 rounded-full px-3 py-1.5 text-sm font-medium">
              <Clock className="h-3.5 w-3.5 text-pink-500" />
              <span>Ends in {formatTime(remainingTime)}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30">
            Limited Edition
          </Badge>
          
          <Badge variant="outline" className="bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-500/30">
            {remainingStock} items left
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map(product => (
            <div key={product.id} className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex flex-col h-full">
                <h4 className="font-medium text-lg mb-1.5">{product.name}</h4>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="mb-3">
                  <SizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSizes[product.id]}
                    onSelectSize={(size) => handleSizeSelect(product.id, size)}
                    showInventory={true}
                    isLimitedEdition={true}
                  />
                </div>
                
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-bold">{formatCurrency(product.price)}</span>
                  
                  <div className="text-sm text-muted-foreground">
                    {product.sizes.reduce((total, size) => total + size.inventory, 0)} available
                  </div>
                </div>
                
                <div className="mt-auto flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(product.id, product.price)}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                    disabled={!selectedSizes[product.id]}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button variant="outline" size="icon" className="border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/10">
                    <ExternalLink className="h-4 w-4" />
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
