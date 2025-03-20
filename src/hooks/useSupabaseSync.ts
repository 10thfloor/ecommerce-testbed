
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem, SavedCart } from '@/utils/cartUtils';
import { Product } from '@/components/product/types';
import { useToast } from '@/hooks/use-toast';

interface UseSupabaseSyncProps {
  cartItems: CartItem[];
  savedCarts: SavedCart[];
  savedForLaterItems: CartItem[];
  stockWatchItems: Product[];
  setCartItems: (items: CartItem[]) => void;
  setSavedCarts: (carts: SavedCart[]) => void;
  setSavedForLaterItems: (items: CartItem[]) => void;
  setStockWatchItems: (items: Product[]) => void;
}

export const useSupabaseSync = ({
  cartItems,
  savedCarts,
  savedForLaterItems,
  stockWatchItems,
  setCartItems,
  setSavedCarts,
  setSavedForLaterItems,
  setStockWatchItems
}: UseSupabaseSyncProps) => {
  const { user } = useAuth();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  
  // Load user data from Supabase when user logs in
  useEffect(() => {
    if (!user) return;
    
    const loadUserData = async () => {
      try {
        setIsSyncing(true);
        
        // Load cart items
        const { data: cartData, error: cartError } = await supabase
          .from('cart_items')
          .select('*')
          .eq('user_id', user.id);
        
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
        
        // Load saved for later items
        const { data: savedForLaterData, error: savedForLaterError } = await supabase
          .from('saved_for_later')
          .select('*')
          .eq('user_id', user.id);
        
        if (savedForLaterError) throw savedForLaterError;
        
        if (savedForLaterData && savedForLaterData.length > 0) {
          const formattedSavedForLaterItems: CartItem[] = savedForLaterData.map(item => ({
            id: item.id,
            productId: item.product_id,
            quantity: item.quantity,
            price: item.price,
            size: item.size
          }));
          
          setSavedForLaterItems(formattedSavedForLaterItems);
        }
        
        // Load stock watch items
        const { data: stockWatchData, error: stockWatchError } = await supabase
          .from('stock_watch')
          .select('*')
          .eq('user_id', user.id);
        
        if (stockWatchError) throw stockWatchError;
        
        // We need to convert stock watch data to Product objects using the product IDs
        if (stockWatchData && stockWatchData.length > 0) {
          const productIds = stockWatchData.map(item => item.product_id);
          
          // Fetch the actual product data for these IDs
          const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select(`
              *,
              product_sizes(*)
            `)
            .in('id', productIds);
          
          if (productsError) throw productsError;
          
          if (productsData && productsData.length > 0) {
            const watchedProducts = productsData.map(product => {
              return {
                id: product.id,
                name: product.name,
                price: product.price,
                description: {
                  en: product.description_en,
                  fr: product.description_fr,
                  ja: product.description_ja
                },
                image: product.image,
                inventory: product.inventory,
                sizes: product.product_sizes.map((size: any) => ({
                  name: size.name as any,
                  inventory: size.inventory
                })),
                categoryId: product.category_id,
                collectionId: product.collection_id,
                isLimitedEdition: product.is_limited_edition
              } as Product;
            });
            
            setStockWatchItems(watchedProducts);
          }
        }
        
        // Load saved carts and their items
        const { data: savedCartsData, error: savedCartsError } = await supabase
          .from('saved_carts')
          .select('*')
          .eq('user_id', user.id);
        
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
  
  // Save cart items to Supabase when they change (but not on initial load)
  useEffect(() => {
    if (!user || isInitialLoad || isSyncing) return;
    
    const saveCartItems = async () => {
      try {
        // First delete all existing cart items
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
        
        // Then insert new cart items
        if (cartItems.length > 0) {
          const cartItemsToInsert = cartItems.map(item => ({
            user_id: user.id,
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
      } catch (error) {
        console.error('Error saving cart items:', error);
      }
    };
    
    saveCartItems();
  }, [cartItems, user, isInitialLoad, isSyncing]);
  
  // Save saved for later items when they change
  useEffect(() => {
    if (!user || isInitialLoad || isSyncing) return;
    
    const saveSavedForLaterItems = async () => {
      try {
        // First delete all existing saved for later items
        await supabase
          .from('saved_for_later')
          .delete()
          .eq('user_id', user.id);
        
        // Then insert new saved for later items
        if (savedForLaterItems.length > 0) {
          const savedForLaterToInsert = savedForLaterItems.map(item => ({
            user_id: user.id,
            product_id: Number(item.productId),
            quantity: item.quantity,
            price: item.price,
            size: item.size
          }));
          
          const { error } = await supabase
            .from('saved_for_later')
            .insert(savedForLaterToInsert);
          
          if (error) throw error;
        }
      } catch (error) {
        console.error('Error saving saved for later items:', error);
      }
    };
    
    saveSavedForLaterItems();
  }, [savedForLaterItems, user, isInitialLoad, isSyncing]);
  
  // Save stock watch items when they change
  useEffect(() => {
    if (!user || isInitialLoad || isSyncing) return;
    
    const saveStockWatchItems = async () => {
      try {
        // First delete all existing stock watch items
        await supabase
          .from('stock_watch')
          .delete()
          .eq('user_id', user.id);
        
        // Then insert new stock watch items
        if (stockWatchItems.length > 0) {
          const stockWatchToInsert = stockWatchItems.map(item => ({
            user_id: user.id,
            product_id: item.id
          }));
          
          const { error } = await supabase
            .from('stock_watch')
            .insert(stockWatchToInsert);
          
          if (error) throw error;
        }
      } catch (error) {
        console.error('Error saving stock watch items:', error);
      }
    };
    
    saveStockWatchItems();
  }, [stockWatchItems, user, isInitialLoad, isSyncing]);
  
  // Save saved carts when they change
  useEffect(() => {
    if (!user || isInitialLoad || isSyncing) return;
    
    const saveSavedCarts = async () => {
      try {
        // Get existing saved carts to compare
        const { data: existingSavedCarts, error: fetchError } = await supabase
          .from('saved_carts')
          .select('id, cart_id')
          .eq('user_id', user.id);
        
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
                user_id: user.id,
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
      } catch (error) {
        console.error('Error saving saved carts:', error);
      }
    };
    
    saveSavedCarts();
  }, [savedCarts, user, isInitialLoad, isSyncing]);
  
  return {
    isSyncing
  };
};
