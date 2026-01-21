import { useFeatureFlag } from "../../FeatureFlags";
import SpecialOffersContainer from "../components/SpecialOffersContainer";
import type { Product } from "../../Products/entities/Product";
import ProductCard from "../../Products/views/components/ProductCard";
import { calculateAverageRating } from "../../Products/utils/productUtils";
import { useNavigate } from "@tanstack/react-router";
import { useSpecialOffersProducts } from "../../Products/hooks/useSpecialOffersProducts";

const Home = () => {
  const isSpecialOffersEnabled = useFeatureFlag("isSpecialOffersEnabled");
  const { data: products } = useSpecialOffersProducts(10, 5);
  const navigate = useNavigate();

  return <>
    <h2 className="text-2xl">Welcome Home</h2>
    {
      isSpecialOffersEnabled &&
      <SpecialOffersContainer title="Special Offers" subtitle="Check out our special offers">
        {
          products?.map((item: Product) => (
            <ProductCard product={item} averageRating={calculateAverageRating(item.reviews)} isConcise={true} onCardClick={() => { navigate({ to: `/products/${item.id}` }) }} />
          ))
        }
      </SpecialOffersContainer>
    }
  </>;
};

export default Home
