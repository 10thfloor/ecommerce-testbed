
import React, { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Product } from './product/types';
import SocialProofToast from './product/SocialProofToast';
import ProductInventoryHeader from './product/ProductInventoryHeader';
import ProductPromotions from './product/ProductPromotions';
import ProductFilterSection from './product/ProductFilterSection';
import ProductResultSection from './product/ProductResultSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDescription } from '@/utils/productUtils';
import { useProducts, useCategories, useLimitedEditionProducts } from '@/hooks/useProducts';

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
  const { language } = useLanguage();
  const [notifiedItems, setNotifiedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [showLimitedEditionOnly, setShowLimitedEditionOnly] = useState(false);

  // Fetch data from Supabase
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: limitedEditionProducts = [], isLoading: limitedEditionLoading } = useLimitedEditionProducts();

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
  }, [products]);

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
        getLocalizedDescription(product.description, language).toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategories, showLimitedEditionOnly, products, language]);

  const featuredProducts = useMemo(() => {
    // For featured products, exclude limited editions since they have their own section
    const availableProducts = products.filter(p => {
      const hasSizeInStock = p.sizes.some(size => size.inventory > 0);
      return hasSizeInStock && !p.isLimitedEdition;
    });
      
    return [...availableProducts]
      .sort((a, b) => b.price - a.price)
      .slice(0, 2);
  }, [products]);

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

  // Show loading state
  if (productsLoading || categoriesLoading || limitedEditionLoading) {
    return (
      <div className="card-glass p-4 mb-6 animate-fade-in h-full">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

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
