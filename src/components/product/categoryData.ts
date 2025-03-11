
import { Category } from './types';
import { Tag, Package, TreePine, Gem } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 1,
    name: "Jackets",
    description: "Waterproof and insulated jackets for all conditions",
    icon: "Package"
  },
  {
    id: 2,
    name: "Pants",
    description: "Technical pants and bottoms for the outdoors",
    icon: "Tag"
  },
  {
    id: 3,
    name: "Layers",
    description: "Mid layers, base layers and insulation pieces",
    icon: "TreePine"
  },
  {
    id: 4,
    name: "Accessories",
    description: "Hats, gloves, and other essential gear",
    icon: "Gem"
  }
];

// Helper function to get icon component by name
export const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "Tag":
      return Tag;
    case "Package":
      return Package;
    case "TreePine":
      return TreePine;
    case "Gem":
      return Gem;
    default:
      return Package;
  }
};
