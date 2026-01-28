import { useState } from "react";
import { logout } from "../services/logout.service";

type UseLogoutOptions = {
    onSuccess?: () => void;
    onError?: (message: string) => void;
};

export function useLogout(options?: UseLogoutOptions) {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const runLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            options?.onSuccess?.();
        } catch (err) {
            const msg =
                err && typeof err === "object" && "message" in err
                    ? String((err as { message?: string }).message ?? "Logout failed.")
                    : "Logout failed.";
            options?.onError?.(msg);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return { runLogout, isLoggingOut };
}
