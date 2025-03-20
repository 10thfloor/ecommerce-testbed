
import { useState } from 'react';
import { CartItem, SavedCart, Order } from '@/utils/cartUtils';
import { Product } from '@/components/product/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCartItemsSync } from './supabase/useCartItemsSync';
import { useSavedForLaterSync } from './supabase/useSavedForLaterSync';
import { useStockWatchSync } from './supabase/useStockWatchSync';
import { useSavedCartsSync } from './supabase/useSavedCartsSync';
import { useOrdersSync } from './supabase/useOrdersSync';
import { useEffect } from 'react';

interface UseSupabaseSyncProps {
  cartItems: CartItem[];
  savedCarts: SavedCart[];
  savedForLaterItems: CartItem[];
  stockWatchItems: Product[];
  orders: Order[];
  setCartItems: (items: CartItem[]) => void;
  setSavedCarts: (carts: SavedCart[]) => void;
  setSavedForLaterItems: (items: CartItem[]) => void;
  setStockWatchItems: (items: Product[]) => void;
  setOrders: (orders: Order[]) => void;
}

export const useSupabaseSync = ({
  cartItems,
  savedCarts,
  savedForLaterItems,
  stockWatchItems,
  orders,
  setCartItems,
  setSavedCarts,
  setSavedForLaterItems,
  setStockWatchItems,
  setOrders
}: UseSupabaseSyncProps) => {
  const { user } = useAuth();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  
  // Initialize the individual sync hooks
  const cartItemsSync = useCartItemsSync({
    userId: user?.id,
    cartItems,
    isInitialLoad,
    isSyncing,
    setCartItems
  });
  
  const savedForLaterSync = useSavedForLaterSync({
    userId: user?.id,
    savedForLaterItems,
    isInitialLoad,
    isSyncing,
    setSavedForLaterItems
  });
  
  const stockWatchSync = useStockWatchSync({
    userId: user?.id,
    stockWatchItems,
    isInitialLoad,
    isSyncing,
    setStockWatchItems
  });
  
  const savedCartsSync = useSavedCartsSync({
    userId: user?.id,
    savedCarts,
    isInitialLoad,
    isSyncing,
    setSavedCarts
  });
  
  const ordersSync = useOrdersSync({
    orders,
    setOrders
  });
  
  // Load user data from Supabase when user logs in
  useEffect(() => {
    if (!user) return;
    
    const loadUserData = async () => {
      try {
        setIsSyncing(true);
        
        // Load all data types in parallel
        await Promise.all([
          cartItemsSync.loadCartItems(user.id),
          savedForLaterSync.loadSavedForLaterItems(user.id),
          stockWatchSync.loadStockWatchItems(user.id),
          savedCartsSync.loadSavedCarts(user.id),
          // Orders sync would be here
        ]);
        
        setIsInitialLoad(false);
      } catch (error: any) {
        console.error('Error loading user data:', error);
        toast({
          title: "Sync Error",
          description: "Failed to load your data from the server. " + error.message,
          variant: "destructive",
        });
      } finally {
        setIsSyncing(false);
      }
    };
    
    loadUserData();
  }, [user]);
  
  return {
    isSyncing
  };
};
