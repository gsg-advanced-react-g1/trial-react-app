import { Grid } from "@mantine/core";
import ProductCardSkeleton from "./ProductCardSkeleton";

type InfiniteScrollSkeletonProps = {
  count?: number;
};

export const InfiniteScrollSkeleton = ({
  count = 4,
}: InfiniteScrollSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Grid.Col
          key={`skeleton-${index}`}
          span={{ base: 12, sm: 6, md: 4, lg: 3 }}
        >
          <ProductCardSkeleton />
        </Grid.Col>
      ))}
    </>
  );
};

export default InfiniteScrollSkeleton;
