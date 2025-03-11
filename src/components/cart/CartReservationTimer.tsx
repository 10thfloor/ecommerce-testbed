
import React from 'react';
import { Clock } from 'lucide-react';

interface CartReservationTimerProps {
  timeRemaining: number;
  formatTimeRemaining: (seconds: number) => string;
}

const CartReservationTimer: React.FC<CartReservationTimerProps> = ({ 
  timeRemaining,
  formatTimeRemaining
}) => {
  return (
    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
      <div className="flex items-center text-sm text-primary dark:text-primary">
        <Clock className="h-4 w-4 mr-2" />
        <span>Items reserved for:</span>
      </div>
      <div className={`font-mono font-medium rounded-md px-3 py-1 ${
        timeRemaining < 300 
          ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/20 dark:border-primary/30' 
          : 'bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary border border-primary/10 dark:border-primary/20'
      }`}>
        {formatTimeRemaining(timeRemaining)}
      </div>
    </div>
  );
};

export default CartReservationTimer;
