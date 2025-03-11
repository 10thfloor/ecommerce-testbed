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

  const handleSaveProductForLater = (product: Product) => {
    const newSavedItem: CartItem = {
      id: Date.now() + Math.random(),
      productId: product.id,
      quantity: 1,
      price: product.price
    };
    
    const existingItem = savedForLaterItems.find(item => 
      Number(item.productId) === product.id
    );
    
    if (existingItem) {
      return;
    }
    
    setSavedForLaterItems([...savedForLaterItems, newSavedItem]);
  };

  const handleWatchProductId = (productId: number) => {
    const isAlreadyWatching = stockWatchItems.some(item => item.id === productId);
    
    if (isAlreadyWatching) {
      handleRemoveFromWatch(productId);
      return;
    }
    
    const isOutOfStock = inventory[productId] === 0;
    
    if (!isOutOfStock) {
      return;
    }
    
    const productName = `Product #${productId}`;
    const newWatchItem: Product = {
      id: productId,
      name: productName,
      price: 0,
      inventory: 0,
      description: "Out of stock product",
      image: "/placeholder.svg",
      sizes: []
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
