import { Grid, Loader } from "@mantine/core";
import { PulseLoader } from "react-spinners";
import type { Product } from "../entities/Product";
import { calculateAverageRating, isPrimePick } from "../utils/productUtils";
import ProductCard from "./components/ProductCard";
import { useProductNavigation } from "../hooks/useProductNavigation";

type ProductsViewProps = {
  products: Product[];
  header?: React.ReactNode;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  observerTarget?: React.RefObject<HTMLDivElement>;
  isFavorite?: (id: string) => boolean;
  onToggleFavorite?: (id: string) => void;
  isConcise?: boolean;
  showPrimePick?: boolean;
};

const InitialLoading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader size="xl" color="blue" type="dots" />
      <h3 className="text-xl font-bold">Loading Products</h3>
    </div>
  </div>
);

export const ProductsView = ({
  products,
  header,
  isLoading = false,
  isFetchingNextPage = false,
  observerTarget,
  isFavorite,
  onToggleFavorite,
  isConcise = false,
  showPrimePick = false,
}: ProductsViewProps) => {
  const { handleCardClick } = useProductNavigation();

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-400 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        {header && <div className="shrink-0">{header}</div>}

        <div className="flex-1 min-h-0">
          {isLoading ? (
            <InitialLoading />
          ) : (
            <Grid gutter="lg" className="h-full">
              {products.map((product) => {
                const avgRating = calculateAverageRating(product.reviews);
                const productIsPrimePick = showPrimePick
                  ? isPrimePick(avgRating)
                  : false;

                return (
                  <Grid.Col
                    key={product.id}
                    span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                  >
                    <ProductCard
                      product={product}
                      isFavorite={isFavorite?.(product.id) ?? false}
                      isPrimePick={productIsPrimePick}
                      averageRating={avgRating}
                      onToggleFavorite={onToggleFavorite}
                      isConcise={isConcise}
                      onCardClick={() => handleCardClick(product.id)}
                    />
                  </Grid.Col>
                );
              })}

              {isFetchingNextPage && (
                <Grid.Col span={12}>
                  <div className="flex justify-center p-4">
                    <PulseLoader color="#000" size={15} />
                  </div>
                </Grid.Col>
              )}
            </Grid>
          )}
        </div>

        {observerTarget && (
          <div ref={observerTarget} className="h-5 w-full" />
        )}
      </div>
    </div>
  );
};
