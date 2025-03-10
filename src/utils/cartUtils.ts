
export interface CartItem {
  id: string | number;
  productId: string | number;
  quantity: number;
  price: number;
}

export interface SavedCart {
  id: string;
  date: string;
  items: CartItem[];
}

// Mock data for the shopping cart
export const mockCartItems: CartItem[] = [
  { id: 1, productId: 4, quantity: 1, price: 10.00 }
];

export const mockSavedCarts: SavedCart[] = [
  {
    id: "d0b4f43b34bdc5c2",
    date: "3/8/2025 at 3:50:00 PM",
    items: [{ id: 1, productId: 4, quantity: 1, price: 10.00 }]
  }
];

// Mock data for saved for later items
export const mockSavedForLaterItems: CartItem[] = [];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const getCartItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

export const generateCartId = (): string => {
  return Math.random().toString(16).slice(2, 18);
};
