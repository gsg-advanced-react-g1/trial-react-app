import type { Product } from '../entities/Product';

export interface ProductsRepository {
  getAll: (limit: number, skip: number) => Promise<Product[]>;
}
