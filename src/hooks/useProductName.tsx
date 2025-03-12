
import { useMemo } from 'react';

const productNameMap: Record<number, string> = {
  1: "Alpha SV Jacket",
  2: "Beta AR Pants",
  3: "Atom LT Hoody",
  4: "Cerium Down Vest",
  5: "Gamma MX Softshell",
  6: "Zeta SL Rain Jacket",
  7: "Covert Fleece",
  8: "BEAMS Alpine Insulated Jacket",
  9: "BEAMS Arctic Parka",
  10: "BEAMS Mountain Hat"
};

export function useProductName(productId: string | number): string {
  return useMemo(() => {
    const id = typeof productId === 'string' ? parseInt(productId, 10) : productId;
    return productNameMap[id] || `Product ${productId}`;
  }, [productId]);
}
