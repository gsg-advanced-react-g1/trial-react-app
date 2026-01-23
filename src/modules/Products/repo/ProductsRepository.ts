import type { Category, Product } from '../entities/Product';

export interface ProductsRepository {
  getAll: (limit: number, skip: number, category?: string) => Promise<Product[]>;
  search: (query: string, limit?: number, skip?: number) => Promise<Product[]>;
  getSpecialOffers: (minDiscountPercentage: number, limit: number, skip: number) => Promise<{ products: Product[]; hasMore: boolean }>;
  getProductById: (id: string) => Promise<Product | undefined>;
  getCategories: () => Promise<Category[]>;
  deleteProduct: (id: string) => Promise<void>;
}
