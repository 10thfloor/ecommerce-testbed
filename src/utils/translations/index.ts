
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
  return translations[language][key] || key;
};
