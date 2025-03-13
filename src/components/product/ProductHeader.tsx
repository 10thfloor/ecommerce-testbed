
import React from 'react';
import { Badge } from '../ui/badge';
import { Diamond } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Category } from './types';

interface ProductHeaderProps {
  name: string;
  description: string;
  category?: Category;
  isLimitedEdition?: boolean;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ 
  name, 
  description, 
  category, 
  isLimitedEdition 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-2">
      {/* Category badge */}
      {category && (
        <div className="text-xs font-medium rounded-full px-2 py-0.5 inline-block mb-1.5 bg-secondary/70 text-foreground/70">
          {category.name}
        </div>
      )}
      
      {/* Limited Edition Badge */}
      {isLimitedEdition && (
        <Badge className="mb-1.5 ml-1 bg-purple-500/70 hover:bg-purple-500/80 font-normal">
          <Diamond className="h-3 w-3 mr-1" />
          {t('product.limitedEdition')}
        </Badge>
      )}
      
      <h4 className="font-medium text-base mb-1">{name}</h4>
      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
    </div>
  );
};

export default ProductHeader;
