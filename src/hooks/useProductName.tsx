
import { useMemo, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useProductName(productId: string | number): string {
  const [productName, setProductName] = useState<string>(`Product ${productId}`);
  
  useEffect(() => {
    const fetchProductName = async () => {
      const id = typeof productId === 'string' ? parseInt(productId, 10) : productId;
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('name')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error('Error fetching product name:', error);
          return;
        }
        
        if (data) {
          setProductName(data.name);
        }
      } catch (error) {
        console.error('Error in useProductName hook:', error);
      }
    };
    
    fetchProductName();
  }, [productId]);
  
  return productName;
}
