
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddItemFormProps {
  onAddItem: (productId: string | number, quantity: number, price: number) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem }) => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const numProductId = parseInt(productId);
    const numQuantity = parseInt(quantity);
    const numPrice = parseFloat(price);
    
    if (!isNaN(numProductId) && !isNaN(numQuantity) && !isNaN(numPrice) && numQuantity > 0) {
      onAddItem(numProductId, numQuantity, numPrice);
      setProductId('');
      setQuantity('1');
      setPrice('0');
    }
  };

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div className="mb-3 flex items-center">
        <div className="bg-primary/10 rounded-lg p-1 mr-2">
          <PlusCircle className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Add Item to Cart</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="productId" className="text-sm font-medium text-muted-foreground">
            Product ID
          </label>
          <input
            id="productId"
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Enter product ID"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="price" className="text-sm font-medium text-muted-foreground">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="0.00"
            required
          />
        </div>
        
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="quantity" className="text-sm font-medium text-muted-foreground">
            Quantity
          </label>
          <div className="flex space-x-2">
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="1"
              required
            />
            <button
              type="submit"
              className="btn-primary hover-scale h-9 px-4 flex items-center justify-center"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;
