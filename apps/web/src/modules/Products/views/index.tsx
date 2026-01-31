import { useState } from "react";

import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { useFavoriteActions } from "../hooks/useFavoriteActions";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

import type { ProductsFilters } from "../entities/Product";
import SearchBar from "./components/SearchBar";
import { ProductsView } from "./ProductsView";

export const Products = () => {
  const [filters, setFilters] = useState<ProductsFilters>({
    category: "All Categories",
    search: "",
  });

  const {
    products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetAllProducts(filters);

  const { isFavorite, toggleFavorite } = useFavoriteActions();

  const { observerTarget } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <ProductsView
      products={products}
      header={<SearchBar setFilters={setFilters} filters={filters} />}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      observerTarget={observerTarget as React.RefObject<HTMLDivElement>}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      showPrimePick={true}
    />
  );
};

export default Products;
