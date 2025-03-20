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
