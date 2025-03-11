
import { useState } from 'react';
import { CartItem } from '@/utils/cartUtils';
import { useToast } from "@/hooks/use-toast";

export const useCartHistory = () => {
  const { toast } = useToast();
  const [cartHistory, setCartHistory] = useState<CartItem[][]>([]);
  const [inventoryHistory, setInventoryHistory] = useState<Record<number, number>[]>([]);

  // Save the current cart to history before replacing it
  const saveToHistory = (items: CartItem[], currentInventory: Record<number, number>) => {
    if (items.length > 0) {
      setCartHistory(prev => [...prev, [...items]]);
      setInventoryHistory(prev => [...prev, {...currentInventory}]);
    }
  };

  // Revert to the previous cart state
  const undoCartLoad = () => {
    if (cartHistory.length > 0) {
      const prevCart = cartHistory[cartHistory.length - 1];
      const prevInventory = inventoryHistory[inventoryHistory.length - 1];
      
      setCartHistory(prev => prev.slice(0, -1));
      setInventoryHistory(prev => prev.slice(0, -1));
      
      toast({
        title: "Cart Restored",
        description: "Your previous cart has been restored.",
      });

      return { prevCart, prevInventory };
    }
    return null;
  };

  return {
    cartHistory,
    inventoryHistory,
    saveToHistory,
    undoCartLoad,
    hasHistory: cartHistory.length > 0
  };
};
