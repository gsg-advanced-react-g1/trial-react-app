import { useFeatureFlag } from "../../FeatureFlags";
import SpecialOffersContainer from "../components/SpecialOffersContainer";
import SpecialOffersSkeleton from "../../Products/views/components/skeletons/SpecialOffersSkeleton";
import type { Product } from "../../Products/entities/Product";
import ProductCard from "../../Products/views/components/ProductCard";
import { calculateAverageRating } from "../../Products/utils/productUtils";
import { useNavigate } from "@tanstack/react-router";
import { useSpecialOffersProducts } from "../../Products/hooks/useSpecialOffersProducts";

const Home = () => {
  const isSpecialOffersEnabled = useFeatureFlag("isSpecialOffersEnabled");
  const { data: products, isLoading } = useSpecialOffersProducts(10, 5);
  const navigate = useNavigate();

  const isInitialLoad = isLoading && !products;

  return (
    <>
      <h2 className="text-2xl">Welcome Home</h2>
      {isSpecialOffersEnabled && (
        <SpecialOffersContainer
          title="Special Offers"
          subtitle="Check out our special offers"
        >
          {isInitialLoad ? (
            <SpecialOffersSkeleton count={5} />
          ) : (
            products?.map((item: Product) => (
              <ProductCard
                key={item.id}
                product={item}
                averageRating={calculateAverageRating(item.reviews)}
                isConcise={true}
                onCardClick={() => {
                  navigate({ to: `/products/${item.id}` });
                }}
              />
            ))
          )}
        </SpecialOffersContainer>
      )}
    </>
  );
};

export default Home;
