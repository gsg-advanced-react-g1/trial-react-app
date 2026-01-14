import { useProducts } from "..";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Product } from "../entities/Product";
import type { ProductsFilters } from "../entities/Product";

const reactQueryProductsKey = "products";
const PRODUCTS_PER_PAGE = 8;

export const useGetAllProducts = (filters?: ProductsFilters) => {
  const { getAll } = useProducts();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [reactQueryProductsKey, filters?.category],
    queryFn: ({ pageParam = 0 }) =>
      getAll(PRODUCTS_PER_PAGE, pageParam * PRODUCTS_PER_PAGE, filters?.category),
    getNextPageParam: (lastPage: Product[], allPages) =>
      lastPage.length === PRODUCTS_PER_PAGE ? allPages.length : undefined,
    initialPageParam: 0,
    select: (data) => ({
      ...data,
      pages: data.pages.map((page) =>
        page.filter((product) => !product.isDeleted)
      ),
    }),
  });

  const products = data?.pages.flat() ?? [];

  return {
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
};
