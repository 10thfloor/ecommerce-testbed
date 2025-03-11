
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  CartItem,
  mergeCartItems,
  calculateTotal,
  formatCurrency
} from '@/utils/cartUtils';

interface UseCartOperationsProps {
  initialCartItems: CartItem[];
  initialInventory: Record<number, number>;
  saveToHistory: (items: CartItem[], currentInventory: Record<number, number>) => void;
}

export const useCartOperations = ({
  initialCartItems,
  initialInventory,
  saveToHistory,
}: UseCartOperationsProps) => {
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

  const handleSaveForLater = (id: string | number) => {
    const itemToSave = cartItems.find(item => item.id === id);
    if (!itemToSave) return null;
    
    handleRemoveItem(id);
    return itemToSave;
  };

  const handleEmailCurrentCart = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "There are no items in your cart to email.",
        variant: "destructive",
      });
      return;
    }
    
    const cartItemsText = cartItems.map(item => {
      // Skip out of stock items in the email
      if (inventory[Number(item.productId)] === 0) {
        return null;
      }
      
      const productName = inventory[Number(item.productId)] !== undefined ? 
        `Product #${item.productId}` : `Product #${item.productId}`;
      return `${productName} - Qty: ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`;
    })
    .filter(Boolean) // Remove null entries (out of stock items)
    .join('%0D%0A');
    
    const emailSubject = `My Shopping Cart`;
    const emailBody = `My Current Cart Items:%0D%0A%0D%0A${cartItemsText}%0D%0A%0D%0ATotal: ${formatCurrency(calculateTotal(cartItems, inventory))}`;
    
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    
    toast({
      title: "Email Prepared",
      description: "Your email client should open with your cart details.",
    });
  };

  return {
    cartItems,
    setCartItems,
    inventory,
    setInventory,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleSaveForLater,
    handleEmailCurrentCart
  };
};
