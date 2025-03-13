
import React from 'react';
import { Order } from '@/utils/cartUtils';
import { useTranslation } from '@/hooks/useTranslation';
import { Receipt, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useProductName } from '@/hooks/useProductName';
import { Button } from "@/components/ui/button";
import ReadOnlyCartItem from './ReadOnlyCartItem';
import { cn } from '@/lib/utils';
import { useLayout } from '@/contexts/LayoutContext';
import { useState } from 'react';
import { formatCurrency } from '@/utils/cartUtils';

interface OrderHistoryProps {
  orders: Order[];
  inventory: Record<number, number>;
}

const OrderHistoryItem = ({ order, inventory }: { order: Order, inventory: Record<number, number> }) => {
  const [expanded, setExpanded] = useState(false);
  const { layout } = useLayout();
  const { t, language, currency } = useTranslation();
  const isCompact = layout === 'compact';
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-secondary/30 rounded-lg p-4 transition-all hover:bg-secondary/40">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
            <Receipt className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          
          <div>
            <div className="font-medium text-sm mb-0.5">
              {t('orders.order')} #{order.id.substring(0, 8)}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{order.date}</span>
              <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-md">
                {order.items.length} {order.items.length === 1 ? t('orders.item') : t('orders.items')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={cn(
            "text-sm font-medium",
            isCompact ? "text-xs" : "text-sm"
          )}>
            {formatCurrency(order.total, currency)}
          </div>
          
          <Button 
            variant="ghost" 
            size="xs"
            onClick={toggleExpanded}
            className="h-7 w-7 p-0"
          >
            {expanded ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </Button>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-3 space-y-2 border-t pt-3 border-secondary">
          {order.items.map((item) => (
            <ReadOnlyCartItem 
              key={item.id}
              item={item}
              inventory={inventory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, inventory }) => {
  const { layout } = useLayout();
  const { t } = useTranslation();
  
  if (orders.length === 0) {
    return (
      <div className="card-glass p-4 mb-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t('orders.title')}</h2>
        </div>
        <div className="text-center py-6 text-muted-foreground">
          {t('orders.empty')}
        </div>
      </div>
    );
  }
  
  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{t('orders.title')}</h2>
        <div className="text-sm text-muted-foreground">
          {orders.length} {orders.length === 1 ? t('orders.order') : t('orders.orders')}
        </div>
      </div>
      
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderHistoryItem 
            key={order.id} 
            order={order} 
            inventory={inventory}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
