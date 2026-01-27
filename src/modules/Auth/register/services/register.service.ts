import { supabase } from "../../../../lib/supabaseClient";

type SignUpParams = {
    email: string;
    password: string;
    fullName: string;
    emailRedirectTo: string;
};

export async function signUpWithEmailPassword(params: SignUpParams) {
    const { data, error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
            emailRedirectTo: params.emailRedirectTo,
            data: { full_name: params.fullName },
        },
    });
    if (error) throw error;
    const needsEmailConfirm = !data.session;

    return { needsEmailConfirm };
}
