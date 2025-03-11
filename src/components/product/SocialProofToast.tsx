
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, User } from 'lucide-react';
import { Product } from './types';

// Sample names for social proof
const sampleNames = [
  'Alex', 'Jamie', 'Jordan', 'Taylor', 'Casey', 
  'Riley', 'Morgan', 'Quinn', 'Avery', 'Dakota',
  'Sam', 'Pat', 'Robin', 'Jesse', 'Charlie'
];

// Sample locations for social proof
const sampleLocations = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Seattle', 'Denver', 'Boston', 'Portland'
];

interface SocialProofToastProps {
  products: Product[];
  enabled?: boolean;
}

const SocialProofToast: React.FC<SocialProofToastProps> = ({ 
  products, 
  enabled = true 
}) => {
  const { toast } = useToast();
  const [lastShownIndex, setLastShownIndex] = useState(-1);

  // Display a random purchase notification
  const showRandomPurchase = () => {
    // Only show for products that are in stock
    const availableProducts = products.filter(p => p.inventory > 0);
    if (availableProducts.length === 0) return;
    
    // Select a different product than the last one if possible
    let nextIndex;
    if (availableProducts.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * availableProducts.length);
      } while (nextIndex === lastShownIndex && availableProducts.length > 1);
    } else {
      nextIndex = 0;
    }
    
    setLastShownIndex(nextIndex);
    
    const product = availableProducts[nextIndex];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    
    toast({
      title: "Recent Purchase",
      description: `${randomName} from ${randomLocation} just purchased ${product.name}`,
      className: "social-proof-toast",
      duration: 5000,
    });
  };

  useEffect(() => {
    if (!enabled || products.length === 0) return;
    
    // Show first notification after 10 seconds
    const initialTimer = setTimeout(() => {
      showRandomPurchase();
    }, 10000);
    
    // Then show a notification every 30-60 seconds (random interval)
    const interval = setInterval(() => {
      showRandomPurchase();
    }, Math.floor(Math.random() * 30000) + 30000); // 30-60 seconds
    
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [enabled, products]);

  return null; // This component doesn't render anything
};

export default SocialProofToast;
