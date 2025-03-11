
import { useToast } from "@/hooks/use-toast";
import { CartItem } from '@/utils/cartUtils';
import { useCartComparison } from './useCartComparison';

interface UseCartLoadingProps {
  cartItems: CartItem[];
  inventory: Record<number, number>;
  savedCarts: { id: string; items: CartItem[] }[];
  lastLoadedCartId: string | null;
  saveToHistory: (items: CartItem[], inventory: Record<number, number>) => void;
  setCartItemsAndInventory: (items: CartItem[], inventory: Record<number, number>) => void;
  setLastLoadedCartId: (id: string | null) => void;
  undoCartLoad: () => { prevCart: CartItem[]; prevInventory: Record<number, number> } | null;
  hasHistory: boolean;
}

export const useCartLoading = ({
  cartItems,
  inventory,
  savedCarts,
  lastLoadedCartId,
  saveToHistory,
  setCartItemsAndInventory,
  setLastLoadedCartId,
  undoCartLoad,
  hasHistory
}: UseCartLoadingProps) => {
  const { toast } = useToast();
  const { areCartsIdentical } = useCartComparison();

  const handleLoadCart = (cartId: string) => {
    const cartToLoad = savedCarts.find(cart => cart.id === cartId);
    
    if (cartToLoad) {
      // Check if we're loading the same cart with identical contents
      const isSameCart = cartId === lastLoadedCartId;
      const isIdenticalContent = areCartsIdentical(cartItems, cartToLoad.items);
      
      if (isSameCart && isIdenticalContent) {
        toast({
          title: "Cart Already Loaded",
          description: "This cart is already loaded and has not changed.",
        });
        return;
      }
      
      // Save current cart to history before replacing it if current cart is not empty
      if (cartItems.length > 0) {
        saveToHistory([...cartItems], {...inventory});
      }
      
      const tempInventory = { ...inventory };
      let insufficientInventory = false;
      
      // Return current cart items to inventory
      cartItems.forEach(item => {
        tempInventory[Number(item.productId)] += item.quantity;
      });
      
      // Check if all items in the saved cart are available
      cartToLoad.items.forEach(item => {
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
        return;
      }
      
      setCartItemsAndInventory([...cartToLoad.items], tempInventory);
      setLastLoadedCartId(cartId);
      
      toast({
        title: "Cart Loaded",
        description: "The saved cart has been loaded successfully.",
        action: hasHistory ? (
          <button 
            onClick={undoCartLoad}
            className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs"
          >
            Undo
          </button>
        ) : undefined
      });
    }
  };

  const handleEmailCurrentCart = (cartItems: CartItem[], formatCurrency: (amount: number) => string, calculateTotal: (items: CartItem[]) => number) => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "There are no items in your cart to email.",
        variant: "destructive",
      });
      return;
    }
    
    const cartItemsText = cartItems.map(item => {
      const productName = `Product #${item.productId}`;
      return `${productName} - Qty: ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`;
    }).join('%0D%0A');
    
    const emailSubject = `My Shopping Cart`;
    const emailBody = `My Current Cart Items:%0D%0A%0D%0A${cartItemsText}%0D%0A%0D%0ATotal: ${formatCurrency(calculateTotal(cartItems))}`;
    
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    
    toast({
      title: "Email Prepared",
      description: "Your email client should open with your cart details.",
    });
  };

  return { handleLoadCart, handleEmailCurrentCart };
};
