// TODO: useSpecialOffersProducts should fetch Next pages (apply pagination)

import { Grid } from "@mantine/core";
import { calculateAverageRating } from "../utils/productUtils";
import ProductCard from "./components/ProductCard";
import { useSpecialOffersProducts } from "../hooks/useSpecialOffersProducts";
import type { Product } from "../entities/Product";

const SpecialProducts = () => {
  const { data: products } = useSpecialOffersProducts(10, 30);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 mx-auto flex min-h-screen max-w-400 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="flex-1 min-h-0">
          <Grid gutter="lg" className="h-full">
            {products?.map((product: Product) => {
              const avgRating = calculateAverageRating(product.reviews);

              return (
                <Grid.Col
                  key={product.id}
                  span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                >
                  <ProductCard
                    product={product}
                    averageRating={avgRating}
                    isConcise={true}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SpecialProducts;
