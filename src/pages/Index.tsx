
import React, { useState } from 'react';
import ShoppingLayout from '@/components/ShoppingLayout';
import ShoppingGrid from '@/components/ShoppingGrid';
import { useCartManagement } from '@/hooks/useCartManagement';
import { 
  mockCartItems,
  mockSavedCarts,
  mockSavedForLaterItems,
} from '@/utils/cartUtils';

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
    sizes: [] // Add empty sizes array
  },
  {
    id: 5,
    name: "Gamma MX Softshell",
    price: 349.99,
    inventory: 2,
    description: "Versatile softshell jacket for mixed mountain conditions",
    image: "/placeholder.svg",
    sizes: [] // Add empty sizes array
  }
];

const Index = () => {
  const [userId] = useState("user-123");
  
  const { 
    cartItems,
    savedCarts,
    savedForLaterItems,
    stockWatchItems,
    inventory,
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
    handleSaveProductForLater
  } = useCartManagement({
    initialCartItems: mockCartItems,
    initialSavedCarts: mockSavedCarts,
    initialSavedForLaterItems: mockSavedForLaterItems,
    initialInventory: productInventory,
    initialStockWatchItems: initialStockWatchItems
  });

  // Get watched product IDs
  const watchedProductIds = stockWatchItems.map(item => item.id);

  return (
    <ShoppingLayout title="E-Commerce Testbed">
      <ShoppingGrid
        userId={userId}
        cartItems={cartItems}
        savedCarts={savedCarts}
        savedForLaterItems={savedForLaterItems}
        stockWatchItems={stockWatchItems}
        watchedProductIds={watchedProductIds}
        inventory={inventory}
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
      />
    </ShoppingLayout>
  );
};

export default Index;
