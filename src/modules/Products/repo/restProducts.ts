import { toProduct } from '../adapters/toProduct';
import type { Product } from '../entities/Product';
import type { ProductsRepository } from './ProductsRepository';

const Base_URL = 'https://dummyjson.com/products';

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (limit = 0, skip = 0): Promise<Product[]> => {
      const response = await fetch(`${Base_URL}?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json().then((data) => toProduct(data.products));
    },
  };
};
