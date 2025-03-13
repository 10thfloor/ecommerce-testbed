
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the supported languages and currencies
export type Language = 'en' | 'fr' | 'ja';
export type Currency = 'USD' | 'EUR' | 'JPY';

export interface LanguageContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Exchange rates (simplified for demo purposes)
const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.93, // 1 USD = 0.93 EUR
  JPY: 149.5  // 1 USD = 149.5 JPY
};

export const getCurrencyForLanguage = (lang: Language): Currency => {
  switch (lang) {
    case 'en': return 'USD';
    case 'fr': return 'EUR';
    case 'ja': return 'JPY';
    default: return 'USD';
  }
};

export const convertPrice = (priceInUSD: number, targetCurrency: Currency): number => {
  return priceInUSD * EXCHANGE_RATES[targetCurrency];
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('preferredLanguage') as Language) || 'en'
  );
  
  const [currency, setCurrency] = useState<Currency>(getCurrencyForLanguage(language));
  
  // Update currency when language changes
  useEffect(() => {
    setCurrency(getCurrencyForLanguage(language));
    // Save to localStorage
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, currency, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
