import { Button, Center, Divider, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconTrash, IconX } from "@tabler/icons-react";

type DeleteProductModalProps = {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
    isDeleting?: boolean;
};

export const DeleteProductModal = ({
    opened,
    onClose,
    onConfirm,
    productName,
    isDeleting = false,
}: DeleteProductModalProps) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={
                <Group gap="xs">
                    <IconAlertTriangle size={24} color="var(--mantine-color-red-6)" />
                    <Title order={4}>Delete Product</Title>
                </Group>
            }
            centered
            size="md"
            radius="md"
            overlayProps={{
                backgroundOpacity: 0.55,
                blur: 3,
            }}
        >
            <Stack gap="lg" py="sm">
                <Center
                    p="xl"
                    style={{
                        borderRadius: "var(--mantine-radius-md)",
                        backgroundColor: "var(--mantine-color-red-0)",
                        border: "2px solid var(--mantine-color-red-2)",
                    }}
                >
                    <IconAlertTriangle
                        size={64}
                        color="var(--mantine-color-red-6)"
                        stroke={1.5}
                    />
                </Center>

                <Stack gap="xs" align="center">
                    <Text size="lg" fw={600} ta="center">
                        Are you sure you want to delete this product?
                    </Text>
                    <Text
                        size="sm"
                        c="dimmed"
                        ta="center"
                        fw={500}
                        style={{
                            padding: "var(--mantine-spacing-xs)",
                            borderRadius: "var(--mantine-radius-sm)",
                            backgroundColor: "var(--mantine-color-gray-0)",
                        }}
                    >
                        {productName}
                    </Text>
                    <Text size="sm" c="red" fw={500} ta="center" mt="xs">
                        This action cannot be undone.
                    </Text>
                </Stack>

                <Divider />

                <Group justify="flex-end" gap="sm">
                    <Button
                        variant="subtle"
                        color="gray"
                        onClick={onClose}
                        leftSection={<IconX size={18} />}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        variant="filled"
                        leftSection={<IconTrash size={18} />}
                        onClick={onConfirm}
                        loading={isDeleting}
                        style={{
                            boxShadow: "0 2px 8px rgba(230, 0, 0, 0.3)",
                        }}
                    >
                        {isDeleting ? "Deleting..." : "Delete Product"}
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
