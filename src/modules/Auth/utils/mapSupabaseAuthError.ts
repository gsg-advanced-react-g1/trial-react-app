type MappedAuthError =
    | { scope: "email"; message: string }
    | { scope: "form"; message: string };

export function mapSupabaseAuthError(err: unknown): MappedAuthError {
    const fallback: MappedAuthError = { scope: "form", message: "Registration failed. Please try again." };

    if (!err || typeof err !== "object" || !("message" in err)) return fallback;

    const msg = String((err as { message?: string }).message ?? "").trim();
    if (!msg) return fallback;

    const lower = msg.toLowerCase();
    if (lower.includes("user already registered") || lower.includes("already registered")) {
        return { scope: "email", message: "Email is already registered." };
    }

    if (lower.includes("invalid email")) {
        return { scope: "email", message: "Invalid email." };
    }

    if (lower.includes("email") && (lower.includes("invalid") || lower.includes("format"))) {
        return { scope: "email", message: msg };
    }

    if (lower.includes("password")) {
        return { scope: "form", message: msg };
    }

    return { scope: "form", message: msg };
}
