import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterValues } from "./register.schema";
import type { RegisterFormProps } from "./register.types";
import { signUpWithEmailPassword } from "../../../services/register.service";
import { mapSupabaseAuthError } from "../../../utils/mapSupabaseAuthError";

function getDefaultEmailRedirectTo() {
    return new URL("/login", window.location.origin).toString();
}

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

export function useRegisterForm(props: RegisterFormProps) {
    const emailRedirectTo = props.emailRedirectTo ?? getDefaultEmailRedirectTo();

    const [serverError, setServerError] = useState<string | null>(null);
    const [serverMessage, setServerMessage] = useState<string | null>(null);

    const defaultValues = useMemo<RegisterValues>(
        () => ({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        }),
        []
    );

    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues,
        mode: "onTouched",
    });

    const submit = form.handleSubmit(async (values) => {
        setServerError(null);
        setServerMessage(null);

        try {
            const { status } = await signUpWithEmailPassword({
                email: normalizeEmail(values.email),
                password: values.password,
                fullName: values.fullName.trim(),
                emailRedirectTo,
            });

            setServerMessage(() => {
                switch (status) {
                    case "signed_in":
                        return "Already signed in";
                    case "confirmation_sent":
                        return "Check your email.";
                    case "already_registered":
                        return "Account already registered.";
                }
            });

            props.onSuccess?.(normalizeEmail(values.email));
            form.reset();
        } catch (err) {
            const mapped = mapSupabaseAuthError(err);

            if (mapped.scope === "email") {
                form.setError("email", { type: "server", message: mapped.message });
            } else {
                setServerError(mapped.message);
            }
        }
    });

    return {
        form,
        submit,
        serverError,
        serverMessage,
    };
}
