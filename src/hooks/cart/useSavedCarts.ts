
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CartItem, SavedCart, generateCartId } from '@/utils/cartUtils';

interface UseSavedCartsProps {
  initialSavedCarts: SavedCart[];
}

export const useSavedCarts = ({ initialSavedCarts }: UseSavedCartsProps) => {
  const { toast } = useToast();
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>(initialSavedCarts);
  const [lastLoadedCartId, setLastLoadedCartId] = useState<string | null>(null);

  const handleSaveCart = (cartItems: CartItem[]) => {
    if (cartItems.length === 0) return;
    
    const date = new Date();
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${date.toLocaleTimeString()}`;
    
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

  const handleDeleteCart = (cartId: string) => {
    setSavedCarts(savedCarts.filter(cart => cart.id !== cartId));
    
    toast({
      title: "Cart Deleted",
      description: "The saved cart has been deleted.",
    });
  };

  return {
    savedCarts,
    lastLoadedCartId,
    setLastLoadedCartId,
    handleSaveCart,
    handleDeleteCart
  };
};
