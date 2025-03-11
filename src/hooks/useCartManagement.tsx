import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  CartItem,
  SavedCart,
  generateCartId,
  formatCurrency,
  calculateTotal,
  mergeCartItems
} from '@/utils/cartUtils';
import { Product } from '@/components/ProductInventory';

interface UseCartManagementProps {
  initialCartItems: CartItem[];
  initialSavedCarts: SavedCart[];
  initialSavedForLaterItems: CartItem[];
  initialInventory: Record<number, number>;
  initialStockWatchItems?: Product[];
}

export const useCartManagement = ({
  initialCartItems,
  initialSavedCarts,
  initialSavedForLaterItems,
  initialInventory,
  initialStockWatchItems = []
}: UseCartManagementProps) => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>(initialSavedCarts);
  const [savedForLaterItems, setSavedForLaterItems] = useState<CartItem[]>(initialSavedForLaterItems);
  const [inventory, setInventory] = useState<Record<number, number>>(initialInventory);
  const [stockWatchItems, setStockWatchItems] = useState<Product[]>(initialStockWatchItems);
  const [cartHistory, setCartHistory] = useState<CartItem[][]>([]);
  const [inventoryHistory, setInventoryHistory] = useState<Record<number, number>[]>([]);
  const [lastLoadedCartId, setLastLoadedCartId] = useState<string | null>(null);

  const saveToHistory = (items: CartItem[], currentInventory: Record<number, number>) => {
    if (items.length > 0) {
      setCartHistory(prev => [...prev, [...items]]);
      setInventoryHistory(prev => [...prev, {...currentInventory}]);
    }
  };

  const undoCartLoad = () => {
    if (cartHistory.length > 0) {
      const prevCart = cartHistory[cartHistory.length - 1];
      const prevInventory = inventoryHistory[inventoryHistory.length - 1];
      
      setCartItems(prevCart);
      setInventory(prevInventory);
      
      setCartHistory(prev => prev.slice(0, -1));
      setInventoryHistory(prev => prev.slice(0, -1));
      
      toast({
        title: "Cart Restored",
        description: "Your previous cart has been restored.",
      });
    }
  };

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
        action: cartHistory.length > 0 ? (
          <button 
            onClick={undoCartLoad}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs"
          >
            Undo
          </button>
        ) : undefined
      });
    }
  };

  const handleAddCartItems = (cartId: string) => {
    const cartToAddFrom = savedCarts.find(cart => cart.id === cartId);
    
    if (cartToAddFrom) {
      const tempInventory = { ...inventory };
      let insufficientInventory = false;
      
      cartToAddFrom.items.forEach(itemToAdd => {
        const existingItemIndex = cartItems.findIndex(item => item.productId === itemToAdd.productId);
        const existingQuantity = existingItemIndex !== -1 ? cartItems[existingItemIndex].quantity : 0;
        const totalNeeded = existingQuantity + itemToAdd.quantity;
        
        if (tempInventory[Number(itemToAdd.productId)] < itemToAdd.quantity) {
          insufficientInventory = true;
        }
      });
      
      if (insufficientInventory) {
        toast({
          title: "Insufficient Inventory",
          description: "Some items cannot be added due to insufficient inventory.",
          variant: "destructive",
        });
        return;
      }
      
      const updatedInventory = { ...inventory };
      const updatedCartItems = [...cartItems];
      
      cartToAddFrom.items.forEach(itemToAdd => {
        const existingItemIndex = updatedCartItems.findIndex(item => item.productId === itemToAdd.productId);
        
        if (existingItemIndex !== -1) {
          updatedCartItems[existingItemIndex].quantity += itemToAdd.quantity;
        } else {
          updatedCartItems.push({
            ...itemToAdd,
            id: Date.now() + Math.random()
          });
        }
        
        updatedInventory[Number(itemToAdd.productId)] -= itemToAdd.quantity;
      });
      
      setCartItems(updatedCartItems);
      setInventory(updatedInventory);
      
      toast({
        title: "Items Added",
        description: `Items from "${getCartMnemonic(cartId)}" have been added to your cart.`,
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
      const productId = Number(itemToMove.productId);
      
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
      
      const updatedInventory = { ...inventory };
      updatedInventory[productId] -= itemToMove.quantity;
      setInventory(updatedInventory);
      
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex].quantity += itemToMove.quantity;
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, itemToMove]);
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
      const productName = inventory[Number(item.productId)] !== undefined ? 
        `Product #${item.productId}` : `Product #${item.productId}`;
      return `${productName} - Qty: ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`;
    }).join('%0D%0A');
    
    const emailSubject = `My Shopping Cart`;
    const emailBody = `My Current Cart Items:%0D%0A%0D%0A${cartItemsText}%0D%0A%0D%0ATotal: ${formatCurrency(calculateTotal(cartItems))}`;
    
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    
    toast({
      title: "Email Prepared",
      description: "Your email client should open with your cart details.",
    });
  };

  const handleWatchItem = (product: Product) => {
    const isAlreadyWatching = stockWatchItems.some(item => item.id === product.id);
    
    if (isAlreadyWatching) {
      return;
    }
    
    setStockWatchItems([...stockWatchItems, {...product}]);
  };

  const handleRemoveFromWatch = (productId: number) => {
    setStockWatchItems(stockWatchItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from Watch List",
      description: "You will no longer receive notifications for this item.",
    });
  };

  const updateInventory = (newInventory: Record<number, number>) => {
    setInventory(newInventory);
    
    stockWatchItems.forEach(item => {
      if (newInventory[item.id] > 0 && item.inventory === 0) {
        setStockWatchItems(prev => 
          prev.map(watchItem => 
            watchItem.id === item.id 
              ? {...watchItem, inventory: newInventory[item.id]} 
              : watchItem
          )
        );
        
        toast({
          title: "Item Back in Stock!",
          description: `${item.name} is now available to purchase.`,
          variant: "default",
        });
      }
    });
  };

  const simulateInventoryChange = (productId: number, newQuantity: number) => {
    const updatedInventory = {...inventory};
    updatedInventory[productId] = newQuantity;
    updateInventory(updatedInventory);
  };

  return {
    cartItems,
    savedCarts,
    savedForLaterItems,
    stockWatchItems,
    inventory,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveItem,
    handleSaveCart,
    handleLoadCart,
    handleAddCartItems,
    handleDeleteCart,
    handleSaveForLater,
    handleMoveToCart,
    handleRemoveSavedItem,
    handleEmailCurrentCart,
    handleWatchItem,
    handleRemoveFromWatch,
    simulateInventoryChange,
    undoCartLoad,
    hasCartHistory: cartHistory.length > 0
  };
};
