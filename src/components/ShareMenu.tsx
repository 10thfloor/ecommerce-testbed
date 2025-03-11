
import React from 'react';
import { Share2, Mail, Clipboard } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { CartItem, formatCurrency, calculateTotal } from '@/utils/cartUtils';

interface ShareMenuProps {
  items: CartItem[];
  title?: string;
  date?: string;
  className?: string;
  inventory?: Record<number, number>;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ items, title = "Cart", date, className = "", inventory }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.share-menu-container')) {
      setIsOpen(false);
    }
  };
  
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  
  const generateShareContent = () => {
    const cartItems = items.map(item => {
      // Skip out of stock items if inventory is provided
      if (inventory && inventory[Number(item.productId)] === 0) {
        return null;
      }
      return `${item.productId} - Qty: ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`;
    })
    .filter(Boolean) // Remove null entries (out of stock items)
    .join('\n');
    
    let shareText = `${title}`;
    if (date) shareText += `\n${date}`;
    shareText += `\n\nItems:\n${cartItems}\n\nTotal: ${formatCurrency(calculateTotal(items, inventory))}`;
    
    return shareText;
  };
  
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareText = generateShareContent();
    
    // Use the Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText
        });
        
        toast({
          title: "Cart Shared",
          description: "The cart has been shared successfully.",
        });
      } catch (error) {
        console.error('Error sharing:', error);
        handleCopyToClipboard(e);
      }
    } else {
      // Fallback to showing menu
      setIsOpen(!isOpen);
    }
  };
  
  const handleCopyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    
    const shareText = generateShareContent();
    
    navigator.clipboard.writeText(shareText)
      .then(() => {
        toast({
          title: "Cart Copied",
          description: "Cart details copied to clipboard. You can now paste and share it.",
        });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({
          title: "Copying Failed",
          description: "Could not copy the cart. Please try again.",
          variant: "destructive",
        });
      });
  };
  
  const handleEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    
    const shareText = generateShareContent();
    
    // Format for email
    const emailSubject = `${title}`;
    const emailBody = encodeURIComponent(shareText);
    
    // Open default email client with pre-filled content
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    
    toast({
      title: "Email Prepared",
      description: "Your email client should open with the cart details.",
    });
  };
  
  return (
    <div className={`share-menu-container relative inline-block ${className}`}>
      <button 
        onClick={handleShare}
        className="py-1.5 px-3 bg-secondary hover:bg-secondary/80 font-medium rounded-md text-sm transition-colors"
        title="Share this cart"
      >
        <Share2 className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="share-menu">
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 flex items-center"
              role="menuitem"
              onClick={handleCopyToClipboard}
            >
              <Clipboard className="h-4 w-4 mr-2" />
              Copy to clipboard
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-secondary/50 flex items-center"
              role="menuitem"
              onClick={handleEmail}
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
