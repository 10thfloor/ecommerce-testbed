
import React, { useState } from 'react';
import { BookmarkMinus, ChevronDown, ChevronUp } from 'lucide-react';
import { CartItem } from '@/utils/cartUtils';
import SavedForLaterItem from './SavedForLaterItem';

interface SavedForLaterProps {
  items: CartItem[];
  onMoveToCart: (id: string | number) => void;
  onRemoveItem: (id: string | number) => void;
}

const SavedForLater: React.FC<SavedForLaterProps> = ({ 
  items, 
  onMoveToCart, 
  onRemoveItem 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="bg-primary/10 rounded-lg p-1 mr-2">
            <BookmarkMinus className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Saved For Later</h3>
          <span className="ml-2 text-sm text-muted-foreground">
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
        </div>
        <button className="p-1 hover:bg-secondary rounded transition-colors">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <SavedForLaterItem
              key={item.id}
              item={item}
              onMoveToCart={onMoveToCart}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedForLater;
