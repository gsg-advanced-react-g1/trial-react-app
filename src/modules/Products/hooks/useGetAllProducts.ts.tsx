import { useProducts } from '..';
import { useQuery } from '@tanstack/react-query';

const reactQueryProductsKey = 'products';

export const useGetAllProducts = () => {
  const { getAll } = useProducts();

  //use react query here now

  const {
    data = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [reactQueryProductsKey],
    queryFn: getAll,
  });
  return { products: data, refetch, isLoading, isError };
};
