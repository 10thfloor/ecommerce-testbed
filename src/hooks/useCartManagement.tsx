
import { useState } from 'react';
import { 
  CartItem,
  SavedCart
} from '@/utils/cartUtils';
import { Product } from '@/components/ProductInventory';
import { useCartOperations } from './cart/useCartOperations';
import { useSavedCarts } from './cart/useSavedCarts';
import { useSavedForLater } from './cart/useSavedForLater';
import { useStockWatch } from './cart/useStockWatch';
import { useCartHistory } from './cart/useCartHistory';
import { useInventoryManagement } from './cart/useInventoryManagement';

interface UseCartManagementProps {
  initialCartItems: CartItem[];
  initialSavedCarts: SavedCart[];
  initialSavedForLaterItems: CartItem[];
  initialInventory: Record<number, number>;
  initialStockWatchItems?: Product[];
}

export const useCartManagement = ({
  initialCartItems,
  initialSavedCarts,
  initialSavedForLaterItems,
  initialInventory,
  initialStockWatchItems = []
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

  // Use stock watch hook
  const stockWatch = useStockWatch({
    initialStockWatchItems,
    inventory: inventoryManagement.inventory
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

  // Override handleSaveForLater to coordinate between cart operations and saved for later
  const handleSaveForLater = (id: string | number) => {
    // Use the cart operations version to get the item and remove from cart
    const itemToSave = cartOperations.handleSaveForLater(id);
    if (itemToSave) {
      // Add to saved for later items
      savedForLater.setSavedForLaterItems([...savedForLater.savedForLaterItems, itemToSave]);
    }
  };

  // Coordinate handleWatchProductId to access cart items and saved for later items for price
  const handleWatchProductId = (productId: number) => {
    const isAlreadyWatching = stockWatch.stockWatchItems.some(item => item.id === productId);
    
    if (isAlreadyWatching) {
      stockWatch.handleRemoveFromWatch(productId);
      return;
    }
    
    const isOutOfStock = inventoryManagement.inventory[productId] === 0;
    
    if (!isOutOfStock) {
      return; // The toast is already shown in the stock watch hook
    }
    
    const productName = `Product #${productId}`;
    const newWatchItem: Product = {
      id: productId,
      name: productName,
      price: 0,
      inventory: 0,
      description: "Out of stock product",
      image: "/placeholder.svg"
    };
    
    const cartItem = cartOperations.cartItems.find(item => Number(item.productId) === productId);
    const savedItem = savedForLater.savedForLaterItems.find(item => Number(item.productId) === productId);
    
    if (cartItem) {
      newWatchItem.price = cartItem.price;
    } else if (savedItem) {
      newWatchItem.price = savedItem.price;
    }
    
    stockWatch.handleWatchItem(newWatchItem);
  };

  return {
    cartItems: cartOperations.cartItems,
    savedCarts: savedCarts.savedCarts,
    savedForLaterItems: savedForLater.savedForLaterItems,
    stockWatchItems: stockWatch.stockWatchItems,
    inventory: inventoryManagement.inventory,
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
    handleWatchProductId,
    handleRemoveFromWatch: stockWatch.handleRemoveFromWatch,
    simulateInventoryChange: inventoryManagement.simulateInventoryChange,
    undoCartLoad,
    hasCartHistory
  };
};
