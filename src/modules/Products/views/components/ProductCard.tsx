import { Badge, Button, Rating, Tooltip, ActionIcon } from "@mantine/core";
import {
  IconShoppingCart,
  IconHeart,
  IconTrash,
  IconTags,
  IconStar,
} from "@tabler/icons-react";
import type { Product } from "../../entities/Product";

type ProductCardProps = {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onDelete: (productId: string) => void;
  averageRating: number;
  onCardClick?: (product: Product) => void;
};

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  onDelete,
  averageRating,
  onCardClick,
}: ProductCardProps) => {
  const isPrimePick = averageRating >= 4.5;

  const handleCardClick = () => {
    onCardClick?.(product);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
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
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isPrimePick && product.isAvailable && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/95 text-amber-950 text-xs font-semibold shadow-lg backdrop-blur-sm">
            <IconStar size={14} fill="currentColor" />
            Prime Pick
          </span>
        )}
        {!product.isAvailable && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-500/95 text-white text-xs font-semibold shadow-lg backdrop-blur-sm">
            Out of Stock
          </span>
        )}
        {product.hasDiscounts && product.isAvailable && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-pink-500/95 text-white text-xs font-semibold shadow-lg backdrop-blur-sm">
            Sale
          </span>
        )}
      </div>

      {/* Top-Right Favorite Button */}
      <ActionIcon
        variant="filled"
        radius="xl"
        size="lg"
        className="!absolute top-4 right-4 z-10 !bg-white/20 hover:!bg-white/30 backdrop-blur-sm border border-white/30 transition-all duration-200"
        onClick={handleFavoriteClick}
        style={{
          color: isFavorite ? "#ef4444" : "white",
        }}
      >
        <IconHeart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </ActionIcon>

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

        {/* Secondary line: Brand + Category */}
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
          <div className="flex items-center gap-1">
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
