
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/components/product/types';
import { useToast } from '@/hooks/use-toast';

interface StockWatchItem {
  product_id: number;
  notifications_enabled: boolean;
}

interface UseStockWatchSyncProps {
  userId: string | undefined;
  stockWatchItems: Product[];
  isInitialLoad: boolean;
  isSyncing: boolean;
  setStockWatchItems: (items: Product[]) => void;
  setEmailNotifications?: (enabled: boolean) => void;
}

export const useStockWatchSync = ({
  userId,
  stockWatchItems,
  isInitialLoad,
  isSyncing,
  setStockWatchItems,
  setEmailNotifications
}: UseStockWatchSyncProps) => {
  const { toast } = useToast();
  
  // Load stock watch items from Supabase
  const loadStockWatchItems = async (userId: string) => {
    try {
      const { data: stockWatchData, error: stockWatchError } = await supabase
        .from('stock_watch')
        .select('*')
        .eq('user_id', userId);
      
      if (stockWatchError) throw stockWatchError;
      
      // Set global email notification state based on the first item's setting (all items have the same setting)
      if (stockWatchData && stockWatchData.length > 0 && setEmailNotifications) {
        setEmailNotifications(stockWatchData[0].notifications_enabled);
      }
      
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
      
      return true;
    } catch (error: any) {
      console.error('Error loading stock watch items:', error);
      toast({
        title: "Sync Error",
        description: "Failed to load watched items from the server. " + error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Save stock watch items to Supabase with notification preferences
  const saveStockWatchItems = async (userId: string, stockWatchItems: Product[], notificationsEnabled: boolean = true) => {
    try {
      // First delete all existing stock watch items
      const { error: deleteError } = await supabase
        .from('stock_watch')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) throw deleteError;
      
      // Then insert new stock watch items
      if (stockWatchItems.length > 0) {
        const stockWatchToInsert = stockWatchItems.map(item => ({
          user_id: userId,
          product_id: item.id,
          notifications_enabled: notificationsEnabled
        }));
        
        const { error: insertError } = await supabase
          .from('stock_watch')
          .insert(stockWatchToInsert);
        
        if (insertError) throw insertError;
      }
      return true;
    } catch (error: any) {
      console.error('Error saving stock watch items:', error);
      toast({
        title: "Sync Error",
        description: "Failed to save watched items to the server. " + error.message,
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Update notification preferences
  const updateNotificationPreferences = async (userId: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('stock_watch')
        .update({ notifications_enabled: enabled })
        .eq('user_id', userId);
      
      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Error updating notification preferences:', error);
      toast({
        title: "Update Error",
        description: "Failed to update notification preferences. " + error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Sync stock watch items when they change
  useEffect(() => {
    if (!userId || isInitialLoad || isSyncing) return;
    
    const syncStockWatchItems = async () => {
      // Get current notification preferences before saving
      const { data } = await supabase
        .from('stock_watch')
        .select('notifications_enabled')
        .eq('user_id', userId)
        .limit(1);
      
      const notificationsEnabled = data && data.length > 0 ? data[0].notifications_enabled : true;
      
      await saveStockWatchItems(userId, stockWatchItems, notificationsEnabled);
    };
    
    syncStockWatchItems();
  }, [stockWatchItems, userId, isInitialLoad, isSyncing]);

  return {
    loadStockWatchItems,
    updateNotificationPreferences
  };
};
