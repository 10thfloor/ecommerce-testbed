
import React from 'react';
import { PackageX } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Category } from './types';

interface ProductHeaderProps {
  name: string;
  description: string;
  category?: Category | null;
  isLimitedEdition?: boolean;
  isOutOfStock?: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  name,
  description,
  category,
  isLimitedEdition = false,
  isOutOfStock = false,
}) => {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
        
        {isOutOfStock && (
          <div className="flex items-center text-amber-600 dark:text-amber-400">
            <PackageX className="h-3.5 w-3.5 mr-0.5" />
            <span className="text-xs font-medium">Out of Stock</span>
          </div>
        )}
        
        {isLimitedEdition && (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30 text-[10px] py-0 h-4">
            Limited
          </Badge>
        )}
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{description}</p>
      
      {category && (
        <div className="text-xs text-muted-foreground bg-secondary/50 py-0.5 px-2 rounded-sm w-fit">
          {category.name}
        </div>
      )}
    </div>
  );
};

export default ProductHeader;
