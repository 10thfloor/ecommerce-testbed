
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
  4: 3,  // Cerium Down Vest
  5: 6,  // Gamma MX Softshell
  6: 0,  // Zeta SL Rain Jacket - Out of stock
  7: 15, // Covert Fleece
  8: 4   // Proton AR Insulated
};

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
    handleDeleteCart,
    handleSaveForLater,
    handleMoveToCart,
    handleRemoveSavedItem,
    handleEmailCurrentCart,
    handleWatchItem,
    handleRemoveFromWatch,
    simulateInventoryChange,
    undoCartLoad,
    hasCartHistory
  } = useCartManagement({
    initialCartItems: mockCartItems,
    initialSavedCarts: mockSavedCarts,
    initialSavedForLaterItems: mockSavedForLaterItems,
    initialInventory: productInventory
  });

  return (
    <ShoppingLayout title="Shopping Cart with tRPC and NATS">
      <ShoppingGrid
        userId={userId}
        cartItems={cartItems}
        savedCarts={savedCarts}
        savedForLaterItems={savedForLaterItems}
        stockWatchItems={stockWatchItems}
        inventory={inventory}
        onAddToCart={handleAddToCart}
        onSaveCart={handleSaveCart}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onSaveForLater={handleSaveForLater}
        onEmailCart={handleEmailCurrentCart}
        onLoadCart={handleLoadCart}
        onDeleteCart={handleDeleteCart}
        onMoveToCart={handleMoveToCart}
        onRemoveSavedItem={handleRemoveSavedItem}
        onRemoveFromWatch={handleRemoveFromWatch}
        onUndoCart={undoCartLoad}
        hasCartHistory={hasCartHistory}
      />

      {/* For demo purposes only - button to simulate an item coming back in stock */}
      {stockWatchItems.length > 0 && 
        stockWatchItems.some(item => item.id === 6 && item.inventory === 0) && (
        <div className="fixed bottom-4 right-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
            onClick={() => simulateInventoryChange(6, 3)}
          >
            Simulate Item Back in Stock
          </button>
        </div>
      )}
    </ShoppingLayout>
  );
};

export default Index;
