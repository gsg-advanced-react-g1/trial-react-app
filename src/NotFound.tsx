import { Button, Container, Stack, Text, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'

const NotFound = ({ msg = "Page Not Found", path = "/" }: { msg?: string, path?: string }) => {
    return (
        <Container size="md">
            <Center h="100vh">
                <Stack align="center">
                    <Title order={1} size="10rem" fw={900} c="dimmed" opacity={0.2}>404</Title>
                    <Title order={2}>{msg}</Title>
                    <Text c="dimmed">The page you are looking for does not exist or has been moved.</Text>
                    <Button component={Link} to={path} size="md" variant="light" mt="xl">
                        Back to safety
                    </Button>
                </Stack>
            </Center>
        </Container>
    )
}

import { Center } from '@mantine/core'
export default NotFound
