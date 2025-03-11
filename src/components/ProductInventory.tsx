import React, { useState, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ProductsGrid from './product/ProductsGrid';
import ProductSearch from './product/ProductSearch';
import FeaturedProductBanner from './product/FeaturedProductBanner';
import CategoryFilter from './product/CategoryFilter';
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
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Calculate product count by category
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

  // Filter products based on search query and selected category
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by category if selected
    if (selectedCategory !== null) {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }
    
    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  // Choose featured products from ALL products, not filtered ones
  // Featured products are not affected by filters
  const featuredProducts = useMemo(() => {
    const availableProducts = products.filter(p => p.inventory > 0);
      
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
      
      {/* Featured products - not affected by filters */}
      {featuredProducts.length > 0 && (
        <FeaturedProductBanner 
          products={featuredProducts} 
          onAddToCart={onAddToCart} 
        />
      )}
      
      {/* Search placed above filters */}
      <ProductSearch onSearch={handleSearch} />
      
      {/* Category filters moved below search */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        productCountByCategory={productCountByCategory}
      />
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No products found {searchQuery ? `matching "${searchQuery}"` : "in this category"}</p>
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
      
      {/* Social Proof Component */}
      <SocialProofToast products={products} />
    </div>
  );
};

export default ProductInventory;
