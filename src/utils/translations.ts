
import { Language } from '@/contexts/LanguageContext';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
    ja: string;
  };
}

export const translations: Translations = {
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
  
  // Product inventory
  'inventory.title': {
    en: 'Product Inventory',
    fr: 'Inventaire des produits',
    ja: '商品在庫'
  },
  'inventory.search': {
    en: 'Search products...',
    fr: 'Rechercher des produits...',
    ja: '商品を検索...'
  },
  'inventory.popular': {
    en: 'Popular:',
    fr: 'Populaire:',
    ja: '人気:'
  },
  'inventory.noResults': {
    en: 'No products found',
    fr: 'Aucun produit trouvé',
    ja: '商品が見つかりません'
  },
  
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
  
  // Recommended items
  'recommended.title': {
    en: 'Recommended For You',
    fr: 'Recommandé pour vous',
    ja: 'おすすめ'
  },
  'recommended.empty': {
    en: 'No recommendations yet',
    fr: 'Pas encore de recommandations',
    ja: 'まだおすすめはありません'
  },
  
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
  },

  // Product related
  'product.qty': {
    en: 'Qty',
    fr: 'Qté',
    ja: '数量'
  },
  'product.left': {
    en: 'left',
    fr: 'restant',
    ja: '残り'
  },
  'product.only': {
    en: 'Only',
    fr: 'Seulement',
    ja: '残り'
  },
  'product.outOfStock': {
    en: 'Out of stock',
    fr: 'Rupture de stock',
    ja: '在庫切れ'
  },
  'product.addToCart': {
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    ja: 'カートに追加'
  },
  'product.saveForLater': {
    en: 'Save for later',
    fr: 'Enregistrer pour plus tard',
    ja: '後で保存'
  },
  'product.watchItem': {
    en: 'Watch item',
    fr: 'Surveiller l\'article',
    ja: '商品を監視'
  }
};

export const translate = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translations[key][language];
};
