import type { ProductDto } from "../dto/Products";
import type { Product } from "../entities/Product";

/**
 * Maps a single ProductDto to Product entity with safe defaults
 */
const mapProductDto = (product: ProductDto): Product => {
  return {
    id: String(product.id),
    name: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    image: product.thumbnail,
    isAvailable: product.stock > 0,
    hasDiscounts: false,
    rating: product.rating,
    tags: product.tags ?? [],
    brand: product.brand,
    isDeleted: false,
    reviews: (product.reviews ?? []).map((review) => ({
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      reviewer: {
        name: review.reviewerName,
        email: review.reviewerEmail,
      },
    })),
  };
};

export const toProduct = (products: ProductDto[]): Product[] => {
  return products.map(mapProductDto);
};

export const toSingleProduct = (product: ProductDto): Product => {
  return mapProductDto(product);
};
