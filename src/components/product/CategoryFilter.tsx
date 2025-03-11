
import React from 'react';
import { categories, getCategoryIcon } from './categoryData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: number | null;
  onSelectCategory: (categoryId: number | null) => void;
  productCountByCategory: Record<number, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory,
  productCountByCategory
}) => {
  return (
    <div className="mb-6 bg-secondary/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">Filter by Category</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          className="rounded-full h-9"
          onClick={() => onSelectCategory(null)}
        >
          All Products
          <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary-foreground">
            {Object.values(productCountByCategory).reduce((a, b) => a + b, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          const count = productCountByCategory[category.id] || 0;
          
          // Don't show categories with no products
          if (count === 0) return null;
          
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={`rounded-full h-9 transition-all duration-200 ${
                selectedCategory === category.id 
                  ? "shadow-sm" 
                  : "hover:border-primary/40"
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <Icon className="h-3.5 w-3.5 mr-1.5" />
              {category.name}
              <Badge 
                variant={selectedCategory === category.id ? "secondary" : "outline"} 
                className={`ml-2 ${
                  selectedCategory === category.id 
                    ? "bg-background/20 text-primary-foreground" 
                    : "bg-background/50"
                }`}
              >
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
