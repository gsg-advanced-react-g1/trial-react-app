import { useProducts } from '..';
import { useInfiniteQuery } from '@tanstack/react-query';

const reactQueryProductsKey = 'products';
const PRODUCTS_PER_PAGE = 8;

export const useGetAllProducts = () => {
  const { getAll } = useProducts();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [reactQueryProductsKey],
    queryFn: ({ pageParam = 0 }) =>
      getAll(PRODUCTS_PER_PAGE, pageParam * PRODUCTS_PER_PAGE),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PRODUCTS_PER_PAGE ? allPages.length : undefined,
    initialPageParam: 0,
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
