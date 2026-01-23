import { useSpecialOffersProducts } from "../hooks/useSpecialOffersProducts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { ProductsView } from "./ProductsView";

const SpecialProducts = () => {
  const {
    products,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useSpecialOffersProducts(10);

  const { observerTarget } = useInfiniteScroll({
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <ProductsView
      products={products}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      observerTarget={observerTarget as React.RefObject<HTMLDivElement>}
      isConcise={true}
    />
  );
};

export default SpecialProducts;
