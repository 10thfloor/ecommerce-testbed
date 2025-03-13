
import { Language } from '@/contexts/LanguageContext';

interface TranslationObject {
  [key: string]: {
    [key in Language]: string;
  };
}

export const savedTranslations: TranslationObject = {
  // Saved Items
  'saved.title': {
    en: 'Saved For Later',
    fr: 'Enregistré pour plus tard',
    ja: '後で保存'
  },
  'saved.empty': {
    en: 'No items saved for later.',
    fr: 'Aucun article enregistré pour plus tard.',
    ja: '後で保存されたアイテムはありません。'
  },
  
  // Stock watch
  'stockwatch.title': {
    en: 'Stock Watch',
    fr: 'Surveillance des stocks',
    ja: '在庫監視'
  },
  'stockwatch.empty': {
    en: 'You are not watching any items.',
    fr: 'Vous ne surveillez aucun article.',
    ja: '監視しているアイテムはありません。'
  },
  
  // Saved carts
  'savedcarts.title': {
    en: 'Saved Carts',
    fr: 'Paniers enregistrés',
    ja: '保存されたカート'
  },
  'savedcarts.empty': {
    en: 'No saved carts. Save your current cart to see it here.',
    fr: 'Aucun panier enregistré. Enregistrez votre panier actuel pour le voir ici.',
    ja: '保存されたカートはありません。現在のカートを保存するとここに表示されます。'
  },
  'savedcarts.cart': {
    en: 'cart',
    fr: 'panier',
    ja: 'カート'
  },
  'savedcarts.carts': {
    en: 'carts',
    fr: 'paniers',
    ja: 'カート'
  }
};
