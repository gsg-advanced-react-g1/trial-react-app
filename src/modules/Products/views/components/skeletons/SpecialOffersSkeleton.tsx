import ProductCardSkeleton from "./ProductCardSkeleton";

type SpecialOffersSkeletonProps = {
  count?: number;
};

export const SpecialOffersSkeleton = ({
  count = 5,
}: SpecialOffersSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} isConcise />
      ))}
    </>
  );
};

export default SpecialOffersSkeleton;
