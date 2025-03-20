
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
import { useCategories } from '@/hooks/useProducts';

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
  const { data: categories = [], isLoading } = useCategories();
  
  if (isLoading) {
    return <div className="text-muted-foreground text-sm">Loading categories...</div>;
  }
  
  return (
    <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Filter by Category</span>
        </div>
        
        {selectedCategories.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearCategories}
            className="h-7 text-xs"
          >
            Clear All
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const isSelected = selectedCategories.includes(category.id);
          const count = productCountByCategory[category.id] || 0;
          
          return (
            <Badge
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer ${isSelected ? 'bg-primary' : 'hover:bg-secondary'}`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
              {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
