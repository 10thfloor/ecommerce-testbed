
import React from 'react';
import ShoppingLayout from '@/components/ShoppingLayout';
import ShoppingGrid from '@/components/ShoppingGrid';
import { useCartManagement } from '@/hooks/useCartManagement';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseSync } from '@/hooks/useSupabaseSync';
import { isUserAuthenticated, getDefaultUserId } from '@/utils/authUtils';

const Products = () => {
  const { user } = useAuth();
  const userId = isUserAuthenticated(user) ? user.id : getDefaultUserId();
  
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
    emailNotifications,
    setEmailNotifications,
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
    handleSaveProductForLater,
    undoCartLoad,
    hasCartHistory,
    handleCheckout
  } = useCartManagement({
    initialCartItems: [],
    initialSavedCarts: [],
    initialSavedForLaterItems: [],
    initialInventory: {},
    initialStockWatchItems: []
  });

  // Integrate with Supabase
  const { isSyncing, updateNotificationPreferences } = useSupabaseSync({
    cartItems,
    savedCarts,
    savedForLaterItems,
    stockWatchItems,
    orders,
    setCartItems,
    setSavedCarts,
    setSavedForLaterItems,
    setStockWatchItems,
    setOrders,
    setEmailNotifications
  });

  // Watch for changes to emailNotifications and sync with Supabase
  React.useEffect(() => {
    if (user && emailNotifications !== undefined) {
      updateNotificationPreferences(emailNotifications);
    }
  }, [emailNotifications, user]);

  // Get watched product IDs
  const watchedProductIds = stockWatchItems.map(item => item.id);

  return (
    <ShoppingLayout title="Products">
      <ShoppingGrid
        userId={userId}
        cartItems={cartItems}
        savedCarts={savedCarts}
        savedForLaterItems={savedForLaterItems}
        stockWatchItems={stockWatchItems}
        watchedProductIds={watchedProductIds}
        inventory={inventory}
        orders={orders}
        emailNotifications={emailNotifications}
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
        onToggleEmailNotifications={setEmailNotifications}
      />
    </ShoppingLayout>
  );
};

export default Products;
