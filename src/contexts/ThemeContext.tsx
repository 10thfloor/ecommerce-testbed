
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define theme types
export type AppTheme = 'default' | 'arcteryx';

type ThemeContextType = {
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appTheme, setAppTheme] = useState<AppTheme>('default');
  const { toast } = useToast();
  
  // Apply theme class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-default', 'theme-arcteryx');
    root.classList.add(`theme-${appTheme}`);
    
    toast({
      title: "Theme Changed",
      description: `Switched to ${appTheme === 'default' ? 'Default' : 'Arc\'teryx'} theme`,
    });
  }, [appTheme, toast]);

  // Load saved theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('preferredAppTheme') as AppTheme | null;
    if (savedTheme) {
      setAppTheme(savedTheme);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferredAppTheme', appTheme);
  }, [appTheme]);

  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};
