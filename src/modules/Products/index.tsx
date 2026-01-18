import { type PropsWithChildren } from 'react';
import { restProducts } from './repo/restProducts';
import { ProductsProvider } from './ProductsProvider';

export { useProducts } from './context';

export const createProductsModule = () => {
  const value = restProducts();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <ProductsProvider value={value}>{children}</ProductsProvider>
    ),
  };
};
