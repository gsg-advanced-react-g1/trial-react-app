import { toProduct, toSingleProduct } from "../adapters/toProduct";
import type { Category, Product } from "../entities/Product";
import type { ProductsRepository } from "./ProductsRepository";

const Base_URL = "https://dummyjson.com/products";

export const restProducts = (): ProductsRepository => {
  return {
    getAll: async (limit = 0, skip = 0, category?: string): Promise<Product[]> => {
      const url = category && category !== "All Categories"
        ? `${Base_URL}/category/${category}?limit=${limit}&skip=${skip}`
        : `${Base_URL}?limit=${limit}&skip=${skip}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json().then((data) => toProduct(data.products));
    },
    getSpecialOffers: async (minDiscountPercentage = 10, limit = 8) => {
      const response = await fetch(`${Base_URL}?limit=0&skip=0`);
      if (!response.ok) throw new Error("Failed to fetch special offers");

      const data = await response.json();
      const products = toProduct(data.products);

      return products
        .filter((p) => (p.discountPercentage ?? 0) >= minDiscountPercentage)
        .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))
        .slice(0, limit);
    },
    getProductById: async (id: string): Promise<Product | undefined> => {
      const response = await fetch(`${Base_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      return response.json().then((data) => toSingleProduct(data));
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