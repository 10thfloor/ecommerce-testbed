
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
      // Check if this product is already in saved for later
      const existingItem = savedForLaterItems.find(item => 
        item.productId === itemToSave.productId
      );
      
      if (existingItem) {
        // If product already exists in saved items, don't add it again
        toast({
          title: "Already Saved",
          description: "This item is already in your saved for later list.",
        });
        
        // Just remove from cart
        const updatedInventory = { ...inventory };
        updatedInventory[Number(itemToSave.productId)] += itemToSave.quantity;
        setInventory(updatedInventory);
        setCartItems(cartItems.filter(item => item.id !== id));
        return;
      }
      
      // Create a new saved item with quantity of 1
      const newSavedItem = {
        ...itemToSave,
        quantity: 1
      };
      
      setSavedForLaterItems([...savedForLaterItems, newSavedItem]);
      
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
      
      // We're always moving with quantity 1 from saved for later
      const totalRequestedQuantity = existingItemIndex !== -1 
        ? cartItems[existingItemIndex].quantity + 1 
        : 1;
      
      if (inventory[productId] < 1) {
        toast({
          title: "Insufficient Inventory",
          description: `Sorry, we only have ${inventory[productId]} of this item available.`,
          variant: "destructive",
        });
        return;
      }
      
      const updatedInventory = { ...inventory };
      updatedInventory[productId] -= 1;
      setInventory(updatedInventory);
      
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        setCartItems(updatedCartItems);
      } else {
        // Add to cart with quantity 1
        const newCartItem = {
          ...itemToMove,
          quantity: 1
        };
        setCartItems([...cartItems, newCartItem]);
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
