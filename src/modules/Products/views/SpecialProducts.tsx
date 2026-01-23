// TODO: useSpecialOffersProducts should fetch Next pages (apply pagination)

import { useSpecialOffersProducts } from "../hooks/useSpecialOffersProducts";
import { ProductsView } from "./ProductsView";

const SpecialProducts = () => {
  const { data: products } = useSpecialOffersProducts(10, 30);

  return (
    <ProductsView products={products ?? []} isConcise={true} />
  );
};

export default SpecialProducts;
