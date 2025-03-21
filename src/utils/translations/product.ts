import { Language } from '@/contexts/LanguageContext';

interface TranslationObject {
  [key: string]: {
    [key in Language]: string;
  };
}

export const productTranslations: TranslationObject = {
  // Inventory
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
    en: 'Out of Stock',
    fr: 'Rupture de Stock',
    ja: '在庫切れ'
  },
  'product.addToCart': {
    en: 'Add to cart',
    fr: 'Ajouter au panier',
    ja: 'カートに追加'
  },
  'product.add': {
    en: 'Add',
    fr: 'Ajouter',
    ja: '追加'
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
  },
  'product.selectSize': {
    en: 'Select Size',
    fr: 'Sélectionner la taille',
    ja: 'サイズを選択'
  },
  'product.selectSizeDescription': {
    en: 'Please select a size before adding to cart',
    fr: 'Veuillez sélectionner une taille avant d\'ajouter au panier',
    ja: 'カートに追加する前にサイズを選択してください'
  },
  'product.selectSizeFirst': {
    en: 'Select Size First',
    fr: 'Sélectionnez d\'abord une taille',
    ja: 'まずサイズを選択してください'
  },
  'product.limitedEdition': {
    en: 'Limited Edition',
    fr: 'Édition Limitée',
    ja: '限定版'
  },
  'product.limitedEditionAdded': {
    en: 'Limited Edition Added',
    fr: 'Édition Limitée Ajoutée',
    ja: '限定版が追加されました'
  },
  'product.limitedEditionAddedDescription': {
    en: 'You\'ve added a limited edition item to your cart!',
    fr: 'Vous avez ajouté un article en édition limitée à votre panier!',
    ja: '限定版アイテムがカートに追加されました！'
  },
  'product.featuredProducts': {
    en: 'Featured Products',
    fr: 'Produits en vedette',
    ja: '注目商品'
  },
  'product.drop': {
    en: 'Drop',
    fr: 'Collection',
    ja: 'ドロップ'
  },
  'product.ends': {
    en: 'Ends',
    fr: 'Se termine le',
    ja: '終了'
  },
  'product.is': {
    en: 'is',
    fr: 'est',
    ja: 'は'
  },
  'product.are': {
    en: 'are',
    fr: 'sont',
    ja: 'は'
  },
  
  // Limited edition related
  'product.limitedEditionItems': {
    en: 'Limited Edition Items',
    fr: 'Articles en Édition Limitée',
    ja: '限定版アイテム'
  },
  'product.sizeOutOfStock': {
    en: 'The selected size is out of stock',
    fr: 'La taille sélectionnée est en rupture de stock',
    ja: '選択したサイズは在庫切れです'
  },
};
