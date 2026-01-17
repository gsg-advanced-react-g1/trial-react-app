import { useQuery } from "@tanstack/react-query";
import { useProducts } from "..";


export const useGetProductById = (id: string) => {
    const { getProductById } = useProducts();

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        select: (data) => data,
        enabled: !!id,
    });

    return { product, isLoading, isError };
};
