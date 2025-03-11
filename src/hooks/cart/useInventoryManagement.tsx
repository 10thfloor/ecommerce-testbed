import { useState } from 'react';
import { Product } from '@/components/product/types';

interface UseInventoryManagementProps {
  initialInventory: Record<number, number>;
  updateStockWatchInventory: (newInventory: Record<number, number>) => void;
}

export const useInventoryManagement = ({
  initialInventory,
  updateStockWatchInventory
}: UseInventoryManagementProps) => {
  const [inventory, setInventory] = useState<Record<number, number>>(initialInventory);

  const updateInventory = (newInventory: Record<number, number>) => {
    setInventory(newInventory);
    updateStockWatchInventory(newInventory);
  };

  const simulateInventoryChange = (productId: number, newQuantity: number) => {
    const updatedInventory = {...inventory};
    updatedInventory[productId] = newQuantity;
    updateInventory(updatedInventory);
  };

  return {
    inventory,
    setInventory,
    updateInventory,
    simulateInventoryChange
  };
};
