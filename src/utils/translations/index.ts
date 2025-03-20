
import { cartTranslations } from './cart';
import { productTranslations } from './product';
import { savedTranslations } from './saved';
import { ordersTranslations } from './orders';
import { recommendedTranslations } from './recommended';
import { stockTranslations } from './stock';

type Language = 'en' | 'fr' | 'ja';

const translations = {
  en: {
    ...cartTranslations.en,
    ...productTranslations.en,
    ...savedTranslations.en,
    ...ordersTranslations.en,
    ...recommendedTranslations.en,
    ...stockTranslations.en,
  },
  fr: {
    ...cartTranslations.fr,
    ...productTranslations.fr,
    ...savedTranslations.fr,
    ...ordersTranslations.fr,
    ...recommendedTranslations.fr,
    ...stockTranslations.fr,
  },
  ja: {
    ...cartTranslations.ja,
    ...productTranslations.ja,
    ...savedTranslations.ja,
    ...ordersTranslations.ja,
    ...recommendedTranslations.ja,
    ...stockTranslations.ja,
  }
};

export const translate = (key: string, language: Language = 'en'): string => {
  // Check if the language exists in our translations
  if (!translations[language]) {
    console.warn(`Language ${language} not found, falling back to English`);
    language = 'en';
  }
  
  // Check if the key exists for this language
  if (translations[language][key] === undefined) {
    console.warn(`Translation key "${key}" missing for language "${language}"`);
    
    // Try to get English version as a fallback
    if (language !== 'en' && translations.en[key]) {
      return translations.en[key];
    }
    
    // If we don't have a translation, use a friendly version of the key
    return key.split('.').pop() || key;
  }
  
  return translations[language][key];
};
