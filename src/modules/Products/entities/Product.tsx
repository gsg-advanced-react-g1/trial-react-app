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
