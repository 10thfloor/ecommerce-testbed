
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles, Ban, User, Save } from 'lucide-react';
import { Product } from '@/components/product/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface RecommendedItemsProps {
  items?: Product[];
  onAddToCart?: (productId: number, price: number) => void;
  inventory?: Record<number, number>;
}

interface UserPreferences {
  interests: string;
  activities: string;
  favoriteColors: string;
  priceRange: string;
}

const RecommendedItems: React.FC<RecommendedItemsProps> = ({ 
  items = [], 
  onAddToCart,
  inventory = {}
}) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: '',
    activities: '',
    favoriteColors: '',
    priceRange: ''
  });

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const savePreferences = () => {
    // Save preferences to local storage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been saved and will be used to improve recommendations.",
    });
    
    setShowPreferences(false);
  };

  // Load preferences from localStorage on initial render
  React.useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  return (
    <div className="card-glass p-4 mb-6 animate-fade-in">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="bg-purple-500/20 rounded-lg p-1 mr-2 animate-pulse-subtle">
            <Sparkles className="h-4 w-4 text-purple-500" />
          </div>
          <h3 className="text-lg font-medium">Recommended For You</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              setShowPreferences(!showPreferences);
            }}
          >
            <User className="h-3.5 w-3.5" />
            <span>Your Preferences</span>
          </Button>
          <button className="p-1 hover:bg-secondary rounded transition-colors">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6">
          {showPreferences ? (
            <div className="bg-card p-4 rounded-lg border border-border animate-fade-in">
              <h4 className="text-base font-medium mb-3">Tell us a bit about yourself</h4>
              <p className="text-sm text-muted-foreground mb-4">
                This information helps us recommend products you might like.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="interests" className="text-sm font-medium block mb-1">
                    Your Interests
                  </label>
                  <Input 
                    id="interests"
                    name="interests"
                    placeholder="Hiking, camping, photography..."
                    value={preferences.interests}
                    onChange={handlePreferenceChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="activities" className="text-sm font-medium block mb-1">
                    Outdoor Activities
                  </label>
                  <Input 
                    id="activities"
                    name="activities"
                    placeholder="Trail running, rock climbing, skiing..."
                    value={preferences.activities}
                    onChange={handlePreferenceChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="favoriteColors" className="text-sm font-medium block mb-1">
                    Favorite Colors
                  </label>
                  <Input 
                    id="favoriteColors"
                    name="favoriteColors"
                    placeholder="Blue, green, black..."
                    value={preferences.favoriteColors}
                    onChange={handlePreferenceChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="priceRange" className="text-sm font-medium block mb-1">
                    Price Range
                  </label>
                  <Input 
                    id="priceRange"
                    name="priceRange"
                    placeholder="Budget, mid-range, premium..."
                    value={preferences.priceRange}
                    onChange={handlePreferenceChange}
                  />
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button 
                    onClick={savePreferences}
                    className="flex items-center gap-1"
                  >
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="bg-muted/30 rounded-full p-4 mb-4">
                    <Ban className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">No recommendations yet</h4>
                  <p className="text-muted-foreground max-w-md">
                    We'll recommend products based on your shopping activity, 
                    including items in your cart, saved items, and watch list.
                  </p>
                </div>
              ) : (
                // This section will be populated with recommended items in the future
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Product recommendation grid will go here */}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedItems;
