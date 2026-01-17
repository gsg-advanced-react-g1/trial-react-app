import { Button, Text } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts.ts";
import { useEffect, useRef, useState } from "react";
import { useDeleteProduct } from "../hooks/useDeleteProduct.ts";
import { useProductModal } from "../hooks/useProductModal.ts";
import SearchBar from "./components/SearchBar.tsx";
import ProductCard from "./components/ProductCard.tsx";
import ProductDetailsModal from "./components/ProductDetailsModal.tsx";
import type { ProductsFilters } from "../entities/Product.ts";
import { PulseLoader } from "react-spinners";

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
  const { deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      console.log("Product deleted successfully");
    },
    onError: () => {
      console.error("Error deleting product:");
    },
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { selectedProduct, isOpen, openModal, closeModal } = useProductModal();

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const calculateAverageRating = (reviews: { rating: number }[]): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const filteredProducts = products?.filter((product) => {
    const q = filters?.search?.toLowerCase() || "";
    return q === ""
      ? product
      : product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
  });

  return (
    <div className="products-page min-h-screen relative">
      {/* Modern background with neon accents */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

        {/* Neon glow accents */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[150px] translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />

        {/* Subtle noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
        {/* Search Bar */}
        <div className="shrink-0">
          <SearchBar setFilters={setFilters} filters={filters} />
        </div>

        {/* Products Grid */}
        <div className="flex-1 min-h-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <PulseLoader color="#a855f7" size={15} />
            </div>
          ) : filteredProducts?.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              <Text size="xl" fw={500} className="!text-white/60">
                No products found
              </Text>
              <Button
                variant="light"
                className="!bg-white/10 !text-white hover:!bg-white/20"
                onClick={() =>
                  setFilters({ search: "", category: "All Categories" })
                }
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {filteredProducts.map((product) => {
                const avgRating = calculateAverageRating(product.reviews);
                const isFavorite = favorites.has(product.id);

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    onDelete={deleteProduct}
                    averageRating={avgRating}
                    onCardClick={openModal}
                  />
                );
              })}

              {/* Loading More Indicator */}
              {isFetchingNextPage && (
                <div className="col-span-full flex justify-center p-4">
                  <PulseLoader color="#a855f7" size={15} />
                </div>
              )}

              {/* Intersection Observer Target */}
              <div ref={observerTarget} className="col-span-full h-5 w-full" />
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={closeModal}
        isFavorite={selectedProduct ? favorites.has(selectedProduct.id) : false}
        onToggleFavorite={toggleFavorite}
        onDelete={deleteProduct}
        averageRating={
          selectedProduct ? calculateAverageRating(selectedProduct.reviews) : 0
        }
      />
    </div>
  );
};
