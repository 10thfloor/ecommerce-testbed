
import { Language } from '@/contexts/LanguageContext';

interface TranslationObject {
  [key: string]: {
    [key in Language]: string;
  };
}

export const ordersTranslations: TranslationObject = {
  // Order history
  'orders.title': {
    en: 'Order History',
    fr: 'Historique des commandes',
    ja: '注文履歴'
  },
  'orders.empty': {
    en: 'Your order history is empty. Complete a checkout to see orders here.',
    fr: 'Votre historique de commandes est vide. Effectuez un paiement pour voir les commandes ici.',
    ja: '注文履歴は空です。チェックアウトを完了すると、ここに注文が表示されます。'
  },
  'orders.order': {
    en: 'Order',
    fr: 'Commande',
    ja: '注文'
  },
  'orders.item': {
    en: 'item',
    fr: 'article',
    ja: '商品'
  },
  'orders.items': {
    en: 'items',
    fr: 'articles',
    ja: '商品'
  }
};
