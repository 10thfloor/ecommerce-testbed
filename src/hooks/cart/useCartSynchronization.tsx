
import { CartItem } from '@/utils/cartUtils';

interface UseCartSynchronizationProps {
  cartItems: CartItem[];
  inventory: Record<number, number>;
  setCartItems: (items: CartItem[]) => void;
  setInventory: (inv: Record<number, number>) => void;
  saveToHistory: (items: CartItem[], currentInventory: Record<number, number>) => void;
}

export const useCartSynchronization = ({
  cartItems,
  inventory,
  setCartItems,
  setInventory,
  saveToHistory
}: UseCartSynchronizationProps) => {
  
  // Save current state to history before making changes
  const saveCurrentStateToHistory = () => {
    if (cartItems.length > 0) {
      saveToHistory(cartItems, inventory);
    }
  };

  // Update cart items with appropriate history and inventory tracking
  const updateCartItems = (newItems: CartItem[], newInventory: Record<number, number>) => {
    saveCurrentStateToHistory();
    setCartItems(newItems);
    setInventory(newInventory);
  };

  return {
    saveCurrentStateToHistory,
    updateCartItems
  };
};
