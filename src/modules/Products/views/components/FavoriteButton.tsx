import { ActionIcon } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";

interface FavoriteButtonProps {
  productId: string;
  size?: "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const FavoriteButton = ({ 
  productId, 
  size = "lg", 
  radius = "xl" 
}: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggle = () => {
    setIsFavorite((prev) => !prev);
    // TODO: Add favorite logic (e.g., API call or localStorage)
    console.log(`Product ${productId} favorite status:`, !isFavorite);
  };

  return (
    <ActionIcon
      variant={isFavorite ? "filled" : "light"}
      color={isFavorite ? "red" : "gray"}
      size={size}
      radius={radius}
      onClick={handleToggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <IconHeart size={20} fill={isFavorite ? "currentColor" : "none"} />
    </ActionIcon>
  );
};
