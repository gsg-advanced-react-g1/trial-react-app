import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginValues } from "./login.schema";
import { loginWithEmailPassword, resendSignupVerificationEmail } from "../../services/login.service";
import type { LoginFormProps } from "./login.types";

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function isEmailNotConfirmedError(err: unknown) {
    if (!err || typeof err !== "object" || !("message" in err)) return false;
    const msg = String((err as { message?: string }).message ?? "").toLowerCase();
    return msg.includes("email not confirmed") || msg.includes("not confirmed");
}

function getDefaultEmailRedirectTo() {
    return new URL("/auth/callback", window.location.origin).toString();
}

export function useLoginForm(props: LoginFormProps) {
    const [serverError, setServerError] = useState<string | null>(null);
    const [serverMessage, setServerMessage] = useState<string | null>(null);
    const [canResendVerification, setCanResendVerification] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const defaultValues = useMemo<LoginValues>(() => ({ email: "", password: "" }), []);

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues,
        mode: "onTouched",
    });

    const submit = form.handleSubmit(async (values) => {
        setServerError(null);
        setServerMessage(null);
        setCanResendVerification(false);

        const email = normalizeEmail(values.email);

        try {
            const { user, session } = await loginWithEmailPassword({
                email,
                password: values.password,
            });

            if (!user.email_confirmed_at) {
                setServerError("Please verify your email before logging in.");
                setCanResendVerification(true);
                return;
            }

            props.onSuccess?.({ user, session });
        } catch (err) {
            if (isEmailNotConfirmedError(err)) {
                setServerError("Please verify your email before logging in.");
                setCanResendVerification(true);
                return;
            }

            const msg =
                err && typeof err === "object" && "message" in err
                    ? String((err as { message?: string }).message ?? "Login failed.")
                    : "Login failed.";

            setServerError(msg || "Login failed.");
        }
    });

    const resendVerification = async () => {
        const email = normalizeEmail(form.getValues("email"));
        if (!email) {
            form.setError("email", { type: "manual", message: "Enter your email first." });
            return;
        }

        setIsResending(true);
        setServerError(null);
        setServerMessage(null);

        try {
            await resendSignupVerificationEmail(email, getDefaultEmailRedirectTo());
            setServerMessage("Verification email sent. Check your inbox/spam.");
        } catch (err) {
            const msg =
                err && typeof err === "object" && "message" in err
                    ? String((err as { message?: string }).message ?? "Failed to resend email.")
                    : "Failed to resend email.";
            setServerError(msg);
        } finally {
            setIsResending(false);
        }
    };

    return {
        form,
        submit,
        serverError,
        serverMessage,
        canResendVerification,
        resendVerification,
        isResending,
    };
}
