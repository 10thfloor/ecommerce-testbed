
import React, { useState, useEffect } from 'react';
import ShoppingLayout from '@/components/ShoppingLayout';
import ShoppingGrid from '@/components/ShoppingGrid';
import { useCartManagement } from '@/hooks/useCartManagement';
import { 
  mockCartItems,
  mockSavedCarts,
  mockSavedForLaterItems,
} from '@/utils/cartUtils';
import { Product } from '@/components/product/types';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';

// Initial product inventory
const productInventory: Record<number, number> = {
  1: 5,  // Alpha SV Jacket
  2: 8,  // Beta AR Pants
  3: 12, // Atom LT Hoody
  4: 3,  // Cerium Down Vest - Low stock
  5: 2,  // Gamma MX Softshell - Low stock
  6: 0,  // Zeta SL Rain Jacket - Out of stock
  7: 15, // Covert Fleece
  8: 4   // Proton AR Insulated
};

// Initial stock watch items
const initialStockWatchItems: Product[] = [
  { 
    id: 6, 
    name: "Zeta SL Rain Jacket", 
    price: 399.99, 
    inventory: 0,
    description: "Superlight emergency rain protection for hiking",
    image: "/placeholder.svg",
    categoryId: 1, // Jackets category
    sizes: [
      { name: 'SM', inventory: 0 },
      { name: 'MD', inventory: 0 },
      { name: 'LG', inventory: 0 },
      { name: 'XL', inventory: 0 }
    ]
  },
  {
    id: 5,
    name: "Gamma MX Softshell",
    price: 349.99,
    inventory: 2,
    description: "Versatile softshell jacket for mixed mountain conditions",
    image: "/placeholder.svg",
    categoryId: 1, // Jackets category
    sizes: [
      { name: 'SM', inventory: 0 },
      { name: 'MD', inventory: 1 },
      { name: 'LG', inventory: 1 },
      { name: 'XL', inventory: 0 }
    ]
  }
];

const Index = () => {
  const [userId] = useState("user-123");
  const { user } = useAuth();
  
  const { 
    cartItems,
    savedCarts,
    savedForLaterItems,
    stockWatchItems,
    inventory,
    orders,
    setCartItems,
    setSavedCarts,
    setSavedForLaterItems,
    setStockWatchItems,
    setOrders,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleSaveCart,
    handleLoadCart,
    handleAddCartItems,
    handleDeleteCart,
    handleSaveForLater,
    handleMoveToCart,
    handleRemoveSavedItem,
    handleEmailCurrentCart,
    handleWatchItem,
    handleWatchProductId,
    handleRemoveFromWatch,
    simulateInventoryChange,
    undoCartLoad,
    hasCartHistory,
    handleSaveProductForLater,
    handleCheckout
  } = useCartManagement({
    initialCartItems: user ? [] : mockCartItems,
    initialSavedCarts: user ? [] : mockSavedCarts,
    initialSavedForLaterItems: user ? [] : mockSavedForLaterItems,
    initialInventory: productInventory,
    initialStockWatchItems: user ? [] : initialStockWatchItems
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

  // Get the actual user ID (either from auth or guest ID)
  const currentUserId = user ? user.id : userId;

  return (
    <ShoppingLayout title="E-Commerce Testbed">
      <ShoppingGrid
        userId={currentUserId}
        cartItems={cartItems}
        savedCarts={savedCarts}
        savedForLaterItems={savedForLaterItems}
        stockWatchItems={stockWatchItems}
        watchedProductIds={watchedProductIds}
        inventory={inventory}
        orders={orders}
        onAddToCart={handleAddToCart}
        onSaveCart={handleSaveCart}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onSaveForLater={handleSaveForLater}
        onEmailCart={handleEmailCurrentCart}
        onLoadCart={handleLoadCart}
        onAddCartItems={handleAddCartItems}
        onDeleteCart={handleDeleteCart}
        onMoveToCart={handleMoveToCart}
        onRemoveSavedItem={handleRemoveSavedItem}
        onRemoveFromWatch={handleRemoveFromWatch}
        onWatchItem={handleWatchItem}
        onWatchProductId={handleWatchProductId}
        onUndoCart={undoCartLoad}
        hasCartHistory={hasCartHistory}
        onSaveProductForLater={handleSaveProductForLater}
        onCheckout={handleCheckout}
      />
    </ShoppingLayout>
  );
};

export default Index;
