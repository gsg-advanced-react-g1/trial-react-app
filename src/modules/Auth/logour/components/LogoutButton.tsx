import React, { useState } from "react";
import { Button, Notification } from "@mantine/core";
import { useLogout } from "../hooks/useLogout";

type Props = {
    redirectTo?: string; // after logout
    variant?: "filled" | "light" | "subtle" | "outline";
};

const LogoutButton: React.FC<Props> = ({ redirectTo = "/login", variant = "light" }) => {
    const [error, setError] = useState<string | null>(null);

    const { runLogout, isLoggingOut } = useLogout({
        onSuccess: () => window.location.assign(redirectTo),
        onError: (msg) => setError(msg),
    });

    return (
        <>
            <Button variant={variant} loading={isLoggingOut} onClick={runLogout} color="red">
                Logout
            </Button>

            {error && (
                <Notification color="red" onClose={() => setError(null)} title="Logout failed" mt="sm">
                    {error}
                </Notification>
            )}
        </>
    );
};

export default LogoutButton;
