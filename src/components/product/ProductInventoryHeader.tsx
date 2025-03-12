
import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductInventoryHeader = () => {
  return (
    <div className="mb-6 flex items-center">
      <div className="bg-primary/10 rounded-lg p-2 mr-3">
        <ShoppingCart className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-xl font-medium">Product Inventory</h3>
    </div>
  );
};

export default ProductInventoryHeader;
