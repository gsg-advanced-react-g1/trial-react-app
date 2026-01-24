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
    search: async (query: string, limit = 0, skip = 0): Promise<Product[]> => {
      const url = `${Base_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to search products");
      }
      return response.json().then((data) => toProduct(data.products));
    },
    getSpecialOffers: async (minDiscountPercentage = 10, limit = 12, skip = 0) => {
      // Fetch more products than needed to account for client-side filtering
      // We fetch 2x the limit to ensure we have enough products after filtering
      const fetchLimit = limit * 2;
      const response = await fetch(`${Base_URL}?limit=${fetchLimit}&skip=${skip}`);
      if (!response.ok) throw new Error("Failed to fetch special offers");

      const data = await response.json();
      const products = toProduct(data.products);
      const totalFetched = products.length;

      // Filter, sort, and return up to the requested limit
      const filtered = products
        .filter((p) => (p.discountPercentage ?? 0) >= minDiscountPercentage)
        .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0))
        .slice(0, limit);

      // Return products with metadata about whether we got a full batch
      return {
        products: filtered,
        hasMore: totalFetched === fetchLimit,
      };
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