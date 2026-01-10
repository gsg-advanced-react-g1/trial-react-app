import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import { useGetAllProducts } from "../hooks/useGetAllProducts";

export const Products = () => {
  const { products } = useGetAllProducts();

  return (
    <Grid gutter="lg">
      {products.map((product) => (
        <Grid.Col key={product.id}>
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            withBorder
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image Section */}
            <Card.Section>
              <Image
                src={product.image}
                height={180}
                alt={product.name}
                fit="cover"
              />
            </Card.Section>

            {/* Availability Badge */}
            {product.isAvailable && (
              <Badge color="green" variant="light" mt="md" mb="xs">
                Available
              </Badge>
            )}

            {/* Product Name and Sale Badge */}
            <Group justify="space-between" mt="xs" mb="xs">
              <Text fw={700} size="lg" lineClamp={1}>
                {product.name}
              </Text>
              {product.hasDiscounts && (
                <Badge color="pink" variant="filled">
                  Sale
                </Badge>
              )}
            </Group>

            {/* Category */}
            <Badge color="blue" variant="outline" mb="sm">
              {product.category}
            </Badge>

            {/* Price */}
            <Text fw={700} size="xl" mb="sm" c="blue">
              ${product.price.toFixed(2)}
            </Text>

            {/* Description */}
            <Text
              size="sm"
              c="dimmed"
              mb="md"
              lineClamp={3}
              style={{ flexGrow: 1 }}
            >
              {product.description}
            </Text>

            {/* Reviews Count */}
            {product.reviews.length > 0 && (
              <Group gap={4} mb="md">
                <Text size="sm" fw={500}>
                  Reviews: {product.reviews.length}
                </Text>
              </Group>
            )}

            {/* Order Button */}
            <Button color="blue" fullWidth mt="auto" radius="md" size="md">
              Order Now
            </Button>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};
