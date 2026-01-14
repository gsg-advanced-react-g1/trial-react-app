export type ProductDto = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  stock: number;
  discountPercentage: number;
  reviews: ReviewDto[];
  rating: number;
  isDeleted: boolean;
  tags: string[];
  brand: string;
};

export type ReviewDto = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
