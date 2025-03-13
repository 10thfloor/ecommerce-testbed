
import { Star, Award, Flame, Gem, Zap } from 'lucide-react';

export interface ProductBadge {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  color: string;
  bg: string;
  borderColor: string;
}

// Helper function to get a random badge for a product
export const getProductBadge = (productId: number): ProductBadge => {
  // Use product ID to deterministically assign a badge type
  const badges: ProductBadge[] = [
    { icon: Star, text: "Top Rated", color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30", borderColor: "border-yellow-500" },
    { icon: Award, text: "Best Seller", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", borderColor: "border-blue-500" },
    { icon: Flame, text: "Hot Item", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", borderColor: "border-orange-500" },
    { icon: Gem, text: "Premium", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", borderColor: "border-purple-500" },
    { icon: Zap, text: "Flash Deal", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30", borderColor: "border-green-500" },
  ];
  
  // Use product ID to consistently select the same badge for a product
  const badgeIndex = productId % badges.length;
  return badges[badgeIndex];
};
