import type { Session, User } from "@supabase/supabase-js";

export type AuthState = {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isEmailVerified: boolean;
};