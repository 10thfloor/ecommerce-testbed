
import { Language } from '@/contexts/LanguageContext';

interface TranslationObject {
  [key: string]: {
    [key in Language]: string;
  };
}

export const cartTranslations: TranslationObject = {
  // Shopping cart
  'cart.title': {
    en: 'Cart',
    fr: 'Panier',
    ja: 'カート'
  },
  'cart.empty': {
    en: 'Your cart is empty. Add some items to get started.',
    fr: 'Votre panier est vide. Ajoutez des articles pour commencer.',
    ja: 'カートは空です。アイテムを追加してください。'
  },
  'cart.save': {
    en: 'Save Cart',
    fr: 'Enregistrer le panier',
    ja: 'カートを保存'
  },
  'cart.reserved': {
    en: 'Items reserved for:',
    fr: 'Articles réservés pour:',
    ja: '予約された商品:'
  },
  'cart.checkout': {
    en: 'Checkout',
    fr: 'Paiement',
    ja: 'チェックアウト'
  },
  'cart.subtotal': {
    en: 'Subtotal',
    fr: 'Sous-total',
    ja: '小計'
  },
  'cart.total': {
    en: 'Total',
    fr: 'Total',
    ja: '合計'
  },
  'cart.discount': {
    en: 'Discount',
    fr: 'Remise',
    ja: '割引'
  },
  'cart.promo.apply': {
    en: 'Apply',
    fr: 'Appliquer',
    ja: '適用'
  },
  'cart.promo.remove': {
    en: 'Remove',
    fr: 'Supprimer',
    ja: '削除'
  },
  'cart.promo.placeholder': {
    en: 'Enter promo code',
    fr: 'Entrez le code promo',
    ja: 'プロモコードを入力'
  },
  'cart.item': {
    en: 'item',
    fr: 'article',
    ja: '商品'
  },
  'cart.items': {
    en: 'items',
    fr: 'articles',
    ja: '商品'
  },
  'cart.out_of_stock': {
    en: 'out of stock',
    fr: 'en rupture de stock',
    ja: '在庫切れです'
  },
  'cart.is': {
    en: 'is',
    fr: 'est',
    ja: 'は'
  },
  'cart.are': {
    en: 'are',
    fr: 'sont',
    ja: 'は'
  },
  'cart.order_completed': {
    en: 'Order Completed',
    fr: 'Commande terminée',
    ja: '注文完了'
  },
  'cart.processed': {
    en: 'Successfully processed',
    fr: 'Traité avec succès',
    ja: '正常に処理されました'
  },
  'cart.for': {
    en: 'for',
    fr: 'pour',
    ja: 'の'
  },
  'cart.no_available_items': {
    en: 'No Available Items',
    fr: 'Aucun article disponible',
    ja: '利用可能なアイテムはありません'
  },
  'cart.no_available_items_description': {
    en: 'All items in your cart are out of stock.',
    fr: 'Tous les articles de votre panier sont en rupture de stock.',
    ja: 'カート内のすべてのアイテムは在庫切れです。'
  }
};
