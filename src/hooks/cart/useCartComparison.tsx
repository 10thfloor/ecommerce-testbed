
import { CartItem } from '@/utils/cartUtils';

export const useCartComparison = () => {
  const areCartsIdentical = (cart1: CartItem[], cart2: CartItem[]): boolean => {
    if (cart1.length !== cart2.length) return false;
    
    const getCartMap = (cart: CartItem[]) => {
      const map = new Map<number | string, number>();
      cart.forEach(item => {
        map.set(item.productId, (map.get(item.productId) || 0) + item.quantity);
      });
      return map;
    };
    
    const cart1Map = getCartMap(cart1);
    const cart2Map = getCartMap(cart2);
    
    if (cart1Map.size !== cart2Map.size) return false;
    
    for (const [productId, quantity] of cart1Map.entries()) {
      if (cart2Map.get(productId) !== quantity) return false;
    }
    
    return true;
  };

  return { areCartsIdentical };
};

