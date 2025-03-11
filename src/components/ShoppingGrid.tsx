
import React from 'react';
import UserProfile from '@/components/UserProfile';
import Cart from '@/components/Cart';
import SavedCarts from '@/components/SavedCarts';
import SavedForLater from '@/components/SavedForLater';
import ProductInventory from '@/components/ProductInventory';
import StockWatch from '@/components/StockWatch';
import { CartItem, SavedCart } from '@/utils/cartUtils';
import { Product } from '@/components/ProductInventory';

interface ShoppingGridProps {
  userId: string;
  cartItems: CartItem[];
  savedCarts: SavedCart[];
  savedForLaterItems: CartItem[];
  stockWatchItems: Product[];
  watchedProductIds?: number[]; // Add this new prop
  inventory?: Record<number, number>;
  onAddToCart: (productId: number, price: number) => void;
  onSaveCart: () => void;
  onRemoveItem: (id: string | number) => void;
  onUpdateQuantity: (id: string | number, quantity: number) => void;
  onSaveForLater: (id: string | number) => void;
  onEmailCart: () => void;
  onLoadCart: (cartId: string) => void;
  onAddCartItems?: (cartId: string) => void;
  onDeleteCart: (cartId: string) => void;
  onMoveToCart: (id: string | number) => void;
  onRemoveSavedItem: (id: string | number) => void;
  onRemoveFromWatch: (productId: number) => void;
  onWatchItem?: (product: Product) => void;
  onWatchProductId?: (productId: number) => void; // Add this new prop
  onUndoCart?: () => void;
  hasCartHistory?: boolean;
}

const ShoppingGrid: React.FC<ShoppingGridProps> = ({
  userId,
  cartItems,
  savedCarts,
  savedForLaterItems,
  stockWatchItems,
  watchedProductIds = [], // Add default value
  inventory = {},
  onAddToCart,
  onSaveCart,
  onRemoveItem,
  onUpdateQuantity,
  onSaveForLater,
  onEmailCart,
  onLoadCart,
  onAddCartItems,
  onDeleteCart,
  onMoveToCart,
  onRemoveSavedItem,
  onRemoveFromWatch,
  onWatchItem,
  onWatchProductId, // Add this new prop
  onUndoCart,
  hasCartHistory = false
}) => {
  // Extract just the IDs from stock watch items for simplified passing to ProductInventory
  const watchedItemIds = stockWatchItems.map(item => item.id);
  
  return (
    <>
      <div className="cart-section mb-6">
        <UserProfile userId={userId} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-6">
          <div className="cart-section">
            <ProductInventory 
              onAddToCart={onAddToCart} 
              watchedItems={watchedItemIds}
              onWatchItem={onWatchItem}
            />
          </div>
          
          <div className="cart-section">
            <SavedCarts 
              savedCarts={savedCarts}
              onLoadCart={onLoadCart}
              onDeleteCart={onDeleteCart}
              onAddCartItems={onAddCartItems}
              inventory={inventory}
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
              onUndoCart={onUndoCart}
              hasHistory={hasCartHistory}
              inventory={inventory}
              onWatchItem={onWatchProductId} // Pass the new prop
              watchedItems={watchedProductIds} // Pass the watched items
            />
          </div>
          
          <div className="cart-section">
            <StockWatch 
              items={stockWatchItems}
              onRemoveFromWatch={onRemoveFromWatch}
              onAddToCart={onAddToCart}
              inventory={inventory}
            />
          </div>
          
          <div className="cart-section">
            <SavedForLater
              items={savedForLaterItems}
              onMoveToCart={onMoveToCart}
              onRemoveItem={onRemoveSavedItem}
              inventory={inventory}
              onWatchItem={onWatchProductId} // Pass the new prop
              watchedItems={watchedProductIds} // Pass the watched items
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingGrid;
