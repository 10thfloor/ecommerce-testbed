export interface CartItem {
  id: string | number;
  productId: string | number;
  quantity: number;
  price: number;
  size?: string; // Add optional size field
}

export interface SavedCart {
  id: string;
  date: string;
  items: CartItem[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

// Mock data for the shopping cart
export const mockCartItems: CartItem[] = [
  { id: 1, productId: 1, quantity: 1, price: 799.99, size: 'MD' },
  { id: 2, productId: 6, quantity: 2, price: 399.99, size: 'LG' } // Out of stock item
];

export const mockSavedCarts: SavedCart[] = [
  {
    id: "d0b4f43b34bdc5c2",
    date: "3/8/2025",
    items: [
      { id: 1, productId: 1, quantity: 1, price: 799.99, size: 'SM' },
      { id: 2, productId: 6, quantity: 1, price: 399.99, size: 'MD' }, // Out of stock item
      { id: 3, productId: 4, quantity: 2, price: 279.99, size: 'LG' }  // Low stock item
    ]
  },
  {
    id: "e5c3f28a9d71b4e6",
    date: "3/10/2025",
    items: [
      { id: 4, productId: 2, quantity: 2, price: 449.99, size: 'XL' },
      { id: 5, productId: 3, quantity: 1, price: 299.99, size: 'MD' }
    ]
  }
];

// Mock data for saved for later items
export const mockSavedForLaterItems: CartItem[] = [
  { id: 3, productId: 6, quantity: 1, price: 399.99, size: 'SM' }, // Out of stock item
  { id: 4, productId: 5, quantity: 1, price: 349.99, size: 'LG' }  // Low stock item
];

import { Currency } from '@/contexts/LanguageContext';

export const formatCurrency = (amount: number, currency: Currency = 'USD'): string => {
  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    minimumFractionDigits: 2,
  };
  
  switch (currency) {
    case 'USD':
      formatOptions.currency = 'USD';
      break;
    case 'EUR':
      formatOptions.currency = 'EUR';
      break;
    case 'JPY':
      formatOptions.currency = 'JPY';
      formatOptions.minimumFractionDigits = 0; // JPY doesn't use decimal places
      break;
    default:
      formatOptions.currency = 'USD';
  }
  
  return new Intl.NumberFormat('en-US', formatOptions).format(amount);
};

export const calculateTotal = (items: CartItem[], inventory?: Record<number, number>): number => {
  return items.reduce((sum, item) => {
    // Skip out of stock items if inventory is provided
    if (inventory && inventory[Number(item.productId)] === 0) {
      return sum;
    }
    return sum + (item.price * item.quantity);
  }, 0);
};

export const getCartItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

export const generateCartId = (): string => {
  return Math.random().toString(16).slice(2, 18);
};

export const generateOrderId = (): string => {
  return Math.random().toString(16).slice(2, 18);
};

export const formatCurrentDate = (): string => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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

// Merge items function to combine items from a saved cart with current items
export const mergeCartItems = (currentItems: CartItem[], savedItems: CartItem[]): CartItem[] => {
  const mergedItems = [...currentItems];
  
  savedItems.forEach(savedItem => {
    const existingItemIndex = mergedItems.findIndex(item => 
      item.productId === savedItem.productId && item.size === savedItem.size
    );
    
    if (existingItemIndex !== -1) {
      // If item with same product ID and size exists, increase quantity
      mergedItems[existingItemIndex] = {
        ...mergedItems[existingItemIndex],
        quantity: mergedItems[existingItemIndex].quantity + savedItem.quantity
      };
    } else {
      // Otherwise add as new item with new ID
      mergedItems.push({
        ...savedItem,
        id: Date.now() + Math.random()
      });
    }
  });
  
  return mergedItems;
};
