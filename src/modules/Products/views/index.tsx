import { useGetAllProducts } from '../hooks/useGetAllProducts.ts';

const Products = () => {
  const { products } = useGetAllProducts();

  console.log('products', products);
  return <div>Products</div>;
};

export default Products;
