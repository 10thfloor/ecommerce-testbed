
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SavedCart, CartItem } from '@/utils/cartUtils';
import { useToast } from '@/hooks/use-toast';

interface UseSavedCartsSyncProps {
  userId: string | undefined;
  savedCarts: SavedCart[];
  isInitialLoad: boolean;
  isSyncing: boolean;
  setSavedCarts: (carts: SavedCart[]) => void;
}

export const useSavedCartsSync = ({
  userId,
  savedCarts,
  isInitialLoad,
  isSyncing,
  setSavedCarts
}: UseSavedCartsSyncProps) => {
  const { toast } = useToast();
  
  // Load saved carts from Supabase
  const loadSavedCarts = async (userId: string) => {
    try {
      const { data: savedCartsData, error: savedCartsError } = await supabase
        .from('saved_carts')
        .select('*')
        .eq('user_id', userId);
      
      if (savedCartsError) throw savedCartsError;
      
      if (savedCartsData && savedCartsData.length > 0) {
        const loadedSavedCarts: SavedCart[] = [];
        
        for (const savedCart of savedCartsData) {
          const { data: savedCartItemsData, error: savedCartItemsError } = await supabase
            .from('saved_cart_items')
            .select('*')
            .eq('saved_cart_id', savedCart.id);
          
          if (savedCartItemsError) throw savedCartItemsError;
          
          const cartItems: CartItem[] = savedCartItemsData ? savedCartItemsData.map(item => ({
            id: item.id,
            productId: item.product_id,
            quantity: item.quantity,
            price: item.price,
            size: item.size
          })) : [];
          
          loadedSavedCarts.push({
            id: savedCart.cart_id,
            date: savedCart.date,
            items: cartItems
          });
        }
        
        setSavedCarts(loadedSavedCarts);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error loading saved carts:', error);
      toast({
        title: "Sync Error",
        description: "Failed to load saved carts from the server. " + error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Save saved carts to Supabase
  const saveSavedCarts = async (userId: string, savedCarts: SavedCart[]) => {
    try {
      // Get existing saved carts to compare
      const { data: existingSavedCarts, error: fetchError } = await supabase
        .from('saved_carts')
        .select('id, cart_id')
        .eq('user_id', userId);
      
      if (fetchError) throw fetchError;
      
      // Create a map of cart_id to database id
      const cartIdToDbId = new Map();
      if (existingSavedCarts) {
        existingSavedCarts.forEach(cart => {
          cartIdToDbId.set(cart.cart_id, cart.id);
        });
      }
      
      // Find carts to delete (in database but not in current state)
      const currentCartIds = savedCarts.map(cart => cart.id);
      const cartsToDelete = existingSavedCarts?.filter(
        cart => !currentCartIds.includes(cart.cart_id)
      ) || [];
      
      // Delete carts that are no longer in the state
      for (const cart of cartsToDelete) {
        await supabase
          .from('saved_carts')
          .delete()
          .eq('id', cart.id);
      }
      
      // Update or insert carts
      for (const cart of savedCarts) {
        const dbId = cartIdToDbId.get(cart.id);
        
        if (dbId) {
          // Update existing cart
          await supabase
            .from('saved_carts')
            .update({
              date: cart.date
            })
            .eq('id', dbId);
          
          // Delete existing cart items
          await supabase
            .from('saved_cart_items')
            .delete()
            .eq('saved_cart_id', dbId);
          
          // Insert new cart items
          if (cart.items.length > 0) {
            const cartItemsToInsert = cart.items.map(item => ({
              saved_cart_id: dbId,
              product_id: Number(item.productId),
              quantity: item.quantity,
              price: item.price,
              size: item.size
            }));
            
            await supabase
              .from('saved_cart_items')
              .insert(cartItemsToInsert);
          }
        } else {
          // Insert new cart
          const { data: newCart, error: insertError } = await supabase
            .from('saved_carts')
            .insert({
              user_id: userId,
              cart_id: cart.id,
              date: cart.date
            })
            .select('id')
            .single();
          
          if (insertError) throw insertError;
          
          // Insert cart items
          if (cart.items.length > 0 && newCart) {
            const cartItemsToInsert = cart.items.map(item => ({
              saved_cart_id: newCart.id,
              product_id: Number(item.productId),
              quantity: item.quantity,
              price: item.price,
              size: item.size
            }));
            
            await supabase
              .from('saved_cart_items')
              .insert(cartItemsToInsert);
          }
        }
      }
      return true;
    } catch (error) {
      console.error('Error saving saved carts:', error);
      return false;
    }
  };

  // Sync saved carts when they change
  useEffect(() => {
    if (!userId || isInitialLoad || isSyncing) return;
    saveSavedCarts(userId, savedCarts);
  }, [savedCarts, userId, isInitialLoad, isSyncing]);

  return {
    loadSavedCarts
  };
};
