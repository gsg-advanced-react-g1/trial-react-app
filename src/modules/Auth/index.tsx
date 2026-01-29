import React, { useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabaseClient";
import AuthContext from "./context/AuthContext";
import type { AuthState } from "./entities/types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        (async () => {
            const { data, error } = await supabase.auth.getSession();
            if (!mounted) return;

            if (!error) {
                setSession(data.session ?? null);
                setUser(data.session?.user ?? null);
            }
            setIsLoading(false);
        })();

        const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            setIsLoading(false);
        });

        return () => {
            mounted = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    const value = useMemo<AuthState>(() => {
        const isAuthenticated = !!session;
        const isEmailVerified = !!user?.email_confirmed_at;
        return { session, user, isLoading, isAuthenticated, isEmailVerified };
    }, [session, user, isLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
