
import { useQuery } from "@tanstack/react-query";
import { 
  fetchProducts, 
  fetchCategories, 
  fetchCollections,
  getProductsByCategory,
  getLimitedEditionProducts,
  getProductsByCollection
} from "@/services/productsService";
import { Product, Category, Collection } from "@/components/product/types";

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
}

export function useCollections() {
  return useQuery({
    queryKey: ['collections'],
    queryFn: fetchCollections
  });
}

export function useProductsByCategory(categoryId: number) {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => getProductsByCategory(categoryId),
    enabled: !!categoryId
  });
}

export function useLimitedEditionProducts() {
  return useQuery({
    queryKey: ['products', 'limited-edition'],
    queryFn: getLimitedEditionProducts
  });
}

export function useProductsByCollection(collectionId: number) {
  return useQuery({
    queryKey: ['products', 'collection', collectionId],
    queryFn: () => getProductsByCollection(collectionId),
    enabled: !!collectionId
  });
}
