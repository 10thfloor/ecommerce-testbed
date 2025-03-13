
import { Language } from '@/contexts/LanguageContext';
import { cartTranslations } from './cart';
import { productTranslations } from './product';
import { ordersTranslations } from './orders';
import { savedTranslations } from './saved';
import { recommendedTranslations } from './recommended';

// Merge all translation objects
export const translations = {
  ...cartTranslations,
  ...productTranslations,
  ...ordersTranslations,
  ...savedTranslations,
  ...recommendedTranslations
};

export const translate = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translations[key][language];
};
