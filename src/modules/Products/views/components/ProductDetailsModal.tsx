import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActionIcon, Badge, Button, Rating } from "@mantine/core";
import {
  IconX,
  IconShoppingCart,
  IconTrash,
  IconTags,
  IconPackage,
} from "@tabler/icons-react";
import type { Product } from "../../entities/Product";
import FavoriteButton from "./FavoriteButton";
import ProductBadges from "./ProductBadges";

type ProductDetailsModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  isPrimePick: boolean;
  averageRating: number;
  onToggleFavorite: (productId: string) => void;
  onDelete: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
};

/**
 * Presentational component for product details modal
 * Receives all data and callbacks via props - contains no business logic
 */
export const ProductDetailsModal = ({
  product,
  isOpen,
  onClose,
  isFavorite,
  isPrimePick,
  averageRating,
  onToggleFavorite,
  onDelete,
  onAddToCart,
}: ProductDetailsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  // Focus trap and body scroll lock
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus the modal
      setTimeout(() => modalRef.current?.focus(), 100);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      // Return focus
      previousActiveElement.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!product) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
    onClose();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 lg:p-6"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-200 backdrop-blur-sm border border-white/20"
              aria-label="Close modal"
            >
              <IconX size={18} className="sm:hidden" />
              <IconX size={20} className="hidden sm:block" />
            </button>

            {/* Content - Scrollable */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
              {/* Image Section */}
              <motion.div
                layoutId={`product-image-${product.id}`}
                className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto lg:min-h-[500px] shrink-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent lg:bg-gradient-to-r" />

                {/* Badges */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ProductBadges
                      isPrimePick={isPrimePick}
                      isAvailable={product.isAvailable}
                      hasDiscounts={product.hasDiscounts}
                      size="sm"
                    />
                  </motion.div>
                </div>

                {/* Favorite Button on Image */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:right-4 z-10">
                  <FavoriteButton
                    isFavorite={isFavorite}
                    onClick={handleFavoriteClick}
                    size="lg"
                  />
                </div>
              </motion.div>

              {/* Details Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col"
              >
                {/* Category & Brand */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <Badge
                    size="sm"
                    variant="light"
                    className="!bg-purple-500/20 !text-purple-300 text-[10px] sm:text-xs"
                  >
                    {product.category}
                  </Badge>
                  <span className="text-white/40 text-xs sm:text-sm">•</span>
                  <span className="text-white/60 text-xs sm:text-sm">
                    {product.brand}
                  </span>
                </div>

                {/* Title */}
                <h2
                  id="modal-title"
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight"
                >
                  {product.name}
                </h2>

                {/* Rating */}
                {product.reviews.length > 0 && (
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Rating
                      value={averageRating}
                      fractions={2}
                      readOnly
                      size="sm"
                      className="sm:hidden"
                    />
                    <Rating
                      value={averageRating}
                      fractions={2}
                      readOnly
                      size="md"
                      className="hidden sm:block"
                    />
                    <span className="text-white/60 text-xs sm:text-sm">
                      {averageRating.toFixed(1)} ({product.reviews.length}{" "}
                      reviews)
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 flex-grow">
                  {product.description}
                </p>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <IconTags size={14} className="text-white/50 sm:hidden" />
                      <IconTags
                        size={16}
                        className="text-white/50 hidden sm:block"
                      />
                      <span className="text-white/50 text-xs sm:text-sm font-medium">
                        Tags
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {product.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          size="xs"
                          variant="outline"
                          className="!border-white/20 !text-white/70 text-[10px] sm:text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <IconPackage size={16} className="text-white/50 sm:hidden" />
                  <IconPackage
                    size={18}
                    className="text-white/50 hidden sm:block"
                  />
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      product.isAvailable ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-white/50 text-xs sm:text-sm">
                    Price
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    ${product.price.toFixed(2)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3 mt-auto">
                  <Button
                    fullWidth
                    size="lg"
                    radius="xl"
                    disabled={!product.isAvailable}
                    className="!bg-white !text-slate-900 hover:!bg-white/90 !font-semibold transition-all duration-200 disabled:!bg-white/20 disabled:!text-white/40 !h-14 sm:!h-12 text-base"
                    onClick={handleAddToCart}
                  >
                    <span className="flex items-center gap-2">
                      <IconShoppingCart size={20} className="sm:hidden" />
                      <IconShoppingCart size={22} className="hidden sm:block" />
                      <span>
                        {product.isAvailable ? "Add to Cart" : "Unavailable"}
                      </span>
                    </span>
                  </Button>

                  <ActionIcon
                    variant="light"
                    size="lg"
                    radius="xl"
                    onClick={handleDeleteClick}
                    className="!bg-red-500/10 !text-red-400 hover:!bg-red-500/20 border border-red-500/20 transition-all duration-200 !w-12 !h-12 sm:!w-auto sm:!h-auto"
                    aria-label="Delete product"
                  >
                    <IconTrash size={18} className="sm:hidden" />
                    <IconTrash size={20} className="hidden sm:block" />
                  </ActionIcon>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailsModal;
