
import React from 'react';
import { PackagePlus, ShoppingCart, Plus } from 'lucide-react';
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
      name: "Wireless Earbuds",
      price: 59.99,
      description: "Premium wireless earbuds with noise cancellation",
      image: "headphones"
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 129.99,
      description: "Fitness tracker with heart rate monitoring",
      image: "watch"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 45.99,
      description: "Portable speaker with 10-hour battery life",
      image: "speaker"
    },
    {
      id: 4,
      name: "Laptop Sleeve",
      price: 19.99,
      description: "Protective sleeve for 13-15 inch laptops",
      image: "laptop"
    },
    {
      id: 5,
      name: "Phone Charger",
      price: 14.99,
      description: "Fast charging cable with multiple adapters",
      image: "charger"
    },
    {
      id: 6,
      name: "Wireless Mouse",
      price: 29.99,
      description: "Ergonomic wireless mouse with silent clicks",
      image: "mouse"
    },
    {
      id: 7,
      name: "Power Bank",
      price: 34.99,
      description: "10000mAh portable charger with dual USB ports",
      image: "battery"
    },
    {
      id: 8,
      name: "Mechanical Keyboard",
      price: 79.99,
      description: "RGB backlit mechanical keyboard with customizable keys",
      image: "keyboard"
    }
  ];

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div className="mb-4 flex items-center">
        <div className="bg-primary/10 rounded-lg p-1 mr-2">
          <ShoppingCart className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Product Inventory</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="bg-secondary/30 hover:bg-secondary/50 rounded-lg p-4 transition-all hover-scale cursor-pointer"
            onClick={() => onAddToCart(product.id, product.price)}
          >
            <div className="bg-primary/10 w-full aspect-square rounded-lg mb-3 flex items-center justify-center">
              <div className="text-2xl font-semibold text-primary">{product.image.charAt(0).toUpperCase()}</div>
            </div>
            
            <h4 className="font-medium mb-1">{product.name}</h4>
            <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between items-center mt-auto">
              <span className="font-bold">{formatCurrency(product.price)}</span>
              <button 
                className="p-1.5 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product.id, product.price);
                }}
              >
                <Plus className="h-4 w-4 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInventory;
