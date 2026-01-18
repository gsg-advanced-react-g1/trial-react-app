import { createContext, useContext } from 'react';
import type { ProductsRepository } from './repo/ProductsRepository';

export const ProductsContext = createContext<ProductsRepository | null>(null);

export const useProducts = () => {
    const context = useContext(ProductsContext);

    if (context === null) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }

    return context;
};
