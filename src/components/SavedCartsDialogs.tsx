
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SavedCartsDialogsProps {
  cartToLoad: string | null;
  cartToAddItems: string | null;
  onCartToLoadChange: (cartId: string | null) => void;
  onCartToAddItemsChange: (cartId: string | null) => void;
  onConfirmLoadCart: () => void;
  onConfirmAddItems: () => void;
}

const SavedCartsDialogs: React.FC<SavedCartsDialogsProps> = ({
  cartToLoad,
  cartToAddItems,
  onCartToLoadChange,
  onCartToAddItemsChange,
  onConfirmLoadCart,
  onConfirmAddItems,
}) => {
  return (
    <>
      <AlertDialog open={cartToLoad !== null} onOpenChange={(open) => !open && onCartToLoadChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace current cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace your current cart with the saved cart. Your current cart items will be saved in history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmLoadCart}>Replace Cart</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={cartToAddItems !== null} onOpenChange={(open) => !open && onCartToAddItemsChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add items to current cart?</AlertDialogTitle>
            <AlertDialogDescription>
              This will add the items from the saved cart to your current cart without replacing existing items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmAddItems}>Add Items</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SavedCartsDialogs;
