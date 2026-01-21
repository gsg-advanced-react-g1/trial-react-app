import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Grid, Loader } from "@mantine/core";
import { PulseLoader } from "react-spinners";

import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { useFavoriteActions } from "../hooks/useFavoriteActions";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { calculateAverageRating, isPrimePick } from "../utils/productUtils";

import type { ProductsFilters } from "../entities/Product";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";


function filterProducts<T extends { name: string; description: string }>(
  products: T[],
  search?: string
) {
  const q = search?.trim().toLowerCase() ?? "";
  if (!q) return products;

  return products.filter((p) => {
    const name = p.name?.toLowerCase() ?? "";
    const desc = p.description?.toLowerCase() ?? "";
    return name.includes(q) || desc.includes(q);
  });
}

const InitialLoading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader size="xl" color="blue" type="dots" />
      <h3 className="text-xl font-bold">Loading Products</h3>
    </div>
  </div>
);

export const Products = () => {
  const navigate = useNavigate();

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

  const filteredProducts = useMemo(
    () => filterProducts(products, filters.search),
    [products, filters.search]
  );

  const handleCardClick = useCallback(
    (id: string) => navigate({ to: "/products/$id", params: { id } }),
    [navigate]
  );

  const { observerTarget } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-400 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="shrink-0">
          <SearchBar setFilters={setFilters} filters={filters} />
        </div>

        <div className="flex-1 min-h-0">
          {isLoading ? (
            <InitialLoading />
          ) : (
            <Grid gutter="lg" className="h-full">
              {filteredProducts.map((product) => {
                const avgRating = calculateAverageRating(product.reviews);
                const productIsPrimePick = isPrimePick(avgRating);

                return (
                  <Grid.Col
                    key={product.id}
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <ProductCard
                      product={product}
                      isFavorite={isFavorite(product.id)}
                      isPrimePick={productIsPrimePick}
                      averageRating={avgRating}
                      onToggleFavorite={toggleFavorite}
                      onCardClick={() => handleCardClick(product.id)}
                    />
                  </Grid.Col>
                );
              })}

              {isFetchingNextPage && (
                <Grid.Col span={12}>
                  <div className="flex justify-center p-4">
                    <PulseLoader color="#000" size={15} />
                  </div>
                </Grid.Col>
              )}
            </Grid>
          )}
        </div>

        <div ref={observerTarget} className="h-5 w-full" />
      </div>
    </div>
  );
};

export default Products;
