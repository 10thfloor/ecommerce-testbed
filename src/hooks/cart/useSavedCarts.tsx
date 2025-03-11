
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  CartItem,
  SavedCart,
  generateCartId,
  getCartMnemonic
} from '@/utils/cartUtils';
import { useCartComparison } from './useCartComparison';
import { useInventoryValidation } from './useInventoryValidation';

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
  
  const { areCartsIdentical } = useCartComparison();
  const { validateInventoryForCart } = useInventoryValidation({ inventory });

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
      
      const { isValid, tempInventory } = validateInventoryForCart(cartItems, cartToLoad.items);
      
      if (!isValid) return;
      
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
      
      const updatedCartItems = [...cartItems];
      const updatedInventory = { ...inventory };
      
      cartToAddFrom.items.forEach(itemToAdd => {
        if (tempInventory[Number(itemToAdd.productId)] >= itemToAdd.quantity) {
          const existingItemIndex = updatedCartItems.findIndex(
            item => item.productId === itemToAdd.productId
          );
          
          if (existingItemIndex !== -1) {
            updatedCartItems[existingItemIndex].quantity += itemToAdd.quantity;
          } else {
            updatedCartItems.push({
              ...itemToAdd,
              id: Date.now() + Math.random()
            });
          }
          
          updatedInventory[Number(itemToAdd.productId)] -= itemToAdd.quantity;
          tempInventory[Number(itemToAdd.productId)] -= itemToAdd.quantity;
          addedItemsCount++;
        } else {
          skippedItemsCount++;
        }
      });
      
      setCartItems(updatedCartItems);
      setInventory(updatedInventory);
      
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

