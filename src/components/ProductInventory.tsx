
import React from 'react';
import { ShoppingCart, Plus, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  inventory: number;
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
      image: "/placeholder.svg",
      inventory: 5
    },
    {
      id: 2,
      name: "Beta AR Pants",
      price: 499.99,
      description: "All-round mountaineering pants with GORE-TEX protection",
      image: "/placeholder.svg",
      inventory: 8
    },
    {
      id: 3,
      name: "Atom LT Hoody",
      price: 259.99,
      description: "Lightweight insulated mid-layer with exceptional breathability",
      image: "/placeholder.svg",
      inventory: 12
    },
    {
      id: 4,
      name: "Cerium Down Vest",
      price: 349.99,
      description: "Ultralight 850 fill-power down vest for alpine climbing",
      image: "/placeholder.svg",
      inventory: 3
    },
    {
      id: 5,
      name: "Gamma MX Softshell",
      price: 349.99,
      description: "Versatile softshell jacket for mixed weather conditions",
      image: "/placeholder.svg",
      inventory: 6
    },
    {
      id: 6,
      name: "Zeta SL Rain Jacket",
      price: 299.99,
      description: "Superlight emergency rain protection for hiking",
      image: "/placeholder.svg",
      inventory: 0
    },
    {
      id: 7,
      name: "Covert Fleece",
      price: 179.99,
      description: "Classic fleece with a clean aesthetic for everyday wear",
      image: "/placeholder.svg",
      inventory: 15
    },
    {
      id: 8,
      name: "Proton AR Insulated",
      price: 399.99,
      description: "Advanced breathable insulation for cold, active pursuits",
      image: "/placeholder.svg",
      inventory: 4
    }
  ];

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in h-full">
      <div className="mb-6 flex items-center">
        <div className="bg-primary/10 rounded-lg p-2 mr-3">
          <ShoppingCart className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-medium">Product Inventory</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className={`${product.inventory > 0 ? 'bg-secondary/30 hover:bg-secondary/50' : 'bg-secondary/10 cursor-not-allowed'} 
              rounded-lg p-4 transition-all ${product.inventory > 0 ? 'hover-scale cursor-pointer' : ''}`}
            onClick={() => product.inventory > 0 && onAddToCart(product.id, product.price)}
          >
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <h4 className="font-medium text-base mb-1">{product.name}</h4>
                <div className={`text-xs font-medium rounded-full px-2 py-0.5 inline-block mb-2 ${
                  product.inventory === 0 ? 'bg-destructive/10 text-destructive' :
                  product.inventory <= 3 ? 'bg-warning/10 text-warning' :
                  'bg-success/10 text-success'
                }`}>
                  {product.inventory === 0 ? 'Out of stock' : 
                   product.inventory <= 3 ? `Only ${product.inventory} left` : 
                   `${product.inventory} in stock`}
                </div>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-sm">{formatCurrency(product.price)}</span>
                {product.inventory > 0 ? (
                  <button 
                    className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product.id, product.price);
                    }}
                    aria-label="Add to cart"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                  </button>
                ) : (
                  <div className="p-1.5 bg-destructive/10 rounded-full">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInventory;
