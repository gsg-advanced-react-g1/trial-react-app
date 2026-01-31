import React from "react";
import { Alert, Button, Group, Paper, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core";

import type { LoginFormProps } from "./login.types";
import { useLoginForm } from "./useLoginForm";
import { Link } from "@tanstack/react-router";

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, showLinks = true }) => {
    const {
        form,
        submit,
        serverError,
        serverMessage,
        canResendVerification,
        resendVerification,
        isResending,
    } = useLoginForm({ onSuccess, showLinks });

    const {
        register,
        formState: { errors, isSubmitting },
    } = form;

    return (
        <div className="mx-auto w-full max-w-md">
            <Paper withBorder radius="md" p="lg" className="bg-white/5">
                <Stack gap="md">
                    <div>
                        <Title order={3}>Welcome back</Title>
                        <Text size="sm" c="dimmed">
                            Login to continue.
                        </Text>
                    </div>

                    {serverError && (
                        <Alert color="red" title="Login failed">
                            <Stack gap="xs">
                                <Text size="sm">{serverError}</Text>

                                {canResendVerification && (
                                    <Button
                                        variant="light"
                                        onClick={resendVerification}
                                        loading={isResending}
                                        disabled={isSubmitting}
                                    >
                                        Resend verification email
                                    </Button>
                                )}
                            </Stack>
                        </Alert>
                    )}

                    {serverMessage && (
                        <Alert color="green" title="Done">
                            {serverMessage}
                        </Alert>
                    )}

                    <form onSubmit={submit} noValidate>
                        <Stack gap="sm">
                            <TextInput
                                label="Email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                disabled={isSubmitting}
                                error={errors.email?.message}
                                {...register("email")}
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                autoComplete="current-password"
                                disabled={isSubmitting}
                                error={errors.password?.message}
                                {...register("password")}
                            />

                            <Button type="submit" fullWidth loading={isSubmitting}>
                                Login
                            </Button>

                            {showLinks && (
                                <Group justify="space-between" mt={4}>
                                    <Link to="/register">
                                        Create account
                                    </Link>
                                </Group>
                            )}
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </div>
    );
};

export default LoginForm;
