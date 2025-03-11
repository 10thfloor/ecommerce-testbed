
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Define layout types
export type LayoutType = 'default' | 'compact' | 'wide';

type LayoutContextType = {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
};

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layout, setLayout] = useState<LayoutType>('default');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Reset to default layout on mobile
  useEffect(() => {
    if (isMobile && layout !== 'default') {
      setLayout('default');
      toast({
        title: "Layout Reset",
        description: "Alternative layouts are only available on desktop.",
      });
    }
  }, [isMobile, layout, toast]);

  // Save layout preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferredLayout', layout);
  }, [layout]);

  // Load saved layout on initial render
  useEffect(() => {
    const savedLayout = localStorage.getItem('preferredLayout') as LayoutType | null;
    if (savedLayout && !isMobile) {
      setLayout(savedLayout);
    }
  }, [isMobile]);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
