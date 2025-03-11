
import React from 'react';
import UserProfile from '@/components/UserProfile';
import Cart from '@/components/Cart';
import SavedCarts from '@/components/SavedCarts';
import SavedForLater from '@/components/SavedForLater';
import ProductInventory from '@/components/ProductInventory';
import { CartItem, SavedCart } from '@/utils/cartUtils';

interface ShoppingGridProps {
  userId: string;
  cartItems: CartItem[];
  savedCarts: SavedCart[];
  savedForLaterItems: CartItem[];
  onAddToCart: (productId: number, price: number) => void;
  onSaveCart: () => void;
  onRemoveItem: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onSaveForLater: (id: string | number) => void;
  onEmailCart: () => void;
  onLoadCart: (cartId: string) => void;
  onDeleteCart: (cartId: string) => void;
  onMoveToCart: (id: string | number) => void;
  onRemoveSavedItem: (id: string | number) => void;
}

const ShoppingGrid: React.FC<ShoppingGridProps> = ({
  userId,
  cartItems,
  savedCarts,
  savedForLaterItems,
  onAddToCart,
  onSaveCart,
  onRemoveItem,
  onUpdateQuantity,
  onSaveForLater,
  onEmailCart,
  onLoadCart,
  onDeleteCart,
  onMoveToCart,
  onRemoveSavedItem
}) => {
  return (
    <>
      <div className="cart-section mb-6">
        <UserProfile userId={userId} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-6">
          <div className="cart-section">
            <ProductInventory onAddToCart={onAddToCart} />
          </div>
          
          <div className="cart-section">
            <SavedCarts 
              savedCarts={savedCarts}
              onLoadCart={onLoadCart}
              onDeleteCart={onDeleteCart}
            />
          </div>
        </div>
        
        <div className="md:col-span-5 space-y-4">
          <div className="cart-section">
            <Cart 
              items={cartItems}
              onSaveCart={onSaveCart}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
              onSaveForLater={onSaveForLater}
              onEmailCart={onEmailCart}
            />
          </div>
          
          <div className="cart-section">
            <SavedForLater
              items={savedForLaterItems}
              onMoveToCart={onMoveToCart}
              onRemoveItem={onRemoveSavedItem}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingGrid;
