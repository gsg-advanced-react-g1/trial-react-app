import { type PropsWithChildren } from 'react';
import { ProductsContext } from './context';
import type { ProductsRepository } from './repo/ProductsRepository';

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
