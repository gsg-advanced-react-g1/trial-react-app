import { supabase } from "../../../lib/supabaseClient"
import type { SignUpResult } from "../entities/types"

type SignUpParams = {
    email: string
    password: string
    fullName: string
    emailRedirectTo: string
}


export async function signUpWithEmailPassword(
    params: SignUpParams
): Promise<SignUpResult> {
    const { data, error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
            emailRedirectTo: params.emailRedirectTo,
            data: { full_name: params.fullName },
        },
    })

    if (error) {
        if (error.message.toLowerCase().includes("already registered")) {
            return { status: "already_registered" }
        }
        throw error
    }

    const identities = data.user?.identities ?? []
    if (identities.length === 0) {
        return { status: "already_registered" }
    }
    if (data.session) return { status: "signed_in" }

    return { status: "confirmation_sent" }
}
