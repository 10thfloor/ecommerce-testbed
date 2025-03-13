
import React from 'react';
import { Trash2, BookmarkPlus, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayout } from '@/contexts/LayoutContext';

interface CartItemActionsProps {
  onRemove: () => void;
  onSaveForLater?: () => void;
  onWatchItem?: () => void;
  isWatched?: boolean;
  isOutOfStock?: boolean;
}

const CartItemActions: React.FC<CartItemActionsProps> = ({
  onRemove,
  onSaveForLater,
  onWatchItem,
  isWatched = false,
  isOutOfStock = false,
}) => {
  const { layout } = useLayout();
  const isCompact = layout === 'compact';
  
  return (
    <div className={cn(
      "flex items-center", 
      layout === 'compact' ? "space-x-1" : "space-x-1"
    )}>
      {isOutOfStock && onWatchItem && (
        <button 
          onClick={onWatchItem}
          className={`p-1 rounded-md transition-colors ${
            isWatched 
              ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-400 animate-pulse-subtle' 
              : 'text-primary hover:bg-primary/10'
          }`}
          aria-label={isWatched ? "Remove from watch list" : "Add to watch list"}
        >
          {isWatched ? (
            <EyeOff className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
          ) : (
            <Eye className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
          )}
        </button>
      )}
      
      {onSaveForLater && (
        <button 
          onClick={onSaveForLater}
          className="p-1 text-primary hover:bg-primary/10 rounded-md transition-colors"
          aria-label="Save for later"
        >
          <BookmarkPlus className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
        </button>
      )}
      
      <button 
        onClick={onRemove}
        className="p-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
        aria-label="Remove item"
      >
        <Trash2 className={cn("h-3.5 w-3.5", layout === 'compact' ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "")} />
      </button>
    </div>
  );
};

export default CartItemActions;
