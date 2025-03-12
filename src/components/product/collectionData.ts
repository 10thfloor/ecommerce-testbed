
import { Collection, Product } from './types';

export const collections: Collection[] = [
  {
    id: 1,
    name: "BEAMS",
    description: "Exclusive collaboration with the iconic Japanese retailer",
    startDate: "2023-07-15T08:00:00Z",
    endDate: "2023-08-15T23:59:59Z",
    isActive: true,
    theme: {
      primary: "purple",
      secondary: "pink"
    }
  },
  {
    id: 2,
    name: "Alpine Heritage",
    description: "Limited edition pieces inspired by our mountain legacy",
    startDate: "2023-09-01T00:00:00Z",
    endDate: "2023-09-30T23:59:59Z",
    isActive: false,
    theme: {
      primary: "blue",
      secondary: "teal"
    }
  }
];

// Sample limited edition products for the BEAMS collection
export const limitedEditionProducts: Product[] = [
  {
    id: 101,
    name: "BEAMS × Alpine Fusion Jacket",
    price: 899.99,
    description: "Limited edition collaboration jacket featuring Japanese-inspired design elements and premium construction",
    image: "/placeholder.svg",
    inventory: 25,
    categoryId: 1, // Jackets
    collectionId: 1, // BEAMS collection
    isLimitedEdition: true,
    sizes: [
      { name: 'SM', inventory: 5 },
      { name: 'MD', inventory: 10 },
      { name: 'LG', inventory: 7 },
      { name: 'XL', inventory: 3 }
    ]
  },
  {
    id: 102,
    name: "BEAMS × Alpine Graphic Tee",
    price: 119.99,
    description: "Exclusive graphic t-shirt featuring custom artwork from BEAMS' lead designer",
    image: "/placeholder.svg",
    inventory: 50,
    categoryId: 3, // Layers
    collectionId: 1, // BEAMS collection
    isLimitedEdition: true,
    sizes: [
      { name: 'SM', inventory: 15 },
      { name: 'MD', inventory: 20 },
      { name: 'LG', inventory: 10 },
      { name: 'XL', inventory: 5 }
    ]
  },
  {
    id: 103,
    name: "BEAMS × Alpine Tech Cap",
    price: 79.99,
    description: "Technical cap with co-branded details and weather-resistant fabric",
    image: "/placeholder.svg",
    inventory: 35,
    categoryId: 4, // Accessories
    collectionId: 1, // BEAMS collection
    isLimitedEdition: true,
    sizes: [
      { name: 'SM', inventory: 15 },
      { name: 'MD', inventory: 15 },
      { name: 'LG', inventory: 5 },
      { name: 'XL', inventory: 0 }
    ]
  }
];

// Helper function to get collection by ID
export const getCollectionById = (id: number): Collection | undefined => {
  return collections.find(collection => collection.id === id);
};

// Helper function to get products by collection ID
export const getProductsByCollection = (collectionId: number): Product[] => {
  return limitedEditionProducts.filter(product => product.collectionId === collectionId);
};

// Helper function to check if a collection is active
export const isCollectionActive = (collection: Collection): boolean => {
  const now = new Date();
  const startDate = new Date(collection.startDate);
  const endDate = new Date(collection.endDate);
  
  return now >= startDate && now <= endDate;
};

// Helper function to get remaining time for a collection (in seconds)
export const getCollectionRemainingTime = (collection: Collection): number => {
  const now = new Date();
  const endDate = new Date(collection.endDate);
  
  if (now > endDate) return 0;
  
  return Math.floor((endDate.getTime() - now.getTime()) / 1000);
};
