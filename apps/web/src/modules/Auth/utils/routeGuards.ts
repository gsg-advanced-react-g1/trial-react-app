import { redirect } from '@tanstack/react-router';
import { supabase } from '../../../lib/supabaseClient';

export async function requireAuth() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        throw redirect({
            to: '/login',
            search: {
                redirect: location.href,
            },
        });
    }

    return { user: data.session.user };
}

export async function requireGuest() {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        throw redirect({
            to: '/',
        });
    }
}

export async function requireEmailVerified() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
        throw redirect({ to: '/login' });
    }

    if (!data.session.user.email_confirmed_at) {
        throw redirect({ to: '/login' });
    }

    return { user: data.session.user };
}