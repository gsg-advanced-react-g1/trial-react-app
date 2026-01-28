import React from "react";
import { Center, Stack } from "@mantine/core";
import { LoginForm } from "../../components/login/LoginForm";

const Login: React.FC = () => {
    return (
        <Center className="min-h-[80vh] px-4">
            <Stack w="100%" style={{ maxWidth: 420 }}>
                <LoginForm
                    onSuccess={() => {
                        window.location.assign("/");
                    }}
                />
            </Stack>
        </Center>
    );
};

export default Login;
