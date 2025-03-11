
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Product } from '@/components/product/types';

interface UseStockWatchProps {
  initialStockWatchItems: Product[];
  inventory: Record<number, number>;
}

export const useStockWatch = ({
  initialStockWatchItems,
  inventory
}: UseStockWatchProps) => {
  const { toast } = useToast();
  const [stockWatchItems, setStockWatchItems] = useState<Product[]>(initialStockWatchItems);

  const handleWatchItem = (product: Product) => {
    const isAlreadyWatching = stockWatchItems.some(item => item.id === product.id);
    
    if (isAlreadyWatching) {
      return;
    }
    
    setStockWatchItems([...stockWatchItems, {...product}]);
  };

  const handleWatchProductId = (productId: number) => {
    const isAlreadyWatching = stockWatchItems.some(item => item.id === productId);
    
    if (isAlreadyWatching) {
      handleRemoveFromWatch(productId);
      return;
    }
    
    const isOutOfStock = inventory[productId] === 0;
    
    if (!isOutOfStock) {
      toast({
        title: "Product In Stock",
        description: "You can only watch out-of-stock products.",
        variant: "destructive",
      });
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
      sizes: [],
      categoryId: 4 // Default to Accessories category
    };
    
    setStockWatchItems([...stockWatchItems, newWatchItem]);
    
    toast({
      title: "Stock Watch Added",
      description: `You'll be notified when ${productName} is back in stock.`
    });
  };

  const handleRemoveFromWatch = (productId: number) => {
    setStockWatchItems(stockWatchItems.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from Watch List",
      description: "You will no longer receive notifications for this item.",
    });
  };

  const updateInventory = (newInventory: Record<number, number>) => {
    stockWatchItems.forEach(item => {
      if (newInventory[item.id] > 0 && item.inventory === 0) {
        setStockWatchItems(prev => 
          prev.map(watchItem => 
            watchItem.id === item.id 
              ? {...watchItem, inventory: newInventory[item.id]} 
              : watchItem
          )
        );
        
        toast({
          title: "Item Back in Stock!",
          description: `${item.name} is now available to purchase.`,
          variant: "default",
        });
      }
    });
  };

  return {
    stockWatchItems,
    handleWatchItem,
    handleWatchProductId,
    handleRemoveFromWatch,
    updateInventory
  };
};
