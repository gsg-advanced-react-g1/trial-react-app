import { supabase } from "../../../lib/supabaseClient";

export type LoginParams = {
    email: string;
    password: string;
};

export async function loginWithEmailPassword(params: LoginParams) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: params.email,
        password: params.password,
    });

    if (error) throw error;

    if (!data.user || !data.session) {
        throw new Error("Login failed. Missing session.");
    }

    return { user: data.user, session: data.session };
}

export async function resendSignupVerificationEmail(email: string, emailRedirectTo?: string) {
    const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: emailRedirectTo ? { emailRedirectTo } : undefined,
    });

    if (error) throw error;
}
