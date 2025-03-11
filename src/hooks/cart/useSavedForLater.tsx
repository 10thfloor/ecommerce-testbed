
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from '@/utils/cartUtils';

interface UseSavedForLaterProps {
  initialSavedForLaterItems: CartItem[];
  cartItems: CartItem[];
  inventory: Record<number, number>;
  setCartItems: (items: CartItem[]) => void;
  setInventory: (inventory: Record<number, number>) => void;
}

export const useSavedForLater = ({
  initialSavedForLaterItems,
  cartItems,
  inventory,
  setCartItems,
  setInventory
}: UseSavedForLaterProps) => {
  const { toast } = useToast();
  const [savedForLaterItems, setSavedForLaterItems] = useState<CartItem[]>(initialSavedForLaterItems);

  const handleSaveForLater = (id: string | number) => {
    const itemToSave = cartItems.find(item => item.id === id);
    
    if (itemToSave) {
      setSavedForLaterItems([...savedForLaterItems, itemToSave]);
      
      // Remove from cart
      const updatedInventory = { ...inventory };
      updatedInventory[Number(itemToSave.productId)] += itemToSave.quantity;
      setInventory(updatedInventory);
      
      setCartItems(cartItems.filter(item => item.id !== id));
      
      toast({
        title: "Item Saved",
        description: "Item has been saved for later.",
      });
    }
  };

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
        toast({
          title: "Insufficient Inventory",
          description: `Sorry, we only have ${inventory[productId]} of this item available.`,
          variant: "destructive",
        });
        return;
      }
      
      const updatedInventory = { ...inventory };
      updatedInventory[productId] -= itemToMove.quantity;
      setInventory(updatedInventory);
      
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += itemToMove.quantity;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, itemToMove]);
      }
      
      setSavedForLaterItems(savedForLaterItems.filter(item => item.id !== id));
      
      toast({
        title: "Item Moved",
        description: "Item has been moved to your cart.",
      });
    }
  };

  const handleRemoveSavedItem = (id: string | number) => {
    setSavedForLaterItems(savedForLaterItems.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: "The saved item has been removed.",
    });
  };

  return {
    savedForLaterItems,
    setSavedForLaterItems,
    handleSaveForLater,
    handleMoveToCart,
    handleRemoveSavedItem
  };
};
