import { useQuery } from "@tanstack/react-query";
import { restProducts } from "../repo/restProducts";

export const useSpecialOffersProducts = (
  minDiscountPercentage = 10,
  limit = 12,
) => {
  const { getSpecialOffers } = restProducts();
  return useQuery({
    queryKey: ["special-offers", { minDiscountPercentage, limit }],
    queryFn: () => getSpecialOffers(minDiscountPercentage, limit),
    staleTime: 1000 * 60 * 5,
  });
};
