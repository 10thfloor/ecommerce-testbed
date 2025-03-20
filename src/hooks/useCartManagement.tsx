
import { useState } from 'react';
import { 
  CartItem,
  SavedCart
} from '@/utils/cartUtils';
import { Product } from '@/components/product/types';
import { useCartOperations } from './cart/useCartOperations';
import { useSavedCarts } from './cart/useSavedCarts';
import { useSavedForLater } from './cart/useSavedForLater';
import { useStockWatch } from './cart/useStockWatch';
import { useCartHistory } from './cart/useCartHistory';
import { useInventoryManagement } from './cart/useInventoryManagement';
import { useProductOperations } from './cart/useProductOperations';
import { useCartSynchronization } from './cart/useCartSynchronization';
import { useOrderHistory } from './cart/useOrderHistory';

interface UseCartManagementProps {
  initialCartItems: CartItem[];
  initialSavedCarts: SavedCart[];
  initialSavedForLaterItems: CartItem[];
  initialStockWatchItems: Product[];
  initialInventory: Record<number, number>;
}

export const useCartManagement = ({
  initialCartItems = [],
  initialSavedCarts = [],
  initialSavedForLaterItems = [],
  initialStockWatchItems = [],
  initialInventory = {}
}: UseCartManagementProps) => {
  // Use cart history hook
  const {
    saveToHistory,
    undoCartLoad,
    hasCartHistory
  } = useCartHistory({
    setCartItems: (items) => cartOperations.setCartItems(items),
    setInventory: (inv) => inventoryManagement.setInventory(inv)
  });

  // Stock watch management
  const stockWatch = useStockWatch({
    initialStockWatchItems,
    inventory: initialInventory
  });

  // Use inventory management hook
  const inventoryManagement = useInventoryManagement({
    initialInventory,
    updateStockWatchInventory: (newInventory) => stockWatch.updateInventory(newInventory)
  });

  // Use cart operations hook
  const cartOperations = useCartOperations({
    initialCartItems,
    initialInventory,
    saveToHistory
  });

  // Clear cart function for order completion
  const clearCart = () => {
    cartOperations.setCartItems([]);
  };

  // Use order history hook
  const orderHistory = useOrderHistory({
    clearCart
  });

  // Use cart synchronization hook
  const cartSync = useCartSynchronization({
    cartItems: cartOperations.cartItems,
    inventory: inventoryManagement.inventory,
    setCartItems: cartOperations.setCartItems,
    setInventory: inventoryManagement.setInventory,
    saveToHistory
  });

  // Use saved carts hook
  const savedCarts = useSavedCarts({
    initialSavedCarts,
    cartItems: cartOperations.cartItems,
    inventory: inventoryManagement.inventory,
    setCartItems: cartOperations.setCartItems,
    setInventory: inventoryManagement.setInventory,
    saveToHistory
  });

  // Use saved for later hook
  const savedForLater = useSavedForLater({
    initialSavedForLaterItems,
    cartItems: cartOperations.cartItems,
    inventory: inventoryManagement.inventory,
    setCartItems: cartOperations.setCartItems,
    setInventory: inventoryManagement.setInventory
  });

  // Use product operations hook
  const productOps = useProductOperations({
    savedForLaterItems: savedForLater.savedForLaterItems,
    stockWatchItems: stockWatch.stockWatchItems,
    inventory: inventoryManagement.inventory,
    setSavedForLaterItems: savedForLater.setSavedForLaterItems,
    handleWatchItem: stockWatch.handleWatchItem,
    handleRemoveFromWatch: stockWatch.handleRemoveFromWatch
  });

  // Override handleSaveForLater to coordinate between cart operations and saved for later
  const handleSaveForLater = (id: string | number) => {
    // We'll use savedForLater's implementation directly now as it handles removing from cart
    savedForLater.handleSaveForLater(id);
  };

  // Handle checkout
  const handleCheckout = (items: CartItem[], total: number) => {
    orderHistory.addOrder(items, total);
  };

  return {
    cartItems: cartOperations.cartItems,
    savedCarts: savedCarts.savedCarts,
    savedForLaterItems: savedForLater.savedForLaterItems,
    stockWatchItems: stockWatch.stockWatchItems,
    emailNotifications: stockWatch.emailNotifications,
    inventory: inventoryManagement.inventory,
    orders: orderHistory.orders,
    setCartItems: cartOperations.setCartItems,
    setSavedCarts: savedCarts.setSavedCarts,
    setSavedForLaterItems: savedForLater.setSavedForLaterItems,
    setStockWatchItems: stockWatch.setStockWatchItems,
    setEmailNotifications: stockWatch.setEmailNotifications,
    setOrders: orderHistory.setOrders,
    handleAddToCart: cartOperations.handleAddToCart,
    handleUpdateQuantity: cartOperations.handleUpdateQuantity,
    handleRemoveItem: cartOperations.handleRemoveItem,
    handleSaveCart: savedCarts.handleSaveCart,
    handleLoadCart: savedCarts.handleLoadCart,
    handleAddCartItems: savedCarts.handleAddCartItems,
    handleDeleteCart: savedCarts.handleDeleteCart,
    handleSaveForLater,
    handleMoveToCart: savedForLater.handleMoveToCart,
    handleRemoveSavedItem: savedForLater.handleRemoveSavedItem,
    handleEmailCurrentCart: cartOperations.handleEmailCurrentCart,
    handleWatchItem: stockWatch.handleWatchItem,
    handleWatchProductId: stockWatch.handleWatchProductId,
    handleRemoveFromWatch: stockWatch.handleRemoveFromWatch,
    simulateInventoryChange: inventoryManagement.simulateInventoryChange,
    undoCartLoad,
    hasCartHistory,
    handleSaveProductForLater: productOps.handleSaveProductForLater,
    handleCheckout
  };
};
