
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
    <div className="mb-4 bg-secondary/10 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="h-3.5 w-3.5 text-primary" />
        <h3 className="text-xs font-medium text-muted-foreground">Categories</h3>
      </div>
      
      <div className="flex flex-nowrap overflow-x-auto gap-1.5 pb-1">
        <Button
          variant={selectedCategory === null ? "outline" : "ghost"}
          size="xs"
          className={`rounded-full whitespace-nowrap transition-all duration-200 ${
            selectedCategory === null 
              ? "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/10" 
              : "hover:bg-secondary/80"
          }`}
          onClick={() => onSelectCategory(null)}
        >
          All
          <Badge 
            variant="secondary" 
            className={`ml-1 text-[10px] px-1.5 ${
              selectedCategory === null
                ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                : "bg-secondary"
            }`}
          >
            {Object.values(productCountByCategory).reduce((a, b) => a + b, 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          const count = productCountByCategory[category.id] || 0;
          
          if (count === 0) return null;
          
          const isSelected = selectedCategory === category.id;
          
          return (
            <Button
              key={category.id}
              variant={isSelected ? "outline" : "ghost"}
              size="xs"
              className={`rounded-full whitespace-nowrap transition-all duration-200 ${
                isSelected
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/10"
                  : "hover:bg-secondary/80"
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {category.name}
              <Badge 
                variant="secondary"
                className={`ml-1 text-[10px] px-1.5 ${
                  isSelected
                    ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                    : "bg-secondary"
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
