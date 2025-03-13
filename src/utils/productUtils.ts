
import { Product, ProductDescription } from "@/components/product/types";
import { Language } from "@/contexts/LanguageContext";

/**
 * Get the localized description for a product
 */
export const getLocalizedDescription = (
  description: string | ProductDescription,
  language: Language
): string => {
  if (typeof description === 'string') {
    return description;
  }
  
  return description[language] || description.en;
};
