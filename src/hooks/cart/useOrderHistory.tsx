
import { useState } from 'react';
import { Order, CartItem, generateOrderId, formatCurrentDate } from '@/utils/cartUtils';

interface UseOrderHistoryProps {
  clearCart: () => void;
}

export const useOrderHistory = ({
  clearCart
}: UseOrderHistoryProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (items: CartItem[], total: number) => {
    if (items.length === 0) return;
    
    const newOrder: Order = {
      id: generateOrderId(),
      date: formatCurrentDate(),
      items,
      total
    };
    
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
  };

  return {
    orders,
    setOrders,
    addOrder
  };
};
