
import React, { useEffect } from 'react';
import ShoppingLayout from '@/components/ShoppingLayout';
import ProductInventory from '@/components/ProductInventory';
import { useCartManagement } from '@/hooks/useCartManagement';
import { Product } from '@/components/product/types';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import { useProducts } from '@/hooks/useProducts';

const Products = () => {
  const { user } = useAuth();
  
  const { 
    cartItems,
    savedCarts,
    savedForLaterItems,
    stockWatchItems,
    inventory,
    setCartItems,
    setSavedCarts,
    setSavedForLaterItems,
    setStockWatchItems,
    handleAddToCart,
    handleWatchItem,
    handleSaveProductForLater,
    setOrders
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
    setCartItems,
    setSavedCarts,
    setSavedForLaterItems,
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
