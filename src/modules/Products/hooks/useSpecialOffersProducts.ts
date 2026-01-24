import { useInfiniteQuery } from "@tanstack/react-query";
import { useProducts } from "..";
import type { Product } from "../entities/Product";

const SPECIAL_OFFERS_PER_PAGE = 8;

type SpecialOffersPage = {
    products: Product[];
    hasMore: boolean;
};

export const useSpecialOffersProducts = (minDiscountPercentage = 10) => {
    const { getSpecialOffers } = useProducts();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ["special-offers", minDiscountPercentage],
        queryFn: ({ pageParam = 0 }) => {
            // Skip by the number of products we fetch from API (2x the limit)
            // This ensures we don't overlap batches
            const fetchLimit = SPECIAL_OFFERS_PER_PAGE * 2;
            return getSpecialOffers(
                minDiscountPercentage,
                SPECIAL_OFFERS_PER_PAGE,
                pageParam * fetchLimit
            );
        },
        getNextPageParam: (lastPage: SpecialOffersPage, allPages) => {
            // If the API didn't return a full batch, we've exhausted all products
            if (!lastPage.hasMore) {
                return undefined;
            }
            // If we got fewer products than requested after filtering, we might have exhausted
            // But since hasMore is true, let's try one more page to be sure
            // Continue if we got any products and the API has more
            return lastPage.products.length > 0 ? allPages.length : undefined;
        },
        initialPageParam: 0,
        staleTime: 1000 * 60 * 5,
    });

    const products = data?.pages.flatMap((page) => page.products) ?? [];

    return {
        products,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    };
};

