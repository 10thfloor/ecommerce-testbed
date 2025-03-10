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

const Index = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>(mockSavedCarts);
  const [savedForLaterItems, setSavedForLaterItems] = useState<CartItem[]>(mockSavedForLaterItems);
  const [userId] = useState("user-123");

  useEffect(() => {
    document.querySelectorAll('.cart-section').forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
    });
  }, []);

  const handleAddToCart = (productId: number, price: number) => {
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        productId,
        quantity: 1,
        price
      };
      setCartItems([...cartItems, newItem]);
    }
    
    toast({
      title: "Item Added",
      description: `Added product #${productId} to your cart.`,
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

  const handleSaveForLater = (id: string | number) => {
    const itemToSave = cartItems.find(item => item.id === id);
    
    if (itemToSave) {
      setSavedForLaterItems([...savedForLaterItems, itemToSave]);
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
      setCartItems([...cartItems, itemToMove]);
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
    <div className="min-h-screen px-4 py-8">
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
