import { Badge, Stack } from "@mantine/core";

interface ProductBadgesProps {
  hasDiscounts?: boolean;
  isAvailable?: boolean;
  position?: "absolute" | "relative";
  top?: number;
  left?: number;
}

export const ProductBadges = ({
  hasDiscounts = false,
  isAvailable = true,
  position = "absolute",
  top = 20,
  left = 20,
}: ProductBadgesProps) => {
  // Only render if there are badges to show
  if (!hasDiscounts && isAvailable) {
    return null;
  }

  return (
    <Stack
      pos={position}
      top={top}
      left={left}
      gap="xs"
    >
      {hasDiscounts && (
        <Badge color="pink" size="lg" variant="filled">
          Sale
        </Badge>
      )}
      {!isAvailable && (
        <Badge color="red" size="lg" variant="filled">
          Out of Stock
        </Badge>
      )}
    </Stack>
  );
};
