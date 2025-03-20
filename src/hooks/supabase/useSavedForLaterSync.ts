
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/utils/cartUtils';
import { useToast } from '@/hooks/use-toast';

interface UseSavedForLaterSyncProps {
  userId: string | undefined;
  savedForLaterItems: CartItem[];
  isInitialLoad: boolean;
  isSyncing: boolean;
  setSavedForLaterItems: (items: CartItem[]) => void;
}

export const useSavedForLaterSync = ({
  userId,
  savedForLaterItems,
  isInitialLoad,
  isSyncing,
  setSavedForLaterItems
}: UseSavedForLaterSyncProps) => {
  const { toast } = useToast();
  
  // Load saved for later items from Supabase
  const loadSavedForLaterItems = async (userId: string) => {
    try {
      const { data: savedForLaterData, error: savedForLaterError } = await supabase
        .from('saved_for_later')
        .select('*')
        .eq('user_id', userId);
      
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
      
      return true;
    } catch (error: any) {
      console.error('Error loading saved for later items:', error);
      toast({
        title: "Sync Error",
        description: "Failed to load saved items from the server. " + error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  // Save saved for later items to Supabase
  const saveSavedForLaterItems = async (userId: string, savedForLaterItems: CartItem[]) => {
    try {
      // First delete all existing saved for later items
      await supabase
        .from('saved_for_later')
        .delete()
        .eq('user_id', userId);
      
      // Then insert new saved for later items
      if (savedForLaterItems.length > 0) {
        const savedForLaterToInsert = savedForLaterItems.map(item => ({
          user_id: userId,
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
      return true;
    } catch (error) {
      console.error('Error saving saved for later items:', error);
      return false;
    }
  };

  // Sync saved for later items when they change
  useEffect(() => {
    if (!userId || isInitialLoad || isSyncing) return;
    saveSavedForLaterItems(userId, savedForLaterItems);
  }, [savedForLaterItems, userId, isInitialLoad, isSyncing]);

  return {
    loadSavedForLaterItems
  };
};
