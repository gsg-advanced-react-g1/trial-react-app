
export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  isAvailable: boolean;
  hasDiscounts: boolean;
  reviews: Review[];
  rating: number;
  tags: string[];
  brand: string;
  isDeleted: boolean;
};

export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewer: {
    name: string;
    email: string;
  };
};

export type ProductsFilters = {
  category?: string;
}
export type Category = {
  slug: string;
  name: string;
  url: string;
}