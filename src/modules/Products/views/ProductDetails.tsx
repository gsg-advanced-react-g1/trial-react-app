import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { productDetailRoute } from "../../../router";
import { useGetProductById } from "../hooks/useGetProductById";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useFavoriteActions } from "../hooks/useFavoriteActions";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft, IconShare, IconShoppingCart, IconTrash } from "@tabler/icons-react";
import ProductBadges from "./components/ProductBadges";
import { FavoriteButton } from "./components/FavoriteButton";
import { DeleteProductModal } from "./components/DeleteProductModal";

function BackToProductsButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="subtle"
      color="gray"
      leftSection={<IconArrowLeft size={18} />}
      onClick={onClick}
      mb="lg"
    >
      Back to Products
    </Button>
  );
}

function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="lg" mt="xl">
        <Text c="red" size="xl" fw={700}>
          Product not found.
        </Text>
        <Text c="dimmed">
          The product you are looking for might have been removed or is temporarily unavailable.
        </Text>
        <Button leftSection={<IconArrowLeft />} onClick={onBack} variant="light" size="md">
          Back to Products
        </Button>
      </Stack>
    </Container>
  );
}

function ReviewsSection({
  reviews,
}: {
  reviews: Array<{
    rating: number;
    comment: string;
    date: string | number | Date;
    reviewer: { name: string };
  }>;
}) {
  if (!reviews.length) return null;

  return (
    <Container size="md" p={0} mt={60}>
      <Title order={3} mb="xl">
        Customer Reviews
      </Title>

      <Stack gap="lg">
        {reviews.map((review, index) => (
          <Paper key={index} withBorder p="lg" radius="md" >
            <Group mb="sm">
              <Avatar color="blue" radius="xl">
                {review.reviewer?.name?.slice(0, 2)?.toUpperCase() ?? "NA"}
              </Avatar>

              <div>
                <Text fw={600} size="sm">
                  {review.reviewer?.name ?? "Anonymous"}
                </Text>

                <Group gap={6}>
                  <Rating value={review.rating ?? 0} readOnly size="xs" />
                  <Text size="xs" c="dimmed">
                    {new Date(review.date).toLocaleDateString()}
                  </Text>
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
  );
}

const ProductDetails = () => {
  const { id } = productDetailRoute.useParams();
  const navigate = useNavigate();

  const productId = id ?? "";
  const { product, isLoading, isError } = useGetProductById(productId);

  const { isFavorite, toggleFavorite } = useFavoriteActions();

  const goBack = useCallback(() => navigate({ to: "/products" }), [navigate]);

  const { deleteProduct, isPending: isDeleting } = useDeleteProduct({
    onSuccess: goBack,
    onError: () => console.error("Failed to delete product"),
  });

  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const reviews = useMemo(() => product?.reviews ?? [], [product]);
  const tags = useMemo(() => product?.tags ?? [], [product]);
  const rating = product?.rating ?? 0;

  const originalPrice = useMemo(() => {
    if (!product) return null;
    if (!product.hasDiscounts) return null;
    return Number((product.price * 1.2).toFixed(2));
  }, [product]);

  const handleDelete = useCallback(() => {
    if (!product) return;
    setDeleteModalOpened(true);
  }, [product]);

  const confirmDelete = useCallback(() => {
    if (!product) return;
    deleteProduct(product.id);
    setDeleteModalOpened(false);
  }, [deleteProduct, product]);

  const handleFavoriteClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!product) return;
      toggleFavorite(product.id);
    },
    [product, toggleFavorite]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!productId) {
    return <NotFoundState onBack={goBack} />;
  }

  if (isDeleting) {
    return (
      <Center h="100vh">
        <Loader size="xl" color="blue" type="dots" />
      </Center>
    );
  }

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="xl" color="blue" type="dots" />
      </Center>
    );
  }

  if (isError || !product) {
    return <NotFoundState onBack={goBack} />;
  }

  return (
    <>
      <DeleteProductModal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        onConfirm={confirmDelete}
        productName={product.name}
        isDeleting={isDeleting}
      />

      <Container size="xl" py="xl">
        <BackToProductsButton onClick={goBack} />

        <Paper shadow="sm" radius="lg" withBorder p={{ base: "md", md: "xl" }}>
          <Grid gutter={50}>
            {/* Image */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Center
                p="xl"
                style={{
                  borderRadius: "var(--mantine-radius-lg)",
                  minHeight: "400px",
                  position: "relative",
                }}
                className="relative"
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
                <div className="absolute top-4 right-4">

                  <ProductBadges
                    isPrimePick={product.isPrimePick}
                    hasDiscounts={product.hasDiscounts}
                    isAvailable={product.isAvailable}
                    discountPercentage={product.discountPercentage}
                  />
                </div>
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
                    <FavoriteButton isFavorite={isFavorite(product.id)} onClick={handleFavoriteClick} />
                    <ActionIcon
                      variant="light"
                      color="gray"
                      size="lg"
                      radius="xl"
                      aria-label="Share product"
                    >
                      <IconShare size={20} />
                    </ActionIcon>
                  </Group>
                </Group>

                <Group gap="xs" align="center">
                  <Rating value={rating} readOnly fractions={2} size="md" />
                  <Text size="sm" c="dimmed" style={{ marginTop: 2 }}>
                    ({reviews.length} reviews)
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

                  {originalPrice !== null && (
                    <Text size="xl" c="dimmed" td="line-through" mb={6}>
                      ${originalPrice}
                    </Text>
                  )}
                </Group>

                <Group gap="sm" mt="sm">
                  <Badge size="lg" variant="dot" color="blue">
                    {product.category}
                  </Badge>

                  {tags.map((tag) => (
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
                    gradient={{ from: "blue", to: "cyan", deg: 90 }}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    size="xl"
                    radius="md"
                    variant="light"
                    color="red"
                    leftSection={<IconTrash />}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>

          <ReviewsSection reviews={reviews} />
        </Paper>
      </Container>
    </>
  );
};

export default ProductDetails;
