
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

  const handleAddToCart = (productId: number, price: number, size?: string) => {
    // Check if item is in stock
    if (!inventory[productId] || inventory[productId] <= 0) {
      toast({
        title: "Out of Stock",
        description: `Product #${productId} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    if (!size) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      item => item.productId === productId && item.size === size
    );
    
    if (existingItemIndex !== -1) {
      // Item already exists in cart, update quantity if stock allows
      if (inventory[productId] > 0) {
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        setCartItems(updatedItems);
        
        // Update inventory
        const updatedInventory = { ...inventory };
        updatedInventory[productId] -= 1;
        setInventory(updatedInventory);
        
        // Save to history
        saveToHistory(updatedItems, updatedInventory);
        
        toast({
          title: "Quantity Updated",
          description: `Increased quantity of ${size} size of product #${productId} in your cart.`,
        });
      } else {
        toast({
          title: "Inventory Limit Reached",
          description: `Sorry, we don't have any more of this item in stock.`,
          variant: "destructive",
        });
      }
    } else {
      // Item doesn't exist in cart, add it
      if (inventory[productId] > 0) {
        const newItem: CartItem = {
          id: Date.now(),
          productId,
          quantity: 1,
          price,
          size
        };
        const updatedItems = [...cartItems, newItem];
        setCartItems(updatedItems);
        
        // Update inventory
        const updatedInventory = { ...inventory };
        updatedInventory[productId] -= 1;
        setInventory(updatedInventory);
        
        // Save to history
        saveToHistory(updatedItems, updatedInventory);
        
        toast({
          title: "Item Added",
          description: `Added ${size} size of product #${productId} to your cart.`,
        });
      }
    }
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    const cartItem = cartItems.find(item => item.id === id);
    if (!cartItem) return;
    
    const productId = cartItem.productId;
    const currentQuantity = cartItem.quantity;
    
    // Calculate available inventory + what's already in the cart
    const availableInventory = (inventory[Number(productId)] || 0) + currentQuantity;
    
    if (quantity > availableInventory) {
      toast({
        title: "Inventory Limit Reached",
        description: `Sorry, we only have ${availableInventory} of this item in stock.`,
        variant: "destructive",
      });
      return;
    }
    
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    
    // Update inventory to reflect the new quantity
    const updatedInventory = { ...inventory };
    updatedInventory[Number(productId)] = availableInventory - quantity;
    setInventory(updatedInventory);
    
    // Save to history
    saveToHistory(updatedItems, updatedInventory);
  };

  const handleRemoveItem = (id: string | number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      // Return quantity to inventory
      const updatedInventory = { ...inventory };
      updatedInventory[Number(itemToRemove.productId)] = (updatedInventory[Number(itemToRemove.productId)] || 0) + itemToRemove.quantity;
      setInventory(updatedInventory);
      
      // Remove item from cart
      const updatedItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedItems);
      
      // Save to history
      saveToHistory(updatedItems, updatedInventory);
      
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
