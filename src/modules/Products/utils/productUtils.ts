import type { Review } from "../entities/Product";

/**
 * Calculate the average rating from an array of reviews
 */
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};

/**
 * Determine if a product qualifies as a "Prime Pick" based on rating
 */
export const isPrimePick = (averageRating: number): boolean => {
  return averageRating >= 4.5;
};

/**
 * Format a price value to a currency string
 */
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

/**
 * Truncate text to a specified length with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
