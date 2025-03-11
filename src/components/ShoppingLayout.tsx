
import React, { useEffect } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground animate-fade-in">
            {title}
          </h1>
          <div className="h-1 w-24 bg-primary rounded animate-pulse-subtle"></div>
        </header>
        
        {children}
      </div>
    </div>
  );
};

export default ShoppingLayout;
