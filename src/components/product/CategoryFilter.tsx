
import React from 'react';
import { categories, getCategoryIcon } from './categoryData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategories: number[];
  onSelectCategory: (categoryId: number) => void;
  onClearCategories: () => void;
  productCountByCategory: Record<number, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategories, 
  onSelectCategory,
  onClearCategories,
  productCountByCategory
}) => {
  const totalProducts = Object.values(productCountByCategory).reduce((a, b) => a + b, 0);
  const hasFilters = selectedCategories.length > 0;
  
  const toggleCategory = (categoryId: number) => {
    onSelectCategory(categoryId);
  };
  
  return (
    <div className="mb-4 bg-secondary/10 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-medium text-muted-foreground">Categories</h3>
        </div>
        
        <div className="h-7">
          {hasFilters && (
            <Button
              variant="ghost"
              size="xs"
              className="py-1.5 px-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-md text-xs transition-colors"
              onClick={onClearCategories}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-nowrap overflow-x-auto gap-1.5 pb-1">
        <Button
          variant={!hasFilters ? "outline" : "ghost"}
          size="xs"
          className={`rounded-full whitespace-nowrap h-7 transition-all duration-200 ${
            !hasFilters 
              ? "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/10" 
              : "hover:bg-secondary/80"
          }`}
          onClick={onClearCategories}
        >
          All
          <Badge 
            variant="secondary" 
            className={`ml-1 text-[10px] px-1.5 ${
              !hasFilters
                ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                : "bg-secondary"
            }`}
          >
            {totalProducts}
          </Badge>
        </Button>
        
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          const count = productCountByCategory[category.id] || 0;
          
          if (count === 0) return null;
          
          const isSelected = selectedCategories.includes(category.id);
          
          return (
            <Button
              key={category.id}
              variant={isSelected ? "outline" : "ghost"}
              size="xs"
              className={`rounded-full whitespace-nowrap h-7 transition-all duration-200 ${
                isSelected
                  ? "bg-blue-500/5 border-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-500/10"
                  : "hover:bg-secondary/80"
              }`}
              onClick={() => toggleCategory(category.id)}
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
              
              {isSelected && (
                <X className="h-3 w-3 ml-1 opacity-70" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
