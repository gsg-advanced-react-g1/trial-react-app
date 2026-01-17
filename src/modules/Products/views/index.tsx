import {
  Grid
} from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts.ts";
import { useFavoriteActions } from "../hooks/useFavoriteActions.ts";

import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { calculateAverageRating, isPrimePick } from "../utils/productUtils.ts";
import ProductCard from "./components/ProductCard.tsx";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { ProductsFilters } from "../entities/Product.tsx";
import SearchBar from "./components/SearchBar.tsx";


export const Products = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ProductsFilters>({
    category: "All Categories",
    search: "",
  });
  const { products, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading, isError } =
    useGetAllProducts(filters);

  const filteredProducts = (() => {
    const searchQuery = filters.search?.toLowerCase() || "";
    if (searchQuery === "") return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery),
    );
  })();

  const { observerTarget } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });
  const { isFavorite, toggleFavorite } = useFavoriteActions();

  const handleCardClick = (id: string) => {
    navigate({ to: `/products/${id}` });
  }
  return (
    <div className="products-page min-h-screen relative">

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px] translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="shrink-0">
          <SearchBar setFilters={setFilters} filters={filters} />
        </div>
        <Grid gutter="lg">
          {filteredProducts?.map((product) => {
            const avgRating = calculateAverageRating(product.reviews);
            const productIsFavorite = isFavorite(product.id);
            const productIsPrimePick = isPrimePick(avgRating);

            return (
              <Grid.Col
                key={product.id}
                span={{ base: 12, sm: 6, md: 4, lg: 3 }}
              >
                <ProductCard
                  product={product}
                  isFavorite={productIsFavorite}
                  isPrimePick={productIsPrimePick}
                  averageRating={avgRating}
                  onToggleFavorite={toggleFavorite}
                  onCardClick={() => handleCardClick(product.id)}
                />
              </Grid.Col>
            );
          })}

          {isFetchingNextPage && (
            <Grid.Col span={{ base: 12 }}>
              <div className="flex justify-center p-4">
                <PulseLoader color="#000" size={15} />
              </div>
            </Grid.Col>
          )}
        </Grid>

        <div ref={observerTarget} className="h-5 w-full" />
      </div>
    </div>
  );
}
export default Products;