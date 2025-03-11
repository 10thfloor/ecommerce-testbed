
import { CartItem } from '@/utils/cartUtils';

// Utility functions for comparing carts
export const useCartComparison = () => {
  // Determine if cart contents are identical
  const areCartsIdentical = (cart1: CartItem[], cart2: CartItem[]): boolean => {
    if (cart1.length !== cart2.length) return false;
    
    // Create maps of productId -> quantity for both carts
    const getCartMap = (cart: CartItem[]) => {
      const map = new Map<number | string, number>();
      cart.forEach(item => {
        map.set(item.productId, (map.get(item.productId) || 0) + item.quantity);
      });
      return map;
    };
    
    const cart1Map = getCartMap(cart1);
    const cart2Map = getCartMap(cart2);
    
    // Check if each product has the same quantity in both carts
    if (cart1Map.size !== cart2Map.size) return false;
    
    for (const [productId, quantity] of cart1Map.entries()) {
      if (cart2Map.get(productId) !== quantity) return false;
    }
    
    return true;
  };

  return { areCartsIdentical };
};
