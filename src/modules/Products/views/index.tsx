import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Text,
  Stack,
  Rating,
  Tooltip,
  ActionIcon,
  Paper,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconHeart,
  IconEye,
  IconTags,
} from "@tabler/icons-react";
import { useGetAllProducts } from "../hooks/useGetAllProducts.ts";
import { useState } from "react";

export const Products = () => {
  const { products } = useGetAllProducts();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const calculateAverageRating = (
    reviews: { rating: number }[]
  ): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  return (
    <Grid gutter="lg">
      {products.map((product) => {
        const avgRating = calculateAverageRating(product.reviews);
        const isFavorite = favorites.has(product.id);

        return (
          <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              className="product-card"
            >
              {/* Badges Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {!product.isAvailable && (
                  <Badge color="red" variant="filled" size="lg">
                    Out of Stock
                  </Badge>
                )}
                {product.hasDiscounts && product.isAvailable && (
                  <Badge color="pink" variant="filled" size="lg">
                    Sale
                  </Badge>
                )}
              </div>

              {/* Favorite Icon */}
              <ActionIcon
                variant="filled"
                color={isFavorite ? "red" : "gray"}
                radius="xl"
                size="lg"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 2,
                }}
                onClick={() => toggleFavorite(product.id)}
              >
                <IconHeart
                  size={18}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </ActionIcon>

              {/* Image Section */}
              <Card.Section>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src={product.image}
                    height={220}
                    alt={product.name}
                    fit="cover"
                    style={{
                      transition: "transform 0.3s ease",
                    }}
                    className="product-image"
                  />
                  {/* Quick View Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      padding: "1rem",
                    }}
                    className="quick-view-overlay"
                  >
                    <Button
                      variant="white"
                      leftSection={<IconEye size={16} />}
                      size="sm"
                    >
                      Quick View
                    </Button>
                  </div>
                </div>
              </Card.Section>

              {/* Content Section */}
              <Stack gap="xs" mt="md" style={{ flexGrow: 1 }}>
                {/* Brand & Category */}
                <Group justify="space-between" gap="xs">
                  <Badge color="gray" variant="light" size="sm">
                    {product.brand}
                  </Badge>
                  <Badge color="blue" variant="dot" size="sm">
                    {product.category}
                  </Badge>
                </Group>

                {/* Product Name */}
                <Tooltip label={product.name} openDelay={500}>
                  <Text fw={600} size="md" lineClamp={2} style={{ minHeight: 48 }}>
                    {product.name}
                  </Text>
                </Tooltip>

                {/* Rating */}
                {product.reviews.length > 0 && (
                  <Group gap={6}>
                    <Rating value={avgRating} fractions={2} readOnly size="sm" />
                    <Text size="sm" c="dimmed">
                      ({product.reviews.length})
                    </Text>
                  </Group>
                )}

                {/* Description */}
                <Text size="sm" c="dimmed" lineClamp={2} style={{ flexGrow: 1 }}>
                  {product.description}
                </Text>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <Group gap={4}>
                    <IconTags size={14} color="gray" />
                    {product.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} size="xs" variant="outline" color="gray">
                        {tag}
                      </Badge>
                    ))}
                    {product.tags.length > 2 && (
                      <Badge size="xs" variant="outline" color="gray">
                        +{product.tags.length - 2}
                      </Badge>
                    )}
                  </Group>
                )}

                {/* Price Section */}
                <Paper
                  p="xs"
                  radius="md"
                  style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    marginTop: "auto",
                  }}
                >
                  <Group justify="space-between" align="center">
                    <div>
                      <Text size="xs" c="white" opacity={0.9}>
                        Price
                      </Text>
                      <Text fw={700} size="xl" c="white">
                        ${product.price.toFixed(2)}
                      </Text>
                    </div>
                    <ActionIcon
                      variant="white"
                      size="xl"
                      radius="md"
                      disabled={!product.isAvailable}
                    >
                      <IconShoppingCart size={20} />
                    </ActionIcon>
                  </Group>
                </Paper>

                {/* Action Button */}
                <Button
                  color="blue"
                  fullWidth
                  radius="md"
                  size="md"
                  disabled={!product.isAvailable}
                  leftSection={<IconShoppingCart size={18} />}
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  {product.isAvailable ? "Add to Cart" : "Out of Stock"}
                </Button>
              </Stack>

              {/* Inline Styles for Hover Effects */}
              <style>{`
                .product-card:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
                }
                .product-card:hover .product-image {
                  transform: scale(1.05);
                }
                .product-card:hover .quick-view-overlay {
                  opacity: 1;
                }
              `}</style>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};