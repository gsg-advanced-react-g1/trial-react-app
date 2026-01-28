import React from "react";
import { Alert, Button, Paper, Stack, Text, TextInput, PasswordInput, Title } from "@mantine/core";
import type { RegisterFormProps } from "./register.types";
import { useRegisterForm } from "./useRegisterForm";

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const { form, submit, serverError, serverMessage } = useRegisterForm(props);
    const {
        register,
        formState: { errors, isSubmitting },
    } = form;

    return (
        <div className="mx-auto w-full max-w-md">
            <Paper withBorder radius="md" p="lg" className="bg-white/5">
                <Stack gap="md">
                    <div>
                        <Title order={3}>Create account</Title>
                        <Text size="sm" c="dimmed">
                            Create your account to start using the market.
                        </Text>
                    </div>

                    {serverError && (
                        <Alert color="red" title="Registration failed">
                            {serverError}
                        </Alert>
                    )}

                    {serverMessage && (
                        <Alert color="green" title="Success">
                            {serverMessage}
                        </Alert>
                    )}

                    <form onSubmit={submit} noValidate>
                        <Stack gap="sm">
                            <TextInput
                                label="Full name"
                                placeholder="Your name"
                                autoComplete="name"
                                disabled={isSubmitting}
                                error={errors.fullName?.message}
                                {...register("fullName")}
                            />

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
                                placeholder="At least 8 characters"
                                autoComplete="new-password"
                                disabled={isSubmitting}
                                error={errors.password?.message}
                                {...register("password")}
                            />

                            <PasswordInput
                                label="Confirm password"
                                placeholder="Repeat password"
                                autoComplete="new-password"
                                disabled={isSubmitting}
                                error={errors.confirmPassword?.message}
                                {...register("confirmPassword")}
                            />

                            <Button type="submit" loading={isSubmitting} fullWidth>
                                Sign up
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </div>
    );
};

export default RegisterForm;
