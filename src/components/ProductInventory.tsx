
import React, { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { products, getLimitedEditionProducts } from './product/productData';
import { Product } from './product/types';
import SocialProofToast from './product/SocialProofToast';
import ProductInventoryHeader from './product/ProductInventoryHeader';
import ProductPromotions from './product/ProductPromotions';
import ProductFilterSection from './product/ProductFilterSection';
import ProductResultSection from './product/ProductResultSection';

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
      <ProductInventoryHeader />
      
      <ProductPromotions 
        limitedEditionProducts={limitedEditionProducts}
        featuredProducts={featuredProducts}
        onAddToCart={onAddToCart}
      />
      
      <ProductFilterSection 
        searchQuery={searchQuery}
        onSearch={handleSearch}
        showLimitedEditionOnly={showLimitedEditionOnly}
        setShowLimitedEditionOnly={setShowLimitedEditionOnly}
        limitedEditionCount={limitedEditionCount}
        selectedCategories={selectedCategories}
        onSelectCategory={toggleCategory}
        onClearCategories={clearCategories}
        productCountByCategory={productCountByCategory}
      />
      
      <ProductResultSection 
        filteredProducts={filteredProducts}
        searchQuery={searchQuery}
        watchedItems={allWatchedItems}
        onAddToCart={onAddToCart}
        onWatchItem={handleWatchItem}
        onSaveForLater={handleSaveForLater}
      />
      
      <SocialProofToast products={products} />
    </div>
  );
};

export default ProductInventory;
