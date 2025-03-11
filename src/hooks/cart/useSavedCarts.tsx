
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  CartItem,
  SavedCart,
  generateCartId,
  getCartMnemonic
} from '@/utils/cartUtils';

interface UseSavedCartsProps {
  initialSavedCarts: SavedCart[];
  cartItems: CartItem[];
  inventory: Record<number, number>;
  setCartItems: (items: CartItem[]) => void;
  setInventory: (inventory: Record<number, number>) => void;
  saveToHistory: (items: CartItem[], currentInventory: Record<number, number>) => void;
}

export const useSavedCarts = ({
  initialSavedCarts,
  cartItems,
  inventory,
  setCartItems,
  setInventory,
  saveToHistory
}: UseSavedCartsProps) => {
  const { toast } = useToast();
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>(initialSavedCarts);
  const [lastLoadedCartId, setLastLoadedCartId] = useState<string | null>(null);
  
  const areCartsIdentical = (cart1: CartItem[], cart2: CartItem[]): boolean => {
    if (cart1.length !== cart2.length) return false;
    
    const getCartMap = (cart: CartItem[]) => {
      const map = new Map<number | string, number>();
      cart.forEach(item => {
        map.set(item.productId, (map.get(item.productId) || 0) + item.quantity);
      });
      return map;
    };
    
    const cart1Map = getCartMap(cart1);
    const cart2Map = getCartMap(cart2);
    
    if (cart1Map.size !== cart2Map.size) return false;
    
    for (const [productId, quantity] of cart1Map.entries()) {
      if (cart2Map.get(productId) !== quantity) return false;
    }
    
    return true;
  };

  const handleSaveCart = () => {
    if (cartItems.length === 0) return;
    
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    
    const newSavedCart: SavedCart = {
      id: generateCartId(),
      date: formattedDate,
      items: [...cartItems]
    };
    
    setSavedCarts([...savedCarts, newSavedCart]);
    
    toast({
      title: "Cart Saved",
      description: "Your cart has been saved successfully.",
    });
  };

  const handleLoadCart = (cartId: string) => {
    const cartToLoad = savedCarts.find(cart => cart.id === cartId);
    
    if (cartToLoad) {
      const isSameCart = cartId === lastLoadedCartId;
      const isIdenticalContent = areCartsIdentical(cartItems, cartToLoad.items);
      
      if (isSameCart && isIdenticalContent) {
        toast({
          title: "Cart Already Loaded",
          description: "This cart is already loaded and has not changed.",
        });
        return;
      }
      
      if (cartItems.length > 0) {
        saveToHistory([...cartItems], {...inventory});
      }
      
      const tempInventory = { ...inventory };
      let insufficientInventory = false;
      
      cartItems.forEach(item => {
        tempInventory[Number(item.productId)] += item.quantity;
      });
      
      cartToLoad.items.forEach(item => {
        if (tempInventory[Number(item.productId)] < item.quantity) {
          insufficientInventory = true;
        } else {
          tempInventory[Number(item.productId)] -= item.quantity;
        }
      });
      
      if (insufficientInventory) {
        toast({
          title: "Insufficient Inventory",
          description: "Some items in this saved cart are no longer available in sufficient quantity.",
          variant: "destructive",
        });
        return;
      }
      
      setCartItems([...cartToLoad.items]);
      setInventory(tempInventory);
      setLastLoadedCartId(cartId);
      
      toast({
        title: "Cart Loaded",
        description: "The saved cart has been loaded successfully.",
      });
    }
  };

  const handleAddCartItems = (cartId: string) => {
    const cartToAddFrom = savedCarts.find(cart => cart.id === cartId);
    
    if (cartToAddFrom) {
      const tempInventory = { ...inventory };
      let addedItemsCount = 0;
      let skippedItemsCount = 0;
      
      // Create a new cart with the existing items
      const updatedCartItems = [...cartItems];
      const updatedInventory = { ...inventory };
      
      // Check each item in the saved cart
      cartToAddFrom.items.forEach(itemToAdd => {
        // Check if there's enough inventory for this item
        if (tempInventory[Number(itemToAdd.productId)] >= itemToAdd.quantity) {
          // There's enough inventory, so add/update the item
          const existingItemIndex = updatedCartItems.findIndex(
            item => item.productId === itemToAdd.productId
          );
          
          if (existingItemIndex !== -1) {
            // Update existing item quantity
            updatedCartItems[existingItemIndex].quantity += itemToAdd.quantity;
          } else {
            // Add as new item
            updatedCartItems.push({
              ...itemToAdd,
              id: Date.now() + Math.random()
            });
          }
          
          // Update inventory
          updatedInventory[Number(itemToAdd.productId)] -= itemToAdd.quantity;
          tempInventory[Number(itemToAdd.productId)] -= itemToAdd.quantity;
          addedItemsCount++;
        } else {
          // Not enough inventory for this item
          skippedItemsCount++;
        }
      });
      
      // Update the cart and inventory
      setCartItems(updatedCartItems);
      setInventory(updatedInventory);
      
      // Show appropriate toast message
      if (addedItemsCount > 0 && skippedItemsCount > 0) {
        toast({
          title: "Items Partially Added",
          description: `Added ${addedItemsCount} available items from "${getCartMnemonic(cartId)}". ${skippedItemsCount} out-of-stock items were skipped.`,
        });
      } else if (addedItemsCount > 0) {
        toast({
          title: "Items Added",
          description: `Items from "${getCartMnemonic(cartId)}" have been added to your cart.`,
        });
      } else {
        toast({
          title: "No Items Added",
          description: "None of the items in this saved cart are currently in stock.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCart = (cartId: string) => {
    setSavedCarts(savedCarts.filter(cart => cart.id !== cartId));
    
    toast({
      title: "Cart Deleted",
      description: "The saved cart has been deleted.",
    });
  };

  return {
    savedCarts,
    handleSaveCart,
    handleLoadCart,
    handleAddCartItems,
    handleDeleteCart
  };
};
