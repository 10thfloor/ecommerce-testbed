
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from '@/utils/cartUtils';

interface UseCartItemsProps {
  initialCartItems: CartItem[];
  initialInventory: Record<number, number>;
}

export const useCartItems = ({ initialCartItems, initialInventory }: UseCartItemsProps) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [inventory, setInventory] = useState<Record<number, number>>(initialInventory);

  const handleAddToCart = (productId: number, price: number) => {
    if (inventory[productId] <= 0) {
      toast({
        title: "Out of Stock",
        description: `Product #${productId} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      if (cartItems[existingItemIndex].quantity < inventory[productId]) {
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        setCartItems(updatedItems);
        
        const updatedInventory = { ...inventory };
        updatedInventory[productId] -= 1;
        setInventory(updatedInventory);
      } else {
        toast({
          title: "Inventory Limit Reached",
          description: `Sorry, we only have ${inventory[productId]} of this item in stock.`,
          variant: "destructive",
        });
        return;
      }
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productId,
        quantity: 1,
        price
      };
      setCartItems([...cartItems, newItem]);
      
      const updatedInventory = { ...inventory };
      updatedInventory[productId] -= 1;
      setInventory(updatedInventory);
    }
    
    toast({
      title: "Item Added",
      description: `Added product #${productId} to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    const cartItem = cartItems.find(item => item.id === id);
    if (!cartItem) return;
    
    const productId = cartItem.productId;
    const currentQuantity = cartItem.quantity;
    
    const availableInventory = inventory[Number(productId)] + currentQuantity;
    
    if (quantity > availableInventory) {
      toast({
        title: "Inventory Limit Reached",
        description: `Sorry, we only have ${availableInventory} of this item in stock.`,
        variant: "destructive",
      });
      return;
    }
    
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    
    const updatedInventory = { ...inventory };
    updatedInventory[Number(productId)] = availableInventory - quantity;
    setInventory(updatedInventory);
  };

  const handleRemoveItem = (id: string | number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      const updatedInventory = { ...inventory };
      updatedInventory[Number(itemToRemove.productId)] += itemToRemove.quantity;
      setInventory(updatedInventory);
      
      setCartItems(cartItems.filter(item => item.id !== id));
      
      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
      });
    }
  };

  const setCartItemsAndInventory = (newItems: CartItem[], newInventory: Record<number, number>) => {
    setCartItems(newItems);
    setInventory(newInventory);
  };

  return {
    cartItems,
    inventory,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    setCartItemsAndInventory
  };
};
