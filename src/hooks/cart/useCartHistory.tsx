
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from '@/utils/cartUtils';

interface UseCartHistoryProps {
  setCartItems: (items: CartItem[]) => void;
  setInventory: (inventory: Record<number, number>) => void;
}

export const useCartHistory = ({
  setCartItems,
  setInventory
}: UseCartHistoryProps) => {
  const { toast } = useToast();
  const [cartHistory, setCartHistory] = useState<CartItem[][]>([]);
  const [inventoryHistory, setInventoryHistory] = useState<Record<number, number>[]>([]);

  const saveToHistory = (items: CartItem[], currentInventory: Record<number, number>) => {
    if (items.length > 0) {
      setCartHistory(prev => [...prev, [...items]]);
      setInventoryHistory(prev => [...prev, {...currentInventory}]);
    }
  };

  const undoCartLoad = () => {
    if (cartHistory.length > 0) {
      const prevCart = cartHistory[cartHistory.length - 1];
      const prevInventory = inventoryHistory[inventoryHistory.length - 1];
      
      setCartItems(prevCart);
      setInventory(prevInventory);
      
      setCartHistory(prev => prev.slice(0, -1));
      setInventoryHistory(prev => prev.slice(0, -1));
      
      toast({
        title: "Cart Restored",
        description: "Your previous cart has been restored.",
      });
    }
  };

  return {
    saveToHistory,
    undoCartLoad,
    hasCartHistory: cartHistory.length > 0
  };
};
