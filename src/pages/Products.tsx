
import React from 'react';
import ShoppingLayout from '@/components/ShoppingLayout';
import ProductInventory from '@/components/ProductInventory';
import { useCartManagement } from '@/hooks/useCartManagement';
import { Product } from '@/components/product/types';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';

const Products = () => {
  const [userId] = React.useState("user-123");
  const { user } = useAuth();
  
  const { 
    cartItems,
    savedCarts,
    savedForLaterItems,
    stockWatchItems,
    inventory,
    setStockWatchItems,
    handleAddToCart,
    handleWatchItem,
    handleSaveProductForLater
  } = useCartManagement({
    initialCartItems: [],
    initialSavedCarts: [],
    initialSavedForLaterItems: [],
    initialInventory: {},
    initialStockWatchItems: []
  });

  // Integrate with Supabase
  const { isSyncing } = useSupabaseSync({
    cartItems,
    savedCarts,
    savedForLaterItems,
    stockWatchItems,
    setCartItems: () => {},
    setSavedCarts: () => {},
    setSavedForLaterItems: () => {},
    setStockWatchItems
  });

  // Get watched product IDs
  const watchedProductIds = stockWatchItems.map(item => item.id);

  return (
    <ShoppingLayout title="Products">
      <ProductInventory 
        onAddToCart={handleAddToCart} 
        watchedItems={watchedProductIds}
        onWatchItem={handleWatchItem}
        onSaveForLater={handleSaveProductForLater}
      />
    </ShoppingLayout>
  );
};

export default Products;
