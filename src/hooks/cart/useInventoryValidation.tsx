
import { CartItem } from '@/utils/cartUtils';
import { useToast } from "@/hooks/use-toast";

interface UseInventoryValidationProps {
  inventory: Record<number, number>;
}

export const useInventoryValidation = ({ inventory }: UseInventoryValidationProps) => {
  const { toast } = useToast();

  const validateInventoryForCart = (
    currentItems: CartItem[],
    itemsToAdd: CartItem[]
  ): { isValid: boolean; tempInventory: Record<number, number> } => {
    const tempInventory = { ...inventory };
    let insufficientInventory = false;
    
    // First restore inventory from current items
    currentItems.forEach(item => {
      tempInventory[Number(item.productId)] += item.quantity;
    });
    
    // Then check if we have enough inventory for new items
    itemsToAdd.forEach(item => {
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
    }
    
    return {
      isValid: !insufficientInventory,
      tempInventory
    };
  };

  return { validateInventoryForCart };
};

