
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/utils/cartUtils';
import { useToast } from '@/hooks/use-toast';

interface UseCartItemsSyncProps {
  userId: string | undefined;
  cartItems: CartItem[];
  isInitialLoad: boolean;
  isSyncing: boolean;
  setCartItems: (items: CartItem[]) => void;
}

export const useCartItemsSync = ({
  userId,
  cartItems,
  isInitialLoad,
  isSyncing,
  setCartItems
}: UseCartItemsSyncProps) => {
  const { toast } = useToast();
  
  // Load cart items from Supabase
  const loadCartItems = async (userId: string) => {
    try {
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);
      
      if (cartError) throw cartError;
      
      if (cartData && cartData.length > 0) {
        const formattedCartItems: CartItem[] = cartData.map(item => ({
          id: item.id,
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price,
          size: item.size
        }));
        
        setCartItems(formattedCartItems);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error loading cart items:', error);
      toast({
        title: "Sync Error",
        description: "Failed to load cart items from the server. " + error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Save cart items to Supabase
  const saveCartItems = async (userId: string, cartItems: CartItem[]) => {
    try {
      // First delete all existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      
      // Then insert new cart items
      if (cartItems.length > 0) {
        const cartItemsToInsert = cartItems.map(item => ({
          user_id: userId,
          product_id: Number(item.productId),
          quantity: item.quantity,
          price: item.price,
          size: item.size
        }));
        
        const { error } = await supabase
          .from('cart_items')
          .insert(cartItemsToInsert);
        
        if (error) throw error;
      }
      return true;
    } catch (error) {
      console.error('Error saving cart items:', error);
      return false;
    }
  };

  // Sync cart items when they change
  useEffect(() => {
    if (!userId || isInitialLoad || isSyncing) return;
    saveCartItems(userId, cartItems);
  }, [cartItems, userId, isInitialLoad, isSyncing]);

  return {
    loadCartItems
  };
};
