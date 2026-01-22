import { Grid } from "@mantine/core";
import ProductCardSkeleton from "./ProductCardSkeleton";

type ProductGridSkeletonProps = {
  count?: number;
  isConcise?: boolean;
};

export const ProductGridSkeleton = ({
  count = 8,
  isConcise = false,
}: ProductGridSkeletonProps) => {
  return (
    <Grid gutter="lg" className="h-full">
      {Array.from({ length: count }).map((_, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
          <ProductCardSkeleton isConcise={isConcise} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProductGridSkeleton;
