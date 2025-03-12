
import React, { useState, useMemo } from 'react';
import { ShoppingCart, Gem, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProductsGrid from './product/ProductsGrid';
import ProductSearch from './product/ProductSearch';
import FeaturedProductBanner from './product/FeaturedProductBanner';
import CategoryFilter from './product/CategoryFilter';
import { products, getLimitedEditionProducts } from './product/productData';
import { Product } from './product/types';
import SocialProofToast from './product/SocialProofToast';
import ProductDropBanner from './product/ProductDropBanner';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

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
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [showLimitedEditionOnly, setShowLimitedEditionOnly] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const productCountByCategory = useMemo(() => {
    return products.reduce((acc, product) => {
      const { categoryId } = product;
      if (!acc[categoryId]) {
        acc[categoryId] = 0;
      }
      acc[categoryId]++;
      return acc;
    }, {} as Record<number, number>);
  }, []);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by limited edition if the toggle is on
    if (showLimitedEditionOnly) {
      filtered = filtered.filter(product => product.isLimitedEdition);
    }
    
    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.categoryId));
    }
    
    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategories, showLimitedEditionOnly]);

  // Get limited edition products for the Product Drop banner
  const limitedEditionProducts = useMemo(() => {
    return getLimitedEditionProducts();
  }, []);

  const featuredProducts = useMemo(() => {
    // For featured products, exclude limited editions since they have their own section
    const availableProducts = products.filter(p => p.inventory > 0 && !p.isLimitedEdition);
      
    return [...availableProducts]
      .sort((a, b) => b.price - a.price)
      .slice(0, 2);
  }, []);

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

  const allWatchedItems = [...new Set([...watchedItems, ...notifiedItems])];

  const limitedEditionCount = limitedEditionProducts.length;

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in h-full">
      <div className="mb-6 flex items-center">
        <div className="bg-primary/10 rounded-lg p-2 mr-3">
          <ShoppingCart className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-medium">Product Inventory</h3>
      </div>
      
      {/* Limited edition products banner */}
      {limitedEditionProducts.length > 0 && (
        <div className="mb-6">
          <ProductDropBanner 
            products={limitedEditionProducts} 
            onAddToCart={onAddToCart} 
          />
        </div>
      )}
      
      {/* Featured products banner (non-limited edition) */}
      {featuredProducts.length > 0 && (
        <div className="mb-6">
          <FeaturedProductBanner 
            products={featuredProducts} 
            onAddToCart={onAddToCart} 
          />
        </div>
      )}
      
      <div className="space-y-4">
        <ProductSearch onSearch={handleSearch} />
        
        {/* Limited Edition Filter Toggle */}
        <div className="flex items-center justify-between bg-purple-500/10 rounded-lg p-3 text-sm mb-4">
          <div className="flex items-center gap-2">
            <Gem className="h-4 w-4 text-purple-500" />
            <span className="font-medium text-purple-700 dark:text-purple-300">
              Limited Edition Items
            </span>
            {limitedEditionCount > 0 && (
              <Badge variant="outline" className="bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30">
                {limitedEditionCount}
              </Badge>
            )}
          </div>
          <Switch
            checked={showLimitedEditionOnly}
            onCheckedChange={setShowLimitedEditionOnly}
            className="data-[state=checked]:bg-purple-500"
          />
        </div>
        
        <CategoryFilter
          selectedCategories={selectedCategories}
          onSelectCategory={toggleCategory}
          onClearCategories={clearCategories}
          productCountByCategory={productCountByCategory}
        />
        
        {filteredProducts.length === 0 ? (
          <div className="bg-secondary/20 text-center py-8 rounded-lg text-muted-foreground mt-4">
            <p>No products found {searchQuery ? `matching "${searchQuery}"` : "in selected categories"}</p>
          </div>
        ) : (
          <div className="mt-4">
            <ProductsGrid 
              products={filteredProducts}
              watchedItems={allWatchedItems}
              onAddToCart={onAddToCart}
              onWatchItem={handleWatchItem}
              onSaveForLater={handleSaveForLater}
            />
          </div>
        )}
      </div>
      
      <SocialProofToast products={products} />
    </div>
  );
};

export default ProductInventory;
