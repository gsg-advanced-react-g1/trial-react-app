import { Badge, Rating, Tooltip } from "@mantine/core";
import { IconTags } from "@tabler/icons-react";
import type { Product } from "../../entities/Product";
import FavoriteButton from "./FavoriteButton";
import ProductBadges from "./ProductBadges";

type ProductCardProps = {
  product: Product;
  isFavorite: boolean;
  isPrimePick: boolean;
  averageRating: number;
  onToggleFavorite: (productId: string) => void;
  onCardClick?: (product: Product) => void;
};

/**
 * Presentational component for displaying a product card
 * Receives all data and callbacks via props - contains no business logic
 */
export const ProductCard = ({
  product,
  isFavorite,
  isPrimePick,
  averageRating,
  onToggleFavorite,
  onCardClick,
}: ProductCardProps) => {
  const handleCardClick = () => {
    onCardClick?.(product);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full h-[420px] rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-slate-800 to-slate-900 cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`View details for ${product.name}`}
    >
      {/* Hero Image - Full card background */}
      <div className="absolute inset-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark gradient overlay at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Top-Left Badge: Prime Pick / Sale / Out of Stock */}
      <div className="absolute top-4 left-4 z-10">
        <ProductBadges
          isPrimePick={isPrimePick}
          isAvailable={product.isAvailable}
          hasDiscounts={product.hasDiscounts}
        />
      </div>

      {/* Top-Right Favorite Button */}
      <div className="absolute top-4 right-4 z-10">
        <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick} />
      </div>

      {/* Bottom Overlay Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        {/* Price - Prominent */}
        <div className="mb-2">
          <span className="text-white/70 text-sm font-medium">List: </span>
          <span className="text-white text-2xl font-bold tracking-tight">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Title */}
        <Tooltip label={product.name} openDelay={500}>
          <h3 className="text-white text-lg font-bold leading-tight line-clamp-1 mb-1">
            {product.name}
          </h3>
        </Tooltip>

        <p className="text-white/70 text-sm mb-3 line-clamp-1">
          {product.brand} • {product.category}
        </p>

        {/* Meta Row: Rating, Tags count, Stock */}
        <div className="flex items-center gap-4 mb-4 text-white/80 text-sm">
          {product.reviews.length > 0 && (
            <div className="flex items-center gap-1.5">
              <Rating value={averageRating} fractions={2} readOnly size="xs" />
              <span className="text-white/60">({product.reviews.length})</span>
            </div>
          )}
          {product.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <IconTags size={14} className="text-white/60" />
              <span>{product.tags.length} tags</span>
            </div>
          )}
          <div className="flex items-center {/* Secondary line: Brand + Category */} gap-1">
            <span
              className={`w-2 h-2 rounded-full ${product.isAvailable ? "bg-emerald-400" : "bg-red-400"}`}
            />
            <span>{product.isAvailable ? "In Stock" : "Sold Out"}</span>
          </div>
        </div>

        {/* Tags Preview */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                size="xs"
                variant="filled"
                className="!bg-white/15 !text-white/90 backdrop-blur-sm !font-medium"
              >
                {tag}
              </Badge>
            ))}
            {product.tags.length > 3 && (
              <Badge
                size="xs"
                variant="filled"
                className="!bg-white/15 !text-white/90 backdrop-blur-sm !font-medium"
              >
                +{product.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Hover enhancement glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[24px] ring-1 ring-white/10" />
    </div>
  );
};

export default ProductCard;
