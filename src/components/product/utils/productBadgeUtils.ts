
import { Star, Flame, Award, Sparkles, Zap } from 'lucide-react';
import { Product } from '../types';

export interface ProductBadge {
  text: string;
  color: string;
  bg: string;
  borderColor: string;
  icon: any;
}

const badges: Record<string, ProductBadge> = {
  'Top Rated': {
    text: 'Top Rated',
    color: 'text-yellow-700 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    borderColor: 'border-yellow-400',
    icon: Star
  },
  'Best Seller': {
    text: 'Best Seller',
    color: 'text-blue-700 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-400',
    icon: Award
  },
  'Hot Item': {
    text: 'Hot Item',
    color: 'text-red-700 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/30',
    borderColor: 'border-red-400',
    icon: Flame
  },
  'Premium': {
    text: 'Premium',
    color: 'text-purple-700 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    borderColor: 'border-purple-400',
    icon: Sparkles
  },
  'Flash Deal': {
    text: 'Flash Deal',
    color: 'text-amber-700 dark:text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    borderColor: 'border-amber-400',
    icon: Zap
  }
};

// Function to get product badge based on product attributes
export const getProductBadge = (productId: number, attributes?: Record<number, any[]>): ProductBadge | null => {
  // Check if we have attributes for this product
  if (attributes && attributes[productId]) {
    const badgeAttribute = attributes[productId].find(attr => attr.type === 'badge');
    if (badgeAttribute && badges[badgeAttribute.value]) {
      return badges[badgeAttribute.value];
    }
  }
  
  // Fallback to hardcoded badges for backwards compatibility
  // This can be removed once the database is fully integrated
  if (productId === 1) {
    return badges['Top Rated'];
  } else if (productId === 3) {
    return badges['Best Seller'];
  } else if (productId === 7) {
    return badges['Hot Item'];
  }
  
  return null;
};
