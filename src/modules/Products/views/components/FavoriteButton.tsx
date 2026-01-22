import { ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

type FavoriteButtonProps = {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Reusable presentational component for favorite/heart button
 * Contains zero business logic - all actions via callbacks
 */
export const FavoriteButton = ({
  isFavorite,
  onClick,
  size = "lg",
  className = "",
}: FavoriteButtonProps) => {
  const iconSizes = {
    sm: { mobile: 16, desktop: 18 },
    md: { mobile: 18, desktop: 20 },
    lg: { mobile: 18, desktop: 22 },
  };

  const { mobile, desktop } = iconSizes[size];

  return (
    <ActionIcon
      variant="filled"
      radius="xl"
      size={size}
      className={`!bg-white/20 hover:!bg-white/30 backdrop-blur-sm border border-white/30 transition-all duration-200 ${className}`}
      onClick={onClick}
      style={{ color: isFavorite ? "#ef4444" : "white" }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <IconHeart
        size={mobile}
        fill={isFavorite ? "currentColor" : "none"}
        className="sm:hidden"
      />
      <IconHeart
        size={desktop}
        fill={isFavorite ? "currentColor" : "none"}
        className="hidden sm:block"
      />
    </ActionIcon>
  );
};

export default FavoriteButton;
