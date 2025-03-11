
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { CartItem } from '@/utils/cartUtils';

interface UseSavedForLaterProps {
  initialSavedForLaterItems: CartItem[];
}

export const useSavedForLater = ({ initialSavedForLaterItems }: UseSavedForLaterProps) => {
  const { toast } = useToast();
  const [savedForLaterItems, setSavedForLaterItems] = useState<CartItem[]>(initialSavedForLaterItems);

  const handleSaveForLater = (cartItems: CartItem[], id: string | number, onRemoveItem: (id: string | number) => void) => {
    const itemToSave = cartItems.find(item => item.id === id);
    
    if (itemToSave) {
      setSavedForLaterItems(prev => [...prev, itemToSave]);
      
      onRemoveItem(id);
      
      toast({
        title: "Item Saved",
        description: "Item has been saved for later.",
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

  return {
    savedForLaterItems,
    handleSaveForLater,
    handleRemoveSavedItem
  };
};
