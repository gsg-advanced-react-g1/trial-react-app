import type { Category, Product } from '../entities/Product';

export interface ProductsRepository {
  getAll: (limit: number, skip: number) => Promise<Product[]>;
  getCategories: () => Promise<Category[]>;
  deleteProduct: (id: string) => Promise<void>;
}
