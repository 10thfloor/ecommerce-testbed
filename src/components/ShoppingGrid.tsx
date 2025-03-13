import React from 'react';
import UserProfile from '@/components/UserProfile';
import Cart from '@/components/Cart';
import SavedCarts from '@/components/SavedCarts';
import SavedForLater from '@/components/SavedForLater';
import ProductInventory from '@/components/ProductInventory';
import StockWatch from '@/components/StockWatch';
import RecommendedItems from '@/components/RecommendedItems';
import OrderHistory from '@/components/OrderHistory';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { CartItem, SavedCart, Order } from '@/utils/cartUtils';
import { Product } from '@/components/product/types';
import { useLayout } from '@/contexts/LayoutContext';
import { cn } from '@/lib/utils';

interface ShoppingGridProps {
  userId: string;
  cartItems: CartItem[];
  savedCarts: SavedCart[];
  savedForLaterItems: CartItem[];
  stockWatchItems: Product[];
  watchedProductIds?: number[]; 
  inventory?: Record<number, number>;
  orders?: Order[];
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
  onWatchProductId?: (productId: number) => void;
  onUndoCart?: () => void;
  hasCartHistory?: boolean;
  onSaveProductForLater?: (product: Product) => void;
  onCheckout?: (items: CartItem[], total: number) => void;
}

const ShoppingGrid: React.FC<ShoppingGridProps> = ({
  userId,
  cartItems,
  savedCarts,
  savedForLaterItems,
  stockWatchItems,
  watchedProductIds = [],
  inventory = {},
  orders = [],
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
  onWatchProductId,
  onUndoCart,
  hasCartHistory = false,
  onSaveProductForLater,
  onCheckout
}) => {
  const watchedItemIds = stockWatchItems.map(item => item.id);
  const { layout } = useLayout();
  
  const getGridClasses = () => {
    switch (layout) {
      case 'compact':
        return "grid-cols-1 md:grid-cols-2";
      case 'wide':
        return "grid-cols-1 md:grid-cols-1";
      case 'default':
      default:
        return "grid-cols-1 md:grid-cols-12";
    }
  };
  
  const getLeftColumnClasses = () => {
    switch (layout) {
      case 'compact':
        return "md:col-span-1";
      case 'wide':
        return "md:col-span-1";
      case 'default':
      default:
        return "md:col-span-7";
    }
  };
  
  const getRightColumnClasses = () => {
    switch (layout) {
      case 'compact':
        return "md:col-span-1";
      case 'wide':
        return "md:col-span-1";
      case 'default':
      default:
        return "md:col-span-5";
    }
  };
  
  return (
    <>
      <div className="cart-section mb-6 flex justify-between items-center">
        <UserProfile userId={userId} />
        <LanguageSwitcher />
      </div>
      
      <div className={cn("grid gap-6", getGridClasses())}>
        <div className={cn("space-y-6", getLeftColumnClasses())}>
          <div className="cart-section">
            <ProductInventory 
              onAddToCart={onAddToCart} 
              watchedItems={watchedItemIds}
              onWatchItem={onWatchItem}
              onSaveForLater={onSaveProductForLater}
            />
          </div>
        </div>
        
        <div className={cn("space-y-4", getRightColumnClasses())}>
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
              onWatchItem={onWatchProductId}
              watchedItems={watchedProductIds}
              onCheckout={onCheckout}
            />
          </div>
          
          <div className="cart-section">
            <RecommendedItems 
              onAddToCart={onAddToCart}
              inventory={inventory}
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
              onWatchItem={onWatchProductId}
              watchedItems={watchedProductIds}
            />
          </div>
          
          <div className="cart-section">
            <OrderHistory 
              orders={orders}
              inventory={inventory}
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
      </div>
    </>
  );
};

export default ShoppingGrid;
