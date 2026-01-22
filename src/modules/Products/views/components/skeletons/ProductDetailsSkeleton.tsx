import {
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  Skeleton,
  Stack,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

export const ProductDetailsSkeleton = () => {
  return (
    <Container
      size="xl"
      py="xl"
      role="status"
      aria-label="Loading product details"
    >
      <Button
        variant="subtle"
        color="gray"
        leftSection={<IconArrowLeft size={18} />}
        mb="lg"
        disabled
      >
        Back to Products
      </Button>

      <Paper shadow="sm" radius="lg" withBorder p={{ base: "md", md: "xl" }}>
        <Grid gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Center
              p="xl"
              style={{
                borderRadius: "var(--mantine-radius-lg)",
                minHeight: "400px",
                position: "relative",
              }}
            >
              <Skeleton height={400} width="100%" radius="md" />

              <div className="absolute top-4 left-4 flex gap-2">
                <Skeleton height={22} width={50} radius="md" />
                <Skeleton height={22} width={40} radius="xl" />
              </div>
            </Center>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Group justify="space-between" align="start">
                <div className="flex-1">
                  <Skeleton height={12} width={80} mb={8} />
                  <Skeleton height={32} width="90%" />
                </div>

                <Group>
                  <Skeleton height={34} width={34} radius="xl" />
                  <Skeleton height={34} width={34} radius="xl" />
                </Group>
              </Group>

              <Group gap="xs" align="center">
                <Skeleton height={20} width={120} />
                <Skeleton height={16} width={80} />
              </Group>

              <Stack gap={8}>
                <Skeleton height={18} width="100%" />
                <Skeleton height={18} width="95%" />
                <Skeleton height={18} width="70%" />
              </Stack>

              <Divider my="sm" />

              <Group align="flex-end" gap="xs">
                <Skeleton height={48} width={120} />
                <Skeleton height={28} width={80} />
              </Group>

              <Group gap="sm" mt="sm">
                <Skeleton height={26} width={100} radius="xl" />
                <Skeleton height={26} width={70} radius="xl" />
                <Skeleton height={26} width={80} radius="xl" />
              </Group>

              <Group mt="xl" grow>
                <Skeleton height={52} radius="md" />
                <Skeleton height={52} radius="md" />
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Container size="md" p={0} mt={60}>
          <Skeleton height={24} width={180} mb="xl" />

          <Stack gap="lg">
            {Array.from({ length: 3 }).map((_, index) => (
              <Paper key={index} withBorder p="lg" radius="md">
                <Group mb="sm">
                  <Skeleton height={40} width={40} radius="xl" />
                  <div>
                    <Skeleton height={14} width={100} mb={6} />
                    <Skeleton height={12} width={150} />
                  </div>
                </Group>
                <Skeleton height={14} width="100%" />
                <Skeleton height={14} width="80%" mt={6} />
              </Paper>
            ))}
          </Stack>
        </Container>
      </Paper>
    </Container>
  );
};

export default ProductDetailsSkeleton;
