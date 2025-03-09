
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import UserProfile from '@/components/UserProfile';
import Cart from '@/components/Cart';
import SavedCarts from '@/components/SavedCarts';
import AddItemForm from '@/components/AddItemForm';
import { 
  CartItem,
  SavedCart,
  mockCartItems,
  mockSavedCarts,
  generateCartId
} from '@/utils/cartUtils';

const Index = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>(mockSavedCarts);
  const [userId] = useState("user-123");

  // Add animation classes when component mounts
  useEffect(() => {
    document.querySelectorAll('.cart-section').forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
    });
  }, []);

  const handleAddItem = (productId: string | number, quantity: number, price: number) => {
    const newItem: CartItem = {
      id: Date.now(),
      productId,
      quantity,
      price
    };
    
    setCartItems([...cartItems, newItem]);
    
    toast({
      title: "Item Added",
      description: `Added ${quantity} of product #${productId} to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string | number, quantity: number) => {
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string | number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    });
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
      setCartItems([...cartToLoad.items]);
      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground animate-fade-in">
            Shopping Cart with tRPC and NATS
          </h1>
          <div className="h-1 w-24 bg-primary rounded animate-pulse-subtle"></div>
        </header>
        
        <div className="space-y-6">
          <div className="cart-section">
            <UserProfile userId={userId} />
          </div>
          
          <div className="cart-section">
            <SavedCarts 
              savedCarts={savedCarts}
              onLoadCart={handleLoadCart}
              onDeleteCart={handleDeleteCart}
            />
          </div>
          
          <div className="cart-section">
            <Cart 
              items={cartItems}
              onSaveCart={handleSaveCart}
              onRemoveItem={handleRemoveItem}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
          
          <div className="cart-section">
            <AddItemForm onAddItem={handleAddItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
