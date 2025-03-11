
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative mb-4">
      <div className="flex items-center bg-secondary/50 rounded-md px-3 focus-within:ring-2 focus-within:ring-primary/40">
        <Search className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 px-0 text-sm placeholder:text-muted-foreground/70"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="text-muted-foreground hover:text-foreground p-1 rounded-full focus:outline-none"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
