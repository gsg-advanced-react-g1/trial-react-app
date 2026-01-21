import { createContext, useContext, type PropsWithChildren } from 'react';
import { restProducts } from './repo/restProducts';
import type { ProductsRepository } from './repo/ProductsRepository';

const ProductsContext = createContext<ProductsRepository | null>(null);

type ProductsProviderProps = PropsWithChildren<{
  value: ProductsRepository;
}>;

export const ProductsProvider = ({
  value,
  children,
}: ProductsProviderProps) => {
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === null) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const createProductsModule = () => {
  const value = restProducts();
  return {
    Provider: ({ children }: PropsWithChildren) => (
      <ProductsProvider value={value}>{children}</ProductsProvider>
    ),
  };
};
