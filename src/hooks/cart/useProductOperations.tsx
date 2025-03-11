
import { Product } from '@/components/product/types';
import { CartItem } from '@/utils/cartUtils';
import { useToast } from "@/hooks/use-toast";

interface UseProductOperationsProps {
  savedForLaterItems: CartItem[];
  stockWatchItems: Product[];
  inventory: Record<number, number>;
  setSavedForLaterItems: (items: CartItem[]) => void;
  handleWatchItem: (product: Product) => void;
  handleRemoveFromWatch: (productId: number) => void;
}

export const useProductOperations = ({
  savedForLaterItems,
  stockWatchItems,
  inventory,
  setSavedForLaterItems,
  handleWatchItem,
  handleRemoveFromWatch
}: UseProductOperationsProps) => {
  const { toast } = useToast();

  // Handle saving products directly from inventory
  const handleSaveProductForLater = (product: Product) => {
    const newSavedItem: CartItem = {
      id: Date.now() + Math.random(),
      productId: product.id,
      quantity: 1,
      price: product.price
    };
    
    // Check if this product is already in saved for later
    const existingItem = savedForLaterItems.find(item => 
      Number(item.productId) === product.id
    );
    
    if (existingItem) {
      return; // Item already saved
    }
    
    setSavedForLaterItems([...savedForLaterItems, newSavedItem]);
  };

  // Coordinate handleWatchProductId to access cart items and saved for later items for price
  const handleWatchProductId = (productId: number) => {
    const isAlreadyWatching = stockWatchItems.some(item => item.id === productId);
    
    if (isAlreadyWatching) {
      handleRemoveFromWatch(productId);
      return;
    }
    
    const isOutOfStock = inventory[productId] === 0;
    
    if (!isOutOfStock) {
      return; // The toast is already shown in the stock watch hook
    }
    
    const productName = `Product #${productId}`;
    const newWatchItem: Product = {
      id: productId,
      name: productName,
      price: 0,
      inventory: 0,
      description: "Out of stock product",
      image: "/placeholder.svg"
    };
    
    const savedItem = savedForLaterItems.find(item => Number(item.productId) === productId);
    
    if (savedItem) {
      newWatchItem.price = savedItem.price;
    }
    
    handleWatchItem(newWatchItem);
  };

  return {
    handleSaveProductForLater,
    handleWatchProductId
  };
};
