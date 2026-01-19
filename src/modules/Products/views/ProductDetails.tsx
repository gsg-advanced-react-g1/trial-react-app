import { useNavigate, getRouteApi } from "@tanstack/react-router";
import { useGetProductById } from "../hooks/useGetProductById";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useFavoriteActions } from "../hooks/useFavoriteActions";
import {
  Button,
  Container,
  Group,
  Image,
  Text,
  Badge,
  Rating,
  Stack,
  Loader,
  Center,
  Grid,
  Title,
  Paper,
  Avatar,
  Divider,
  ActionIcon,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconTrash,
  IconShoppingCart,
  IconShare,
} from "@tabler/icons-react";
import { FavoriteButton } from "./components/FavoriteButton";
import { ProductBadges } from "./components/ProductBadges";

export const ProductDetails = () => {
  const route = getRouteApi('/products/$productId');
  const { productId } = route.useParams();
  const navigate = useNavigate({ from: '/products/$productId' });
  const { product, isLoading, isError } = useGetProductById(productId || "");
  const { isFavorite, toggleFavorite } = useFavoriteActions();

  const { deleteProduct, isPending: isDeleting, isSuccess: isDeletedSuccess } = useDeleteProduct({
    onSuccess: () => {
      navigate({ to: "/products" });
    },
    onError: () => {
      console.error("Failed to delete product");
    },
  });

  if (isDeleting || isDeletedSuccess) {
    return null;
  }

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="xl" color="blue" type="dots" />
      </Center>
    );
  }

  if (isError || !product) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="lg" mt="xl">
          <Text c="red" size="xl" fw={700}>
            Product not found.
          </Text>
          <Text c="dimmed">
            The product you are looking for might have been removed or is temporarily unavailable.
          </Text>
          <Button
            leftSection={<IconArrowLeft />}
            onClick={() => navigate({ to: "/products" })}
            variant="light"
            size="md"
          >
            Back to Store
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Button
        variant="subtle"
        color="gray"
        leftSection={<IconArrowLeft size={18} />}
        onClick={() => navigate({ to: "/products" })}
        mb="lg"
      >
        Back to Products
      </Button>

      <Paper shadow="sm" radius="lg" withBorder p={{ base: "md", md: "xl" }}>
        <Grid gutter={50}>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Center
              p="xl"
              bg="gray.0.5"
              style={{
                borderRadius: "var(--mantine-radius-lg)",
                minHeight: "400px",
                position: "relative",
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fit="contain"
                h={400}
                w="100%"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                  transition: "transform 0.3s ease",
                }}
                className="hover:scale-105"
              />

              <ProductBadges
                isPrimePick={product.isPrimePick}
                hasDiscounts={product.hasDiscounts}
                isAvailable={product.isAvailable}
              />
            </Center>
          </Grid.Col>


          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Group justify="space-between" align="start">
                <div>
                  <Text tt="uppercase" c="dimmed" fw={700} size="xs" style={{ letterSpacing: 1 }}>
                    {product.brand}
                  </Text>
                  <Title order={1} size="h2" mt={4} fw={800}>
                    {product.name}
                  </Title>
                </div>
                <Group>
                  <FavoriteButton
                    isFavorite={isFavorite(product.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product.id);
                    }}
                  />
                  <ActionIcon variant="light" color="gray" size="lg" radius="xl">
                    <IconShare size={20} />
                  </ActionIcon>
                </Group>
              </Group>

              <Group gap="xs" align="center">
                <Rating value={product.rating} readOnly fractions={2} size="md" />
                <Text size="sm" c="dimmed" style={{ marginTop: 2 }}>
                  ({product.reviews.length} reviews)
                </Text>
              </Group>

              <Text size="lg" c="dimmed" lh={1.6}>
                {product.description}
              </Text>

              <Divider my="sm" />

              <Group align="flex-end" gap="xs">
                <Text size="3rem" fw={800} lh={1} c="blue">
                  ${product.price}
                </Text>
                {product.hasDiscounts && (
                  <Text size="xl" c="dimmed" td="line-through" mb={6}>
                    ${(product.price * 1.2).toFixed(2)}
                  </Text>
                )}
              </Group>

              <Group gap="sm" mt="sm">
                <Badge size="lg" variant="dot" color="blue">
                  {product.category}
                </Badge>
                {product.tags.map((tag) => (
                  <Badge key={tag} size="lg" variant="outline" color="gray">
                    {tag}
                  </Badge>
                ))}
              </Group>

              <Group mt="xl" grow>
                <Button
                  size="xl"
                  radius="md"
                  color="blue"
                  leftSection={<IconShoppingCart />}
                  disabled={!product.isAvailable}
                  className="transition-transform active:scale-95"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                >
                  Add to Cart
                </Button>
                <Button
                  size="xl"
                  radius="md"
                  variant="light"
                  color="red"
                  leftSection={<IconTrash />}
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this product?")) {
                      deleteProduct(product.id);
                    }
                  }}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>


        {product.reviews.length > 0 && (
          <Container size="md" p={0} mt={60}>
            <Title order={3} mb="xl">
              Customer Reviews
            </Title>
            <Stack gap="lg">
              {product.reviews.map((review, index) => (
                <Paper key={index} withBorder p="lg" radius="md" bg="gray.0">
                  <Group mb="sm">
                    <Avatar color="blue" radius="xl">
                      {review.reviewer.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                    <div>
                      <Text fw={600} size="sm">
                        {review.reviewer.name}
                      </Text>
                      <Group gap={6}>
                        <Rating value={review.rating} readOnly size="xs" />
                        <Text size="xs" c="dimmed">{new Date(review.date).toLocaleDateString()}</Text>
                      </Group>
                    </div>
                  </Group>
                  <Text size="sm" c="gray.7">
                    {review.comment}
                  </Text>
                </Paper>
              ))}
            </Stack>
          </Container>
        )}
      </Paper>
    </Container>
  );
};
