
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
  { id: 1, productId: 1, quantity: 1, price: 799.99 }
];

export const mockSavedCarts: SavedCart[] = [
  {
    id: "d0b4f43b34bdc5c2",
    date: "3/8/2025 at 3:50:00 PM",
    items: [{ id: 1, productId: 1, quantity: 1, price: 799.99 }]
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

// List of adjectives and nouns for mnemonic cart names
const adjectives = [
  "Happy", "Bright", "Swift", "Clever", "Gentle", "Bold", "Calm", "Brave", 
  "Eager", "Kind", "Proud", "Wise", "Loyal", "Noble", "Quiet", "Smart"
];

const nouns = [
  "Tiger", "Eagle", "Panda", "Dolphin", "Wolf", "Lion", "Falcon", "Bear", 
  "Hawk", "Whale", "Fox", "Deer", "Owl", "Rabbit", "Turtle", "Horse"
];

// Generate a consistent mnemonic name from a cart id
export const getCartMnemonic = (cartId: string): string => {
  // Use the first 8 chars of the id to create a stable hash
  const idFragment = cartId.substring(0, 8);
  
  // Convert to numbers we can use as indices
  let adjIndex = 0;
  let nounIndex = 0;
  
  // Simple hashing algorithm to get consistent indices
  for (let i = 0; i < 4; i++) {
    adjIndex += idFragment.charCodeAt(i);
  }
  
  for (let i = 4; i < 8; i++) {
    nounIndex += idFragment.charCodeAt(i);
  }
  
  // Get adjective and noun using modulo to stay within array bounds
  const adjective = adjectives[adjIndex % adjectives.length];
  const noun = nouns[nounIndex % nouns.length];
  
  return `${adjective} ${noun}`;
};
