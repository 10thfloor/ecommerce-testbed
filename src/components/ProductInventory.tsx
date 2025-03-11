
import React, { useState, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProductsGrid from './product/ProductsGrid';
import ProductSearch from './product/ProductSearch';
import { products } from './product/productData';
import { Product } from './product/types';
import SocialProofToast from './product/SocialProofToast';

interface ProductInventoryProps {
  onAddToCart: (productId: number, price: number) => void;
  watchedItems?: number[];
  onWatchItem?: (product: Product) => void;
  onSaveForLater?: (product: Product) => void;
}

const ProductInventory: React.FC<ProductInventoryProps> = ({ 
  onAddToCart, 
  watchedItems = [], 
  onWatchItem,
  onSaveForLater
}) => {
  const { toast } = useToast();
  const [notifiedItems, setNotifiedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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

  const handleSaveForLater = (product: Product) => {
    if (onSaveForLater) {
      onSaveForLater(product);
      
      toast({
        title: "Saved for Later",
        description: `${product.name} has been added to your saved items.`,
      });
    }
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
      
      <ProductSearch onSearch={handleSearch} />
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No products found matching "{searchQuery}"</p>
        </div>
      ) : (
        <ProductsGrid 
          products={filteredProducts}
          watchedItems={allWatchedItems}
          onAddToCart={onAddToCart}
          onWatchItem={handleWatchItem}
          onSaveForLater={handleSaveForLater}
        />
      )}
      
      {/* Social Proof Component - will show toast notifications of recent purchases */}
      <SocialProofToast products={products} />
    </div>
  );
};

export default ProductInventory;
