import { Badge } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

type ProductBadgesProps = {
  isPrimePick: boolean;
  isAvailable: boolean;
  hasDiscounts: boolean;
  discountPercentage: number;
  size?: "sm" | "md";
};

const badgeBaseClasses =
  "inline-flex items-center rounded-full font-semibold shadow-lg backdrop-blur-sm";

const sizeClasses = {
  sm: "px-2 py-1 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs gap-1 sm:gap-1.5",
  md: "px-3 py-1.5 text-xs gap-1.5",
};

export const ProductBadges = ({
  isPrimePick,
  isAvailable,
  hasDiscounts,
  discountPercentage,
  size = "md",
}: ProductBadgesProps) => {
  const classes = `${badgeBaseClasses} ${sizeClasses[size]}`;

  return (
    <div className="flex justify-between items-center gap-2">
      <Badge
        color="red"
        variant="filled"
        className="shadow"
      >
        -{Math.round(discountPercentage)}%
      </Badge>
      {isPrimePick && isAvailable && (
        <span className={`${classes} bg-amber-400/95 text-amber-950`}>
          {size === "sm" ? (
            <>
              <IconStar size={12} fill="currentColor" className="sm:hidden" />
              <IconStar
                size={14}
                fill="currentColor"
                className="hidden sm:block"
              />
            </>
          ) : (
            <IconStar size={14} fill="currentColor" />
          )}

        </span>
      )}
      {!isAvailable && (
        <span className={`${classes} bg-red-500/95 text-white`}>
          Out of Stock
        </span>
      )}
      {hasDiscounts && isAvailable && (
        <span className={`${classes} bg-pink-500/95 text-white`}>Sale</span>
      )}
    </div>
  );
};

export default ProductBadges;