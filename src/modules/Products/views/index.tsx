import { Button, Text } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts.ts";
import { useDeleteProduct } from "../hooks/useDeleteProduct.ts";
import { useProductModal } from "../hooks/useProductModal.ts";
import { useFavoriteActions } from "../hooks/useFavoriteActions.ts";
import { useProductsFilters } from "../hooks/useProductsFilters.ts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { calculateAverageRating, isPrimePick } from "../utils/productUtils.ts";
import SearchBar from "./components/SearchBar.tsx";
import ProductCard from "./components/ProductCard.tsx";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "@tanstack/react-router";

export const Products = () => {
  // Filters hook manages filter state
  const { filters, setFilters, resetFilters } = useProductsFilters([]);

  // Fetch products with category filter (API-level filtering)
  const {
    products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetAllProducts(filters);

  // Apply search filter to fetched products
  const filteredProducts = (() => {
    const searchQuery = filters.search?.toLowerCase() || "";
    if (searchQuery === "") return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery),
    );
  })();

  // Delete product mutation
  const { deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      console.log("Product deleted successfully");
    },
    onError: () => {
      console.error("Error deleting product:");
    },
  });

  // Infinite scroll observer
  const { observerTarget } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
  });

  // Favorites state management
  const { isFavorite, toggleFavorite } = useFavoriteActions();

  // Modal state management
  // const { selectedProduct, isOpen, openModal, closeModal } = useProductModal();

  const navigate = useNavigate()
  const handleCardClick = (id: string) => {
    navigate({
      to: "/products/$id",
      params: {
        id: id,
      },
    });
  }

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
                onClick={resetFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {filteredProducts.map((product) => {
                const avgRating = calculateAverageRating(product.reviews);
                const productIsPrimePick = isPrimePick(avgRating);
                const productIsFavorite = isFavorite(product.id);

                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={productIsFavorite}
                    isPrimePick={productIsPrimePick}
                    averageRating={avgRating}
                    onToggleFavorite={toggleFavorite}
                    onCardClick={() => handleCardClick(product.id)}
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

      {/*       should be deleted -- a separated products details page will fetch the product by its id
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isOpen}
        onClose={closeModal}
        isFavorite={selectedProduct ? isFavorite(selectedProduct.id) : false}
        isPrimePick={
          selectedProduct
            ? isPrimePick(calculateAverageRating(selectedProduct.reviews))
            : false
        }
        averageRating={
          selectedProduct ? calculateAverageRating(selectedProduct.reviews) : 0
        }
        onToggleFavorite={toggleFavorite}
        onDelete={deleteProduct}
      /> */}
    </div>
  );
};
