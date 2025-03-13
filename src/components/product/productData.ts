
import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Alpha SV Jacket",
    price: 799.99,
    description: {
      en: "Premium waterproof hardshell for extreme alpine conditions",
      fr: "Coquille dure imperméable haut de gamme pour conditions alpines extrêmes",
      ja: "極限のアルパイン環境向けのプレミアム防水ハードシェル"
    },
    image: "/placeholder.svg",
    inventory: 5,
    categoryId: 1, // Jackets
    sizes: [
      { name: 'SM', inventory: 2 },
      { name: 'MD', inventory: 0 },
      { name: 'LG', inventory: 2 },
      { name: 'XL', inventory: 1 }
    ]
  },
  {
    id: 2,
    name: "Beta AR Pants",
    price: 499.99,
    description: {
      en: "All-round mountaineering pants with GORE-TEX protection",
      fr: "Pantalon polyvalent d'alpinisme avec protection GORE-TEX",
      ja: "GORE-TEX保護機能付きの万能登山用パンツ"
    },
    image: "/placeholder.svg",
    inventory: 8,
    categoryId: 2, // Pants
    sizes: [
      { name: 'SM', inventory: 3 },
      { name: 'MD', inventory: 2 },
      { name: 'LG', inventory: 3 },
      { name: 'XL', inventory: 0 }
    ]
  },
  {
    id: 3,
    name: "Atom LT Hoody",
    price: 259.99,
    description: {
      en: "Lightweight insulated mid-layer with exceptional breathability",
      fr: "Couche intermédiaire légère isolée avec une respirabilité exceptionnelle",
      ja: "優れた通気性を備えた軽量断熱ミッドレイヤー"
    },
    image: "/placeholder.svg",
    inventory: 12,
    categoryId: 3, // Layers
    sizes: [
      { name: 'SM', inventory: 3 },
      { name: 'MD', inventory: 4 },
      { name: 'LG', inventory: 3 },
      { name: 'XL', inventory: 2 }
    ]
  },
  {
    id: 4,
    name: "Cerium Down Vest",
    price: 349.99,
    description: {
      en: "Ultralight 850 fill-power down vest for alpine climbing",
      fr: "Gilet en duvet ultraléger avec puissance de gonflage 850 pour l'escalade alpine",
      ja: "アルパインクライミング用の超軽量850フィルパワーダウンベスト"
    },
    image: "/placeholder.svg",
    inventory: 3,
    categoryId: 3, // Layers
    sizes: [
      { name: 'SM', inventory: 0 },
      { name: 'MD', inventory: 1 },
      { name: 'LG', inventory: 2 },
      { name: 'XL', inventory: 0 }
    ]
  },
  {
    id: 5,
    name: "Gamma MX Softshell",
    price: 349.99,
    description: {
      en: "Versatile softshell jacket for mixed weather conditions",
      fr: "Veste softshell polyvalente pour conditions météorologiques mixtes",
      ja: "さまざまな天候条件に対応する多用途ソフトシェルジャケット"
    },
    image: "/placeholder.svg",
    inventory: 8,
    categoryId: 1, // Jackets
    sizes: [
      { name: 'SM', inventory: 2 },
      { name: 'MD', inventory: 2 },
      { name: 'LG', inventory: 3 },
      { name: 'XL', inventory: 1 }
    ]
  },
  {
    id: 6,
    name: "Zeta SL Rain Jacket",
    price: 299.99,
    description: {
      en: "Superlight emergency rain protection for hiking",
      fr: "Protection contre la pluie d'urgence ultra-légère pour la randonnée",
      ja: "ハイキング用の超軽量緊急用レインプロテクション"
    },
    image: "/placeholder.svg",
    inventory: 0,
    categoryId: 1, // Jackets
    sizes: [
      { name: 'SM', inventory: 0 },
      { name: 'MD', inventory: 0 },
      { name: 'LG', inventory: 0 },
      { name: 'XL', inventory: 0 }
    ]
  },
  {
    id: 7,
    name: "Covert Fleece",
    price: 179.99,
    description: {
      en: "Classic fleece with a clean aesthetic for everyday wear",
      fr: "Polaire classique avec une esthétique épurée pour un usage quotidien",
      ja: "日常着用のためのクリーンな美学を持つクラシックフリース"
    },
    image: "/placeholder.svg",
    inventory: 15,
    categoryId: 3, // Layers
    sizes: [
      { name: 'SM', inventory: 4 },
      { name: 'MD', inventory: 4 },
      { name: 'LG', inventory: 4 },
      { name: 'XL', inventory: 3 }
    ]
  },
  {
    id: 8,
    name: "BEAMS Alpine Insulated Jacket",
    price: 399.99,
    description: {
      en: "Advanced breathable insulation for cold, active pursuits",
      fr: "Isolation respirante avancée pour les activités actives par temps froid",
      ja: "寒冷な環境でのアクティブな活動向けの高度な通気性断熱材"
    },
    image: "/placeholder.svg",
    inventory: 4,
    categoryId: 3, // Layers
    sizes: [
      { name: 'SM', inventory: 1 },
      { name: 'MD', inventory: 1 },
      { name: 'LG', inventory: 1 },
      { name: 'XL', inventory: 1 }
    ],
    isLimitedEdition: true,
    collectionId: 1 // BEAMS Collection
  },
  {
    id: 9,
    name: "BEAMS Arctic Parka",
    price: 899.99,
    description: {
      en: "Limited edition collaboration with BEAMS featuring exclusive styling",
      fr: "Collaboration en édition limitée avec BEAMS présentant un style exclusif",
      ja: "BEAMSとの限定コラボレーション、独占的なスタイリングを特徴とする"
    },
    image: "/placeholder.svg",
    inventory: 3,
    categoryId: 1, // Jackets
    sizes: [
      { name: 'SM', inventory: 1 },
      { name: 'MD', inventory: 1 },
      { name: 'LG', inventory: 1 },
      { name: 'XL', inventory: 0 }
    ],
    isLimitedEdition: true,
    collectionId: 1 // BEAMS Collection
  },
  {
    id: 10,
    name: "BEAMS Mountain Hat",
    price: 149.99,
    description: {
      en: "Exclusive BEAMS collaboration headwear with unique pattern",
      fr: "Couvre-chef exclusif en collaboration avec BEAMS avec motif unique",
      ja: "独自のパターンを持つBEAMSコラボレーション限定ヘッドウェア"
    },
    image: "/placeholder.svg",
    inventory: 5,
    categoryId: 4, // Accessories
    sizes: [
      { name: 'SM', inventory: 2 },
      { name: 'MD', inventory: 2 },
      { name: 'LG', inventory: 1 },
      { name: 'XL', inventory: 0 }
    ],
    isLimitedEdition: true,
    collectionId: 1 // BEAMS Collection
  }
];

// Helper function to get products by category
export const getProductsByCategory = (categoryId: number): Product[] => {
  return products.filter(product => product.categoryId === categoryId);
};

// Get unique category IDs from products
export const getUniqueCategories = (): number[] => {
  return [...new Set(products.map(product => product.categoryId))];
};

// Get limited edition products
export const getLimitedEditionProducts = (): Product[] => {
  return products.filter(product => product.isLimitedEdition);
};

// Get products by collection
export const getProductsByCollection = (collectionId: number): Product[] => {
  return products.filter(product => product.collectionId === collectionId);
};
