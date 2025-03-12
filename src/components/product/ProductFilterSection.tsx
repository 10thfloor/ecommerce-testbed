
import React from 'react';
import ProductSearch from './ProductSearch';
import LimitedEditionToggle from './LimitedEditionToggle';
import CategoryFilter from './CategoryFilter';

interface ProductFilterSectionProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  showLimitedEditionOnly: boolean;
  setShowLimitedEditionOnly: (value: boolean) => void;
  limitedEditionCount: number;
  selectedCategories: number[];
  onSelectCategory: (categoryId: number) => void;
  onClearCategories: () => void;
  productCountByCategory: Record<number, number>;
}

const ProductFilterSection = ({
  searchQuery,
  onSearch,
  showLimitedEditionOnly,
  setShowLimitedEditionOnly,
  limitedEditionCount,
  selectedCategories,
  onSelectCategory,
  onClearCategories,
  productCountByCategory
}: ProductFilterSectionProps) => {
  return (
    <div className="space-y-4">
      <ProductSearch onSearch={onSearch} />
      
      <LimitedEditionToggle 
        showLimitedEditionOnly={showLimitedEditionOnly}
        setShowLimitedEditionOnly={setShowLimitedEditionOnly}
        limitedEditionCount={limitedEditionCount}
      />
      
      <CategoryFilter
        selectedCategories={selectedCategories}
        onSelectCategory={onSelectCategory}
        onClearCategories={onClearCategories}
        productCountByCategory={productCountByCategory}
      />
    </div>
  );
};

export default ProductFilterSection;
