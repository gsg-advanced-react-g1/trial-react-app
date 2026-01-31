import { useProducts } from "..";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
    const { getCategories } = useProducts();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories()
    });

    return { data, isLoading, isError };
};
