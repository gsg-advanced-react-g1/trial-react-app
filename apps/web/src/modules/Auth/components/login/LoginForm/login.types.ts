import type { Session, User } from "@supabase/supabase-js";

export type LoginSuccessPayload = {
    user: User;
    session: Session;
};

export type LoginFormProps = {
    onSuccess?: (payload: LoginSuccessPayload) => void;
    showLinks?: boolean;
};
