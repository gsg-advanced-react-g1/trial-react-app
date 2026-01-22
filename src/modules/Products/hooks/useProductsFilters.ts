import { useState, useCallback, useMemo } from "react";
import type { Product, ProductsFilters } from "../entities/Product";

const DEFAULT_FILTERS: ProductsFilters = {
  category: "All Categories",
  search: "",
};

export const useProductsFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<ProductsFilters>(DEFAULT_FILTERS);

  const updateFilters = useCallback((updates: Partial<ProductsFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const setCategory = useCallback((category: string) => {
    setFilters((prev) => ({
      ...prev,
      category,
    }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({
      ...prev,
      search,
    }));
  }, []);

  const filteredProducts = useMemo(() => {
    const searchQuery = filters.search?.toLowerCase() || "";

    if (searchQuery === "") {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery),
    );
  }, [products, filters.search]);

  return {
    filters,
    setFilters,
    updateFilters,
    resetFilters,
    setCategory,
    setSearch,
    filteredProducts,
  };
};