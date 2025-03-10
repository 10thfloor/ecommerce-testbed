
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import UserProfile from '@/components/UserProfile';
import Cart from '@/components/Cart';
import SavedCarts from '@/components/SavedCarts';
import SavedForLater from '@/components/SavedForLater';
import ProductInventory from '@/components/ProductInventory';
import { 
  CartItem,
  SavedCart,
  mockCartItems,
  mockSavedCarts,
  mockSavedForLaterItems,
  generateCartId
} from '@/utils/cartUtils';

// Product inventory map to track available inventory
const productInventory: Record<number, number> = {
  1: 5,  // Alpha SV Jacket
  2: 8,  // Beta AR Pants
  3: 12, // Atom LT Hoody
  4: 3,  // Cerium Down Vest
  5: 6,  // Gamma MX Softshell
  6: 0,  // Zeta SL Rain Jacket - Out of stock
  7: 15, // Covert Fleece
  8: 4   // Proton AR Insulated
};

const Index = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>(mockSavedCarts);
  const [savedForLaterItems, setSavedForLaterItems] = useState<CartItem[]>(mockSavedForLaterItems);
  const [inventory, setInventory] = useState<Record<number, number>>(productInventory);
  const [userId] = useState("user-123");

  // Add animation classes when component mounts
  useEffect(() => {
    document.querySelectorAll('.cart-section').forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
    });
  }, []);

  const handleAddToCart = (productId: number, price: number) => {
    // Check if product is in stock
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
      // If item already exists in cart, increment quantity if inventory allows
      if (cartItems[existingItemIndex].quantity < inventory[productId]) {
        const updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        setCartItems(updatedItems);
        
        // Update inventory
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
      // Otherwise add new item
      const newItem: CartItem = {
        id: Date.now(),
        productId,
        quantity: 1,
        price
      };
      setCartItems([...cartItems, newItem]);
      
      // Update inventory
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
    
    // Calculate available inventory (current inventory + what's already in cart)
    const availableInventory = inventory[Number(productId)] + currentQuantity;
    
    if (quantity > availableInventory) {
      toast({
        title: "Inventory Limit Reached",
        description: `Sorry, we only have ${availableInventory} of this item in stock.`,
        variant: "destructive",
      });
      return;
    }
    
    // Update cart item quantity
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    
    // Update inventory based on quantity change
    const updatedInventory = { ...inventory };
    updatedInventory[Number(productId)] = availableInventory - quantity;
    setInventory(updatedInventory);
  };

  const handleRemoveItem = (id: string | number) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    if (itemToRemove) {
      // Return items to inventory
      const updatedInventory = { ...inventory };
      updatedInventory[Number(itemToRemove.productId)] += itemToRemove.quantity;
      setInventory(updatedInventory);
      
      // Remove from cart
      setCartItems(cartItems.filter(item => item.id !== id));
      
      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
      });
    }
  };

  const handleSaveCart = () => {
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

  const handleLoadCart = (cartId: string) => {
    const cartToLoad = savedCarts.find(cart => cart.id === cartId);
    
    if (cartToLoad) {
      // Check if there's enough inventory for all items in the saved cart
      const tempInventory = { ...inventory };
      let insufficientInventory = false;
      
      // First, return current cart items to inventory
      cartItems.forEach(item => {
        tempInventory[Number(item.productId)] += item.quantity;
      });
      
      // Then check if we can load the saved cart
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
      
      // If we have enough inventory, update the cart and inventory
      setCartItems([...cartToLoad.items]);
      setInventory(tempInventory);
      
      toast({
        title: "Cart Loaded",
        description: "The saved cart has been loaded successfully.",
      });
    }
  };

  const handleDeleteCart = (cartId: string) => {
    setSavedCarts(savedCarts.filter(cart => cart.id !== cartId));
    
    toast({
      title: "Cart Deleted",
      description: "The saved cart has been deleted.",
    });
  };

  const handleSaveForLater = (id: string | number) => {
    const itemToSave = cartItems.find(item => item.id === id);
    
    if (itemToSave) {
      // Add to saved items
      setSavedForLaterItems([...savedForLaterItems, itemToSave]);
      
      // Remove from cart and return items to inventory
      handleRemoveItem(id);
      
      toast({
        title: "Item Saved",
        description: "Item has been saved for later.",
      });
    }
  };

  const handleMoveToCart = (id: string | number) => {
    const itemToMove = savedForLaterItems.find(item => item.id === id);
    
    if (itemToMove) {
      // Check inventory availability
      const productId = Number(itemToMove.productId);
      
      // Check if the product already exists in the cart
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
      
      // Update inventory
      const updatedInventory = { ...inventory };
      updatedInventory[productId] -= itemToMove.quantity;
      setInventory(updatedInventory);
      
      if (existingItemIndex !== -1) {
        // If the product already exists, increment quantity
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += itemToMove.quantity;
        setCartItems(updatedCartItems);
      } else {
        // If not, add as a new item
        setCartItems([...cartItems, itemToMove]);
      }
      
      // Remove from saved for later
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground animate-fade-in">
            Shopping Cart with tRPC and NATS
          </h1>
          <div className="h-1 w-24 bg-primary rounded animate-pulse-subtle"></div>
        </header>
        
        <div className="cart-section mb-6">
          <UserProfile userId={userId} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-6">
            <div className="cart-section">
              <ProductInventory onAddToCart={handleAddToCart} />
            </div>
            
            <div className="cart-section">
              <SavedCarts 
                savedCarts={savedCarts}
                onLoadCart={handleLoadCart}
                onDeleteCart={handleDeleteCart}
              />
            </div>
          </div>
          
          <div className="md:col-span-5 space-y-4">
            <div className="cart-section">
              <Cart 
                items={cartItems}
                onSaveCart={handleSaveCart}
                onRemoveItem={handleRemoveItem}
                onUpdateQuantity={handleUpdateQuantity}
                onSaveForLater={handleSaveForLater}
              />
            </div>
            
            <div className="cart-section">
              <SavedForLater
                items={savedForLaterItems}
                onMoveToCart={handleMoveToCart}
                onRemoveItem={handleRemoveSavedItem}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
