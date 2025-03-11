
import React from 'react';
import { ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';

interface SavedCartsHeaderProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
  cartCount: number;
}

const SavedCartsHeader: React.FC<SavedCartsHeaderProps> = ({ 
  isExpanded, 
  toggleExpanded, 
  cartCount 
}) => {
  return (
    <div 
      className="flex justify-between items-center cursor-pointer mb-4"
      onClick={toggleExpanded}
    >
      <div className="flex items-center">
        <div className="bg-primary/10 rounded-lg p-1 mr-2">
          <ShoppingBag className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Saved Carts</h3>
        <span className="ml-2 text-sm text-muted-foreground">
          ({cartCount} {cartCount === 1 ? 'cart' : 'carts'})
        </span>
      </div>
      <button className="p-1 hover:bg-secondary rounded transition-colors">
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default SavedCartsHeader;
