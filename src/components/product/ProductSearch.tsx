
import React, { useState } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProductSearchProps {
  onSearch: (query: string) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopularSearches, setShowPopularSearches] = useState(false);
  
  // Mock popular searches data
  const popularSearches = [
    "jacket", "pants", "hoodie", "vest", "fleece"
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
    
    // Show popular searches when user starts typing
    setShowPopularSearches(query.length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
    setShowPopularSearches(false);
  };
  
  const handlePopularSearchClick = (term: string) => {
    setSearchQuery(term);
    onSearch(term);
    setShowPopularSearches(false);
  };
  
  const handleSearchFocus = () => {
    if (searchQuery.length > 0) {
      setShowPopularSearches(true);
    }
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
          onFocus={handleSearchFocus}
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
      
      {/* Popular searches section */}
      {!showPopularSearches && (
        <div className="mt-2 flex items-center gap-1 text-sm">
          <TrendingUp className="h-3 w-3 text-muted-foreground" />
          <span className="text-muted-foreground mr-2">Popular:</span>
          <div className="flex flex-wrap gap-1">
            {popularSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs bg-accent/50 border-accent/50 hover:bg-accent"
                onClick={() => handlePopularSearchClick(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Dropdown for search suggestions */}
      {showPopularSearches && searchQuery.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-md animate-fade-in">
          <div className="p-2">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm font-medium">Suggested searches</span>
            </div>
            <ul>
              {popularSearches
                .filter(term => term.includes(searchQuery.toLowerCase()))
                .map(term => (
                  <li 
                    key={term} 
                    className="px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer text-sm"
                    onClick={() => handlePopularSearchClick(term)}
                  >
                    {term}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
