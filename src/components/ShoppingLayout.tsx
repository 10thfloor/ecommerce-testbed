
import React, { useEffect } from 'react';
import LayoutSwitcher from './LayoutSwitcher';
import ThemeToggle from './ThemeToggle';

interface ShoppingLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ShoppingLayout: React.FC<ShoppingLayoutProps> = ({ title, children }) => {
  useEffect(() => {
    document.querySelectorAll('.cart-section').forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${i * 0.1}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-light mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 animate-fade-in tracking-tight">
              {title}
            </h1>
            <div className="h-0.5 w-16 bg-primary rounded animate-pulse-subtle opacity-70"></div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LayoutSwitcher />
          </div>
        </header>
        
        {children}
      </div>
    </div>
  );
};

export default ShoppingLayout;
