import { toProduct } from "../adapters/toProduct";
import type { Category, Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductsRepository";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (limit = 0, skip = 0): Promise<Product[]> => {
      const response = await fetch(`${Base_URL}?limit=${limit}&skip=${skip}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json().then((data) => toProduct(data.products));
    },
    getCategories: async (): Promise<Category[]> => {
      const response = await fetch(`${Base_URL}/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      return data
    },
    deleteProduct: async (id: string): Promise<void> => {
      const response = await fetch(`${Base_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return;
    },
  };
};