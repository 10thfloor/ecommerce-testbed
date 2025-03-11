
import React from 'react';
import { Eye, Trash2, Plus } from 'lucide-react';
import { formatCurrency } from '@/utils/cartUtils';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/ProductInventory';

interface StockWatchProps {
  items: Product[];
  onRemoveFromWatch: (productId: number) => void;
  onAddToCart: (productId: number, price: number) => void;
  inventory: Record<number, number>;
}

const StockWatch: React.FC<StockWatchProps> = ({ 
  items, 
  onRemoveFromWatch, 
  onAddToCart,
  inventory
}) => {
  if (items.length === 0) {
    return (
      <div className="card-glass p-4 mb-6">
        <div className="mb-4 flex items-center">
          <div className="bg-primary/10 rounded-lg p-2 mr-3">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-medium">Stock Watch</h3>
        </div>
        <div className="text-center py-4 text-muted-foreground">
          You're not watching any items.
        </div>
      </div>
    );
  }

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div className="mb-4 flex items-center">
        <div className="bg-primary/10 rounded-lg p-2 mr-3">
          <Eye className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-medium">Stock Watch</h3>
      </div>

      <div className="space-y-2">
        {items.map((product) => {
          const isInStock = inventory[product.id] > 0;
          
          return (
            <div 
              key={product.id}
              className={`relative flex justify-between items-center p-3 rounded-md ${
                isInStock 
                  ? 'bg-green-500/10 border border-green-500/30' 
                  : 'bg-secondary/30'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{formatCurrency(product.price)}</p>
                    
                    {isInStock ? (
                      <div className="text-xs font-medium text-green-600 dark:text-green-400 mt-1">
                        Now in stock!
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground mt-1">
                        Out of stock
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {isInStock && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0 rounded-full bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
                    onClick={() => onAddToCart(product.id, product.price)}
                  >
                    <Plus className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline" 
                  className="h-7 w-7 p-0 rounded-full"
                  onClick={() => onRemoveFromWatch(product.id)}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StockWatch;
