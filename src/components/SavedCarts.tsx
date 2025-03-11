
import React, { useState } from 'react';
import { SavedCart } from '@/utils/cartUtils';
import SavedCartItem from './SavedCartItem';
import SavedCartsHeader from './SavedCartsHeader';
import SavedCartsDialogs from './SavedCartsDialogs';

interface SavedCartsProps {
  savedCarts: SavedCart[];
  onLoadCart: (cartId: string) => void;
  onDeleteCart: (cartId: string) => void;
  onAddCartItems?: (cartId: string) => void;
  inventory?: Record<number, number>;
}

const SavedCarts: React.FC<SavedCartsProps> = ({ 
  savedCarts, 
  onLoadCart, 
  onDeleteCart, 
  onAddCartItems,
  inventory = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [cartToLoad, setCartToLoad] = useState<string | null>(null);
  const [cartToAddItems, setCartToAddItems] = useState<string | null>(null);

  if (savedCarts.length === 0) {
    return null;
  }

  const handleLoadCart = (cartId: string) => {
    setCartToLoad(cartId);
  };

  const confirmLoadCart = () => {
    if (cartToLoad) {
      onLoadCart(cartToLoad);
      setCartToLoad(null);
    }
  };

  const confirmAddItems = () => {
    if (cartToAddItems && onAddCartItems) {
      onAddCartItems(cartToAddItems);
      setCartToAddItems(null);
    }
  };

  return (
    <div className={`card-glass p-4 ${isExpanded ? 'mb-6' : 'mb-0'} animate-fade-in`}>
      <SavedCartsHeader 
        isExpanded={isExpanded}
        toggleExpanded={() => setIsExpanded(!isExpanded)}
        cartCount={savedCarts.length}
      />

      {isExpanded && (
        <div className="mt-4 space-y-6">
          {savedCarts.map((cart) => (
            <SavedCartItem
              key={cart.id}
              cart={cart}
              inventory={inventory}
              onLoadCart={handleLoadCart}
              onDeleteCart={onDeleteCart}
              onAddCartItems={onAddCartItems}
            />
          ))}
        </div>
      )}

      <SavedCartsDialogs
        cartToLoad={cartToLoad}
        cartToAddItems={cartToAddItems}
        onCartToLoadChange={setCartToLoad}
        onCartToAddItemsChange={setCartToAddItems}
        onConfirmLoadCart={confirmLoadCart}
        onConfirmAddItems={confirmAddItems}
      />
    </div>
  );
};

export default SavedCarts;
