import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Alpha SV Jacket",
    price: 799.99,
    description: "Premium waterproof hardshell for extreme alpine conditions",
    image: "/placeholder.svg",
    inventory: 5,
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
    description: "All-round mountaineering pants with GORE-TEX protection",
    image: "/placeholder.svg",
    inventory: 8,
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
    description: "Lightweight insulated mid-layer with exceptional breathability",
    image: "/placeholder.svg",
    inventory: 12,
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
    description: "Ultralight 850 fill-power down vest for alpine climbing",
    image: "/placeholder.svg",
    inventory: 3,
    sizes: [
      { name: 'SM', inventory: 1 },
      { name: 'MD', inventory: 1 },
      { name: 'LG', inventory: 1 },
      { name: 'XL', inventory: 0 }
    ]
  },
  {
    id: 5,
    name: "Gamma MX Softshell",
    price: 349.99,
    description: "Versatile softshell jacket for mixed weather conditions",
    image: "/placeholder.svg",
    inventory: 2,
    sizes: [
      { name: 'SM', inventory: 0 },
      { name: 'MD', inventory: 1 },
      { name: 'LG', inventory: 1 },
      { name: 'XL', inventory: 0 }
    ]
  },
  {
    id: 6,
    name: "Zeta SL Rain Jacket",
    price: 299.99,
    description: "Superlight emergency rain protection for hiking",
    image: "/placeholder.svg",
    inventory: 0,
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
    description: "Classic fleece with a clean aesthetic for everyday wear",
    image: "/placeholder.svg",
    inventory: 15,
    sizes: [
      { name: 'SM', inventory: 4 },
      { name: 'MD', inventory: 4 },
      { name: 'LG', inventory: 4 },
      { name: 'XL', inventory: 3 }
    ]
  },
  {
    id: 8,
    name: "Proton AR Insulated",
    price: 399.99,
    description: "Advanced breathable insulation for cold, active pursuits",
    image: "/placeholder.svg",
    inventory: 4,
    sizes: [
      { name: 'SM', inventory: 1 },
      { name: 'MD', inventory: 1 },
      { name: 'LG', inventory: 1 },
      { name: 'XL', inventory: 1 }
    ]
  }
];
