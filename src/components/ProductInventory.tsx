
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProductsGrid from './product/ProductsGrid';
import { products } from './product/productData';
import { Product } from './product/types';

interface ProductInventoryProps {
  onAddToCart: (productId: number, price: number) => void;
  watchedItems?: number[];
  onWatchItem?: (product: Product) => void;
}

const ProductInventory: React.FC<ProductInventoryProps> = ({ 
  onAddToCart, 
  watchedItems = [], 
  onWatchItem 
}) => {
  const { toast } = useToast();
  const [notifiedItems, setNotifiedItems] = useState<number[]>([]);

  const handleWatchItem = (product: Product) => {
    const productId = product.id;
    const productName = product.name;
    
    if (notifiedItems.includes(productId) || watchedItems.includes(productId)) {
      toast({
        title: "Already Watching",
        description: `You'll be notified when ${productName} is back in stock.`,
      });
      return;
    }

    setNotifiedItems([...notifiedItems, productId]);
    
    if (onWatchItem) {
      onWatchItem(product);
    }
    
    toast({
      title: "Stock Watch Added",
      description: `You'll be notified when ${productName} is back in stock.`,
    });
  };

  // Combine watched items from props and local state
  const allWatchedItems = [...new Set([...watchedItems, ...notifiedItems])];

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in h-full">
      <div className="mb-6 flex items-center">
        <div className="bg-primary/10 rounded-lg p-2 mr-3">
          <ShoppingCart className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-medium">Product Inventory</h3>
      </div>
      
      <ProductsGrid 
        products={products}
        watchedItems={allWatchedItems}
        onAddToCart={onAddToCart}
        onWatchItem={handleWatchItem}
      />
    </div>
  );
};

export default ProductInventory;
