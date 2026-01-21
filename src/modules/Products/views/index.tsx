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

const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950" />
    <div className="absolute left-0 top-0 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[150px]" />
    <div className="absolute right-0 top-1/3 h-125 w-125 translate-x-1/3 rounded-full bg-blue-500/15 blur-[120px]" />
    <div className="absolute bottom-0 left-1/3 h-150 w-150 translate-y-1/2 rounded-full bg-cyan-500/15 blur-[150px]" />
    <div className="absolute bottom-0 right-0 h-100 w-100 translate-x-1/4 translate-y-1/4 rounded-full bg-fuchsia-500/10 blur-[100px]" />
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

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
    <div className="products-page relative min-h-screen">
      <Background />

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
