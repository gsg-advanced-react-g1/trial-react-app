import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      queryClient.setQueryData(["products"], (oldData: any) => {
        if (!oldData) return undefined;

        return {
          ...oldData,
          pages: oldData.pages.map((page: Product[]) =>
            page.map((product) =>
              product.id === deletedId
                ? { ...product, isDeleted: true }
                : product
            )
          ),
        };
      });

      onSuccess();
    },
    onError: () => {
      onError();
    },
  });

  return { products, isPending, isError, isSuccess, deleteProduct: mutate };
};
