
import React from 'react';
import { ProductBadge as ProductBadgeType } from './utils/productBadgeUtils';

interface ProductBadgeProps {
  badge: ProductBadgeType;
}

const ProductBadge: React.FC<ProductBadgeProps> = ({ badge }) => {
  return (
    <div className={`${badge.bg} ${badge.color} rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-semibold w-fit`}>
      <badge.icon className="h-3.5 w-3.5" />
      {badge.text}
    </div>
  );
};

export default ProductBadge;
