
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Ban } from 'lucide-react';
import { Product } from '@/components/product/types';
import { Button } from "@/components/ui/button";

interface RecommendedItemsProps {
  items?: Product[];
  onAddToCart?: (productId: number, price: number) => void;
  inventory?: Record<number, number>;
}

const RecommendedItems: React.FC<RecommendedItemsProps> = ({ 
  items = [], 
  onAddToCart,
  inventory = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="bg-amber-500/20 rounded-lg p-1 mr-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
          </div>
          <h3 className="text-lg font-medium">Recommended For You</h3>
        </div>
        <button className="p-1 hover:bg-secondary rounded transition-colors">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="bg-muted/30 rounded-full p-4 mb-4">
                <Ban className="h-8 w-8 text-muted-foreground" />
              </div>
              <h4 className="text-lg font-medium mb-2">No recommendations yet</h4>
              <p className="text-muted-foreground max-w-md">
                We'll recommend products based on your shopping activity, 
                including items in your cart, saved items, and watch list.
              </p>
            </div>
          ) : (
            // This section will be populated with recommended items in the future
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product recommendation grid will go here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedItems;
