import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";



export const useDeleteProduct = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const { deleteProduct } = useProducts();
  const queryClient = useQueryClient();
  const {
    data: products = [],
    mutate,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, deletedId) => {
      // Update List Cache with Query Key Filter
      queryClient.setQueriesData({ queryKey: ["products"] }, (oldData: InfiniteData<Product[]> | undefined) => {
        if (!oldData) return undefined;
        return {
          ...oldData,
          pages: oldData.pages.map((page: Product[]) =>
            page.map((product) =>
              String(product.id) === String(deletedId)
                ? { ...product, isDeleted: true }
                : product
            )
          ),
        };
      });

      onSuccess();

      // 3. Update Single Product Cache
      queryClient.setQueryData(["product", String(deletedId)], null);
    },
    onError: () => {
      onError();
    },
  });

  return { products, isPending, isError, isSuccess, deleteProduct: mutate };
};
