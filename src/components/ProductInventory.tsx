
import React from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductInventoryProps {
  onAddToCart: (productId: number, price: number) => void;
}

const ProductInventory: React.FC<ProductInventoryProps> = ({ onAddToCart }) => {
  const products: Product[] = [
    {
      id: 1,
      name: "Alpha SV Jacket",
      price: 799.99,
      description: "Premium waterproof hardshell for extreme alpine conditions",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Beta AR Pants",
      price: 499.99,
      description: "All-round mountaineering pants with GORE-TEX protection",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Atom LT Hoody",
      price: 259.99,
      description: "Lightweight insulated mid-layer with exceptional breathability",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Cerium Down Vest",
      price: 349.99,
      description: "Ultralight 850 fill-power down vest for alpine climbing",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Gamma MX Softshell",
      price: 349.99,
      description: "Versatile softshell jacket for mixed weather conditions",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Zeta SL Rain Jacket",
      price: 299.99,
      description: "Superlight emergency rain protection for hiking",
      image: "/placeholder.svg"
    },
    {
      id: 7,
      name: "Covert Fleece",
      price: 179.99,
      description: "Classic fleece with a clean aesthetic for everyday wear",
      image: "/placeholder.svg"
    },
    {
      id: 8,
      name: "Proton AR Insulated",
      price: 399.99,
      description: "Advanced breathable insulation for cold, active pursuits",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in h-full">
      <div className="mb-4 flex items-center">
        <div className="bg-primary/10 rounded-lg p-1 mr-2">
          <ShoppingCart className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Product Inventory</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-secondary/30 hover:bg-secondary/50 rounded-lg p-3 transition-all hover-scale cursor-pointer"
            onClick={() => onAddToCart(product.id, product.price)}
          >
            <div className="flex flex-col">
              <h4 className="font-medium text-sm mb-1">{product.name}</h4>
              <p className="text-muted-foreground text-xs mb-2 line-clamp-1">{product.description}</p>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-sm">{formatCurrency(product.price)}</span>
                <button 
                  className="p-1 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product.id, product.price);
                  }}
                >
                  <Plus className="h-3 w-3 text-primary" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInventory;
