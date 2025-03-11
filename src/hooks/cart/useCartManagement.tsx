
import { useCartItems } from './useCartItems';
import { useSavedCarts } from './useSavedCarts';
import { useSavedForLater } from './useSavedForLater';
import { useCartHistory } from './useCartHistory';
import { useCartLoading } from './useCartLoading';
import { formatCurrency, calculateTotal } from '@/utils/cartUtils';
import { CartItem, SavedCart } from '@/utils/cartUtils';

interface UseCartManagementProps {
  initialCartItems: CartItem[];
  initialSavedCarts: SavedCart[];
  initialSavedForLaterItems: CartItem[];
  initialInventory: Record<number, number>;
}

export const useCartManagement = ({
  initialCartItems,
  initialSavedCarts,
  initialSavedForLaterItems,
  initialInventory
}: UseCartManagementProps) => {
  // Use the individual hooks
  const {
    cartItems,
    inventory,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    setCartItemsAndInventory
  } = useCartItems({ initialCartItems, initialInventory });

  const {
    savedCarts,
    lastLoadedCartId,
    setLastLoadedCartId,
    handleSaveCart,
    handleDeleteCart
  } = useSavedCarts({ initialSavedCarts });

  const {
    savedForLaterItems,
    handleSaveForLater,
    handleRemoveSavedItem
  } = useSavedForLater({ initialSavedForLaterItems });

  const {
    saveToHistory,
    undoCartLoad: undoHistory,
    hasHistory
  } = useCartHistory();

  // Handle save for later with wrapped functionality
  const handleSaveForLaterItem = (id: string | number) => {
    handleSaveForLater(cartItems, id, handleRemoveItem);
  };

  // Handle moving items from saved-for-later back to cart
  const handleMoveToCart = (id: string | number) => {
    const itemToMove = savedForLaterItems.find(item => item.id === id);
    
    if (itemToMove) {
      const productId = Number(itemToMove.productId);
      
      const existingItemIndex = cartItems.findIndex(cartItem => 
        cartItem.productId === itemToMove.productId
      );
      
      const totalRequestedQuantity = existingItemIndex !== -1 
        ? cartItems[existingItemIndex].quantity + itemToMove.quantity 
        : itemToMove.quantity;
      
      if (inventory[productId] < itemToMove.quantity) {
        return; // Error handling is in the useCartItems hook
      }
      
      handleAddToCart(productId, itemToMove.price);
      handleRemoveSavedItem(id);
    }
  };

  // Combine undo functionality
  const undoCartLoad = () => {
    const result = undoHistory();
    if (result) {
      const { prevCart, prevInventory } = result;
      setCartItemsAndInventory(prevCart, prevInventory);
    }
  };

  // Setup cart loading
  const { handleLoadCart, handleEmailCurrentCart } = useCartLoading({
    cartItems,
    inventory,
    savedCarts,
    lastLoadedCartId,
    saveToHistory,
    setCartItemsAndInventory,
    setLastLoadedCartId,
    undoCartLoad: undoHistory,
    hasHistory
  });

  // Wrap the save cart function to use current cartItems
  const wrappedSaveCart = () => handleSaveCart(cartItems);

  // Wrap the email cart function to use current cartItems
  const wrappedEmailCart = () => handleEmailCurrentCart(cartItems, formatCurrency, calculateTotal);

  return {
    cartItems,
    savedCarts,
    savedForLaterItems,
    inventory,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleSaveCart: wrappedSaveCart,
    handleLoadCart,
    handleDeleteCart,
    handleSaveForLater: handleSaveForLaterItem,
    handleMoveToCart,
    handleRemoveSavedItem,
    handleEmailCurrentCart: wrappedEmailCart,
    undoCartLoad,
    hasCartHistory: hasHistory
  };
};
